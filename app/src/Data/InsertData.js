import React from 'react';
import axios from 'axios'
import AppForm from '../Components/AppForm';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

class InsertData extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeTelefone = this.onChangeTelefone.bind(this);
    this.onChangeMorada = this.onChangeMorada.bind(this);
    this.onChangeCodigoPostal = this.onChangeCodigoPostal.bind(this);
    this.onChangeFreguesia = this.onChangeFreguesia.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: '',
      nome: '',
      telefone: '',
      morada: '',
      codigopostal: '',
      freguesia: '',
      count: 0,
      editing: false,
      showComponent: false
    }
  }
  onChangeId(e) {
    this.setState({
      id: e.target.value
    })
  }
  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    })
  }
  onChangeTelefone(e) {
    this.setState({
      telefone: e.target.value
    })
  }

  onChangeMorada(e) {
    this.setState({
      morada: e.target.value
    })
  }
  onChangeCodigoPostal(e) {
    this.setState({
      codigopostal: e.target.value
    })
  }

  onChangeFreguesia(e) {
    this.setState({
      freguesia: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {

      nome: this.state.nome,
      telefone: this.state.telefone,
      morada: this.state.morada,
      codigopostal: this.state.codigopostal,
      freguesia: this.state.freguesia,
      count: this.state.count
    };
    axios.post('http://localhost:5000/empresas', obj).then(res => console.log(res.data));


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
  onClickComponent = () => {
    this.setState({ showComponent: true });
  }

  handleUpdating = (event) => {
    this.setState({ editing: true })
  }
  render() {
    return (


      <AppForm>
        <Breadcrumb>
          <Breadcrumb.Item href="http://localhost:3000/admin/empresas">
            Lista
      </Breadcrumb.Item>
          <Breadcrumb.Item active>AddEmpresas</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ marginTop: 10 }}>
          <h3>Adicionar uma nova Empresa</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Nome:  </label>
              <input
                type="text"
                className="form-control"
                value={this.state.nome}
                onChange={this.onChangeNome}
              />
            </div>
            <div className="form-group">
              <label>Telefone: </label>
              <input type="text"
                className="form-control"
                value={this.state.telefone}
                onChange={this.onChangeTelefone}
              />
            </div>
            <div className="form-group">
              <label>Morada: </label>
              <input type="text"
                className="form-control"
                value={this.state.morada}
                onChange={this.onChangeMorada}
              />
            </div>
            <div className="form-group">
              <label>Codigopostal: </label>
              <input type="text"
                className="form-control"
                value={this.state.codigopostal}
                onChange={this.onChangeCodigoPostal}
              />
            </div>
            <div className="form-group">
              <label>Freguesia : </label>
              <input type="text"
                className="form-control"
                value={this.state.freguesia}
                onChange={this.onChangeFreguesia}
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
              <input type="submit" value="Adicionar Empresa" className="btn btn-primary" />
            </div>
          </form>
          <div>

          </div>
        </div>
      </AppForm>


    )

  }
}


export default InsertData