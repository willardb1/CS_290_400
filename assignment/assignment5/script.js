//////////////////////////////////////////
// Author: Brody Willard
// Date: 11/17/19
// Description: Script used to run web application which accepts
// GET and POST requests and outputs parameters to page
////////////////////////////////////////////

var express = require('express');//adds express to script
var app = express();//creates express application
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });//adds handlebars to script
var bodyParser = require('body-parser');//adds body parser to script

app.use(bodyParser.urlencoded({ extended: false }));//sets body parser to oarse URL encoded data with querystring library
app.use(bodyParser.json());//sets up script to parse JSON data
app.engine("handlebars",handlebars.engine);//registers handlebar extension
app.set('view engine', 'handlebars');//assigns setting name for handlebars
app.set('port', 49911);//sets port to 49911



app.get('/', function (req, res) {//runs if GET request used
    var parameters = [];//creates blank array for parameters
    for (var i in req.query) {//goes through query information
        parameters.push({ 'name': i, 'value': req.query[i] });//pulls name and value of query entry and pushes them to parameters array
    }
    var context = {};//creates empty list 
    if (parameters.length == 0) {
        res.render('home');
    }
    else {
        context.data = parameters;//passes parameters to list
        context.type = 'GET';//sets type to GET
        res.render('requests', context);//passes empty list and type to requests page
    }
});


app.post('/', function (req, res) { //runs if POST request used
    var parameters = [];//creates blank array for parameters
    for (var i in req.body) {//goes through body for parameters
        parameters.push({ 'name':i, 'value':req.body[i] });//pulls name and value of entries and pushes them to parameter array 
    }

    var context = {};//creates an empty list
    context.data = parameters;//passes parameters to list
    context.type = 'POST';//sets type to POST
    res.render('requests', context);//passes list and type to request page
});

app.use(function (req, res) {
    res.status(404);//404 status recieved
    res.render('404');//displays 404 page
});

app.listen(app.get('port'), function () {//listens to port 49911
    console.log('Express Started on http://localhost:' + app.get('port') + ';press Ctrl-C to terminate.');//output message to console that express is running
});


