//////////////////////////////////////////
// Author: Brody Willard
// Date: 12/6/19
// Description: Script used to run web application which accepts
// GET and POST requests and manipulates database of workouts
////////////////////////////////////////////

var express = require('express');
var app = express();
var mysql = require('./dbcon.js');
//console.log('sql added');


var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });//adds handlebars to script
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');//adds body parser to script
//console.log('express and bodyParser added');
app.use(bodyParser.urlencoded({ extended: false }));//sets body parser to oarse URL encoded data with querystring library
app.use(bodyParser.json());//sets up script to parse JSON data

app.set('port', process.argv[2]);//sets port based on provided value 
//console.log('port set');



app.get('/', function (req, res, next) {
    var context = { type: null, data: null, last: null };//creates context 
    var param;//creates placeholder
    if (req.query.name != null && req.query.date != null) {//runs if name and date is not null 
        console.log('adding');
        mysql.pool.query("INSERT INTO workOut (name, reps, weight, date, unit) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.unit], function (err) {//adds query to database
            if (err) {
                console.log(err);
                return;
            }


            console.log('selecting for ajax');
            mysql.pool.query('SELECT * FROM workOut', function (err, rows, fields) {//selects all rows of database
                if (err) {
                    console.log(err);
                    return;
                }
                param = rows;//pulls rows of database
                //console.log(param);
                console.log(rows);
                var plast;
                var lid = Object.keys(param).length - 1;//pulls index of last row

                if (lid != -1) {//checks if there is a last row
                    plast = param[lid];//pulls last row
                    //console.log(plast);
                    lid = plast.id;//pulls id of last row
                    context.last = plast;//sets last to last row
                    console.log('last');
                    console.log(lid);
                    //console.log(context.last);
                }
                else {
                    console.log('no data to send');
                    window.open("http://flip3.engr.oregonstate.edu:49913", "_self");//reloads page(this only happens if the server return null for some reason, the datas there it just doest want to sent it)
                }

                context.data = param;//sets data to rows
                context.type = 'GET';//sets type to get

                res.send(context);//sents context 
                console.log('context sent');
                return;
            });


        });

 

    }
    else {
        console.log('selecting');
        mysql.pool.query('SELECT * FROM workOut', function (err, rows, fields) {//selects all rows from database
            if (err) {
                console.log(err);
                return;
            }
            param = rows;//pulls rows 

            var plast;
            var lid = Object.keys(param).length - 1;//pulls index of last row

            if (lid != -1) {//checks if there is a last row
                plast = param[lid];//pulls last row
                //console.log(plast);
                lid = plast.id;//pulls id of last row
                context.last = plast;//sets last to last row
            }
            console.log('rendering');
            context.data = param;//sets data to rows
            context.type = 'GET';//sets type to get
            res.render('home', context);//renders home

        });
    }

});


app.post('/', function (req, res, next) {
    var context = { type: null, data: null, last: null };//creates context 
    var param;//creates placeholder
    var body = req.body

    if (req.query.name != null && req.query.date != null) {//runs if name and date is not null 
        console.log('adding');
        mysql.pool.query("INSERT INTO workOut (name, reps, weight, date, unit) VALUES (?, ?, ?, ?, ?)", [body.name, body.reps, body.weight, body.date, body.unit], function (err) {//adds query to database
            if (err) {
                console.log(err);
                return;
            }


            console.log('selecting for ajax');
            mysql.pool.query('SELECT * FROM workOut', function (err, rows, fields) {//selects all rows of database
                if (err) {
                    console.log(err);
                    return;
                }
                param = rows;//pulls rows of database
                //console.log(param);
                console.log(rows);
                var plast;
                var lid = Object.keys(param).length - 1;//pulls index of last row

                if (lid != -1) {//checks if there is a last row
                    plast = param[lid];//pulls last row
                    //console.log(plast);
                    lid = plast.id;//pulls id of last row
                    context.last = plast;//sets last to last row
                    console.log('last');
                    console.log(lid);
                    //console.log(context.last);
                }
                else {
                    console.log('no data to send');
                    window.open("http://flip3.engr.oregonstate.edu:49913", "_self");//reloads page(this only happens if the server return null for some reason, the datas there it just doest want to sent it)
                }

                context.data = param;//sets data to rows
                context.type = 'GET';//sets type to get

                res.send(context);//sents context 
                console.log('context sent');
                return;
            });


        });



    }
    else {
        console.log('selecting');
        mysql.pool.query('SELECT * FROM workOut', function (err, rows, fields) {//selects all rows from database
            if (err) {
                console.log(err);
                return;
            }
            param = rows;//pulls rows 

            var plast;
            var lid = Object.keys(param).length - 1;//pulls index of last row

            if (lid != -1) {//checks if there is a last row
                plast = param[lid];//pulls last row
                //console.log(plast);
                lid = plast.id;//pulls id of last row
                context.last = plast;//sets last to last row
            }
            console.log('rendering');
            context.data = param;//sets data to rows
            context.type = 'GET';//sets type to get
            res.render('home', context);//renders home

        });
    }

});



