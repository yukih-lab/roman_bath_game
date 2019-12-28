import React from 'react';
import ReactDOM from 'react-dom';
import Stage from "./component/Stage.jsx";
const title = "roman bath game";
window.addEventListener("load", () => {
    ReactDOM.render(<Stage />, document.getElementById('root'));
}, false);
