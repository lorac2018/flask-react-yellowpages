import React, { Component } from 'react';
import axios from 'axios'

export default class Forms extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            empresas: [],
            nome: "",
            telefone: "",
            morada: "",
            codigopostal: "",
            freguesia: "",
            count : 0

        }

    }

    componentDidMount(props) {

        this.setState(props);

    }


    handleChange = (e) => {
        e.preventDefault();
        this.setState({ nome: e.target.value });
    }

    handleChangeTelefone = (e) => {

        e.preventDefault();
        this.setState({ telefone: e.target.value });
    }
    handleChangeMorada = e => {

        e.preventDefault();
        e.preventDefault();
        this.setState({ morada: e.target.value });
    }

    handleChangecodigopostal = (e) => {

        e.preventDefault();
        this.setState({ codigopostal: e.target.value });
    }
    handleChangeFreguesia = (e) => {

        e.preventDefault();
        this.setState({ freguesia: e.target.value });
    }

    handleChangeId = (e) => {

        e.preventDefault();
        this.setState({ id: e.target.value });
    }
    handleChangecount = (e) => {

        e.preventDefault();
        this.setState({ count: e.target.value });
    }


    handleSubmit(e) {
        e.preventDefault();
        axios.put(`http://localhost:5000/editarempresas/${this.empresas.id}`)
    
    }


    render() {
        return (
            <form name="blog_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="empresa">
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_title">Nome</label>
                        <div className="col-sm-10">
                            <input type="text"
                                id="empresa_nome"
                                required="required"
                                value={this.state.nome}
                                onChange={this.handleChange}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Telefone</label>
                        <div className="col-sm-10">
                            <input type="text"
                                id="empresa_telefone"
                                required="required"
                                value={this.state.telefone}
                                onChange={this.handleChangeTelefone}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_title">Morada</label>
                        <div className="col-sm-10">
                            <input type="text"
                                id="empresa_morada"
                                required="required"
                                value={this.state.morada}
                                onChange={this.handleChangeMorada}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_title">CodigoPostal</label>
                        <div className="col-sm-10">
                            <input type="text"
                                id="empresa_codigopostal"
                                required="required"
                                value={this.state.codigopostal}
                                onChange={this.handleChangecodigopostal}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_title">Freguesia</label>
                        <div className="col-sm-10">
                            <input type="text"
                                id="empresa_freguesia"
                                required="required"
                                value={this.state.freguesia}
                                onChange={this.handleChangeFreguesia}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_title">Count</label>
                        <div className="col-sm-10">
                            <input type="text"
                                id="empresa_nome"
                                required="required"
                                value={this.state.count}
                                onChange={this.handleChangecount}
                                className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="submit"
                                id="blog_post_submit"
                                className="btn-default btn">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

