import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import HeaderComponent from "./components/HeaderComponent";
import BannerComponent from "./components/BannerComponent";
import CategoryComponent from "./components/CategoryComponent";

class App extends React.Component {

    render() {
        return (
            <div>
                <Router>
                    <HeaderComponent/>
                    <div className="container">
                        <Switch>
                            <Route path = "/" exact component = {BannerComponent}></Route>
                            <Route path = "/banner" component = {BannerComponent}></Route>
                            <Route path = "/add-banner/:id" component = {BannerComponent}></Route>
                            <Route path = "/category" component={CategoryComponent}></Route>
                            <Route path = "/add-category/:id" component={CategoryComponent}></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
