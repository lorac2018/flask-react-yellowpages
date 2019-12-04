import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default class Table extends React.Component {

    deleteHandler(i, e) {
        e.preventDefault();
        this.props.onDelete(this.props.empresas[i].id);
    };

    render() {
        return (
            <div>

                <Breadcrumb>
                    <Breadcrumb.Item href="http://localhost:3000/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="http://localhost:3000/admin/empresas">
                        Admin
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Lista</Breadcrumb.Item>
                </Breadcrumb>
                <Link to="/admin/addempresas" className="btn btn-info btn-sm">Create</Link>

                <table className="table table-hover text-centered">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Morada</th>
                            <th>Codigo Postal</th>
                            <th>Freguesia</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.empresas && this.props.empresas.map((empresa, i) => {
                            return (
                                <tr key={empresa.id}>
                                    <td>{empresa.nome}</td>
                                    <td>{empresa.telefone}</td>
                                    <td>{empresa.morada}</td>
                                    <td>{empresa.codigopostal}</td>
                                    <td>{empresa.freguesia}</td>
                                    <td>
                                        <Link to={`/admin/updateempresas/` + empresa.id} className="btn btn-dark btn-sm">Edit</Link>
                                        <button onClick={this.deleteHandler.bind(this, i)} className="btn btn-dark btn-sm">Delete</button>

                                    </td>
                                </tr>);
                        })}

                    </tbody>
                </table>

            </div>
        );
    }

}