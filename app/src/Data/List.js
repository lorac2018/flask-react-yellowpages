import Table from '../Data/TableRow';
import React, { Component } from 'react';
import axios from 'axios'
import '../App.module.css'


console.clear();

export default class List extends Component {

    constructor() {
        super();

        this.state = {
            empresas: [],
            currentPage: 1,
            empresasPerPage: 4

        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }


    componentDidMount() {

        axios.get('http://localhost:5000/showempresas')
            .then((response) =>
                response.data.empresas.map(empresa => ({
                    id: `${empresa.id}`,
                    nome: `${empresa.nome}`,
                    telefone: `${empresa.telefone}`,
                    morada: `${empresa.morada}`,
                    codigopostal: `${empresa.codigopostal}`,
                    freguesia: `${empresa.freguesia}`,
                }))
            ).then(empresas => {
                this.setState({
                    empresas,
                });
            })
    }


    onDelete(id) {

        axios.delete(`http://localhost:5000/deleteempresas/${id}`)
            .then((data) => {
                let empresas = this.state.empresas.filter((empresas) => {
                    return id !== empresas.id;
                });
                this.setState(state => {
                    state.empresas = empresas;
                    return state;
                })
            })
            .catch((err) => {
                console.error('err', err);
            });
    }

    render() {

        const { empresas, currentPage, empresasPerPage } = this.state;
        // Logic for displaying current empresas
        const indexOfLastempresas = currentPage * empresasPerPage;
        const indexOfFirstempresas = indexOfLastempresas - empresasPerPage;
        const currentEmpresas = empresas.slice(indexOfFirstempresas, indexOfLastempresas);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(empresas.length / empresasPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <button className="btn btn-dark btn-sm"
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >{number}
                </button>
            );
        });

        return (
            <div>
                <Table empresas={currentEmpresas}
                    onDelete={this.onDelete.bind(this)} />

                <ul id="page-numbers">

                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}
