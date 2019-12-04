import folium
import os
import json

#Map para Blip

#Coordenadas Exemplo -> Modificar depois, para as coordenadas certas e fazer python maps.py, de forma o html atualizar-se

#Create an map object
m = folium.Map(location=[41.3548, -8.7434], zoom_start=15)

#Global Tooltip
tooltip = 'Clicar para mais informações'

#Markers
folium.Marker([41.3548, -8.7434], 
            popup='<strong>Gesfacil</strong>',
            tooltip=tooltip).add_to(m)

m.save('map2.html')