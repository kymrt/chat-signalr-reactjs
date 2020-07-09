import React, { Component } from 'react';
import  Chat  from './components/Chat';

import './App.css'

class App extends Component {
    static displayName = App.name;
    



    render() {
        return (
            <div>
                <header className="App-header">
                    <h1 className="App-title">Welcome to Anonymous Chat</h1>
                </header>
                <div className="bg-image"></div>
                <div id="chat-section" className="bg-text">
                    <Chat />
                </div>
            </div>
        );
    }
}

export default App;
