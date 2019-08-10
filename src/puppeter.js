const puppeteer = require('puppeteer')
const classe = require('./classe.js')

//const a = new classe.HorarioIndividual();

const actions = {
}


async function salvarFoto (username,password, user){
	let browserWSEndpoint = actions.browserWSEndpoint;
	const browser2 = await puppeteer.connect({ browserWSEndpoint })
	const page = await browser2.newPage();
	  await page.goto('https://qacademico.ifce.edu.br/qacademico/index.asp?t=1001', { waitUntil: "domcontentloaded" });
	  await page.waitForNavigation();
	    await page.click('#btnOK');
	    await page.screenshot({path: `${user}.png`,
	        clip: {x: 45, y:155, width: 104, height: 140}
	    });

}

async function login(username, password, next) {
	const browser = await puppeteer.launch({
		headless: true
	});

	const page = await browser.newPage();
	await page.goto('https://qacademico.ifce.edu.br/qacademico/index.asp?t=1001', { waitUntil: "domcontentloaded" });
	const USERNAME_SELECTOR = '#txtLogin';
	const PASSWORD_SELECTOR = '#txtSenha';
	const BUTTON_SELECTOR = '#btnOk';
	await page.click(USERNAME_SELECTOR);
	await page.keyboard.type(username);
	await page.click(PASSWORD_SELECTOR);
	await page.keyboard.type(password);
	await page.click(BUTTON_SELECTOR);
	await page.waitForNavigation();
	//  await browser.close();
	//verificar se o usuario existe
	await page.waitFor(2 * 1000);
	
	try {
		const checkAcademico = await page.evaluate(() => {
			var foto_perfil, nome, nome_perfil;
			const query = document.querySelector('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div')
			if (query.children[0].innerText == 'Acesso Negado') {
				checkAcademico = false
				
			} else {
				checkAcademico = true
				foto_perfil = document.querySelector("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(1) > img").src
				nome = document.querySelector("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td.titulo").innerHTML.split(",")
				nome_perfil = nome[1].split("!")[0]
			}
			return [checkAcademico,foto_perfil,nome_perfil]
			salvarFoto(foto_perfil)
		})
		if (checkAcademico[0] == true) {
			actions.browserWSEndpoint = browser.wsEndpoint();
			browser.disconnect();
			console.log("Logado")
			return checkAcademico
		} else {
			console.log("Usuario não existe dentro do sistema qAcademico")
			await browser.close();
			return [false,false,false]
		}
	}catch(err){
		console.log(err)
	}
	

}
//login();


async function personalSchedule(res) {
	let browserWSEndpoint = actions.browserWSEndpoint;
	const browser2 = await puppeteer.connect({ browserWSEndpoint })
	const page = await browser2.newPage();
	await page.goto('https://qacademico.ifce.edu.br/qacademico/index.asp?t=2010', { waitUntil: "domcontentloaded" });
	await page.waitFor(2 * 1000);
	const data = await page.evaluate(() => {
		const conteudo = document.querySelectorAll("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(5) > tbody")["0"]
		let diaSemanaTamanho = conteudo.children[0].children.length
		let horarioTamanho = conteudo.children.length

		let vetorHorario = []
		let vetorConteudo = []
		vetorObj = []
		var indice = 0;
		var soma = 1;
		var somaVetorObj = 0
		for(let i = 1; i<diaSemanaTamanho;i++){
			const obj1 = new Object()
			obj1.diaSemana = conteudo.children[0].children[i].innerText
			for(let j = 1; j< horarioTamanho;j++ ){
				vetorHorario[indice] = conteudo.children[j].children[0].innerText
				if(conteudo.children[j].children[soma].children[0].children[0].children[0]==null) vetorConteudo[indice++] = "Vazio"
				else vetorConteudo[indice++] = conteudo.children[j].children[soma].children[0].children[0].children[0].innerText
			}
			obj1.horario = vetorHorario
			obj1.conteudoHorario = vetorConteudo
			vetorHorario = []
			vetorConteudo = []
			vetorObj[somaVetorObj++] = obj1
			console.log(vetorObj)
			indice = 0;
			soma++;
		}
		return vetorObj
	})
	//const horarioFinal = new classe.HorarioIndividual(data);
	console.log("HorarioIndividual ok")
	//res.json(data)
	return data
}

