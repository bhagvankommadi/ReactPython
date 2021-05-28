import React,{ Fragment, Component} from "react";

//import * as React from "react";
import { userActions } from '../../_actions';

import { connect } from 'react-redux';

import config from 'config';

import { Redirect } from 'react-router-dom';

//import { StackNavigator } from 'react-navigation';
//import { useNavigation } from '@react-navigation/native';

//import Redux from "redux-thunk";

//import { createStore, applyMiddleware } from 'redux';

import axios from "axios";

class ProfilesPage extends Component {
    
   
    componentDidMount() {
    alert("mounting");    
    this.refreshList();
        
        
         const {profile} = this.state;
        
        //alert("refresh component"+profile.id);
        
        //alert("refresh"+profile.fname);
        
       // this.setState({fname:profile.fname,lname:profile.lname,country:profile.country});
        
   /* const {profile} = this.state;
        
        alert("component profile"+profile);
        
        if(profile != null)
            {
                alert(" mount profile"+profile);
        this.setState({ fname:profile.fname,lname:profile.lname,country:profile.country });
                
        
        alert("inside component",profile.id);
            }*/
  }
   /* componentDidMount() {
        alert("mounting");
        
         const { user,profile} = this.props;
        
        alert("Mount"+ user.id);
        
        this.props.getProfileByUserId(user.id);
    }
    */
    
    refreshList = () => {
        
        alert("refreshing the profile");
        
        const { user} = this.props;
        
       // this.props.getProfile(user.id);
        
        const userid = user.id;
        
        alert("refreshing"+JSON.stringify({userid}));
        
        const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };
        
        axios
      .post(config.apiUrl+"/profile/getProfileByUserid/",{ userid:userid})
      .then(res => this.setState({ profile: res.data,fname:res.data.fname,lname:res.data.lname,country:res.data.country }))
      .catch(err => console.log(err));
        
        
       
     
        /*
         */

   // return  fetch(`${config.apiUrl}/profile/getProfileByUserid/`, requestOptions)
        
    };
    constructor(props) {
        super(props);

        console.log("properties"+props);
        // reset login status
        //this.props.logout();
        
        
        
       //const { user,profile} = this.props;
       
        
        
        
        //alert("constructor"+profile);
            /*.
        then(
        
            profile=>{ 
                dispatch(
                {
                
                type: "GET_PROFILE",
                profile
                });
            
            });*/
        
       // );
        
        
        //alert(" constructor userid "+user.id);
        //this.props.getProfile(user.id);
        
        this.state = {
            
            profile: '',
            fname: '',
            lname: '',
            country: '',
            picture: '',
            submitted: false,
             redirect: false
        };
        
     

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

   setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
        
        alert("redirecting");
        
        //this.props.history.push('/RelatedFeeds');
       // this.props.navigation.navigate('/RelatedFeeds');
      //return <Redirect to='/RelatedFeeds' />
    }
  }

    handleSubmit(e) {
        e.preventDefault();
        
        //alert("submitting"+this.state);

        this.setState({ submitted: true });
        const { user} = this.props;
        const {profile, fname,lname,country,picture } = this.state;
        
        console.log("state "+this.state);
        
        //const profile  = this.props.getProfile(user.id);
        
        //console.log(" after get profile" +profile);
        
       // console.log(" after get profile type"+type);
        
         //alert(" constructor profileid "+profile.id);

        if (fname && lname) {
            
            alert("fname"+fname+ " "+lname);
            
            if(profile.userid == user.id)
                {
                    
                    alert("updating profile");
                    this.props.updateProfile(profile.url,profile.id,fname,lname,country,profile.userid);
                    
                    //  const navigation = useNavigation();
                    
                    //const { navigate} = this.props.navigation;
                    //navigation.navigate("/");
                    
                    //this.props.history.push(`/target`)
                     //this.props.navigation.goBack('/');
                   // this.setRedirect();
                    //this.renderRedirect();
                   /*if (this.state.redirect) {
                    <Redirect to="/" />
                   }*/
                    
                }
            else
                {
                    alert("saving profile");
                
                  this.props.saveProfile(fname,lname,country,picture,user.id);
                   // setRedirect();
                    //renderRedirect();
                    
                    /*
                      if (this.state.redirect) {
                    <Redirect to="/" />
                   }*/
                }
            
           // this.props.login(fname,lname);
            //this.props.login(username, password);
        }
    }

    render() {
        
         //  this.refreshList();
        const { user } = this.props;
        
       // alert("render"+ profile);
        
      // alert("userid "+user.id);
        
       

     const{
            profile,
            fname,
           lname,
            country,
           picture
        } = this.state;
        
       //  alert("profile" +profile.id);
        
    //     alert("profile fname"+profile.fname);
      //  alert("fname"+fname);
        
        //this.setState({fname:profile.fname,lname:profile.lname,country:profile.country});
        
       // fname = profile.fname;
        //lname =profile.lname;
        //country = profile.country;
        
        return (
            <Fragment>
   
    
    <div className="col-md-6 col-md-offset-3">
    <form name = "form" onSubmit={this.handleSubmit}>
                                                    
                                                       <fieldset>
     <div className="form-group">
           <label htmlFor="fname">First Name </label>
            <input type="text" id="fname" name="fname" placeholder="Your first name.." value={fname} onChange={this.handleChange}/>
                                                                                                                                                     
    </div>
    <div className="form-group">
 
        <label htmlFor="lname">Last Name</label>
                          
        
                                                                                                         
          <input type="text" id="lname" name="lname" placeholder="Your last name.." value={lname} onChange={this.handleChange}/>
    
      </div>                                                                                                 
        <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" name="country" value={country} onChange={this.handleChange}>
          <option value="Australia">Australia</option>
          <option value="Canada">Canada</option>
          <option value="Usa">USA</option>
          <option value="India">India</option>    
        </select>
            </div>
        <div className="form-group">
        <label htmlFor="subject">Picture</label>
        <input type = "file"  
                  placeholder = "Picture" name = "picture" value={picture} onChange={this.handleChange} />
        </div>
    <div className="form-group">
    
    
    
    <button className="btn btn-primary">UpLoad</button>
            
  
                                      </div>
                                     
                                      </fieldset>
  </form>
    </div>
            
            </Fragment>
 );
    }
}

function mapState(state) {
    const { users,authentication } = state;
   // alert("id is"+authentication.user.id);
    const {user} = authentication;
    //const {userinfo} = user;
    //return {loggingIn };
    return {user};
}

//mapStateToProps
/*
function mapStateToProps(state) {
  const { todos } = state
  return { todoList: todos.allIds }
}
*/

const actionCreators = {
    saveProfile: userActions.saveProfile,
    getProfile: userActions.getProfile,
    login: userActions.login,
    getProfile: userActions.getProfile,
    updateProfile:userActions.updateProfile
    //logout: userActions.logout
};

export default connect(mapState, actionCreators)(ProfilesPage);
//const connectedLoginPage = connect(mapState, actionCreators)(ProfilesPage);
//export { connectedLoginPage as ProfilesPage };
//export default ProfilesPage;

