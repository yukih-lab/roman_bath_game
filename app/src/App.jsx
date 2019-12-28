import React from 'react';
import Screen from "./component/Screen.jsx";
import Stage from "./component/Stage.jsx";

const App = (props) => {
    return (
        <div className="contents">
            <Screen/>
            <Stage/>
        </div>
    );
};
export default App;