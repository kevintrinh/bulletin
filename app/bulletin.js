var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var register = require('./routes/register');

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);


app.use('/register', register)

app.use(function(req, res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function(req, res) {
    res.type('text/plain');
    res.status(500);
    res.send('500 - ERROR');
});

app.listen(app.get('port'), function(){
    console.log('Bulletin app server is now running at port:' + app.get('port'));
});
