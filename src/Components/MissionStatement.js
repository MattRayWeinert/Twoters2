import React, { Component } from 'react';
import logo from '../Assets/twooty3.png';

class MissionStatement extends Component {
    render () {
        
        const statementDiv = {
            maxWidth: "350px",
            position: "relative",
            left: "20%"
        }

        const logoStyle = {
            width: "40%",
            float: "left",
            padding: "15px"
        };

        const statementParagraph = {
            textAlign: "center"
        };

        return (
            <div style={ statementDiv }>
                <h2> Teach, learn, improve, together.</h2>
                <img src={ logo } style={ logoStyle } alt="twooty logo" ></img>
                <p style={ statementParagraph }>
                    Our goal is to share a platform for people to learn and teach. We believe that communication
                    and learning from eachother is most beneficial than learning by yourself.
                    This website provides a median for tutors and students.
                </p>
            </div>
        )
    }
}

export default MissionStatement;