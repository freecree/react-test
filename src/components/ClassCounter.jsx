import React from 'react'

export default class ClassCounter extends React.Component {
    constructor() {
        super();
        this.count = 0;
        this.state = {
            count: 5
        }
        this.increment = this.increment.bind(this);
    }
    increment() {
        this.setState({count: this.state.count + 1});
        console.log(this.state.count);
    }
    render() {
        return (
            <div>
                <h1>
                    {this.state.count}
                </h1>
                <button onClick={this.increment}>
                    increment
                </button>
            </div>
        )
    }
}