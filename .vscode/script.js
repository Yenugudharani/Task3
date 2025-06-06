document.addEventListener('DOMContentLoaded', () => {

    const quizData = [
        {
            question: "Q1. Which tag creates a hyperlink?",
            answers: [
                { text: "<div>", correct: false },
                { text: "<a>", correct: true },
                { text: "<href>", correct: false },
                { text: "<link>", correct: false }
            ]
        },
        {
            question: "Q2. What does CSS stand for?",
            answers: [
                { text: "Creative Style Sheets", correct: false },
                { text: "Computer Style Sheets", correct: false },
                { text: "Cascading Style Sheets", correct: true },
                { text: "Colorful Style Sheets", correct: false }
            ]
        },
        {
            question: "Q3. Which property is used to change the background color?",
            answers: [
                { text: "color", correct: false },
                { text: "bgcolor", correct: false },
                { text: "background-color", correct: true },
                { text: "background", correct: false }
            ]
        },
        {
            question: "Q4. How do you select an element with id 'demo'?",
            answers: [
                { text: ".demo", correct: false },
                { text: "#demo", correct: true },
                { text: "demo", correct: false },
                { text: "*demo", correct: false }
            ]
        }
    ];

    const questionElement = document.getElementById('question-text');
    const answerButtonsContainer = document.getElementById('answer-buttons');
    const nextBtn = document.getElementById('next-btn');
    const getJokeBtn = document.getElementById('getJokeBtn');
    const jokeDisplay = document.getElementById('jokeDisplay');

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        if (!questionElement || !answerButtonsContainer || !nextBtn) {
            console.error("Quiz HTML elements not found! Check your HTML file for errors.");
            return;
        }
        currentQuestionIndex = 0;
        score = 0;
        nextBtn.innerHTML = "Next";
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.innerHTML = currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("answer-btn");
            if (answer.correct) {
                button.dataset.correct = "true";
            }
            answerButtonsContainer.appendChild(button);
            button.addEventListener("click", selectAnswer);
        });
    }

    function resetState() {
        nextBtn.style.display = "none";
        while (answerButtonsContainer.firstChild) {
            answerButtonsContainer.removeChild(answerButtonsContainer.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";

        if (isCorrect) {
            score++;
        }

        Array.from(answerButtonsContainer.children).forEach(button => {
            button.disabled = true;
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            } else {
                button.classList.add("incorrect");
            }
        });
        nextBtn.style.display = "block";
    }

    function showScore() {
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${quizData.length}!`;
        nextBtn.innerHTML = "Play Again";
        nextBtn.style.display = "block";
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    async function getJoke() {
        jokeDisplay.innerHTML = '<p>Fetching a new joke...</p>';
        const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
        try {
            const response = await fetch(JOKE_API_URL);
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const data = await response.json();
            jokeDisplay.innerHTML = '';
            if (data.type === 'twopart') {
                jokeDisplay.innerHTML = `<p class="joke-setup">${data.setup}</p><p class="joke-punchline">${data.delivery}</p>`;
            } else {
                jokeDisplay.innerHTML = `<p class="joke-punchline">${data.joke}</p>`;
            }
        } catch (error) {
            console.error('Failed to fetch joke:', error);
            jokeDisplay.innerHTML = '<p>Oops! Could not fetch a joke. Please try again.</p>';
        }
    }

    nextBtn.addEventListener("click", () => {
        if (currentQuestionIndex < quizData.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });
    getJokeBtn.addEventListener('click', getJoke);
    
    startQuiz();
});