import pandas as pd

df= pd.read_excel('Dados_ODS_Pordata_V3.xlsx')

df_normalized = df.copy()
df_normalized = df[df.Território != 'União Europeia 27 (desde 2020)']
df_normalized["Indicador"]=df_normalized.groupby('Título').Indicador.transform(lambda x: x / x.max())

ODS_scores_by_Country = df_normalized.groupby(['Território','ODS']).Indicador.sum()

Country_scores = df_normalized.groupby(['Território']).Indicador.sum().transform(lambda x: x /x.max())