import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import ProductDetails from './components/ProductDetails/ProductDetails';

import { AppContext } from './contexts/AppContext';

const App = () => {

    const [searchItem, setSearchItem] = useState('');
    const [searchToggle, setSearchToggle] = useState(false);
    const [productToggle, setProductToggle] = useState(false);

    return (
        <Router>
            <AppContext.Provider value={{ searchItem, setSearchItem, searchToggle, setSearchToggle, productToggle, setProductToggle }}>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/home" />} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/search" exact component={Search} />
                    <Route path="/product/:asin" component={ProductDetails} />
                </Switch>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
