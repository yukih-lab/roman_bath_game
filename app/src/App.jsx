import React, { Fragment } from 'react';
import Screen from "./component/Screen.jsx";
import Stage from "./component/Stage.jsx";

const App = (props) => {
    return (
        <Fragment>
            <Screen/>
            <Stage/>
        </Fragment>
    );
};
export default App;