import pandas as pd

read_file = pd.read_excel (r'data\Dados_ODS_Pordata_V3.xlsx')
read_file.to_csv (r'data\converted.csv', index = None, header=True)