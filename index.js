const porta = 3003
const express = require('express')
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

app.get('/',(req,res,next)=>{
	res.render("index/index")
})

app.post('/fristlogin',(req, res, next)=> {
    console.log("login")
    const username = req.body.username;
    const password =  criptografar(req.body.password)
    var soma = 0;
    firebase.database().ref('Alunos').once("value")
        .then(snapshot=>{
            if(snapshot.hasChild(username)===true){
            	res.send([true, criptografar(username)])
                soma++;
            	console.log("deve ter enviado")
            }
        })
    //query.execQuery(`INSERT INTO User(login, Password) VALUES('${User.username}','${User.password}')`);

    //aqui vamos validar se o usuario existe no qacademico, para depois ver se ele existe no banco firebase
    console.log("senha", password, username)
    puppeteer.login(username, descriptografar(password), next)
        .then(resp=>{
            if(resp[0] === true){
                 Promise.all([puppeteer.personalSchedule(),puppeteer.myDiary(),puppeteer.myReportCard(),puppeteer.calendarAcademy(),puppeteer.myMaterial(),puppeteer.myMatriz()])
                    .then(function(values) {
                        aluno = new classe.Aluno(values[0],values[1],values[2],values[3],values[4],values[5])
                        aluno.info = {pass: password, id_Matricula: username, foto_perfil: resp[1], nome_perfil: resp[2]}
                        return aluno
                    }).then(resp=>{
                        firebase.database().ref("Alunos").child(`${username}`).set(resp)
                        //console.log("deu certo")
                        soma < 1 ? res.send([true,criptografar(username)]) : soma = 0; //true
                    })
            }
            else{
                soma<1 ? res.send(false) : soma = 0; //false
            }
        })
})

app.get('/:id',(req,res,next)=>{
	const id_Matricula = descriptografar(req.params.id)
	console.log("begin")
    firebase.database().ref('Alunos').once("value")
        .then(snapshot=>{
            if(snapshot.hasChild(id_Matricula)===true){
                res.render('begin/begin')
            }
            else console.log("hoje não")
        })    
})

app.get('/horario/:id',(req,res,next)=>{
    const id_Matricula = descriptografar(req.params.id)
    firebase.database().ref(`Alunos/${id_Matricula}/horarioFinal`).once("value") //firebase.database().ref(`Alunos/${id}/horarioFinal`).once("value")
        .then(snap=>{
            res.json(snap.val())
        })
    firebase.database().ref(`Alunos/${id_Matricula}`).once("value")
        .then(snap=>{
            puppeteer.login(id_Matricula,descriptografar((snap.child('info').val()).pass), next)
                .then(resp=>{
                    if(resp === true){
                       puppeteer.personalSchedule(res) 
                        .then(resp=>{
                            firebase.database().ref(`Alunos/${id_Matricula}/horarioFinal`).update(resp)
                        })
                    }
                })
        })
})

app.get('/teste/:id', (req,res,next)=>{
    const id_Matricula = req.params.id
    firebase.database().ref(`Alunos/${id_Matricula}`).once("value")
        .then(snapshot=>{
            console.log("snap=",snapshot.child('horarioFinal').val(),".key=",snapshot.key)
        })

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
