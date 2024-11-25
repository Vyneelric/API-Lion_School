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


app.get('/v1/lion-school/alunos/filtro', async function(request, response) {
    const curso = request.query.curso
    const status = request.query.status
    const dados = cursos.getStatusAluno(status, curso)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ status: 404, message: 'Nenhum aluno encontrado com esse status' })
    }
})

app.get('/v1/lion-school/alunos/filtro', async function(request, response) {
    const sigla = request.query.sigla
    const disciplina = request.query.disciplina
    const dados = cursos.getDisciplinaAluno(sigla, disciplina)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ status: 404, message: 'Não foi possível encontrar o aluno ou disciplina' })
    }
})

app.get('/v1/lion-school/alunos/filtro', async function(request, response) {
    const sigla = request.query.sigla
    const ano = request.query.ano
    const dados = cursos.getAnoConclusao(sigla, ano)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ status: 404, message: 'Não foi possível encontrar o curso ou ano de conclusão' })
    }
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

