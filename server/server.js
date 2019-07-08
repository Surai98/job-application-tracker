const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

var server = express();

var port = process.env.PORT || 3000;

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: false}));

// Database models
var playlistModel = require("./schema.js");

// REST endpoints
server.get("/playlist", function ( req, res ) {
    playlistModel.find().then( function ( playlist ) {
        res.json(playlist);
    }).catch( function ( error ) {
        res.status( 400 ).json( { msg: error.message });
    });
});

// Start the server and connect to the database
// change the "<password> to your database password" and the "test" to the name of the table you want
mongoose.connect("mongodb+srv://myusername:myuserpass@mydatabase-ekvhd.mongodb.net/Server-Practice?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then( function( ) {
    server.listen(port, function( ) {
        console.log( `Listening on port ${ port }` );
    });
});