import React from "react"
import SearchInput from "../SearchBar/SearchForm";
import axios from 'axios';
import Container from 'react-bootstrap/Container'


export default class Search extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            nome: ' ',
            freguesia: ' ',
            empresas: [],
        }
    };
    handleSearch(nome, freguesia) {
        if (nome && freguesia) {
            axios.get(`http://localhost:5000/showempresas/${nome}/${freguesia}`)
                .then(response =>
                    //console.log(response.data)
                    response.data.empresas.map(empresa => ({
                        nome: `${empresa.nome}`,
                        telefone: `${empresa.telefone}`,
                        morada: `${empresa.morada}`,
                        codigopostal: `${empresa.codigopostal}`,
                        freguesia: `${empresa.freguesia}`,
                    })),
                )
                .then(empresas => {
                    this.setState({
                        empresas,
                    });
                })
                .catch(error => this.setState({ error }));
        }
    }
    render() {
        return (
            <Container>
                <SearchInput handleSearch={this.handleSearch.bind(this)}
                />
                {this.state.empresas && this.state.empresas.map((empresa, i) => {
                    return (
                        <div key={empresa.id}>
                            <p>{empresa.nome}</p>
                            <p>{empresa.telefone}</p>
                            <p>{empresa.morada}</p>
                            <p>{empresa.codigopostal}</p>
                            <p>{empresa.freguesia}</p>
                        </div>);
                })}
            </Container>
        );
    }
}
