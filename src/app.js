import React, { Component } from 'react';
import Login from './Components/Auth/Login';
import 'semantic-ui-css/semantic.min.css'
import Navbar from './Components/Nav/Navbar'
import ApplicationViews from './Components/ApplicationViews'


class App extends Component {

    state = {
        authenticated: sessionStorage.getItem('user')
    }
//this function verifies if the user is signed in by checking session storage
    setAuthState = () => {
        if (sessionStorage.getItem("user")) {
            this.setState({ authenticated: true })
        } else {
            this.setState({ authenticated: false })
        }
    }

//this renders the dom based on whether a user is logged in or not and session storage has a value for "user"
    render() {
        if (this.state.authenticated) {
            return (
                <React.Fragment>
                    <Navbar user={this.state.authenticated} />
                    <ApplicationViews  isAuthenticated={this.state.authenticated}        />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Login setAuthState={this.setAuthState} />
                </React.Fragment>
            )
        }
    }
}
export default App