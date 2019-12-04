import React from 'react'


export default class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {
      empresas: [],
      currentPage: 1,
      empresasPerPage: 3
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const {empresas, currentPage, empresasPerPage } = this.state;

    // Logic for displaying empresas
    const indexOfLastempresas = currentPage * empresasPerPage;
    const indexOfFirstempresas = indexOfLastempresas - empresasPerPage;
    const currentempresas = empresas.slice(indexOfFirstempresas, indexOfLastempresas);

    const renderempresas = currentempresas.map((empresas, index) => {
      return <div key={index}>{empresas}</div>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(empresas.length / empresasPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <div
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </div>
      );
    });

    return (
      <div>
        <ul>
          {renderempresas}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}