async function myDiary(res) {

	let browserWSEndpoint = actions.browserWSEndpoint;
	const browser2 = await puppeteer.connect({ browserWSEndpoint })
	const page = await browser2.newPage();
	await page.goto('https://qacademico.ifce.edu.br/qacademico/index.asp?t=2071', { waitUntil: "domcontentloaded" });
	await page.waitFor(2 * 1000);

	const data = await page.evaluate(() => {
		const conteudo = document.querySelectorAll("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr > td:nth-child(2) > p > table:nth-child(3) > tbody")["0"]
		var vetorN1 = []
		var vetorN2 = []
		var vetorAF= []
		var indice = 0;
		var meioConteudo = "";
		var contVetor = 1;
		var vetorMateria = []
		var contVetorMateria = 0;


		for(var i = 1; i<conteudo.children.length; i = i+4){
				const obj1 = new Object()
				obj1.materia = conteudo.children[i].children[0].innerText.split("-")[2]
				obj1.professor = conteudo.children[i].children[0].innerText.split("-")[3]
				obj1.qtdAula = conteudo.children[i].children[1].children[0].children[0].children[1].children[1].innerText
				obj1.aulasAdministradas = conteudo.children[i].children[1].children[0].children[0].children[2].children[1].innerText.split("[")[0]
				obj1.faltas = conteudo.children[i].children[1].children[0].children[0].children[4].children[1].innerText
				
				for(var j=i+1; j<=i+3; j++){
					switch (j) {
						case i+1:
							for(var h = 1; h<conteudo.children[j].children[0].children[1].children[0].children.length;h++){
								vetorN1[h-1] = conteudo.children[j].children[0].children[1].children[0].children[h].children[4].innerText.split(":")[1]
							}
							obj1.vetorN1 = vetorN1
							vetorN1 = []
							break;
						case i+2:
							for(var h = 1; h<conteudo.children[j].children[0].children[1].children[0].children.length;h++){
								vetorN2[h-1] = conteudo.children[j].children[0].children[1].children[0].children[h].children[4].innerText.split(":")[1]
							}
							obj1.vetorN2 = vetorN2
							vetorN2 = []
							break;  
						case i+3:
							for(var h = 1; h<conteudo.children[j].children[0].children[1].children[0].children.length;h++){
								vetorAF[h-1] = conteudo.children[j].children[0].children[1].children[0].children.children[4].innerText.split(":")[1]
							}
							obj1.vetorAF = vetorAF
							vetorAF = []
							break;
						default:
					}
				}
				vetorMateria[contVetorMateria++] = obj1
		}
		return vetorMateria		
	})



		//let d1 = new classe.Diario(nome_cadeira, nome_prof, cod_cadeira, carga_horaria, aulas_ministradas, percent_aulas_presen_ministradas, faltas, N1, N2, Media);
		//vetorDiario.push(d1);
	console.log("vetorDiario ok")
	return data
}

