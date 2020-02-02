import React, { Fragment } from 'react';
import Screen from "./component/Screen.jsx";
import Stage from "./component/Stage.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appStatus : 0
        };
        this.setAppStatus = this.setAppStatus.bind(this);
    }
    setAppStatus(appStatus) {
        this.setState({appStatus : appStatus});
    }
    render() {
        return (
            <Fragment>
                <Screen appStatus={this.props.appStatus}/>
                <Stage setAppStatus={this.setAppStatus} />
            </Fragment>
        );
    };
};
export default App;