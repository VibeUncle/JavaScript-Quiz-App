// -------------All the trivia questions that will be displayed on the quiz-----------------
const questions = [
    {
        question: "What is the full meaning of HTML?",
        answers: [
            { text: "Hyper Type MarkUp Language", correct: "false"},
            { text: "Hiper Text MarkUp Language", correct: "false"},
            { text: "Hyper Text MarkUp Language", correct: "true"},
            { text: "Hyper Type Marking Language", correct: "false"},
        ]
    },
    {
        question: "What is the Function Of HTML in a webpage?",
        answers: [
            { text: "For the facilitation of better functioning of the APIs", correct: "false"},
            { text: "quicker navigtion on a webpage", correct: "false"},
            { text: "It builds the structure of the webpage", correct: "true"},
            { text: "it helps for smoother scrolling", correct: "false"},
        ]
    },
    {
        question: "What is the full meaning of CSS?",
        answers: [
            { text: "Casper Stucture Sheets", correct: "false"},
            { text: "Cascading structre sheets", correct: "false"},
            { text: "casper style sheets", correct: "false"},
            { text: "Cascading Style Sheet", correct: "true"},
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "link tag", correct: "false"},
            { text: "anchor tag", correct: "true"},
            { text: "button tag", correct: "false"},
            { text: "hyperlink tag", correct: "false"},
        ]
    },
    {
        question: "Which CSS property is used to center an element horizontally?",
        answers: [
            { text: "Text-align", correct: "true"},
            { text: "margin", correct: "false"},
            { text: "Padding", correct: "false"},
            { text: "horizontal-align", correct: "false"},
        ]
    },
    {
        question: "What is the purpose of the 'scope' attribute in an HTML table?",
        answers: [
            { text: "The 'scope' attribute is used to specify the width of the table.", correct: "false"},
            { text: "The 'scope' attribute is not a valid attribute for HTML tables.", correct: "false"},
            { text: "The 'scope' attribute is used to specify the height of the table.", correct: "false"},
            { text: "The 'scope' attribute is used to specify the scope of the heading cell(s) in a data table", correct: "true"},
        ]
    },
    {
        question: "What is the correct syntax for creating a CSS class?",
        answers: [
            { text: "#classname", correct: "false"},
            { text: ".classname", correct: "true"},
            { text: "$classname", correct: "false"},
            { text: "*classname", correct: "false"},
        ]
    },
    {
        question: "Which HTML tag is used to create an ordered list?",
        answers: [
            { text: "li tag", correct: "false"},
            { text: "dl tag", correct: "false"},
            { text: "ul tag", correct: "false"},
            { text: "ol tag", correct: "true"},
        ]
    }
];

// -----------adding the variables for the necessary html elements-----------------
const questionTag = document.getElementById("question")
const answerButton = document.getElementById("answer-btn")
const nextButton = document.getElementById("next-btn")

// -----varibles for the question number that will increase after each question, and the scores that will be displayed at the end of the quiz---------------
let currentQuestionIndex = 0;
let score = 0;

//-------- function that resets the question number and score whenever the quiz starts----------------
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;

    // ----at the end of the quiz, this "next" button will change to "Play again"
    nextButton.innerHTML = "Next";

    //-------- this function is to display the actual questions that have been set for the quiz----------
    showQuestion();
}

// ----defining the Show-question function-----
function showQuestion(){

    // ---------this function tells the browser to clear off the first questions, before displaying the actual questions
    resetSelf()

    // ----this variable signifies that what the currentQuestionIndex has a value of 0, it will display the first question, and so on  with other index values----
    let currentQuestion = questions[currentQuestionIndex];

    // this variable stores the value of the index number, therefore if the index value is zero, the question number will be One, and so on with other index values------
    let questionNo = currentQuestionIndex + 1;

    // --------this displays the question yhatb has been stored in the variable------
    questionTag.innerHTML = questionNo + "." +     currentQuestion.question;

    //-----this is to display the current  answers------------
    currentQuestion.answers.forEach(answer => {

        // ------this variable automatically creates a new memory location fot the actual answer buttons----------
        const button = document.createElement("button");
        button.innerHTML = answer.text;

        // this automatically adds the button variable value to the 'answers-btn' div in the html code----------
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        // ----this adds the click function to the answer buttons------
        button.addEventListener("click", selectAnswer);
    });
}

//--------------- defining the resetSelf function
function resetSelf(){
    nextButton.style.display = "none";
    while (answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

// -----defining the selectAnswer function from the eventListner-----
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    //---------this section disables other option buttons after one has been clicked, it also reveals the correct answer is the wrong one was selected, then it displays the button that will direct you to the next question------- 
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

// this defines the showscore function which will display the user's score if there are no more questions, it will also display the Restart Quiz button to restart the quiz
function showScore(){
    resetSelf();
    questionTag.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart quiz";
    nextButton.style.display = "block";
}

// this defines the handleNextButton function
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
// -------this defines click function of the Next button.
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
    handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz(); 
