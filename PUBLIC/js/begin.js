
window.onload = function(){
	fetch(`https://myalunoif.firebaseio.com/Alunos/${data.id_Matricula}/info.json`,{method: "GET"})
		.then(res=> res.json())
		.then(resp=>{
			document.querySelector('.user').innerHTML = resp.nome_perfil
			document.querySelectorAll('#img')["0"].srcset = resp.foto_perfil
			document.querySelectorAll('#img')["1"].src = resp.foto_perfil
		})

	const buttonHorario = document.querySelectorAll("#horario")['0']
	console.log(buttonHorario)
	buttonHorario.onclick = function(e){
		e.preventDefault()
		const url = `/horario/${data.id_Matricula}` //esse id tem que vir da pag login/backend e colocar em templant string
			fetch(url,{method: "GET"})
				.then(resp=> resp.json())
				.then(res =>{
					const conteudoPrincipal = document.querySelector('.conteudo-principal')
					const tabelPrimeira = document.getElementsByClassName("tabel")["0"]
					conteudoPrincipal.removeChild(tabelPrimeira)
					res = Array.from(res)
					console.log(res)
					res.forEach(e=>{
						const thead = document.createElement("thead")
						const thThead = document.createElement("th")
						thThead.innerHTML = e.diaSemana
						const tr = document.createElement("tr")
						tr.append(thThead)
						thead.append(tr)

						const tbody = document.createElement("tbody")

						for(let i = 0; i<e.horario.length;i++){
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
}
