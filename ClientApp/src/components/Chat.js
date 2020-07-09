import React, { Component } from 'react';
import * as signalR from '@aspnet/signalr';
import '../site.css';
import Bubble from './Bubble';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessageKeyUp = this.handleMessageKeyUp.bind(this);

        this.state = {
            nick: '',
            message: '',
            messages: [{
                nickname: '',
                message: '',
                whom: '',
                time: ''
            }],
            hubConnection: null,
            whom: '',
            time: ''
        };
    }

    componentDidMount() {
        const nick = window.prompt('Nickname:', 'Kaya');
        const hubConnection = new signalR.HubConnectionBuilder().withUrl("/websocket").build();

        this.setState({
            hubConnection, nick
        }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connected'))
                    .catch(err => console.log('Error while establishing connection'));

                this.state.hubConnection.on('MessageMine', (nickname, message, time) => {
                    const newMessages = {};
                    newMessages.nickname = nickname +":";
                    newMessages.message = message;
                    newMessages.time = time;
                    newMessages.whom = 'mine messages'
                    const messages = this.state.messages.concat(newMessages);
                    this.setState({ messages });
                    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
                });
                this.state.hubConnection.on('MessageOther', (nickname, message, time) => {
                    const newMessages = {};
                    newMessages.nickname = nickname;
                    newMessages.message = message;
                    newMessages.time = time;
                    newMessages.whom = 'other messages'
                    const messages = this.state.messages.concat(newMessages);
                    this.setState({ messages });
                    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
                });
        });
    };

    sendMessage() {
        this.state.hubConnection
            .invoke('sendToAll', this.state.nick, this.state.message)
            .catch(err => console.error(err));

        this.setState({ message: '' });
    };

    handleMessageKeyUp(e) {
        if (e.keyCode === 13) {
            this.sendMessage();
        }
    }

    render() {
        return (
            <div>
                <div id="chat-messages">
                    {this.state.messages.map((message, index) => {
                        return <span style={{ display: 'block' }} key={index}>  <Bubble message={message} /> </span>
                    })}
                </div>
                <br />
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span id="chat-message-addon" className="input-group-text">Message</span>
                </div>
                <input
                    id="chat-message"
                    className="form-control"
                    type="text"
                    maxlength="100"
                    aria-describedby="chat-message-addon"
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                    onKeyUp={this.handleMessageKeyUp}
                />
                    <button className="btn btn-secondary" id="chat-send" onClick={this.sendMessage}>Send</button>
                </div>
            </div>
        );
    }
}

export default Chat;