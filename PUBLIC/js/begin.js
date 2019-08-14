
window.onload = function () {
	fetch(`https://myalunoif.firebaseio.com/Alunos/${data.id_Matricula}/${semestre}/info.json`, { method: "GET" })
		.then(res => res.json())
		.then(resp => {
			document.querySelector('.user').innerHTML = resp.nome_perfil
			//document.querySelectorAll('#img')["0"].srcset = `./${data.id_Matricula}.png`
			//document.querySelectorAll('#img')["1"].src = `./${data.id_Matricula}.png`
		})
	const side = document.getElementById('mySidenav')

	document.querySelectorAll('#horario').forEach(e => {
		e.onclick = function (e) {
			e.preventDefault()
			const url = `/horario/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
			fetch(url, { method: "GET" })
				.then(resp => resp.json())
				.then(res => {
					const conteudoPrincipal = document.querySelector('.conteudo-principal')
					const tabelPrimeira = document.querySelectorAll(".tabel")
					tabelPrimeira.forEach((e, index) => {
						if (e == side) console.log(index)
						else conteudoPrincipal.removeChild(e)
					})
					res = Array.from(res)
					console.log(res)
					res.forEach(e => {
						const thead = document.createElement("thead")
						const thThead = document.createElement("th")
						thThead.innerHTML = e.diaSemana
						const tr = document.createElement("tr")
						tr.append(thThead)
						thead.append(tr)

						const tbody = document.createElement("tbody")

						for (let i = 0; i < e.horario.length; i++) {
							const td1 = document.createElement("td")
							td1.innerHTML = e.horario[i]
							const td2 = document.createElement("td")
							td2.innerHTML = e.conteudoHorario[i]
							const tr2 = document.createElement("tr")
							tr2.append(td1)
							tr2.append(td2)
							tbody.append(tr2)
						}

						const tabel = document.createElement("table")
						tabel.classList.add("tabel")

						tabel.append(thead)
						tabel.append(tbody)
						conteudoPrincipal.append(tabel)
					})

				})
		}
	})

	document.querySelectorAll('#material').forEach(e => {
		e.onclick = function (e) {
			e.preventDefault()
			const url = `/material/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
			fetch(url, { method: "GET" })
				.then(resp => resp.json())
				.then(res => {
					const conteudoPrincipal = document.querySelector('.conteudo-principal')

					const tabelPrimeira = document.querySelectorAll(".tabel")
					tabelPrimeira.forEach((e, index) => {
						if (e == side) console.log(index)
						else conteudoPrincipal.removeChild(e)
					})
					console.log(res)
					if (res != false) {
						res = Array.from(res)
						//console.log(res)
						res.forEach(e => {
							//console.log(e)

							console.log("eois  ", e)
							const thead = document.createElement("thead")
							const thThead = document.createElement("th")
							thThead.innerHTML = e[0].split('(')[0]
							thThead.style.position = "inherit"
							const tr = document.createElement("tr")
							tr.style.width = "100%"
							tr.style.height = "10rem"

							tr.append(thThead)
							thead.append(tr)

							const tbody = document.createElement("tbody")

							for (let i = 1; i < e.length; i++) {
								const tr2 = document.createElement("tr")
								const td1 = document.createElement("td")
								td1.style.textAlign = "left"
								td1.style.paddingLeft = "10px"
								console.log("teste: ", e[i])
								td1.innerHTML = `<a href="${e[i][1]}" >${e[i][0]}</a>`
								const tr3 = document.createElement("tr")

								tbody.append(tr2)
								tr2.append(td1)
								tbody.append(tr3)
							}

							const tabel = document.createElement("table")
							tabel.style.height = "100%"
							tabel.classList.add("tabel")

							tabel.append(thead)
							tabel.append(tbody)
							conteudoPrincipal.append(tabel)
						})
					} else console.log("sem material")

				})
		}
	})

	document.querySelectorAll('#diario').forEach(e => {
		e.onclick = function (e) {
			e.preventDefault()
			const url = `/diario/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
			fetch(url, { method: "GET" })
				.then(resp => resp.json())
				.then(res => {
					const conteudoPrincipal = document.querySelector('.conteudo-principal')
					const tabelPrimeira = document.querySelectorAll(".tabel")
					tabelPrimeira.forEach((e, index) => {
						if (e == side) console.log(index)
						else conteudoPrincipal.removeChild(e)
					})
					res = Array.from(res)
					console.log(res)
					res.forEach(e => {
						const thead = document.createElement("thead")
						const thThead = document.createElement("th")
						thThead.style.top = "0%"

						thThead.innerHTML = e.materia
						thThead.style.position = "inherit"
						thThead.style.textAlign = "center"
						const tr = document.createElement("tr")
						tr.style.width = "100%"
						tr.append(thThead)
						thead.append(tr)

						const tbody = document.createElement("tbody")

						const tr1 = document.createElement("tr")
						const td1 = document.createElement("td")
						td1.innerHTML = "Professor(a):"
						td1.setAttribute('class', 'titulo')
						const td2 = document.createElement("td")
						td2.innerHTML = e.professor
						tr1.append(td1)
						tr1.append(td2)

						const tr2 = document.createElement("tr")
						const td3 = document.createElement("td")
						td3.innerHTML = "Quantidade Aulas:"
						td3.setAttribute('class', 'titulo')
						const td4 = document.createElement("td")
						td4.innerHTML = e.qtdAula
						td4.setAttribute('class', 'quantAula_AulasMinistradas')
						tr2.append(td3)
						tr2.append(td4)

						const tr3 = document.createElement("tr")
						const td5 = document.createElement("td")
						td5.setAttribute('class', 'titulo')
						td5.innerHTML = "Aulas Administradas:"
						td5.style.paddingLeft = "20px"
						const td6 = document.createElement("td")
						td6.innerHTML = e.aulasAdministradas
						td6.setAttribute('class', 'quantAula_AulasMinistradas')
						td6.style.paddingLeft = "86px"
						tr3.append(td5)
						tr3.append(td6)

						const tr4 = document.createElement("tr")
						const td7 = document.createElement("td")
						td7.innerHTML = "<span style='color:red;' >Faltas:</span>"
						td7.setAttribute('class', 'titulo')
						const td8 = document.createElement("td")
						td8.innerHTML = e.faltas
						td8.style.width = "50px"
						td8.style.paddingLeft = "110px"
						tr4.append(td7)
						tr4.append(td8)
						tbody.append(tr1)
						tbody.append(tr2)
						tbody.append(tr3)
						tbody.append(tr4)

						if (e.vetorN1) {
							const tr5 = document.createElement("tr")
							const td9 = document.createElement("td")
							td9.innerHTML = "N1"
							td9.setAttribute('class', 'Ns')
							tr5.append(td9)
							tr5.style.textAlign = "center"
							tbody.append(tr5)


							for (let i = 0; i < e.vetorN1.length; i++) {
								const td1 = document.createElement("td")
								td1.innerHTML = `AV 0${i + 1}:`
								td1.setAttribute('class', 'titulo')
								const td2 = document.createElement("td")
								td2.innerHTML = e.vetorN1[i]
								td2.setAttribute('class', 'notas-css')
								const tr2 = document.createElement("tr")
								tr2.append(td1)
								tr2.append(td2)
								tbody.append(tr2)
							}
						}

						if (e.vetorN2) {
							const tr6 = document.createElement("tr")
							const td10 = document.createElement("td")
							td10.innerHTML = "N2"
							td10.setAttribute('class', 'Ns')
							tr6.append(td10)
							tbody.append(tr6)
							for (let i = 0; i < e.vetorN2.length; i++) {
								const td1 = document.createElement("td")
								td1.innerHTML = `AV 0${i + 1}:`
								td1.setAttribute('class', 'titulo')
								const td2 = document.createElement("td")
								td2.innerHTML = e.vetorN2[i]
								td2.setAttribute('class', 'notas-css')
								const tr2 = document.createElement("tr")
								tr2.append(td1)
								tr2.append(td2)
								tbody.append(tr2)
							}
						}

						if (e.vetorAF) {
							const tr7 = document.createElement("tr")
							const td11 = document.createElement("td")
							td11.innerHTML = "AF"
							td11.setAttribute('class', 'Ns')
							tr7.append(td11)
							tbody.append(tr7)
							for (let i = 0; i < e.vetorN1.length; i++) {
								const td1 = document.createElement("td")
								td1.innerHTML = `AV 0${i + 1}:`
								td1.setAttribute('class', 'titulo')
								const td2 = document.createElement("td")
								td2.innerHTML = e.vetorN1[i]
								td2.setAttribute('class', 'notas-css')
								const tr2 = document.createElement("tr")
								tr2.append(td1)
								tr2.append(td2)
								tbody.append(tr2)
							}
						}
						const tabel = document.createElement("table")
						tabel.style.height = "500px"
						tabel.style.width = "269px"
						tabel.style.overflow = "hidden"
						tabel.classList.add("tabel")

						tabel.append(thead)
						tabel.append(tbody)
						conteudoPrincipal.append(tabel)
					})

				})
		}
	})

	document.querySelectorAll('#matriz').forEach(e => {
		e.onclick = function (e) {
			e.preventDefault()
			const url = `/matrizCurricular/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
			fetch(url, { method: "GET" })
				.then(resp => resp.json()
				).then(res => {
					console.log("res", res)
					const conteudoPrincipal = document.querySelector('.conteudo-principal')
					const tabelPrimeira = document.querySelectorAll(".tabel")
					tabelPrimeira.forEach((e, index) => {
						if (e == side) console.log(index)
						else conteudoPrincipal.removeChild(e)
					})
					res = Object.entries(res)
					//res = Array.from(res)
					console.log(res)
					res[0][1].forEach(e => {

						console.log("matrizCurricular  ", e)
						const thead = document.createElement("thead")
						const thThead = document.createElement("th")
						thThead.innerHTML = e[2]
						thThead.style.position = "inherit"
						thThead.style.textAlign = "center"
						const tr = document.createElement("tr")
						tr.style.width = "100%"
						tr.append(thThead)
						thead.append(tr)

						const tbody = document.createElement("tbody")

						const td1 = document.createElement("td")
						td1.innerHTML = e[1]
						td1.style.paddingLeft = "68px"
						const tdt1 = document.createElement("td")
						tdt1.innerHTML = "Sigla"
						const tr1 = document.createElement("tr")

						const td2 = document.createElement("td")
						td2.innerHTML = e[3]
						td2.style.paddingLeft = "0px"
						const tdt2 = document.createElement("td")
						tdt2.innerHTML = "Componente Curricular"
						tdt2.style.width = "123px"
						tdt2.style.paddingLeft = "0px"
						const tr2 = document.createElement("tr")

						const td3 = document.createElement("td")
						td3.innerHTML = e[4]
						td3.style.paddingLeft = "70px"
						const tdt3 = document.createElement("td")
						tdt3.innerHTML = "C.H."
						const tr3 = document.createElement("tr")

						const td4 = document.createElement("td")
						td4.innerHTML = e[5]
						td4.style.paddingLeft = "68px"
						const tdt4 = document.createElement("td")
						tdt4.innerHTML = "Créd"
						const tr4 = document.createElement("tr")

						// const td5 = document.createElement("td")
						// td5.innerHTML = e[5]
						// td5.style.paddingLeft = "68px"
						// const tdt5 = document.createElement("td")
						// tdt5.innerHTML = "Pré-requisitos"
						// const tr5 = document.createElement("tr")

						tr1.append(tdt1)
						tr1.append(td1)

						tr2.append(tdt2)
						tr2.append(td2)

						tr3.append(tdt3)
						tr3.append(td3)

						tr4.append(tdt4)
						tr4.append(td4)

						// tr5.append(tdt5)
						// tr5.append(td5)

						tbody.append(tr1)
						tbody.append(tr2)
						tbody.append(tr3)
						tbody.append(tr4)
						// tbody.append(tr5)


						const tabel = document.createElement("table")
						tabel.classList.add("tabel")

						tabel.append(thead)
						tabel.append(tbody)
						conteudoPrincipal.append(tabel)

					})

				})
		}



	})


	document.querySelectorAll('#boletim').forEach(e => {
		e.onclick = function (e) {
			e.preventDefault()
			const url = `/myReportCard/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
			fetch(url, { method: "GET" })
				.then(resp => resp.json())
				.then(res => {
					const conteudoPrincipal = document.querySelector('.conteudo-principal')
					const tabelPrimeira = document.querySelectorAll(".tabel")
					tabelPrimeira.forEach((e, index) => {
						if (e == side) console.log(index)
						else conteudoPrincipal.removeChild(e)
					})

					const indices = Object.keys(res)

					console.log("Boletim: ", res)

					const tabel = document.createElement("table")
					tabel.classList.add("tabel")
					tabel.style.width = "271px"
					const tbody = document.createElement("tbody")

					const tdt1 = document.createElement("td")
					tdt1.innerHTML = indices[0]
					const td1 = document.createElement("td")
					td1.innerHTML = res.CoeficienteRendimento
					const tr1 = document.createElement("tr")

					const tdt2 = document.createElement("td")
					tdt2.innerHTML = indices[1]
					const td2 = document.createElement("td")
					td2.innerHTML = res.MediaDisciplinas
					td2.style.paddingLeft = "68px"
					const tr2 = document.createElement("tr")

					const tdt3 = document.createElement("td")
					tdt3.innerHTML = indices[2]
					const td3 = document.createElement("td")
					td3.innerHTML = res.RendimentoGlobal
					td3.style.paddingLeft = "53px"
					const tr3 = document.createElement("tr")

					const tdt4 = document.createElement("td")
					tdt4.innerHTML = indices[4]
					const td4 = document.createElement("td")
					td4.innerHTML = res.situacaoGeral
					td4.style.paddingLeft = "37px"
					const tr4 = document.createElement("tr")

					tr1.append(tdt1)
					tr1.append(td1)

					tr2.append(tdt2)
					tr2.append(td2)

					tr3.append(tdt3)
					tr3.append(td3)

					tr4.append(tdt4)
					tr4.append(td4)

					tbody.append(tr1)
					tbody.append(tr2)
					tbody.append(tr3)
					tbody.append(tr4)



					// tabel.append(thead)
					tabel.append(tbody)
					conteudoPrincipal.append(tabel)


					cadeiras = res.cadeiras
					indices2 = Object.keys(res.cadeiras[0])
					cadeiras.forEach(e => {
						console.log(e)
						const thead2 = document.createElement("thead")
						const thThead2 = document.createElement("th")
						thThead2.innerHTML = e.nome
						thThead2.style.margin = "0 auto"
						thThead2.style.left = "0%"
						thThead2.style.top = "0%"
						thThead2.style.lineHeight = "2rem"
						const tr = document.createElement("tr")
						tr.style.width = "100%"
						tr.append(thThead2)
						thead2.append(tr)

						const tbody2 = document.createElement("tbody")





						const td1 = document.createElement("td")
						td1.innerHTML = e.F
						const td12 = document.createElement("td")
						td12.innerHTML = indices2[0]
						const tr1 = document.createElement("tr")

						const td2 = document.createElement("td")
						td2.innerHTML = e.F1
						td2.style.paddingLeft = "126px"
						td2.style.width = "50px"
						const td22 = document.createElement("td")
						td22.innerHTML = indices2[1]
						const tr2 = document.createElement("tr")

						const td3 = document.createElement("td")
						td3.innerHTML = e.F2
						td3.style.paddingLeft = "119px"
						td3.style.width = "50px"
						const td32 = document.createElement("td")
						td32.innerHTML = indices2[2]
						const tr3 = document.createElement("tr")

						const td4 = document.createElement("td")
						td4.innerHTML = e.MF
						td4.style.paddingLeft = "122px"
						td4.style.width = "50px"
						const td42 = document.createElement("td")
						td42.innerHTML = indices2[3]
						const tr4 = document.createElement("tr")
						tr4.style.borderBottom = "4px solid darkgray"

						const td5 = document.createElement("td")
						td5.innerHTML = e.MFinal
						td5.style.paddingLeft = "92px"
						td5.style.width = "50px"
						const td52 = document.createElement("td")
						td52.innerHTML = indices2[4]
						const tr5 = document.createElement("tr")

						const td6 = document.createElement("td")
						td6.innerHTML = e.MP
						td6.style.paddingLeft = "121px"
						td6.style.width = "50px"
						const td62 = document.createElement("td")
						td62.innerHTML = indices2[5]
						const tr6 = document.createElement("tr")

						const td7 = document.createElement("td")
						td7.innerHTML = e.N1
						td7.style.paddingLeft = "121px"
						td7.style.width = "50px"
						const td72 = document.createElement("td")
						td72.innerHTML = indices2[6]
						const tr7 = document.createElement("tr")

						const td8 = document.createElement("td")
						td8.innerHTML = e.N2
						td8.style.width = "50px"
						td8.style.paddingLeft = "119px"
						const td82 = document.createElement("td")
						td82.innerHTML = indices2[7]
						console.log("indice 7:", indices2[7], "nota: ", e.N2)
						const tr8 = document.createElement("tr")

						const td9 = document.createElement("td")
						td9.innerHTML = e.PF
						td9.style.paddingLeft = "126px"
						td9.style.width = "50px"
						const td92 = document.createElement("td")
						td92.innerHTML = indices2[8]
						const tr9 = document.createElement("tr")
						

						const td10 = document.createElement("td")
						td10.innerHTML = e.Situacao
						td10.style.width = "155px"
						const td102 = document.createElement("td")
						td102.innerHTML = indices2[9]
						const tr10 = document.createElement("tr")

						const td11 = document.createElement("td")
						td11.innerHTML = e.TFaltas
						td11.style.width = "50px"
						td11.style.paddingLeft = "71px"
						const td112 = document.createElement("td")
						td112.innerHTML = indices2[10]
						const tr11 = document.createElement("tr")

						const tdlinha1 = document.createElement("td")
						tdlinha1.innerHTML = "Primeiro Periodo"
						tdlinha1.setAttribute('class', 'Ns')
						const trlinha1 = document.createElement('tr')
						trlinha1.append(tdlinha1)

						const tdlinha2 = document.createElement("td")
						tdlinha2.innerHTML = "Segundo Periodo"
						tdlinha2.setAttribute('class', 'Ns')
						const trlinha2 = document.createElement('tr')
						trlinha2.append(tdlinha2)

						const tdlinha3 = document.createElement("td")
						tdlinha3.innerHTML = "Info Gerais"
						tdlinha3.setAttribute('class', 'Ns')
						const trlinha3 = document.createElement('tr')
						trlinha3.append(tdlinha3)

						tr1.append(td12)
						tr1.append(td1)

						tr4.append(td42)
						tr4.append(td4)

						tr2.append(td22)
						tr2.append(td2)

						tr7.append(td72)
						tr7.append(td7)

						tr3.append(td32)
						tr3.append(td3)

						tr8.append(td82)
						tr8.append(td2)

						tr5.append(td52)
						tr5.append(td5)

						tr6.append(td62)
						tr6.append(td6)

						tr9.append(td92)
						tr9.append(td9)

						tr10.append(td102)
						tr10.append(td10)

						tr11.append(td112)
						tr11.append(td11)

						tbody2.append(trlinha1)
						tbody2.append(tr2)
						tbody2.append(tr7)
						tbody2.append(tdlinha2)
						tbody2.append(tr3)
						tbody2.append(tr8)
						tbody2.append(tdlinha3)
						tbody2.append(tr5)
						tbody2.append(tr6)
						tbody2.append(tr9)
						tbody2.append(tr1)
						tbody2.append(tr4)
						tbody2.append(tr10)
						tbody2.append(tr11)

						const tabel2 = document.createElement("table")
						tabel2.classList.add("tabel")
						tabel2.style.height = "480px"
						tabel2.style.width = "280px"

						tabel2.append(thead2)
						tabel2.append(tbody2)
						conteudoPrincipal.append(tabel2)

					})
					// console.log("myReportCard  ", e)

					// })

				})


		}




	})

	document.querySelectorAll("#calendario").forEach(e => {
		e.onclick = function (e) {
			e.preventDefault()
			const url = `/Calen_Academic/semestre/meses/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
			fetch(url, { method: "GET" })
				.then(resp => resp.json())
				.then(res => {
					const conteudoPrincipal = document.querySelector('.conteudo-principal')
					const tabelPrimeira = document.querySelectorAll(".tabel")
					tabelPrimeira.forEach((e, index) => {
						if (e == side) console.log(index)
						else conteudoPrincipal.removeChild(e)
					})
					//console.log(res)

					res = Array.from(res)
					console.log(res)
					var mesAtualtabel; 
					res.forEach((e,index)=>{
						e.mes == mesAtual ? mesAtualtabel = index : console.log("mes errado")
					})

					const thead = document.createElement("thead")
					thead.style.height = "41%"
					const thThead = document.createElement("th")
					thThead.innerHTML = res[mesAtualtabel].mes
					thThead.style.margin = "0 auto"
					thThead.style.left = "0%"
					thThead.style.top = "0%"
					thThead.style.lineHeight = "2rem"
					thead.append(thThead)

					res[mesAtualtabel].mes

					const tbody = document.createElement('tbody')
					for(var i = 0; i<res[mesAtualtabel].datas.length; i=i+4){
						const td1 = document.createElement("td")
						const td2 = document.createElement("td")
						const td3 = document.createElement("td")
						const td4 = document.createElement("td")
						typeof(res[mesAtualtabel].datas[i]) == "object" ? td1.innerHTML =  `<span style="color:black;" >${(res[mesAtualtabel].datas[i]).join("</span><br>")}` : td1.innerHTML = "Vazio"
						typeof(res[mesAtualtabel].datas[i+1]) == "object" ? td2.innerHTML =  `<span style="color:black;" >${(res[mesAtualtabel].datas[i+1]).join("</span><br>")}` : td2.innerHTML = "Vazio"
						typeof(res[mesAtualtabel].datas[i+2]) == "object" ? td3.innerHTML =  `<span style="color:black;" >${(res[mesAtualtabel].datas[i+2]).join("</span><br>")}` : td3.innerHTML = "Vazio"
						typeof(res[mesAtualtabel].datas[i+3]) == "object" ? td4.innerHTML =  `<span style="color:black;" >${(res[mesAtualtabel].datas[i+3]).join("</span><br>")}` : td4.innerHTML = "Vazio"
						td1.style.width = "88px"
						td2.style.width = "88px"
						td3.style.width = "88px"
						td4.style.width = "88px"
						td1.style.padding = '0'
						td2.style.padding = '0'
						td3.style.padding = '0'
						td4.style.padding = '0'
						const tr = document.createElement('tr')
						tr.style.width = '353px'
						tr.append(td1)
						tr.append(td2)
						tr.append(td3)
						tr.append(td4)
						tbody.append(tr)

					}
					tbody.style.width = "354px"
					const tabel = document.createElement("table")
					tabel.classList.add("tabel")
					tabel.style.width = "355px"
					tabel.style.height = "500px"
					tabel.style.margin = "0"
					tabel.style.padding = "0"
					tabel.append(thead)
					tabel.append(tbody)
					conteudoPrincipal.append(tabel)
					conteudoPrincipal.style.margin = "10px"
					conteudoPrincipal.padding = "0"

					/**res[mesAtualtabel.]forEach(e=>{
						e0 e1
						const td = document.createElement("td")
						td.innerHTML = e

					})


					res.forEach(e => {
						console.log("CalenAcademic  ", e)
						const thead = document.createElement("thead")
						thead.style.height = "41%"
						const thThead = document.createElement("th")
						thThead.innerHTML = e.mes
						thThead.style.margin = "0 auto"
						thThead.style.left = "0%"
						thThead.style.top = "0%"
						thThead.style.lineHeight = "2rem"

						const tr = document.createElement("tr")
						tr.style.width = "100%"
						tr.append(thThead)
						thead.append(tr)

						const tbody = document.createElement("tbody")
						tbody.style.marginTop = "-71px"

						for (let i = 0; i < e.datas.length; i++) {

							const td1 = document.createElement("td")
							td1.innerHTML = e.datas[i][0]
							td1.style.width = "24px"
							td1.style.height = "56px"
							const td2 = document.createElement("td")
							td2.innerHTML = e.datas[i][1]
							const tr2 = document.createElement("tr")
							tr2.append(td1)
							tr2.append(td2)
							tbody.append(tr2)
						}

						const tabel = document.createElement("table")
						tabel.classList.add("tabel")
						tabel.style.width = "292px"
						tabel.style.height = "709px"

						tabel.append(thead)
						tabel.append(tbody)
						conteudoPrincipal.append(tabel)

					})**/
				})
		}

	})
}
