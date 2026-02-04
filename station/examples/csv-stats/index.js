#!/usr/bin/env node

// importa filesystem
const fs = require("fs");

// ruta del archivo
const filePath = process.argv[2];


if (!filePath) {
    console.log("Ejecutar así: node index.js ruta/al/archivo.csv");
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.log("El archivo no existe");
    process.exit(1);
}

// leer el archivo
const content = fs.readFileSync(filePath, "utf8");

// separar las lineas
const lines = content.trim().split("\n");

// si no tiene nada (header + datos)
if (lines.length < 2) {
    console.log("CSV vacío");
    process.exit(1);
}

// última fila (ignora header)
const lastLine = lines[lines.length - 1];

const [id, hora, alt, temp, estado, volt] = lastLine.split(",");

// imprimir bonito
console.log("Últimos_datos;");
console.log(`ID     : ${id};`);
console.log(`Hora   : ${hora};`);
console.log(`Altura : ${alt};`);
console.log(`Temp   : ${temp};`);
console.log(`Estado : ${estado};`);
console.log(`Volt   : ${volt};`);
