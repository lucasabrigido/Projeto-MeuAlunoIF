const porta = 3003
const express = require('express')
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express()
const firebase = require('firebase');
const handlebars = require("express-handlebars")

const firebaseConfig = {
  apiKey: "AIzaSyBJ57zhMNDvT_GCEHZbMiioyDwtK_bTRT8",
  authDomain: "myalunoif.firebaseapp.com",
  databaseURL: "https://myalunoif.firebaseio.com",
  projectId: "myalunoif",
  storageBucket: "",
  messagingSenderId: "609524050805",
  appId: "1:609524050805:web:4e7d499ce7d67f17"
};
firebase.initializeApp(firebaseConfig)

app.engine('handlebars',handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('./PUBLIC'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const puppeteer = require('./src/puppeter.js')
const classe = require('./src/classe.js')

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    codificacao : "utf8",
    segredo : "chaves",
    tipo : "hex"
};


const crypto = require("crypto");
const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);

function criptografar(senha) {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    cipher.update(senha);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

function descriptografar(senha) {
    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);
    return decipher.final(DADOS_CRIPTOGRAFAR.codificacao);
};

const semestre = "semestre_2019_1"

function verifyJWT(req, res, next){
    const id_Matricula = req.params.id
    console.log("akiii o", id_Matricula)
    firebase.database().ref(`Alunos/${id_Matricula}`).once("value")
        .then(snapshot=>{
            var token = snapshot.child("auth").val()
            console.log(token)
            if (!token) return res.render("end/end")
            jwt.verify(token, "batata", function(err, decoded) {
            if (err) return res.render("end/end")
             // se tudo estiver ok, salva no request para uso posterior
                //req.userId = decoded.id;
                req.userId = id_Matricula
                next();
            });
        })
}

app.get('favicon.ico',(req,res,next)=>{
    console.log("favi")
    res.send()
})

app.get('/',(req,res,next)=>{
	res.render("index/index")
})

app.post('/fristlogin',(req, res, next)=> {
    console.log("login")
    const username = req.body.username;
    const password =  criptografar(req.body.password)
    var soma = 0;
    var token = "null"
    firebase.database().ref('Alunos').once("value")
        .then(snapshot=>{
            if(snapshot.hasChild(criptografar(username))===true){
                firebase.database().ref(`Alunos/${criptografar(username)}/${semestre}/info/pass`).once("value")
                    .then(snap=>{
                        if(snap.val() == password){
                            console.log("if")
                            soma++;
                            const id = username; //esse id viria do banco de dados
                            token = jwt.sign({ id }, "batata", {
                                expiresIn: 300 // expires in 5min
                            });
                            //res.status(200).send({ auth: true, token: token });
                            console.log("entrou no if")
                            res.send([true, criptografar(username)])
                            firebase.database().ref(`Alunos/${criptografar(username)}/auth`).set(token)
                        } else {
                            console.log("else")
                            soma++;
                            res.send([false,false])
                        }
                    })
            	//res.send([true, criptografar(username)])
            }
        })
    puppeteer.login(username, descriptografar(password), next)
        .then(resp=>{
            if(resp[0] === true){
                 Promise.all([puppeteer.personalSchedule(),puppeteer.myDiary(),puppeteer.myReportCard(),puppeteer.calendarAcademy(),puppeteer.myMaterial(),puppeteer.myMatriz()])
                    .then(function(values) {
                        aluno = new classe.Aluno(values[0],values[1],values[2],values[3],values[4],values[5])
                        aluno.info = {pass: password, id_Matricula: username, foto_perfil: resp[1], nome_perfil: resp[2]}
                        return aluno
                    }).then(resp=>{
                        const respFinal = {}
                        respFinal[`${semestre}`] = resp
                        respFinal.auth = soma == 1 ? token : "null" 
                        firebase.database().ref("Alunos").child(`${criptografar(username)}`).set(respFinal)
                        //console.log("deu certo")
                        if(soma<1){
                            //puppeteer.salvarFoto(username, password, criptografar(username))
                            soma = 0
                            const id = username; //esse id viria do banco de dados
                            token = jwt.sign({ id }, "batata", {
                                expiresIn: 300 // expires in 5min
                            });
                            //res.status(200).send({ auth: true, token: token });
                            firebase.database().ref(`Alunos/${criptografar(username)}/auth`).set(token)
                            res.send([true, criptografar(username)])
                        }
                    })
            }
            else{
                soma<1 ? res.send(false) : soma = 0; //false
            }
        })
})

