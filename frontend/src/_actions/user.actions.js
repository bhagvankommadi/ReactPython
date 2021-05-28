import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

//import {navigation} from 'react-navigation';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getProfile,
    updateProfile,
    saveProfile,
    delete: _delete
};

function getProfile(userid) {
    
    console.log("getProfile");
    
    alert("getting Profile");
    
    //const profile =  await userService.getProfileByUserId(userid);
    
    //return profile;
    
   return dispatch => {
        dispatch(request());

        userService.getProfileByUserId(userid)
            .then(
                profile => { console.log("user service");
                    console.log("profile id"+profile.id);
                             dispatch(success(profile)); 
                           },
                error => dispatch(failure(error.toString()))
            );
    };
    
     function request() { return { type: userConstants.LOGIN_REQUEST } }
   // type: userConstants.LOGIN_SUCCESS,
    function success(profile) {
        console.log("success"+ profile.id);
        return {  type: userConstants.LOGIN_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

    
}

function updateProfile(url,id,fname,lname,country,userid) {
    
    console.log("updating Profile");
    alert("updating profile");
    
    return dispatch => {
        dispatch(request(fname));
        
        //getProfile and save new or updateProfile
        
        alert("dispatch update profile");
        
        userid ="http://localhost:8000/api/users/"+userid+"/";
    
    userService.updateProfile(url,id,fname,lname,country,userid)
         .then(
        
         // alert("then dispatch");
        profile => { 
        
                    alert(" going home page");
                    console.log("going home page");
                    console.log(profile);
                    dispatch(success(profile));
              
                    alert("going to home");
                    history.push('/home');
              
                     //navigation.navigate
                     //navigation.navigate('/RelatedFeeds');
                    //history.push('/RelatedFeeds');
                },
                error => {
                    console.log("back to login");
                    dispatch(failure(error.toString()));
                   //navigation.navigate
                   // history.push('/login');
                    dispatch(alertActions.error(error.toString()));
                }
    
        );
       
    };
     function request(profile) { return { type: userConstants.LOGIN_REQUEST, profile } }
    function success(profile) { return { type: userConstants.LOGIN_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function saveProfile(fname,lname,country,picture,userid) {
    
    console.log("saving Profile");
    alert("saving profile");
    
    return dispatch => {
        dispatch(request({ fname }));
        
        //getProfile and save new or updateProfile
    
    userService.saveProfile(fname,lname,country,picture,userid)
         .then(
          profile => { 
                    console.log("going home page");
                    console.log(profile);
                    dispatch(success(profile));
                     //navigation.navigate
                    //history.push('/');
                },
                error => {
                    console.log(" error, back to login");
                    dispatch(failure(error.toString()));
                     //navigation.navigate
                    //history.push('/login');
                    dispatch(alertActions.error(error.toString()));
                }
     
        );
       
    };
     function request(profile) { return { type: userConstants.LOGIN_REQUEST, profile } }
    function success(profile) { return { type: userConstants.LOGIN_SUCCESS, profile } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    console.log("going home");
                    console.log(user);
                    dispatch(success(user));
                    console.log("navigating to home");
                    history.push('/home');
                    console.log("after navigation");
                },
                error => {
                    console.log("back to login");
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}