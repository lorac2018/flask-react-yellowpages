import React from 'react'
import withRoot from '../components/withRoot';
import axios from 'axios';

class Maps extends React.Component {

    state = {

        firstResponse : {},
        secondResponse : {},
        thirdResponse :{}
    };

    async componentDidMount() {

        Promise.all([
            axios.get('http://localhost:5000/mapview'),
            axios.get('http://localhost:5000/mapview1'),
            axios.get('http://localhost:5000/mapview2')
          ])
          // use arrow function to avoid loosing context
          // BTW you don't need to use axios.spread with ES2015 destructuring
          .then(([firstResponse, secondResponse, thirdResponse]) => {
                  this.setState({p1Location : firstResponse.data, p2Location : secondResponse.data, p3Location: thirdResponse.data});
              });
        }
           
    render() {
        const { p1Location, p2Location, p3Location } = this.state
        return (
         <div> 
          {p1Location}
          {p2Location}
          {p3Location}
         </div>
        );
    }


}

export default withRoot(Maps)