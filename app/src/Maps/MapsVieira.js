
import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles.css';


export default class MapsVieira extends Component{

    state = {
        center: [41.2357, -8.6199],
        zoom: 12,
      };
    
      render() {
        return (
          <div>
            <Map center={this.state.center} zoom={this.state.zoom}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              <Marker position={this.state.center}>
                <Popup>
                  Para mais detalhes<br />
                </Popup>
              </Marker>
            </Map>
          </div>
        );
      }
    }