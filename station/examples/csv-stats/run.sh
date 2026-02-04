
#!/bin/bash

python "generate_csv.py"

CSV_PATH=$PWD
CSV_NAME="data.csv"

node index.js "${CSV_PATH}/${CSV_NAME}"

