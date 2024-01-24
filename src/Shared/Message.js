import React from "react";
import { connect } from 'react-redux';
import { setMessage } from "../Store/appreducer";

class Message extends React.Component {
    componentDidMount() {
            this.props.updateMessage('Hi, new text here');
    }
    render() {
        return (
            <div className="App">
                <p>
                    Redux: { this.props.message }
                </p>
                <button onClick={()=>this.props.updateMessage('This is client message')}>Update Message </button>
            </div>
        );
    }
}
const mapStateTOProps = ({app}) =>({
    message: app.message,
})
const mapDispatchToProps =(dispatch)=>({
    updateMessage: (text) => dispatch(setMessage(text))
})
 export default connect(mapStateTOProps, mapDispatchToProps)(Message);