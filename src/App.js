import React, { Component } from 'react';
import './App.css';
import Mandlebrot from './components/Mandlebrot';
import Generative from './components/Generative';
import Home from './components/Home';
import Banner from './components/Banner';
import MNIST from './components/MNIST';
import { BrowserRouter, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Banner />
          <Route exact path='/' component={Home} />
          <Route exact path='/mandlebrot' component={Mandlebrot} />
          <Route exact path='/generative' component={Generative} />
          <Route exact path='/MNIST' component={MNIST} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
