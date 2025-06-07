function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//========== QUIZ ==========
quiz_score = 0

class QA{
    index
    question
    ans1
    ans2
    ans3
    ans4
    posAnswer
    constructor(index, question, ans1, ans2, ans3, ans4, posAnswer){
        this.index = index
        this.question = question
        this.ans1 = ans1
        this.ans2 = ans2
        this.ans3 = ans3
        this.ans4 = ans4
        this.posAnswer = posAnswer
    }
}

qa_array = [
    new QA(1, "O que caracteriza uma enchente?", "Apenas acúmulo de água em áreas costeiras", "Aumento de temperatura em áreas urbanas", "Elevação temporária do nível da água que transborda rios ou canais", "Ocorrência de terremotos e deslizamentos simultâneos", 2),
    new QA(2, "Qual é um fator natural que pode contribuir para enchentes?", "Impermeabilização urbana", "Plantio de árvores", "Chuvas intensas e prolongadas", "Obstrução de bueiros por lixo", 2),
    new QA(3, "Qual atitude mais segura em uma enchente urbana?", "Andar por ruas alagadas com água até o joelho", "Subir em locais altos e esperar por ajuda", "Dirigir por vias alagadas", "Tentar nadar até o destino mais próximo", 1),
    new QA(4, "Qual destes dados ambientais é mais relevante para prever enchentes?", "Número de semáforos por bairro", "Volume de chuvas acumuladas", "Quantidade de carros nas ruas", "Temperatura da superfície", 1),
    new QA(5, "O que significa o termo data lake, no contexto do projeto?", "Um local alagado com equipamentos eletrônicos", "Uma tecnologia de comunicação sem fio", "Um grande repositório de dados brutos organizados", "Uma inteligência artificial de previsão climática", 2),
    new QA(6, "Qual tecnologia pode ser usada para detectar risco de enchentes?", "Micro-ondas", "GPS veicular", "Sensor de umidade do solo", "Câmera de segurança", 2),
    new QA(7, "O que fazer se você estiver dentro de casa durante uma enchente?", "Ir para o porão e esperar baixar", "Deitar-se no chão e aguardar socorro", "Subir para o andar mais alto e desligar a energia", "Abrir todas as janelas", 2),
    new QA(8, "Como a urbanização descontrolada contribui para enchentes?", "Aumenta o consumo de água", "Reduz áreas de vegetação e infiltração", "Diminui o número de bueiros", "Melhora o escoamento natural da chuva", 2),
    new QA(9, "Qual informação é mais útil para um sistema de alertas de enchente?", "Frequência de uso do transporte público", "Umidade relativa do ar em locais fechados", "Precipitação acumulada nas últimas 24h", "Quantidade de turistas na cidade", 2),
    new QA(10, "O que deve ser feito após sair de uma área alagada?", "Comer imediatamente", "Caminhar descalço para evitar molhar o sapato", "Lavar as partes do corpo que tiveram contato com a água", "Beber a água acumulada se estiver com sede", 2)
]

let index = 0
const questionEl = document.getElementById("question");
const questionButtonEl = document.getElementsByClassName("question-btn");

function quizstart(){
    document.getElementById("start").remove()
    document.getElementById("quiz").classList.remove("hidden")
}

function score(option){
    questionTransition()
    give1point(option)
}

function endQuiz() {
    document.getElementById("quiz").remove()
    document.getElementById("end").classList.remove("hidden")
    calculateResults()
}

const backQuestion = async() => {
    if (index > 1) {
        index --;
        questionBeforeWord = `${qa_array[index].index}. ${qa_array[index].question}`
        questionAfterWord = `${qa_array[index-1].index}. ${qa_array[index-1].question}`
        index --;
    
        Array.from(questionButtonEl).forEach(btn => {
            btn.classList.add("lock")
        });
        
        for(let i = questionBeforeWord.length; i > 0; i--) {
            questionEl.innerHTML = questionBeforeWord.substring(0, i - 1)
            await sleep(15)
        }
        await sleep(400)
        for(let i = 0; i <= questionAfterWord.length; i++) {
            questionEl.innerHTML = questionAfterWord.substring(0, i + 1)
            await sleep(15)
        }
       changeQA()
    }
}

const questionTransition = async () => {
    
    if (index == 10){
        endQuiz()
        return
    }
    questionBeforeWord = `${qa_array[index-1].index}. ${qa_array[index-1].question}`
    questionAfterWord = `${qa_array[index].index}. ${qa_array[index].question}`

    Array.from(questionButtonEl).forEach(btn => {
        btn.classList.add("lock")
    });
    

    for(let i = questionBeforeWord.length; i > 0; i--) {
        questionEl.innerHTML = questionBeforeWord.substring(0, i - 1)
        await sleep(15)
    }
    await sleep(400)
    for(let i = 0; i <= questionAfterWord.length; i++) {
        questionEl.innerHTML = questionAfterWord.substring(0, i + 1)
        await sleep(15)
    }
   changeQA()
}
function changeQA(){
    if(index == 0) {
        questionEl.innerHTML = `${qa_array[index].index}. ${qa_array[index].question}`
    }
    Array.from(questionButtonEl).forEach(btn => {
        btn.classList.remove("lock")
        btn.blur()
    });
    document.getElementById(1).innerHTML = qa_array[index].ans1
    document.getElementById(2).innerHTML = qa_array[index].ans2
    document.getElementById(3).innerHTML = qa_array[index].ans3
    document.getElementById(4).innerHTML = qa_array[index].ans4

    index++
}
changeQA()

function give1point(option){
    if (qa_array[index].posAnswer == option) {
        quiz_score ++
    }
}

function calculateResults(){
    resultadoText = document.getElementById("resultados")
    resultadoText.innerHTML = quiz_score
}