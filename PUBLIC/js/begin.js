
window.onload = function () {
	fetch(`https://myalunoif.firebaseio.com/Alunos/${data.id_Matricula}/info.json`, { method: "GET" })
		.then(res => res.json())
		.then(resp => {
			document.querySelector('.user').innerHTML = resp.nome_perfil
			//document.querySelectorAll('#img')["0"].srcset = `./${data.id_Matricula}.png`
			//document.querySelectorAll('#img')["1"].src = `./${data.id_Matricula}.png`
		})
	const side = document.getElementById('mySidenav')

	document.querySelectorAll('#horario').forEach(e=>{
		e.onclick = function(e){
		e.preventDefault()
		const url = `/horario/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
		fetch(url, { method: "GET" })
			.then(resp => resp.json())
			.then(res => {
				const conteudoPrincipal = document.querySelector('.conteudo-principal')
				const tabelPrimeira = document.querySelectorAll(".tabel")
				tabelPrimeira.forEach((e,index) => {
					if(e==side) console.log(index)
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

document.querySelectorAll('#material').forEach(e=>{
		e.onclick = function(e){
		e.preventDefault()
		const url = `/material/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
		fetch(url, { method: "GET" })
			.then(resp => resp.json())
			.then(res => {
				const conteudoPrincipal = document.querySelector('.conteudo-principal')

				const tabelPrimeira = document.querySelectorAll(".tabel")
				tabelPrimeira.forEach((e,index) => {
					if(e==side) console.log(index)
					else conteudoPrincipal.removeChild(e)
				})
				res = Array.from(res)
				//console.log(res)
				res.forEach(e => {
					//console.log(e)

					console.log("eois  ", e)
					const thead = document.createElement("thead")
					const thThead = document.createElement("th")
					thThead.innerHTML = e[0].split("-")[2]
					thThead.style.position = "inherit"
					const tr = document.createElement("tr")




					tr.append(thThead)
					thead.append(tr)

					const tbody = document.createElement("tbody")

					for (let i = 1; i < e.length-1; i++) {
						const tr2 = document.createElement("tr")
						const td1 = document.createElement("td")

						td1.innerHTML = `<a href="${e[i]}" >Material 0${i}</a>`
						const tr3 = document.createElement("tr")

						tbody.append(tr2)
						tr2.append(td1)
						tbody.append(tr3)
					}

					const tabel = document.createElement("table")
					//tabel.style.width = "100%"
					tabel.classList.add("tabel")

					tabel.append(thead)
					tabel.append(tbody)
					conteudoPrincipal.append(tabel)
				})

			})
		}
	})

document.querySelectorAll('#diario').forEach(e=>{
		e.onclick = function(e){
		e.preventDefault()
		const url = `/diario/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
		fetch(url, { method: "GET" })
			.then(resp => resp.json())
			.then(res => {
				const conteudoPrincipal = document.querySelector('.conteudo-principal')
				const tabelPrimeira = document.querySelectorAll(".tabel")
				tabelPrimeira.forEach((e,index) => {
					if(e==side) console.log(index)
					else conteudoPrincipal.removeChild(e)
				})
				res = Array.from(res)
				console.log(res)
				res.forEach(e => {
					const thead = document.createElement("thead")
					const thThead = document.createElement("th")
					thThead.innerHTML = e.materia
					thThead.style.position = "inherit"
					thThead.style.textAlign = "center"
					const tr = document.createElement("tr")
					tr.append(thThead)
					thead.append(tr)

					const tbody = document.createElement("tbody")

					const tr1 = document.createElement("tr")
					const td1 = document.createElement("td")
					td1.innerHTML = "Professor(a):"
					const td2 = document.createElement("td")
					td2.innerHTML = e.professor
					tr1.append(td1)
					tr1.append(td2)

					const tr2 = document.createElement("tr")
					const td3 = document.createElement("td")
					td3.innerHTML = "Quantidade Aulas:"
					const td4 = document.createElement("td")
					td4.innerHTML = e.qtdAula
					tr2.append(td3)
					tr2.append(td4)

					const tr3 = document.createElement("tr")
					const td5 = document.createElement("td")
					td5.innerHTML = "Aulas Administradas:"
					const td6 = document.createElement("td")
					td6.innerHTML = e.aulasAdministradas
					tr3.append(td5)
					tr3.append(td6)

					const tr4 = document.createElement("tr")
					const td7 = document.createElement("td")
					td7.innerHTML = "<span style='color:red;' >Faltas:</span>"
					const td8 = document.createElement("td")
					td8.innerHTML = e.faltas
					tr4.append(td7)
					tr4.append(td8)
					tbody.append(tr1)
					tbody.append(tr2)
					tbody.append(tr3)
					tbody.append(tr4)

					if(e.vetorN1){
						const tr5 = document.createElement("tr")
						const td9 = document.createElement("td")
						td9.innerHTML = "Primeira Etapa (N1)"
						tr5.append(td9)
						tr5.style.textAlign = "center"
						tbody.append(tr5)


						for (let i = 0; i < e.vetorN1.length; i++) {
							const td1 = document.createElement("td")
							td1.innerHTML = `AV 0${i+1}:`
							const td2 = document.createElement("td")
							td2.innerHTML = e.vetorN1[i]
							const tr2 = document.createElement("tr")
							tr2.append(td1)
							tr2.append(td2)
							tbody.append(tr2)
						}
					}

					if(e.vetorN2){
						const tr6 = document.createElement("tr")
						const td10 = document.createElement("td")
						td10.innerHTML = "Segunda Etapa (N2)"
						tr6.append(td10)
						tbody.append(tr6)
						for (let i = 0; i < e.vetorN2.length; i++) {
							const td1 = document.createElement("td")
							td1.innerHTML = `AV 0${i+1}:`
							const td2 = document.createElement("td")
							td2.innerHTML = e.vetorN2[i]
							const tr2 = document.createElement("tr")
							tr2.append(td1)
							tr2.append(td2)
							tbody.append(tr2)
						}
					}

					if(e.vetorAF){
						const tr7 = document.createElement("tr")
						const td11 = document.createElement("td")
						td11.innerHTML = "Prova Final (AF)"
						tr7.append(td11)
						tbody.append(tr7)
						for (let i = 0; i < e.vetorN1.length; i++) {
							const td1 = document.createElement("td")
							td1.innerHTML = `AV 0${i+1}:`
							const td2 = document.createElement("td")
							td2.innerHTML = e.vetorN1[i]
							const tr2 = document.createElement("tr")
							tr2.append(td1)
							tr2.append(td2)
							tbody.append(tr2)
						}
					}
					const tabel = document.createElement("table")
					tabel.style.height = "100%"
					tabel.classList.add("tabel")

					tabel.append(thead)
					tabel.append(tbody)
					conteudoPrincipal.append(tabel)
				})

			})
		}
	})

	const buttonMatrizCurricular = document.querySelectorAll("#matriz")['0']
	console.log(buttonMatrizCurricular)
	buttonMatrizCurricular.onclick = function (e) {
		e.preventDefault()
		const url = `/matrizCurricular/dentro/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
		fetch(url, { method: "GET" })
			.then(resp => resp.json())
			.then(res => {
				const conteudoPrincipal = document.querySelector('.conteudo-principal')
				const tabelPrimeira = document.querySelectorAll(".tabel")
				tabelPrimeira.forEach(e => {
					conteudoPrincipal.removeChild(e)
				})
				res = Array.from(res)
				console.log(res)
				res.forEach(e => {
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

					for (let i = 0; i < e.length; i++) {
						if (i != 2 && i != 0) {
							const td1 = document.createElement("td")
							td1.innerHTML = e[i]
							const tr2 = document.createElement("tr")
							tr2.append(td1)
							tbody.append(tr2)
						}

					}

					const tabel = document.createElement("table")
					tabel.classList.add("tabel")

					tabel.append(thead)
					tabel.append(tbody)
					conteudoPrincipal.append(tabel)
				})

			})
	}

	const buttonMyReportCard = document.querySelectorAll("#boletim")['0']
	console.log(buttonMyReportCard)
	buttonMyReportCard.onclick = function (e) {
		e.preventDefault()
		const url = `/myReportCard/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
		fetch(url, { method: "GET" })
			.then(resp => resp.json())
			.then(res => {
				const conteudoPrincipal = document.querySelector('.conteudo-principal')
				const tabelPrimeira = document.querySelectorAll(".tabel")
				tabelPrimeira.forEach(e => {
					conteudoPrincipal.removeChild(e)
				})
				

				res = Array.from(res)
				console.log(res)
				// res.forEach(e => {
					// console.log("myReportCard  ", e)
					// const thead = document.createElement("thead")
					// const thThead = document.createElement("th")
					// thThead.innerHTML = e.situacaoGeral
					// const tr = document.createElement("tr")
					// tr.append(thThead)
					// thead.append(tr)

					const tbody = document.createElement("tbody")

					for(let i = 0; i<res.length;i++){
						const td1 = document.createElement("td")
						td1.innerHTML = res[i]
						
						const tr2 = document.createElement("tr")
						tr2.append(td1)
						tbody.append(tr2)
					}

					const tabel = document.createElement("table")
					tabel.classList.add("tabel")

					// tabel.append(thead)
					tabel.append(tbody)
					conteudoPrincipal.append(tabel)
				// })

			})
	}

	const buttonCalenAcademic = document.querySelectorAll("#calendario")['0']
	console.log(buttonCalenAcademic)
	buttonCalenAcademic.onclick = function (e) {
		e.preventDefault()
		const url = `/Calen_Academic/semestre/meses/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
		fetch(url, { method: "GET" })
			.then(resp => resp.json())
			.then(res => {
				const conteudoPrincipal = document.querySelector('.conteudo-principal')
				const tabelPrimeira = document.querySelectorAll(".tabel")
				tabelPrimeira.forEach(e => {
					conteudoPrincipal.removeChild(e)
				})
				console.log(res)

				res = Array.from(res)

				res.forEach(e => {
					console.log("CalenAcademic  ", e)
					// const thead = document.createElement("thead")
					// const thThead = document.createElement("th")
					// thThead.innerHTML = e.diaSemana
					// const tr = document.createElement("tr")
					// tr.append(thThead)
					// thead.append(tr)

					// const tbody = document.createElement("tbody")

					// for(let i = 0; i<e.horario.length;i++){
					// 	const td1 = document.createElement("td")
					// 	td1.innerHTML = e.horario[i]
					// 	const td2 = document.createElement("td")
					// 	td2.innerHTML = e.conteudoHorario[i]
					// 	const tr2 = document.createElement("tr")
					// 	tr2.append(td1)
					// 	tr2.append(td2)
					// 	tbody.append(tr2)
					// }

					// const tabel = document.createElement("table")
					// tabel.classList.add("tabel")

					// tabel.append(thead)
					// tabel.append(tbody)
					// conteudoPrincipal.append(tabel)
				})

			})
	}


}
