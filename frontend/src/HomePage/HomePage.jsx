import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';

import { userActions } from '../_actions';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
//import Sidebar from './Sidebar';
//const items = [
  //{ name: 'home', label: 'Home' },
  //{ name: 'billing', label: 'Billing' },
  //{ name: 'settings', label: 'Settings' },
//]
import Nav from "../_components/Nav";
// PAGES
import Home from "../pages/Home/HomePage";
import VoiceAssistant from "../pages/VoiceAssistant/VoiceAssistantPage";
import Profile from "../pages/Profiles/ProfilesPage";
import login from "../LoginPage/LoginPage";

import "../index.css";
//<div className="container">

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

   

    render() {
        
        const App = () => (
  <div>
    <Nav />

      <Route exact={true} path="/home" component={Home} />
      <Route exact path="/VoiceAssistant" component={VoiceAssistant} />
      <Route exact path="/Profiles" component={Profile} /> 
  
     
  </div>
);
        
        // const { userinfo } = this.props;
        
        //alert("userid "+userinfo.firstName);
        return (
            <Fragment>
              <Router>
                <App />
    
  </Router>
                      
      <Link to="/login">Logout</Link>  
                </Fragment>
     //,
 //document.getElementById("root")
           
        );
    }
}

function mapState(state) {
    const { users,authentication } = state;
    const {user} = authentication;
    //const {userinfo} = user;
   // alert("users "+users);
   //alert("user state "+user.id);
    return { user };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

//export default connect(mapState, actionCreators)(HomePage);

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
export default HomePage;