

library(jsonlite)
library(dplyr)    
library(ggplot2)
library(hrbrthemes)
library(viridis)

data <- fromJSON("data.json")






data1 = data[, c(2,5,4)]


#Turn your 'title' column into a character vector
data1$title <- as.character(data1$title)
#Then turn it back into a factor with the levels in the correct order
data1$title <- factor(data1$title, levels=unique(data1$title))




data1$country[which(data1$country == "de")] = "Alemanha"
data1$country[which(data1$country == "at")] = "Áustria"
data1$country[which(data1$country == "be")] = "Bélgica"
data1$country[which(data1$country == "bg")] = "Bulgária"
data1$country[which(data1$country == "cy")] = "Chipre"
data1$country[which(data1$country == "hr")] = "Croácia"
data1$country[which(data1$country == "dk")] = "Dinamarca"
data1$country[which(data1$country == "sk")] = "Eslováquia"
data1$country[which(data1$country == "si")] = "Eslovénia"
data1$country[which(data1$country == "es")] = "Espanha"
data1$country[which(data1$country == "ee")] = "Estónia"
data1$country[which(data1$country == "fi")] = "Finlândia"
data1$country[which(data1$country == "fr")] = "França"
data1$country[which(data1$country == "gr")] = "Grécia"
data1$country[which(data1$country == "hu")] = "Hungria"
data1$country[which(data1$country == "ie")] = "Irlanda"
data1$country[which(data1$country == "it")] = "Itália"
data1$country[which(data1$country == "lv")] = "Letónia"
data1$country[which(data1$country == "lt")] = "Lituânia"
data1$country[which(data1$country == "lu")] = "Luxemburgo"
data1$country[which(data1$country == "mt")] = "Malta"
data1$country[which(data1$country == "nl")] = "Países Baixos"
data1$country[which(data1$country == "pl")] = "Polónia"
data1$country[which(data1$country == "pt")] = "Portugal"
data1$country[which(data1$country == "cz")] = "Rep. Checa"
data1$country[which(data1$country == "ro")] = "Roménia"
data1$country[which(data1$country == "se")] = "Suécia"


#Turn your 'title' column into a character vector
data1$country <- as.character(data1$country)
#Then turn it back into a factor with the levels in the correct order
data1$country <- factor(data1$country, levels=unique(data1$country))




# Heatmap 
ggplot(data1, aes(title, country, fill= estado)) + 
  geom_tile() + theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1)) + scale_fill_viridis(option="magma", discrete=FALSE) +
  scale_y_discrete(limits=rev) + labs(x ="ODS#", y = "País", fill = "Estado")




data_hist_progresso = data[, c(5,3)]
data_hist_progresso = aggregate(data_hist_progresso$progresso, by=list(Category=data_hist_progresso$country), FUN=sum)
data_hist_progresso$x = data_hist_progresso$x / 13


# Change line color and fill color
ggplot(data_hist_progresso, aes(x=x))+
  geom_histogram(binwidth = 0.1, fill = "seagreen3", color = "seagreen") + labs(x="Valor Médio do Progresso nos ODS's", y="Número de Países")





data_hist_estado = data[, c(4,5)]
data_hist_estado = aggregate(data_hist_estado$estado, by=list(Category=data_hist_estado$country), FUN=sum)
data_hist_estado$x = data_hist_estado$x / 13


ggplot(data_hist_estado, aes(x=x))+
  geom_histogram(binwidth = 4, fill = "#F7D59C", color = "#5E454B") + labs(x="Valor Médio do Estado nos ODS's", y="Número de Países") + 
  scale_x_continuous(breaks = seq(-40, 30, 10), lim = c(-35, 30))



