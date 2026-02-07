# csv file statistical data writer

## Python
Writes a fake csv as a flight simulation

Variables:
- ID: identifier (integer)
- HOUR: time (hh:mm:ss)
- ALT: height (meters)
- TEMP: temperature (celcius)
- VOLT: voltage (volts)
- states:
  - BOOT
  - OKAY
  - SLEP
  - WARN
  - FAIL
  - SAVE


## Javascript
Reads csv file then apply calcs to give some values

Values:
- first data
- last data
- number of states
- mean of all variable
- regresion data about height

## How to run

- Use automated file: ```./run.sh```

- Or use: 
```python generate_csv.py```
then:
```node index.js path/to/file.csv```
