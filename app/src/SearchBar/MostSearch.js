import React from "react"
import axios from 'axios';
import SearchSlides from "../Components/SearchSlides";


export default class MostSearch extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            nome: ' ',
            freguesia: ' ',
            empresas: [],
        }
    };
    componentDidMount() {
        this.handlemostsearch()
    }

    handlemostsearch() {
        axios.get(`http://localhost:5000/mostsearched`)
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
                    empresas
                });
            })
            .catch(error => this.setState({ error }));
    }
    render() {
        return (
            <div>
                <SearchSlides empresas={this.state.empresas} />
            </div>
        );
    }
}