
window.onload = function () {
	fetch(`https://myalunoif.firebaseio.com/Alunos/${data.id_Matricula}/info.json`, { method: "GET" })
		.then(res => res.json())
		.then(resp => {
			document.querySelector('.user').innerHTML = resp.nome_perfil
			document.querySelectorAll('#img')["0"].srcset = resp.foto_perfil
			document.querySelectorAll('#img')["1"].src = resp.foto_perfil
		})

	const buttonHorario = document.querySelectorAll("#horario")['0']
	console.log(buttonHorario)
	buttonHorario.onclick = function (e) {
		e.preventDefault()
		const url = `/horario/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
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

	const buttonMaterial = document.querySelectorAll("#material")['0']
	console.log(buttonMaterial)
	buttonMaterial.onclick = function (e) {
		e.preventDefault()
		const url = `/material/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
		fetch(url, { method: "GET" })
			.then(resp => resp.json())
			.then(res => {
				const conteudoPrincipal = document.querySelector('.conteudo-principal')

				const tabelPrimeira = document.querySelectorAll(".tabel")
				tabelPrimeira.forEach(e => {
					conteudoPrincipal.removeChild(e)
				})
				res = Array.from(res)
				//console.log(res)
				res.forEach(e => {
					//console.log(e)

					console.log("eois  ", e)
					const thead = document.createElement("thead")
					const thThead = document.createElement("th")
					thThead.innerHTML = e[0]
					thThead.style.position = "inherit"
					const tr = document.createElement("tr")




					tr.append(thThead)
					thead.append(tr)

					const tbody = document.createElement("tbody")

					for (let i = 1; i < e.length; i++) {
						const tr2 = document.createElement("tr")
						const td1 = document.createElement("td")

						td1.innerHTML = e[i]
						const tr3 = document.createElement("tr")

						tbody.append(tr2)
						tr2.append(td1)
						tbody.append(tr3)
					}

					const tabel = document.createElement("table")
					tabel.style.width = "100%"
					tabel.classList.add("tabel")

					tabel.append(thead)
					tabel.append(tbody)
					conteudoPrincipal.append(tabel)
				})

			})
	}

	const buttonDiario = document.querySelectorAll("#diario")['0']
	console.log(buttonDiario)
	buttonDiario.onclick = function (e) {
		e.preventDefault()
		const url = `/Diario/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
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
					console.log("Diario  ", e)
					const thead = document.createElement("thead")
					const thThead = document.createElement("th")
					thThead.innerHTML = e.nome_cad
					thThead.style.position = "inherit"
					thThead.style.textAlign = "center"

					const tr = document.createElement("tr")
					tr.append(thThead)
					thead.append(tr)

					const tbody = document.createElement("tbody")

					const td1 = document.createElement("td")
					td1.innerHTML = e.cod_cadeira
					td1.style.paddingLeft = "0px"
					const tr1 = document.createElement("tr")
					console.log(tr1)

					const td2 = document.createElement("td")
					td2.innerHTML = e.prof
					td2.style.paddingLeft = "0px"
					const tr2 = document.createElement("tr")

					const td3 = document.createElement("td")
					td3.innerHTML = e.cargaHoraria
					td3.style.paddingLeft = "0px"
					const tr3 = document.createElement("tr")

					const td4 = document.createElement("td")
					td4.innerHTML = e.aulas_ministradas
					td4.style.paddingLeft = "0px"
					const tr4 = document.createElement("tr")

					const td5 = document.createElement("td")
					td5.innerHTML = e.presenca_aulas_ministradas
					td5.style.paddingLeft = "0px"
					const tr5 = document.createElement("tr")

					const td6 = document.createElement("td")
					td6.innerHTML = e.faltas
					td6.style.paddingLeft = "0px"
					const tr6 = document.createElement("tr")







					tr1.append(td1)
					tr2.append(td2)
					tr3.append(td3)
					tr4.append(td4)
					tr5.append(td5)
					tr6.append(td6)
					tbody.append(tr1)
					tbody.append(tr2)
					tbody.append(tr3)
					tbody.append(tr4)
					tbody.append(tr5)
					tbody.append(tr5)
					tbody.append(tr6)


					const tabel = document.createElement("table")
					tabel.classList.add("tabel")

					tabel.append(thead)
					tabel.append(tbody)
					conteudoPrincipal.append(tabel)
				})

			})
	}

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
