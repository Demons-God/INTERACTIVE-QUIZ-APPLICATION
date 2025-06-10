// Sample Questions
const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Gd", "Go"],
        answer: "Au"
    },
    {
        question: "Which country hosted the 2016 Summer Olympics?",
        options: ["China", "Brazil", "United Kingdom", "Russia"],
        answer: "Brazil"
    }
];

// DOM Elements
const registration = document.getElementById('registration');
const regForm = document.getElementById('regForm');
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const result = document.getElementById('result');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

// Start Quiz after Registration
regForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');

    if (nameInput.value && emailInput.value) {
        userName = nameInput.value;
        registration.classList.add('hidden');
        quiz.classList.remove('hidden');
        showQuestion();
    }
});

// Show Question
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.addEventListener('click', selectAnswer);
        optionsEl.appendChild(li);
    });
}

// Reset State
function resetState() {
    nextBtn.classList.add('hidden');
    feedbackEl.textContent = '';
    while (optionsEl.firstChild) {
        optionsEl.removeChild(optionsEl.firstChild);
    }
}

// Select Answer
function selectAnswer(e) {
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
        selectedOption.classList.add('correct');
        feedbackEl.textContent = "Correct!";
        score++;
    } else {
        selectedOption.classList.add('incorrect');
        feedbackEl.textContent = `Incorrect! The correct answer was "${correctAnswer}".`;
    }

    // Disable all options
    Array.from(optionsEl.children).forEach(option => {
        option.removeEventListener('click', selectAnswer);
        option.style.pointerEvents = 'none';
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
        }
    });

    nextBtn.classList.remove('hidden');
}

// Next Question
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Show Result
function showResult() {
    quiz.classList.add('hidden');
    result.classList.remove('hidden');
    scoreEl.textContent = `${userName}, your score is ${score} out of ${questions.length}.`;
}

// Restart Quiz
restartBtn.addEventListener('click', () => {
    result.classList.add('hidden');
    registration.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    regForm.reset();
});
