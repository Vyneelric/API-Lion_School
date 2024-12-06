const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')

const app = express()


app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

var cursos = require('./modulo/filtro.js')

app.get('/v1/lion-school/cursos', cors(), async function(request, response){

    let dados = cursos.getListaCursos()

    response.status(200)
    response.json(dados)
})


app.get('/v1/lion-school/alunos', cors(), async function(request, response){
    let dados = cursos.getListaAlunos()

    response.status(200)
    response.json(dados)
})

app.get('/v1/lion-school/alunos/filtro', async function(request, response) {
    const { status, curso, ano_conclusao } = request.query
    let dados


        if (curso && status) {
            dados = cursos.getDisciplinaAluno(curso, status)
            if (dados) {
                return response.status(200).json(dados)
            } else {
                return response.status(404).json({ status: 404, message: 'Não foi possível encontrar o aluno ou disciplina' })
            }
        }
        

    if (curso && ano_conclusao) {
        dados = cursos.getAnoConclusao(curso, ano_conclusao)
        if (dados) {
            return response.status(200).json(dados)
        } else {
            return response.status(404).json({ status: 404, message: 'Não foi possível encontrar o curso ou ano de conclusão' })
        }
    }

    if (status) {
        dados = cursos.getStatusAluno(status)
        if (dados) {
            return response.status(200).json(dados)
        } else {
            return response.status(404).json({ status: 404, message: 'Nenhum aluno encontrado com esse status' })
        }
    }

    return response.status(400).json({ status: 400, message: 'Parâmetros insuficientes para realizar a busca' })
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response) {
    let matricula = request.params.matricula
    let dados = cursos.getMatricula(matricula)
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado este aluno'})
    }
})

app.get('/v1/lion-school/alunos/cursos/:sigla', cors(), async function (request, response){
    
    let siglaCurso = request.params.sigla
    let dados = cursos.getAlunosCurso(siglaCurso)
    
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado este curso'})
    }
})


app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})

