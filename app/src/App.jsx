import React, { Fragment, useState } from 'react';
import Screen from "./component/Screen.jsx";
import Stage from "./component/Stage.jsx";

const App = (props) => {
    // TODO stateの更新を子コンポーネントに任せてる。stateのルールから逸脱しているのでは？
    const [appStatus, setAppStatusInner] = useState(0);

    const setAppStatus = (status) => {
        console.log(status);
        setAppStatusInner(status);
    };

    return (
        <Fragment>
            <Screen appStatus={appStatus}/>
            <Stage setAppStatus={setAppStatus}/>
        </Fragment>
    );
};
export default App;