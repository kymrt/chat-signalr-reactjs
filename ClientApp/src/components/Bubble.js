import React, { Component } from 'react';

class Bubble extends Component {

    render() {
        return (
            <div className={this.props.message.whom}><div className="message"> <strong> {this.props.message.nickname}</strong> {this.props.message.message} <sub> {this.props.message.time} </sub> </div></div>
        );
    }
}

export default Bubble;