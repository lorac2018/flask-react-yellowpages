import React from 'react';
import axios from 'axios'
import AppForm from '../Components/AppForm'
import Breadcrumb from 'react-bootstrap/Breadcrumb'


export default class UpdateForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTelefone = this.handleChangeTelefone.bind(this);
        this.handleChangeMorada = this.handleChangeMorada.bind(this);
        this.handleChangecodigopostal = this.handleChangecodigopostal.bind(this);
        this.handleChangeFreguesia = this.handleChangeFreguesia.bind(this);
        this.onSubmit = this.onSubmit.bind(this);




        this.state = {

            id: '',
            nome: '',
            telefone: '',
            morada: '',
            codigopostal: '',
            freguesia: '',
            count: 0

        };

    }


    componentDidMount() {

        this.getEmpresasById(this.props.match.params.id)
    }

    getEmpresasById(id) {

        axios.get(`http://localhost:5000/showempresas/${id}`)
            .then((response) =>
                response.data.empresas.map(empresa => ({
                    id: `${empresa.id}`,
                    nome: `${empresa.nome}`,
                    telefone: `${empresa.telefone}`,
                    morada: `${empresa.morada}`,
                    codigopostal: `${empresa.codigopostal}`,
                    freguesia: `${empresa.freguesia}`,
                    count: `${empresa.count}`
                }))
            ).then(empresas => {
                console.log(empresas.log)
                this.setState({
                    empresas
                })
            })
            .catch(error => {

                console.log('erros', error)
            });

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




    onSubmit(e) {

        e.preventDefault();
        const data = {

            id: this.state.id,
            nome: this.state.nome,
            telefone: this.state.telefone,
            morada: this.state.morada,
            codigopostal: this.state.codigopostal,
            freguesia: this.state.freguesia
        };
        axios.put(`http://localhost:5000/editarempresas/${this.props.match.params.id}`, data).then(res => console.log(res.data));

        this.setState({
            id: '',
            nome: '',
            telefone: '',
            morada: '',
            codigopostal: '',
            freguesia: '',
            count: 0
        })

    }

    render() {
        return (
            <AppForm>
                <Breadcrumb>
                    <Breadcrumb.Item href="http://localhost:3000/admin/empresas">
                        Lista
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>EditEmpresas</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ marginTop: 10 }}>
                    <h3>Atualizar uma empresa</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Nome:  </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.nome}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Telefone: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.telefone}
                                onChange={this.handleChangeTelefone}
                            />
                        </div>
                        <div className="form-group">
                            <label>Morada: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.morada}
                                onChange={this.handleChangeMorada}
                            />
                        </div>
                        <div className="form-group">
                            <label>Codigopostal: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.codigopostal}
                                onChange={this.handleChangecodigopostal}
                            />
                        </div>
                        <div className="form-group">
                            <label>Freguesia : </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.freguesia}
                                onChange={this.handleChangeFreguesia}
                            />
                        </div>
                        <div className="form-group">
                            <label>Count : </label>
                            <input type="text"
                                className="form-control"
                                defaultValue={this.state.count}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Atualizar Empresa" className="btn btn-primary" />
                        </div>
                    </form>
                    <div>

                    </div>
                </div>
            </AppForm>
        );
    }
}

