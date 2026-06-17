const startButton= document.getElementById('start-btn')
//const startButton = document.getElementById("start-btn");
const scoreElement = document.getElementById('right-answers');


const nextButton= document.getElementById('next-btn')

const questioncontainerElement= document.getElementById('question-container')
const questionElement= document.getElementById('question')
const answerButtonsElement= document.getElementById('answer-buttons')
let shuffledQuestions,currentQuestionIndex;
let quizScore=0;

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',setnextQuestion)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setnextQuestion()
})



function startGame(){
    startButton.classList.add('hide')
      quizScore=0
    shuffledQuestions=questions.sort(()=>Math.random() -0.5)//checked
    currentQuestionIndex=0;
    console.log(shuffledQuestions);
console.log(questionElement);
    questioncontainerElement.classList.remove('hide')
    setnextQuestion()
  
}



function setnextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question){
    questionElement.innerText=question.question;  //checked
    question.answers.forEach((answer)=>{
        const button=document.createElement('button')
        button.innerText=answer.text;
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
button.addEventListener('click',selectAnswer)
answerButtonsElement.appendChild(button)
    })
}


function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')    //checked
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}




function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    if(correct === "true"){
        quizScore++
    }

    setStatusClass(document.body, correct)

    Array.from(answerButtonsElement.children).forEach((button)=>{
        setStatusClass(button, button.dataset.correct)
    })

    // ✅ Correct condition
    if(currentQuestionIndex < shuffledQuestions.length - 1){
        nextButton.classList.remove("hide")
    } else {
        endQuiz()
    }
}



function restartQuiz() {
    quizScore = 0;
    currentQuestionIndex = 0;

    document.getElementById('end-screen').classList.add('hide');
    startButton.innerText = "Start";
    startButton.classList.remove('hide');
}

function setStatusClass(element,correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add("correct")
    }//checked
    else{
        element.classList.add("wrong")
    }
}



function endQuiz() {
    questioncontainerElement.classList.add('hide');
    nextButton.classList.add('hide');

    document.getElementById('end-screen').classList.remove('hide');

    scoreElement.innerText = quizScore;
}


function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}        //checked
const questions=[
  {
    question:'In which year India got Independence?',
    answers:[
        { text:'1947',correct:true},
        { text:'1913',correct:false},
        { text:'1950',correct:false},
        { text:'1919',correct:false},
    ]
},
{
    question:'Who is the Prime Minister of India?',
    answers:[
        { text:'Narendra Modi',correct:true},
        { text:'Rahul Gandhi',correct:false},
    
    ]
},
 {
    question:'What is the capital of India?',
    answers:[
        { text:'Mumbai',correct:false},
        { text:'Lucknow',correct:false},
        { text:'Delhi',correct:true},
        { text:'Imphal',correct:false},
    ]
},
 {
    question:'Which is the longest river in India?',
    answers:[
        { text:'Kaveri',correct:false},
        { text:'Krishna',correct:false},
        { text:'Yamuna',correct:false},
        { text:'Ganga',correct:true},
    ]
},
 {
    question:'Who wrote the Indian national anthem, "Jana Gana Mana"?',
    answers:[
        { text:'Bhagat Singh',correct:false},
        { text:'Rabindranath Tagore',correct:true},
        { text:'Bankim Chand Chattopadhyay',correct:false},
        { text:'Mahatma Gandhi',correct:false},
    ]
},
]