async function myReportCard(res) {

	let browserWSEndpoint = actions.browserWSEndpoint;
	const browser2 = await puppeteer.connect({ browserWSEndpoint })
	const page = await browser2.newPage();
	await page.goto('https://qacademico.ifce.edu.br/qacademico/index.asp?t=2032', { waitUntil: "domcontentloaded" });
	await page.waitFor(2 * 1000);

	const data = await page.evaluate(() => {
		const query = document.querySelector('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(7) > tbody')
		const query2 = document.querySelector('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(8) > tbody')
		let boletim = {
			cadeiras: new Array()
		}


		let dado1 = query.children
		for (let x = 0; x <= dado1.length - 1; x++) {
			let dadosCadeira = {
				nome: '',
				TFaltas: '',
				MFinal: '',
				MF: '',
				N1: '',
				F1: '',
				N2: '',
				F2: '',
				MP: '',
				PF: '',
				F: '',
				MF: '',

			}

			if (query.children[x].className == 'conteudoTexto') {
				let dados2 = query.children[x].children

				let NomeCadeira = dados2[0].innerText
				let TFaltas = dados2[3].innerText
				let MFinal = dados2[4].innerText
				let N1 = dados2[5].innerText
				let F1 = dados2[6].innerText
				let N2 = dados2[7].innerText
				let F2 = dados2[8].innerText
				let MP = dados2[9].innerText
				let PF = dados2[10].innerText
				let F = dados2[11].innerText
				let MF = dados2[12].innerText
				let Situacao = dados2[13].innerText

				dadosCadeira.nome = NomeCadeira
				dadosCadeira.TFaltas = TFaltas
				dadosCadeira.MFinal = MFinal
				dadosCadeira.N1 = N1
				dadosCadeira.F1 = F1
				dadosCadeira.N2 = N2
				dadosCadeira.F2 = F2
				dadosCadeira.MP = MP
				dadosCadeira.PF = PF
				dadosCadeira.F = F
				dadosCadeira.MF = MF
				dadosCadeira.Situacao = Situacao
				boletim.cadeiras.push(dadosCadeira)
				// console.log("Nome Cadeira: ",NomeCadeira)
				// console.log("TFaltas: ",TFaltas)
				// console.log("MFinal: ",MFinal)
				// console.log("N1: ",N1)
				// console.log("F1: ",F1)
				// console.log("N2: ",N2)
				// console.log("F2: ",F2)
				// console.log("MP: ",MP)
				// console.log("PF: ",PF)
				// console.log("F: ",F)
				// console.log("MF: ",MF)
				// console.log("Situacao: ",Situacao)

			}

		}

		let dados4 = query2.children[0].children

		let mediaDisciplinas = dados4[1].innerText
		let rendimentoGlobal = dados4[4].innerText
		let coeficienteRendimento = dados4[7].innerText

		let situacaoGeral = query2.children[1].children[1].innerText

		boletim.MediaDisciplinas = mediaDisciplinas
		boletim.RendimentoGlobal = rendimentoGlobal
		boletim.CoeficienteRendimento = coeficienteRendimento
		boletim.situacaoGeral = situacaoGeral

		return boletim
		// console.log("Media Disciplinas : ",mediaDisciplinas ,'\n',"Rendimento Global: ",rendimentoGlobal
		// ,'\n','Coeficiente de Rendimento: ',coeficienteRendimento,'\n','Situação: ',situacao)

	})
	return data

}

async function calendarAcademy(res) {

	let browserWSEndpoint = actions.browserWSEndpoint;
	const browser2 = await puppeteer.connect({ browserWSEndpoint })
	const page = await browser2.newPage();
	await page.goto('https://qacademico.ifce.edu.br/qacademico/index.asp?t=2020', { waitUntil: "domcontentloaded" });
	await page.waitFor(2 * 1000);

	const data = await page.evaluate(() => {
		const query = document.querySelectorAll('body > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(3) > tbody > tr > td > table:nth-child(2) > tbody');
		let dados = query["0"].children
		let conta1 = query[0].children.length - 1;

		let DadosCalendarioAcademico = {
			meses: new Array()
		}

		for (let x = 0; x <= conta1; x++) {
			let dados2 = dados[x].children
			let conta2 = dados[x].children.length - 1;
			//aqui vai ser instanciado o objeto CalendarioAcademico

			let mesAcademico = {
				mes: null,
				datas: null
			}

			for (let y = 0; y <= conta2; y++) {
				let datasAcademico = new Array()
				// aqui e passado o mes
				let mes = dados2[y].children[0].children[0].innerText

				let dados3 = dados2[y].children[3].children[0].children
				let conta3 = dados2[y].children[3].children[0].children.length - 1;
				for (let z = 0; z <= conta3; z++) {
					// aqui vamos pegar as datas e as informações referentes

					let datas = dados3[z].children[0].innerText
					let info_data = dados3[z].children[1].innerText

					datasAcademico.push([datas, info_data])

				}
				mesAcademico.mes = mes
				mesAcademico.datas = datasAcademico

				DadosCalendarioAcademico.meses.push(mesAcademico)

			}
			// aqui os dados vão ser enviados para um array que vai ficar armazenado na classe

		}
		return DadosCalendarioAcademico

	})
	let Calen_Academic = new classe.CalendarioAcademico(data)
	return Calen_Academic
	console.log("data ok CalendarioAcademico")
}

