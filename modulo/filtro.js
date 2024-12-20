var cursos_api = require('./cursos.js')
var alunos_api = require('./alunos.js')


const getListaCursos = function(){
    let curso = cursos_api.cursos
    let ListaNomes = []
    let RetornaCurso = {}

    curso.forEach(function(item){
        ListaNomes.push(RetornaCurso = {
            curso: item.sigla,
            nome: item.nome,
            carga_horaria: item.carga,
            icone: item.icone
        })
    })

    return ListaNomes
}

const getListaAlunos = function(){
    let alunos = alunos_api.alunos
    let ListaAlunos = []
    let tudoAluno = false

    alunos.forEach(function(item){
        ListaAlunos.push(tudoAluno = {
            foto: item.foto,
            nome: item.nome,
            matricula: item.matricula,
            sexo: item.sexo,
            curso: item.curso,
            status: item.status
        })
    })

    return ListaAlunos
}

const getMatricula = function(pegarValor) {
    let alunos = alunos_api.alunos
    let api = pegarValor
    let AlunoEspecificado = false

    alunos.forEach(function(item) {
        if (item.matricula == api) {
            AlunoEspecificado = {
                nome: item.nome,
                matricula: item.matricula,
                sexo: item.sexo,
                curso: item.curso,
                status: item.status
            }
        }
    })

    return AlunoEspecificado
}

const getAlunosCurso = function(pegarValor){
    let alunos = alunos_api.alunos
    let api = pegarValor.toUpperCase()
    let AlunosCurso = false
    let NomesAlunos = []
    
    alunos.forEach(function(item){
        item.curso.forEach(function(item2){
            if (item2.sigla.toUpperCase() == api){
                NomesAlunos.push(({
                    foto: item.foto,
                    nome: item.nome,
                    matricula: item.matricula,
                    sexo: item.sexo,
                    curso: item.curso  
                }))
                AlunosCurso = {
                curso: item2.sigla,
                nome: NomesAlunos
            }
        }
        })
    })
    return AlunosCurso
}

const getStatusAluno = function(pegarValor){
    let alunos = alunos_api.alunos
    let api = pegarValor.toUpperCase()
    let juntos = false
    let AlunosCurso = []

    alunos.forEach(function(item){
        if (item.status.toUpperCase() == api){
            AlunosCurso.push({
                foto: item.foto,
                nome: item.nome,
                matricula: item.matricula,
                sexo: item.sexo,
                curso: item.curso  
            })
            juntos = {
                status: item.status,
                alunos: AlunosCurso
            }
        }
    })

    return juntos
}
  
const getDisciplinaAluno = function(pegarValor, pegarValor2) {
    let alunos = alunos_api.alunos
    let api = pegarValor.toUpperCase()
    let api2 = pegarValor2.toUpperCase()
    let resultado = false
    let ListaNomes = []
    let ListaDisciplinas = []

    alunos.forEach(function(item){
        item.curso.forEach(function(item2){
            if (item2.sigla.toUpperCase() == api.toUpperCase()){
                item2.disciplinas.forEach(function(item3){
                    if (item3.status.toUpperCase() == api2.toUpperCase()){
                        ListaNomes.push(item.nome)
                        ListaDisciplinas.push(item3.nome)

                        resultado = {
                            curso: item2.sigla,
                            status_disciplina: item3.status,
                            alunos: ListaNomes,
                            nome_disciplina: ListaDisciplinas
                        }
                    }
                })
            }
        })
    })

    return resultado
}

const getAnoConclusao = function(pegarValor, pegarValor2) {
    let alunos = alunos_api.alunos
    let curso = cursos_api.cursos
    let api = pegarValor.toUpperCase()
    let api2 = pegarValor2.toUpperCase()
    let resultado = false
    let ListaNomes = []

    alunos.forEach(function(item) {
        item.curso.forEach(function(item2) {
            curso.forEach(function(item3) {
                if (item2.sigla.toUpperCase() == api && item2.conclusao == api2) {
                    // Verificando se o nome do aluno já foi adicionado
                    if (!ListaNomes.some(aluno => aluno.nome === item.nome)) {
                        ListaNomes.push({
                            foto: item.foto,
                            nome: item.nome,
                            matricula: item.matricula,
                            sexo: item.sexo,
                            curso: item.curso
                        })
                    }
                    resultado = {
                        Ano_Conclusao: item2.conclusao,
                        curso: item3.sigla,
                        alunos: ListaNomes
                    }
                }
            })
        })
    })

    return resultado
}



module.exports = {
    getListaCursos,
    getListaAlunos,
    getMatricula,
    getAlunosCurso,
    getStatusAluno,
    getDisciplinaAluno,
    getAnoConclusao,
}

//console.log(getAnoConclusao('DS', '2022'))
//console.log(getDisciplinaAluno('ds','aprovado'))
//console.log(getStatusAluno('CURSANDO'))
//console.log(getAlunosCurso('ds'))
//console.log(getMatricula('matricula'))
//console.log(getListaAlunos())
//console.log(getListaCursos())