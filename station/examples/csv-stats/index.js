#!/usr/bin/env node

// importa filesystem
const fs = require("fs");

// Funciones matemateicas

function mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length; // media
}

function std(arr, mu) {
    const v = arr.reduce((s, x) => s + (x - mu) ** 2, 0) / arr.length; //desviacon
    return Math.sqrt(v);
}

// regresion lineal y=a*x+b
function linearRegression(x, y) {
    const n = x.length;

    const meanX = mean(x);
    const meanY = mean(y);

    let num = 0;
    let den = 0;
    let sy = 0;
    let sx = 0;

    for (let i = 0; i < n; i++) {
        const dx = x[i] - meanX;
        const dy = y[i] - meanY;

        num += dx * dy;
        den += dx * dx;

        sx += dx * dx;
        sy += dy * dy;
    }

    const a = num / den;
    const b = meanY - a * meanX;

    const r = num / Math.sqrt(sx * sy);

    return { a, b, r };
}

// ruta del archivo
const filePath = process.argv[2]; // argumento del sistema


if (!filePath) {
    console.log("Ejecutar así: node index.js ruta/al/archivo.csv");
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.log("El archivo no existe");
    process.exit(1);
}

// leer el archivo
const content = fs.readFileSync(filePath, "utf8"); // lee el contenido
const lines = content.trim().split("\n"); // corta y une las lineas por cada salto

if (lines.length < 2) {
    console.log("CSV vacío"); // si esta vacio (header+data no existe)
    process.exit(1);
}

// Último registro
const lastLine = lines[lines.length - 1];
const firstLine = lines[1];

const [idLast, horaLast, altLast, tempLast, estadoLast, voltLast] = lastLine.split(",");
const [idFirst, horaFirst, altFirst, tempFirst, estadoFirst, voltFirst] = firstLine.split(",");


console.log(`ID     : ${idFirst};`);

console.log("\ndatos_iniciales;");
console.log(`Hora   : ${horaFirst};`);
console.log(`altura : ${altFirst};`);
console.log(`temp   : ${tempFirst};`);
console.log(`estado : ${estadoFirst};`);
console.log(`volt   : ${voltFirst};`);


console.log("\ndatos_finales;");
console.log(`hora   : ${horaLast};`);
console.log(`altura : ${altLast};`);
console.log(`temp   : ${tempLast};`);
console.log(`estado : ${estadoLast};`);
console.log(`volt   : ${voltLast};`);


// Parseo en arrays

const horas = [];
const alt = [];
const temp = [];
const volt = [];
const estados = {};

for (const line of lines.slice(1)) {
    const [id, h, a, t, e, v] = line.split(",");

    horas.push(Number(h));
    alt.push(Number(a));
    temp.push(Number(t));
    volt.push(Number(v));

    estados[e] = (estados[e] || 0) + 1;
}

// los calculos (estadisticos)

const meanAlt = mean(alt);
const meanTemp = mean(temp);
const meanVolt = mean(volt);

const stdAlt = std(alt, meanAlt);

const { a, b, r } = linearRegression(horas, alt);


console.log("\nstats;");

console.log(`registros_totales : ${alt.length};`);

console.log("\nMedias;");
console.log(`ALT  : ${meanAlt.toFixed(2)};`);
console.log(`TEMP : ${meanTemp.toFixed(2)};`);
console.log(`VOLT : ${meanVolt.toFixed(3)};\n`);

console.log("# solo aplica estadistica en variable altura");
console.log("ALT_regresion_lineal;");
console.log(`a_pendiente       : ${a.toExponential(4)};`);
// nota, la interseccion da un valor raro
// porque el valor de la hora arranca en 12:00:00
// si fuera de 00:00:00 sería el primer dato
console.log(`b_interseccion    : ${b.toFixed(2)};`);
console.log(`desviacion        : ${stdAlt.toFixed(2)};`);
console.log(`correlacion       : ${r.toFixed(4)};`);

console.log("\nestados;");
for (const [k, v] of Object.entries(estados)) {
    console.log(`${k} : ${v};`);
}
console.log("\n");

