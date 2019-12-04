import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import {BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import UpdateForm from '../Data/UpdateForm'
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '../Data/List'
import ListData from '../Data/ListData'
import InsertData from '../Data/InsertData'



function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function Home() {
    return (
        <div>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <div className="nav-item">
                            <Link to={'/'} className="nav-link">{<HomeIcon />}
                            </Link>
                        </div>
                        <div className="nav-item">
                            <Link to={'/admin/empresas'} className="nav-link"><AccountCircle /></Link>
                        </div>

                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/admin/empresas' component={List} />
                    <Route exact path='/' component={ListData} />
                    <Route path='/admin/addempresas' component={InsertData} />                
                    <Route path="/admin/updateempresas/:id" component={withRouter(UpdateForm)}/>
                     
                </Switch>
            </Router>
        </div>
    );
}

export default Home