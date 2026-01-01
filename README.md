uri miller
206207821
golan

"scripts": {
"dev": "nodemon server.js",
"start": "node server.js",}

cipher: only "reverse"

endpoints:

post create register:{
route: http://localhost:8000/api/auth/register,

body: {
"userName": "yossi",
"password": "7173361"
}}

post decrypt:{
route: http://localhost:8000/api/messages/decrypt,

body: {
"messageId": "1",
"username": "UriMiller",
"password": "dhfh25"
}}

post encrypt:{
route: http://localhost:8000/api/messages/encrypt,

body: {

"username":"UriMiller",
"password":"dhfh25",
"message": "attack at dawn",
"cipherType": "reverse"
}}

get get MyUser:{
route: localhost:8000/api/users/me,

    body: {
    "userName": "UriMiller",
    "password": "dhfh25"

}}
