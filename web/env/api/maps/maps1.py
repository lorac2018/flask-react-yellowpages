import folium
import os
import json

#Map para Blip

#Coordenadas Exemplo -> Modificar depois, para as coordenadas certas e fazer python maps.py, de forma o html atualizar-se

#Create an map object
m = folium.Map(location=[41.1496, -8.611], zoom_start=15)

#Global Tooltip
tooltip = 'Clicar para mais informações'

#Markers
folium.Marker([41.1496, -8.611], 
            popup='<strong>Blip</strong>',
            tooltip=tooltip).add_to(m)

m.save('map1.html')