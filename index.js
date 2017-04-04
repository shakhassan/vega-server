var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vega')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var Vega = require('./models/requestlist.js');

// var dataFromMongo;
// Vega.find(function (err, vega) {
//                       if (err) return next(err);
//                       dataFromMongo = vega;
//                     });

app.get('/', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

app.get('/dashboard', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/dashboard.html');
});

app.get('/collection', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/collection.html');
});

app.get('/team', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/team.html');
});

app.get('/test', function(req, res){
  // res.send('<h1>Hello world</h1>');

  Vega.find(function (err, vega) {
    if (err) return next(err);
    res.json(vega);
  });
  // console.log(dataFromMongo);
  // res.json(dataFromMongo);
});

app.delete('/request/:requestId', function(req, res) {
  var reqId = req.params.requestId;
  console.log("requestId : " + reqId);

  Vega.findOne({id:reqId}, function (err, vega) {
    if (err) return next(err);
    res.json(vega);
  });

  Vega.findOneAndRemove({id:reqId}, function (err, vega) {
    if(err){
        throw err;
    }
    if(vega){
        console.log('Request found and removed');
    }else{
        console.log('No request found');
    }
  });

});

app.post('/request', function(req, res) {
    var id = req.body.id;
    var method = req.body.method;
    var title = req.body.title;
    var url = req.body.url;

    var authorization = req.body.authorization;
    var authorizationoption = req.body.authorization.type;
    var httpBasicAuthUserName = req.body.authorization.httpBasicAuthUserName;
    var httpBasicAuthPassword = req.body.authorization.httpBasicAuthPassword;

    var headers = req.body.headers;
    var requestHeadersKey1 = req.body.headers.key;
    var requestHeadersValue1 = req.body.headers.value;

    var body = req.body.body;
    var description = req.body.description;
    var dateCreated = req.body.dateCreated;
    var dateUpdated = req.body.dateUpdated;

    console.log(id);
    console.log(method);
    console.log('title : ' + title);
    console.log(url);

    console.log(authorization);
    console.log(authorizationoption);

    console.log(headers);
    console.log(body);
    console.log(description);
    console.log(dateCreated);
    console.log(dateUpdated);

    //mongodb upsert
    var toMongoDB =
      {
        id: id,
        method: method,
        title: title,
        url: url,
        authorization: {type: authorizationoption, key: httpBasicAuthUserName, value: httpBasicAuthPassword},
        headers: [{key : requestHeadersKey1, value: requestHeadersValue1}],
        body: body,
        description: description,
        dateCreated: dateCreated,
        dateUpdated: dateUpdated
      };

    // var query = {_id: id};
    // if (!query._id) {
    //     query._id = new mongoose.mongo.ObjectID();
    // }

    Vega.findOneAndUpdate({id:id}, toMongoDB, {upsert:true}, function(err) {
      if(err){
        console.log("Something wrong when updating data!");
      }
      console.log(toMongoDB);

      //socket io
      // io.on('connection', function(socket){
      //   var room = "projectX";
      //   socket.on(room, function(msg){
      //     console.log('message: ' + msg);
      //     io.emit(room, msg);
      //   });
      // });


    });

});

io.on('connection', function(socket){

  //print when user connected
  console.log('a user connected : ' + socket.id);
  // console.log('a user connected');

  //print when user disconnected
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });

  //TODO : should receive room name/id from client
  var room = "projectX";

  //specific room variable
  // io.sockets.in(room).emit('function', {foo:'bar'});

  //specific user
  // socket.broadcast.to( 'udWDzamPCIskR3pTAAAA' ).emit(room, 'hello this is a private msg');

  socket.on(room, function(msg){
    console.log('message: ' + msg);

    // send the message to everyone
    io.emit(room, msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
