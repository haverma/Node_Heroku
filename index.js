var express = require('express');
var bodyParser= require('body-parser')
var MongoClient = require('mongodb').MongoClient
var db

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Adding the form paramters to the body property of request
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/login', function(request, response){
  response.render('pages/login');
}
);

app.post('/login', function(request, response){
  console.log(request.body);
}
);

app.get('/register', function(request, response){
  response.render('pages/register');
}
);

app.post('/register', function(request, response){
  db.collection('users').save(request.body, (err, result) => {
    if (err) return console.log(err)

    console.log('user saved')
    response.redirect('/')
  })
}
);

//Connecting to the MLab instance
MongoClient.connect('mongodb://test_user:abcd1234@ds117909.mlab.com:17909/node_tryout', (err, database) => {
  // ... start the server
  if (err) return console.log(err)
  db = database;
  app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
  });
})



