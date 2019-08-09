const porta = 3003
var jwt = require('jsonwebtoken');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(express.static('./PUBLIC'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())





app.post('/login', (req, res, next) => {
  if(req.body.user === 'luiz' && req.body.pwd === '123'){
    //auth ok
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, "batata", {
      expiresIn: 300 // expires in 5min
    });
    res.status(200).send({ auth: true, token: token });
  }
  
  res.status(500).send('Login inválido!');
})



//authentication
app.post('/login', (req, res, next) => {
  if(req.body.user === 'luiz' && req.body.pwd === '123'){
    //auth ok
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, "batata", {
      expiresIn: 300 // expires in 5min
    });
    res.status(200).send({ auth: true, token: token });
  }
  
  res.status(500).send('Login inválido!');
})



app.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});


function verifyJWT(req, res, next){
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, "batata", function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    console.log(req.userId)
    //next();
  });
}

// Proxy request
app.get('/users', verifyJWT, (req, res, next) => {
  userServiceProxy(req, res, next);
  console.log("eu entrei")
})

app.get('/products', verifyJWT, (req, res, next) => {
  productsServiceProxy(req, res, next);
})

app.listen(porta,()=>{
    console.log(`Server Test is running on port ${porta}.`)
})