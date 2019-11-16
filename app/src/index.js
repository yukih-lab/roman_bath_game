import React from 'react';
import ReactDOM from 'react-dom';
import Hand from './component/Hand.jsx'
const title = "roman bath game";
window.addEventListener("load", () => {
    ReactDOM.render(<Hand text={title}/>, document.getElementById('root'));
}, false);
