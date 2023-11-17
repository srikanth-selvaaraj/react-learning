import React  from "react";
import { ReactDOM } from "react-dom/client";

// Class component
class Room extends React.Component {
    constructor(props) { // passing props
        super(props); // To inherit the parent constructor
        this.state = {lang: 'python'}; // class properties should be inside this stae as objects.
    }

    // set the props to the state
    static getDerivedStateFromProps(props, state) {
        return {collection: props.status};
    }

    // will run after the component mounted. - Not worked need to check
    componentDidMount()  {
        setTimeout(() => {
            this.setState({collection:'completed'});
        }, 1000)
    }

    // this will prevent the component updated if it is false
    shouldComponentUpdate() {
        return true;
      }
     
    // custom functions  
    changeLang = () => {
        if (this.state.lang == 'python') {
            this.setState({lang:'react'});
        } else {
            this.setState({lang:'python'});
        }
    }

    render() {
        return (
            <div>
                <h1>Class component. . Language is {this.state.lang}, {this.state.collection}</h1>
                <button type='button' onClick={this.changeLang}>Lang</button>
            </div>
        )
    }
}

// Function Component
function Php(props) { //We can call component into a component(function or call anything)
    return (
        <>
            <h1>Function Component color is {props.color}</h1>
            <Room status='pending' />
        </>
    )
}

export default Php;