app.get('/edit', function (req, res, next) {

    var context = { type: null, data: null };//creates context
    var param;//creates placeholder
    console.log(req.query.id);
    mysql.pool.query("SELECT * FROM workOut WHERE id=?", [req.query.id], function (err, rows, fields) {//selects row with id 
        if (err) {
            console.log(err);
            return;
        }

        param = rows;//pulls row 
        console.log(param);
        context.data = param;//sets data to row
        context.type = 'GET';//sets type to get

        res.render('edit', context);//renders edit page
    });

});



app.get('/delete', function (req, res, next) {
    
    var context = { type: null, data: null };//creates context 
    console.log('deleting: ' + req.query.id);
    mysql.pool.query("DELETE FROM workOut WHERE id=?", [req.query.id], function (err, result) {//deletes row with provided id
        if (err) {
            console.log(err);
            return;
        }
    });

    mysql.pool.query('SELECT * FROM workOut', function (err, rows, fields) {//selects rows of database
        if (err) {
            console.log(err);
            return;
        }
        context.data = rows;//pulls rows of database
        context.type = 'GET';//sets type to get
        res.render('home', context);//renders home 
    });

});



app.get('/resetTable', function (req, res, next) {
    console.log('reseting data');
    var context = { type: null, data: null };//creates context
    mysql.pool.query("DROP TABLE IF EXISTS workOut", function (err) {//deletes table
        var createString = "CREATE TABLE workOut(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps INT," +
            "weight INT," +
            "date DATE," +
            "unit VARCHAR(255) NOT NULL)";//creates new query string
        mysql.pool.query(createString, function (err) {//wipes database
            context.data = " ";//sets data to " " 
            context.type = 'GET';//sets type to get
            res.render('home', context);//renders home 
        })
    });

});


app.get('/updateRow', function (req, res, next) {

    var context = { type: null, data: null };//creates context
    console.log('trying to update');

    mysql.pool.query("UPDATE workOut SET name=?, reps=?, weight=?, date=?, unit=? WHERE id=? ", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.unit, req.query.id], function (err, result) {//updates row with corresponding id 
            if (err) {
                next(err);
                return;
            }
    });


    mysql.pool.query('SELECT * FROM workOut', function (err, rows, fields) {//selects rows of database
        if (err) {
            next(err);
            return;
        }
        context.data = rows;//pulls row
        context.type = 'GET';//sets type to get
        res.render('home', context);//renders home 
    });

});


app.use(function (req, res) {
    res.status(500);//500 status recieved
    res.render('500');//displays 500 page
});

app.use(function (req, res) {
    res.status(404);//404 status recieved
    res.render('404');//displays 404 page
});


app.listen(app.get('port'), function () {//listens to port 49910
    console.log('Express Started on http://localhost:' + app.get('port') + ';press Ctrl-C to terminate.');//output message to console that express is running
});


