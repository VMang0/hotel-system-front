import React from 'react';
import './BackFon.css';

const BackFon = (props) => {
    return props.show ? <div className="back" onClick={props.clicked}></div> : null;
};

export default BackFon;