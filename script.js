const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Marking Language"],
        correct: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["text-color", "color", "font-color", "fgcolor"],
        correct: "color"
    },
    {
        question: "What is the correct syntax for referring to an external script called 'app.js'?",
        options: ["script src='app.js'", "script href='app.js'", "script ref='app.js'", "script name='app.js'"],
        correct: "script src='app.js'"
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: ["var carName;", "v carName;", "variable carName;", "declare carName;"],
        correct: "var carName;"
    },
    
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets", "Creative Style Sheets"],
        correct: "Cascading Style Sheets"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["js", "scripting", "javascript", "script"],
        correct: "script"
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: ["bgcolor", "color", "background-color", "background"],
        correct: "background-color"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        correct: "alert('Hello World');"
    },
    {
        question: "Which HTML element is used to specify a footer for a document or section?",
        options: ["section", "footer", "foot", "bottom"],
        correct: "footer"
    },
    {
        question: "What is the correct HTML for making a text input field?",
        options: ["input type='text'", "textfield", "textinput type='text'", "input"],
        correct: "input type='text'"
    },
    {
        question: "Which attribute is used to specify that an input field must be filled out?",
        options: ["validate", "required", "placeholder", "mandatory"],
        correct: "required"
    },
    {
        question: "Which CSS property is used to make text bold?",
        options: ["text-weight", "font-weight", "bold", "text-bold"],
        correct: "font-weight"
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = 'red', 'green', 'blue';", "var colors = ['red', 'green', 'blue'];", "var colors = {'red', 'green', 'blue'};", "var colors = (1:'red', 2:'green', 3:'blue');"],
        correct: "var colors = ['red', 'green', 'blue'];"
    },
    {
        question: "Which HTML tag is used to define an unordered list that is bulleted?",
        options: ["list", "ul", "ol", "li"],
        correct: "ul"
    },
    {
        question: "What does JSON stand for?",
        options: ["JavaScript Object Notation", "Java Source Open Network", "JavaScript Oriented Notation", "Java Standard Output Network"],
        correct: "JavaScript Object Notation"
    },
   
    {
        question: "Which property is used to change the background color of an element?",
        options: ["background-color", "color", "bgcolor", "background"],
        correct: "background-color"
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function = myFunction()", "function:myFunction()", "function myFunction()", "function -> myFunction()"],
        correct: "function myFunction()"
    },
    {
        question: "Which CSS property is used to change the font of an element?",
        options: ["font-family", "font-style", "font-variant", "font-size"],
        correct: "font-family"
    }
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const submitBtn = document.getElementById('submit');
const timerEl = document.getElementById('time');
const progressBar = document.getElementById('progress-bar');

let currentQuiz = 0;
let score = 0;
let timeLeft = 10;
let timer;

loadQuiz();

function loadQuiz() {
    clearInterval(timer);
    timeLeft = 10;
    timerEl.innerText = timeLeft;
    timer = setInterval(updateTimer, 1000);

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    optionsEl.innerHTML = '';

    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerHTML = `
            <input type="radio" name="answer" id="option${index}" value="${option}" class="answer">
            <label for="option${index}">${option}</label>
        `;
        optionsEl.appendChild(optionElement);
    });

    progressBar.style.width = `${(currentQuiz / quizData.length) * 100}%`;
}

function updateTimer() {
    timeLeft--;
    timerEl.innerText = timeLeft;

    if (timeLeft === 0) {
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    }
}

function getSelected() {
    let selectedOption;
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        if (answer.checked) {
            selectedOption = answer.value;
        }
    });
    return selectedOption;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    }
});

function showResults() {
    clearInterval(timer);
    quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button onclick="location.reload()">Reload</button>
    `;
}
