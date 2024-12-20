const questions = [
    {
        question: "Which IPL team does Virat Kohli play for?",
        answers: [
            { text: "Mumbai Indians", correct: false },
            { text: "Royal Challengers Bangalore", correct: true },
            { text: "Chennai Super Kings", correct: false },
            { text: "Delhi Capitals", correct: false },
        ]
    },

    {
        question: "Who holds the record for the highest number of centuries in IPL?",
        answers: [
            { text: "Virat Kohli", correct: false },
            { text: "Chris Gayle", correct: false },
            { text: "David Warner", correct: false },
            { text: "Virat Kohli and Chris Gayle (Tied)", correct: true },
        ]
    },
    {
        question: "What is the highest score by Virat Kohli in an IPL match?",
        answers: [
            { text: "109*", correct: false },
            { text: "122*", correct: false },
            { text: "117*", correct: true },
            { text: "101*", correct: false },
        ]
    },
    {
        question: "In which year did Virat Kohli win the Orange Cap in IPL?",
        answers: [
            { text: "2016", correct: true },
            { text: "2018", correct: false },
            { text: "2015", correct: false },
            { text: "2020", correct: false },
        ]
    },
    {
        question: "How many centuries has Virat Kohli scored in IPL?",
        answers: [
            { text: "5", correct: true },
            { text: "4", correct: false },
            { text: "6", correct: false },
            { text: "3", correct: false },
        ]
    },
    {
        question: "Which bowler dismissed Virat Kohli the most in IPL?",
        answers: [
            { text: "Sunil Narine", correct: false },
            { text: "Sandeep Sharma", correct: true },
            { text: "Rashid Khan", correct: false },
            { text: "Dwayne Bravo", correct: false },
        ]
    },
    
    {
        question: "Who is known as the 'God of Cricket' in India?",
        answers: [
            { text: "Virat Kohli", correct: false },
            { text: "Sachin Tendulkar", correct: true },
            { text: "MS Dhoni", correct: false },
            { text: "Rohit Sharma", correct: false },
        ]
    },
    {
        question: "Which Indian cricketer is famous for hitting 6 sixes in an over in T20 cricket?",
        answers: [
            { text: "Yuvraj Singh", correct: true },
            { text: "Ravindra Jadeja", correct: false },
            { text: "Virender Sehwag", correct: false },
            { text: "Hardik Pandya", correct: false },
        ]
    },
    {
        question: "Which Indian captain led the team to its first Cricket World Cup victory in 1983?",
        answers: [
            { text: "Kapil Dev", correct: true },
            { text: "Sunil Gavaskar", correct: false },
            { text: "MS Dhoni", correct: false },
            { text: "Sourav Ganguly", correct: false },
        ]
    },
    {
        question: "Who holds the record for the highest individual score in ODIs by an Indian?",
        answers: [
            { text: "Sachin Tendulkar", correct: false },
            { text: "Rohit Sharma", correct: true },
            { text: "Virat Kohli", correct: false },
            { text: "Shikhar Dhawan", correct: false },
        ]
    }
    
    
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();