async function myMaterial(res) {
	let browserWSEndpoint = actions.browserWSEndpoint;
	const browser2 = await puppeteer.connect({ browserWSEndpoint })
	const page = await browser2.newPage();
	await page.goto('https://qacademico.ifce.edu.br/qacademico/index.asp?t=2061', { waitUntil: "domcontentloaded" });
	await page.waitFor(2 * 1000);
	let data = await page.evaluate(() => {
		var info = new Array();
		info = document.querySelectorAll("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4) > tbody ")[0].childNodes
		var rotulo = new Array();
		var infoFinal = new Array()
		//console.log("info=",info)
		//console.log("infoHref=",info[3].href)
		//console.log("clasName=", info[1].clasName)
		for (i = 0; i < info.length; i++) {
			if (i == 0) continue
			if (info[i].className == "rotulo" && i > 0) {
				rotulo = i + "," + rotulo
				if (i > 1) {
					infoFinal = infoFinal + "," + "|" + "," + info[i].innerText + ","
				} else infoFinal = info[i].innerText + ","

			} else {
				infoFinal = infoFinal + info[i].children[1].childNodes[3].href + ","
			}
		}

		rotulo = rotulo.split(",")
		infoFinal = infoFinal.split(",|,")
		return infoFinal
	})
	const material = new classe.MaterialEscolar(data)
	console.log("material ok")
	return material.getMaterial();
}

async function myMatriz(res) {
	let browserWSEndpoint = actions.browserWSEndpoint;
	const browser2 = await puppeteer.connect({ browserWSEndpoint })
	const page = await browser2.newPage();
	await page.goto('https://qacademico.ifce.edu.br/qacademico/index.asp?t=2045', { waitUntil: "domcontentloaded" });
	await page.waitFor(2 * 1000);
	let data = await page.evaluate(() => {
		var matrizCurricular = new Array();
		var matrizCurricular2 = new Array();
		var curricular = new Array();
		const tabel = document.querySelectorAll("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(6) > tbody")["0"].children
		const tabel2 = document.querySelectorAll("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(8) > tbody")["0"].children
		for (var i = 1; i < tabel.length; i++) {
			for (var j = 1; j < tabel[i].children.length; j++) {
				var value = [tabel[i].children[j].innerText]
				//console.log(value)
				curricular = curricular.concat(value)
			}
			//console.log(curricular)
			if (i == 1) {
				matrizCurricular = [matrizCurricular.concat(curricular)]
				curricular = []
			}
			else {
				matrizCurricular = matrizCurricular.concat([curricular])
				curricular = []
			}
		}

		for (var i = 1; i < tabel2.length; i++) {
			for (var j = 1; j < tabel2[i].children.length; j++) {
				var value = [tabel2[i].children[j].innerText]
				//console.log(value)
				curricular = curricular.concat(value)
			}
			//console.log(curricular)
			if (i == 1) {
				matrizCurricular2 = [matrizCurricular2.concat(curricular)]
				curricular = []
			}
			else {
				matrizCurricular2 = matrizCurricular2.concat([curricular])
				curricular = []
			}
		}
		return [matrizCurricular, matrizCurricular2]
	})
	const matrizCurricular = new classe.MatrizCurricular(data)
	console.log("matrizCurricular ok")
	return matrizCurricular
}

module.exports = { login, personalSchedule, myDiary, myReportCard, calendarAcademy, myMaterial, myMatriz, salvarFoto};