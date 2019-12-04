import React from "react"
import { Container, Row, Col, FormGroup, Button } from "react-bootstrap"


export default class SearchForm extends React.Component {

    state = {

        nome: '',
        freguesia: ' '
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ nome: e.target.value });
    }

    handleChangeFreguesia = (e) => {

        e.preventDefault();
        this.setState({ freguesia: e.target.value });
    }
    render() {

        return (
            <Container>
                <Row className="justify-content-right">
                    <form className="w-100">
                        <Row  className="mx-md-n5">
                            <Col className="py-3 px-md-5">
                                <FormGroup>
                                    <label>Nome </label>

                                        <input type="text" name="nome" id="nome" value={this.state.nome} onChange={this.handleChange} placeholder="Nome da empresa" />
                                   
                                </FormGroup>
                            </Col>
                            <Col className="py-3 px-md-5" >
                                <FormGroup>
                                    <label >em</label>

                                        <input type="text" name="freguesia" id="freguesia" value={this.state.freguesia} onChange={this.handleChangeFreguesia} placeholder="Freguesia" />  
                                </FormGroup>
                            </Col>
                            <Col className="py-2 px-md-5">
                                <Button className="btn btn-dark btn-sm" onClick={this.props.handleSearch.bind(this, this.state.nome, this.state.freguesia)}>
                                    Search
                            </Button>
                            </Col>
                        </Row>
                    </form>
                </Row>
            </Container>
        );
    }
}

