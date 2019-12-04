import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../Components/carousel.css'
import '../App.module.css';

export default class SearchSlides extends React.Component {
    render() {
        return (
            <div>
                <Carousel>
                    {this.props.empresas.map((empresa, i) => {
                    return (
                        <Carousel.Item key={i}>
                            <img 
                                className="d-block w-100"
                                src="imgs/stage.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption> 
                                <h3>{empresa.nome}</h3>
                                <p>{empresa.morada}</p>
                                <p>{empresa.codigopostal}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}  
                </Carousel>
            </div >
        );
    }
}
