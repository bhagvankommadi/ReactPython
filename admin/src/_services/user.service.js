import config from 'config';
import { authHeader } from '../_helpers';
import axios from "axios";


export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
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
       // .then(user => {
        //  return user;
        //});
       .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            console.log("service :"+user.userinfo.id);

            return user.userinfo;
     });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
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

function register(user) {
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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
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