import React, { Component } from 'react';
import Todo from './components/todo';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="App">
                <Todo />
            </div>
        );
    }
}

export default App;