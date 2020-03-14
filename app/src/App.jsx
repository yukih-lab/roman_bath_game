import React, { Fragment, useState } from 'react';
import Screen from "./component/Screen.jsx";
import Stage from "./component/Stage.jsx";

const App = (props) => {
    const [appStatus, setAppStatus] = useState(0);
    return (
        <Fragment>
            <Screen appStatus={appStatus}/>
            <Stage setAppStatus={setAppStatus}/>
        </Fragment>
    );
};
export default App;