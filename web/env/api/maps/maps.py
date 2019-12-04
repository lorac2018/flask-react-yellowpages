import folium
import os
import json

#Map para Vieira Eletricista

#Coordenadas Exemplo -> Modificar depois, para as coordenadas certas e fazer python maps.py, de forma o html atualizar-se

#Create an map object
m = folium.Map(location=[41.2357, -8.6199], zoom_start=15)

#Global Tooltip
tooltip = 'Clicar para mais informações'

#Markers
folium.Marker([41.2357, -8.6199], 
            popup='<strong>Vieira Eletricista</strong>',
            tooltip=tooltip).add_to(m)

m.save('map.html')