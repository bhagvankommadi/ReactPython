import config from 'config';
import { authHeader } from '../_helpers';
import axios from "axios";


export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    getProfileByUserId,
    update,
    updateProfile,
    saveProfile,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    console.log(JSON.stringify({ username, password }))
    return fetch(`${config.apiUrl}/users/authenticate/`, requestOptions)
        .then(handleResponse)
       //.then(user => {
         // return user;
        //});
       .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            console.log(" service :"+user.userinfo.id);

            return user.userinfo;
     });
}

function logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function getProfileByUserId(userid) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userid})
    };

    return  fetch(`${config.apiUrl}/profile/getProfileByUserid/`, requestOptions)
        .then(handleProfileResponse)
   .then(profile => {
        
     console.log("user service get profile :"+profile.id);
        return  profile;});
}

function register(user) {
    
    //check if user exists
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
          //         'X-CSRFToken': 'dfsdsd',
               //    'Accept': 'application/json',},
        //mode: 'no-cors',
        body: JSON.stringify(user)
    };
    
    console.log(JSON.stringify(user));
    
    //,{ mode: 'no-cors'}

  // return axios.post("http://localhost:8000/api/users/",JSON.stringify(user), requestOptions).then(handleResponse);
   // return fetch(`${config.apiUrl}/users/`,requestOptions).then(handleResponse);
    
    return fetch(`http://localhost:8000/api/users/`,requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

function updateProfile(url,id,fname,lname,country,userid) {
    
    console.log(" inside update profile "+ userid + "url ="+url);
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({url,id,fname,lname,country,userid})
    };

   // console.log(JSON.stringify({url,id,fname,lname,country,userid});
    return fetch(`${config.apiUrl}/profile/${id}/`, requestOptions).then(handleProfileResponse)
           .then(profile => {
               return profile;});
            //return JSON.stringify({id,fname,lname,country,userid});}
                 //);
            
}

function saveProfile(fname,lname,country,picture,userid) {
    
    //check if userid entry exists
    
     //const profile =  await 
    
    getProfileByUserId(userid).then(function(profile){
        
        
    
    
    console.log("profile is"+profile);
   // const {profile} = data;
    
    //const {id,useridt} = profile;
    console.log("id ="+profile.id + " userid ="+ userid);
    //alert("profile "+ profile);
    //const profile = data["profile"];
    //console.log(profile);
   // console.log("profile "+profile["id"]+ "userid "+ profile["userid"]);
    if(profile.userid == userid)
      {
           //profile.fname = fname;
           //profile.lname = lname;
            //profile.country = country;
            return updateProfile(profile.id,fname,lname,country,userid);
            
      }
     else
         {
     const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ fname,lname,country,userid }) 
     };
    console.log("profile :"+fname +" "+ lname+ " " + country +" "+ userid );
    return fetch(`http://localhost:8000/api/profile/`,requestOptions)
        .then(handleResponse)
        .then(profile => {
        
        console.log(" service :"+profile.id);
        return  profile;});
             
         }
        
        });
    
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleProfileResponse(response) {
    return response.text().then(text => {
        console.log("Text" +text);
        const data = text && JSON.parse(text);
        console.log("response id " +data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            console.log("error "+error);
            return Promise.reject(error);
        }

        console.log("returning profile"+data.id);
        return data;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log(text);
        const data = text && JSON.parse(text);
        console.log("response " +data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            console.log(error);
            return Promise.reject(error);
        }

        return data;
    });
}