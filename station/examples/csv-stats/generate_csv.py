import csv
import random
import math
import matplotlib.pyplot as plt

N = 50     # cantidad de muestras
ID = 1234   # ID const
k = 0.005   # ruido

estados = [
    "OKAY",
    "WARN",
    "FAIL",
    "BOOT",
    "SAVE",
    "SLEP"
]

csv_file = "data.csv"

def ruido(valor, k):
    return valor + random.uniform(-k, k) * valor # proporcional


def hora_inicial():
    return 120000  # 12:00:00


def incrementar_hora(hhmmss):
    s = hhmmss % 100
    m = (hhmmss // 100) % 100
    h = hhmmss // 10000

    s += 1
    if s == 60:
        s = 0
        m += 1
    if m == 60:
        m = 0
        h += 1

    return h * 10000 + m * 100 + s

hora = hora_inicial()

alt = 1000.0
temp = 20.0
volt = 4.2

with open(csv_file, "w", newline="") as f:
    writer = csv.writer(f)

    writer.writerow(["ID", "HORA", "ALT", "TEMP", "ESTADO", "VOLT"])

    for i in range(N):

        alt -= 2.5
        volt -= 0.01
        temp += 0.01 * math.sin(i / 10)

        alt_n = ruido(alt, k)
        temp_n = ruido(temp, k)
        volt_n = ruido(volt, k)

        estado = random.choice(estados)

        writer.writerow([
            ID,
            hora,
            round(alt_n/2.5, 1)*2.5,
            round(temp_n, 1),
            estado,
            round(volt_n, 1)
        ])

        hora = incrementar_hora(hora)

horas = []
alturas = []
temps = []
volts = []

with open(csv_file) as f:
    reader = csv.DictReader(f)

    for row in reader:
        horas.append(int(row["HORA"]))
        alturas.append(float(row["ALT"]))
        temps.append(float(row["TEMP"]))
        volts.append(float(row["VOLT"]))

plt.figure()
plt.plot(horas, alturas)
plt.xlabel("Hora")
plt.ylabel("Altura")
plt.title("Altura")

plt.figure()
plt.plot(horas, temps)
plt.xlabel("Hora")
plt.ylabel("Temperatura")
plt.title("Temperatura")

plt.figure()
plt.plot(horas, volts)
plt.xlabel("Hora")
plt.ylabel("Voltaje")
plt.title("Voltaje ")

plt.show()