app.get('/aluno/:id',verifyJWT,(req,res,next)=>{
	const id_Matricula = req.userId
	console.log("begin")
    firebase.database().ref('Alunos').once("value")
        .then(snapshot=>{
            if(snapshot.hasChild(id_Matricula)===true){
                res.render('begin/begin')
            }
            else console.log("hoje não")
        })    
})

app.get('/horario/:id', verifyJWT, (req,res,next)=>{
    const id_Matricula = req.userId
    firebase.database().ref(`Alunos/${id_Matricula}/${semestre}/horarioFinal`).once("value") 
        .then(snap=>{
            res.json(snap.val())
        })
})

app.get('/diario/:id', verifyJWT, (req, res, next) => {
    const id_Matricula = req.userId
    firebase.database().ref(`Alunos/${id_Matricula}/${semestre}/Diario`).once("value") 
        .then(snap => {
            res.json(snap.val())
        })
})

app.get('/material/:id', verifyJWT, (req, res, next) => {
    const id_Matricula = req.userId
    firebase.database().ref(`Alunos/${id_Matricula}/${semestre}/material`).once("value") 
        .then(snap => {
            res.json(snap.val())
        })
})

app.get('/Calen_Academic/semestre/meses/:id', verifyJWT, (req, res, next) => {
    const id_Matricula = req.userId
    firebase.database().ref(`Alunos/${id_Matricula}/${semestre}/Calen_Academic/semestre/meses`).once("value") 
        .then(snap => {
            res.json(snap.val())
        })
})

app.get('/matrizCurricular/:id', verifyJWT, (req, res, next) => {
    const id_Matricula = req.userId
    firebase.database().ref(`Alunos/${id_Matricula}/${semestre}/matrizCurricular`).once("value") 
        .then(snap => {
            res.json(snap.val())
        })
})

app.get('/myReportCard/:id', verifyJWT, (req, res, next) => {
    const id_Matricula = req.userId
    firebase.database().ref(`Alunos/${id_Matricula}/${semestre}/myReportCard`).once("value") 
        .then(snap => {
            res.json(snap.val())
        })
})

app.get('/teste/:id', (req,res,next)=>{
    const id_Matricula = req.params.id
    firebase.database().ref(`Alunos/${id_Matricula}`).once("value")
        .then(snapshot=>{
            console.log("snap=",snapshot.child('horarioFinal').val(),".key=",snapshot.key)
        })

})

app.get('/logout/:id', function(req, res) {
    firebase.database().ref(`Alunos/${req.params.id}/auth`).set("null")
  //res.status(200).send({ auth: false, token: null });

});

app.get('/:id',(req,res,next)=>{
    res.render("end/end")
})

app.get('/:id/:id',(req,res,next)=>{
    res.render("end/end")
})

app.get('/:id/:id/:id',(req,res,next)=>{
    res.render("end/end")
})

app.get('/:id/:id/:id/:id',(req,res,next)=>{
    res.render("end/end")
})







app.listen(porta,()=>{
    console.log(`Server is running on port ${porta}.`)
})
//firebase.database().ref().child('users').push(data)
//firebase.database().ref("users").on('value', function(snapshot){
 //   snapshot.forEach(e=>{
//      e.val().atrr
  //  })
//})

/**
talvez pecorrer um json com [ID : [id,senha]]



    if (countNumber >= 0) {
        // update(): Recebe um objeto (e apenas um objeto) e atualiza APENAS as propriedades desse objeto
        ref.child(id).update({ curtidas: countNumber }).then(() => {
            count.innerText = countNumber
        })
    }

**/
