import React from 'react'
import axios from 'axios'
import MapsVieira from '../Maps/MapsVieira';
import MapsBlip from '../Maps/MapsBlip';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Search from '../SearchBar/Search';
import MostSearch from '../SearchBar/MostSearch';
import '../App.module.css';


export default class ListData extends React.Component {
  state = {
    empresas: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getEmpresas();
  }

  getEmpresas() {
    axios
      .get('http://localhost:5000/showempresas')
      .then(response =>
        response.data.empresas.map(empresa => ({
          nome: `${empresa.nome}`,
          telefone: `${empresa.telefone}`,
          morada: `${empresa.morada}`,
          codigopostal: `${empresa.codigopostal}`,
          freguesia: `${empresa.freguesia}`,

        }))
      )
      .then(empresas => {
        this.setState({
          empresas,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    return (
     
      <Container> 
        <Search />
        <Card.Header as="h5" bg="secondary">Mais Pesquisados</Card.Header>
        <MostSearch />
          <Card.Header as="h5" bg="secondary">Listagem das Empresas</Card.Header>
          <div>
              {!this.state.isLoading ? (
                this.state.empresas.map(empresas => {
                  const { nome, telefone, morada, codigopostal, freguesia } = empresas;
                  return (
                    <div key = {nome}>
                      <Image src="imgs/company-building-icon.png" width="50"/>
                      <h2><p>{nome}</p> </h2>
                      <h5><p>{telefone} </p></h5>
                      <h5><p>{morada}</p></h5>
                      <h5><p>{codigopostal}</p></h5>
                      <h5><p>{freguesia} </p></h5>

                      <hr />
                    </div>
                  );
                })
              ) : (
                  <p>Loading...</p>
                )}
              <Card.Header as="h5" bg="secondary">Mapa das Empresas</Card.Header>
              <Card.Title>Empresa Vieira</Card.Title>  <MapsVieira />
              <Card.Title>Empresa Blip </Card.Title>   <MapsBlip />
            </div>
      </Container>
    );
  }
}