

var user = null;
var lastUser =  localStorage.getItem('user');
if(lastUser){
    user = JSON.parse(lastUser)
}

function updateUser(username){
    user = {username};
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);

    // var a = {
    //     abc : 123,
    //     key2 : 'Hello'
    // }
    // JSON.stringify(a) => '{ "abc" : 123, "key2": "Hello" }'

}

function logout(){
    user = null
    localStorage.setItem('user', null);
}

function getUser(){
    return user;
}


export default {
    getUser,
    updateUser,
    logout
}