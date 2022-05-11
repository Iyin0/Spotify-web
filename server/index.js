// // import statement
// const express = require('express');
// const dotenv = require('dotenv');
// // const requests = require('request');
// // import express from 'express';
// // import dotenv from 'dotenv';

// const port = 5000

// global.access_token = ''

// dotenv.config()

// let spotify_client_id = process.env.SPOTIFY_CLIENT_ID
// let spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

// let app = express();

// let generateRandomString = function (length) {
//     let text = '';
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (let i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// };

// app.get('/auth/login', (req, res) => {
//     let scope = "streaming user-read-email user-read-private"
    
//     let state = generateRandomString(16);

//     let auth_query_parameters = new URLSearchParams({
//         response_type: "code",
//         client_id: spotify_client_id,
//         scope: scope,
//         redirect_uri: "http://localhost:3000/auth/callback",
//         state: state
//     })

//     res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
// });

// app.get('/auth/callback', (req, res) => {
    
//     var code = req.query.code;

//     var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         form: {
//             code: code,
//             redirect_uri: 'http://localhost:3000/auth/callback',
//             grant_type: 'authorization_code'
//         },
//         headers: {
//             'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         json: true
//     };

//     request.post(authOptions, (error, response, body) => {
//         if (!error && response.statusCode === 200) {
//             access_token = body.access_token;
//             res.redirect('/')
//             }
//     });
// });

// app.get('/auth/token', (req, res) => {
//     res.json({access_token: access_token})
// })

// app.listen(port, () => {
//     console.log(`Listening at http://localhost:${port}`)
// })