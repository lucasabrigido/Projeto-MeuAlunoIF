class HorarioIndividual {
	constructor(matriz) {
		this.horarioIndividual = matriz;
		}
	getHorario() {
		//console.log(this.horarioIndividual)
		//segunda = this.horarioIndividual[1][0] == "07:40~08:39" ? segunda
		const turno = {
			Manha: this.horarioIndividual[1][0] <= "11:00~12:00" ? "Manhã" : "tarde"
		}

		const segunda = {
			dia : this.horarioIndividual[0][1],
			AB1: this.horarioIndividual[1][1],
			AB2: this.horarioIndividual[2][1],
			CD1: this.horarioIndividual[3][1],
			CD2: this.horarioIndividual[4][1],
			EF1: this.horarioIndividual[5][1],
			EF2: this.horarioIndividual[6][1],
			GH1: this.horarioIndividual[7][1],
			GH2: this.horarioIndividual[8][1]
		}
		const terca = {
			dia : this.horarioIndividual[0][2],
			AB1: this.horarioIndividual[1][2],
			AB2: this.horarioIndividual[2][2],
			CD1: this.horarioIndividual[3][2],
			CD2: this.horarioIndividual[4][2],
			EF1: this.horarioIndividual[5][2],
			EF2: this.horarioIndividual[6][2],
			GH1: this.horarioIndividual[7][2],
			GH2: this.horarioIndividual[8][2]
		}
		const quarta = {
			dia : this.horarioIndividual[0][3],
			AB1: this.horarioIndividual[1][3],
			AB2: this.horarioIndividual[2][3],
			CD1: this.horarioIndividual[3][3],
			CD2: this.horarioIndividual[4][3],
			EF1: this.horarioIndividual[5][3],
			EF2: this.horarioIndividual[6][3],
			GH1: this.horarioIndividual[7][3],
			GH2: this.horarioIndividual[8][3]
		}
		const quinta = {
			dia : this.horarioIndividual[0][4],
			AB1: this.horarioIndividual[1][4],
			AB2: this.horarioIndividual[2][4],
			CD1: this.horarioIndividual[3][4],
			CD2: this.horarioIndividual[4][4],
			EF1: this.horarioIndividual[5][4],
			EF2: this.horarioIndividual[6][4],
			GH1: this.horarioIndividual[7][4],
			GH2: this.horarioIndividual[8][4]
		}
		const sexta = {
			dia : this.horarioIndividual[0][5],
			AB1: this.horarioIndividual[1][5],
			AB2: this.horarioIndividual[2][5],
			CD1: this.horarioIndividual[3][5],
			CD2: this.horarioIndividual[4][5],
			EF1: this.horarioIndividual[5][5],
			EF2: this.horarioIndividual[6][5],
			GH1: this.horarioIndividual[7][5],
			GH2: this.horarioIndividual[8][5]
		}
		let OrganizarAula = [{turno},{segunda},{terca},{quarta},{quinta},{sexta}]
		return OrganizarAula
	}

}

class Diario{
	
	constructor(nome_cad,prof,cod_cadeira,cargaHoraria,aulas_ministradas,presenca_aulas_ministradas,faltas,N1,N2,Media){
		this.nome_cad = nome_cad
		this.prof = prof
		this.cod_cadeira = cod_cadeira
		this.cargaHoraria = cargaHoraria
		this.aulas_ministradas = aulas_ministradas
		this.presenca_aulas_ministradas = presenca_aulas_ministradas
		this.faltas = faltas
		this.N1 = N1
		this.N2 = N2
		this.Media = Media
	}
}

class myReportCard{
		constructor(boletim){
			this.boletim = boletim
		}
}

class CalendarioAcademico{
	constructor(semestre){
		this.semestre = semestre
	}
}

class MaterialEscolar {
	constructor(vetor) {
		this.info = vetor
		//this.posicao = posição
	}
	getMaterial(){
		var contadorMateria = 1;
		for(var i = 0;i<this.info.length;i++){
			this.info[i] =  this.info[i].split(",")
		}
		return this.info
	}
}

class MatrizCurricular{
	constructor(vetor){
		this.dentro = vetor[0]
		this.fora = vetor[1]
	}
}

class Aluno{
    constructor(horarioFinal,Diario,myReportCard,Calen_Academic,material,matrizCurricular){
        this.horarioFinal = horarioFinal
		this.Diario = Diario
		this.myReportCard = myReportCard
        this.Calen_Academic = Calen_Academic
        this.material = material
        this.matrizCurricular = matrizCurricular
    }
}

module.exports = {HorarioIndividual,Diario,myReportCard,CalendarioAcademico,MaterialEscolar,MatrizCurricular,Aluno}
