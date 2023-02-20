// Definisci la durata del timer in secondi
var duration = 3;

// Seleziona l'elemento del DOM in cui visualizzare il timer
var timerDisplay = document.getElementById('timer');

// Avvia il timer
var timer = setInterval(function() {
  // Riduci il tempo rimanente di un secondo
  duration--;

  // Aggiorna il testo del timer visualizzato nell'elemento del DOM selezionato
  timerDisplay.textContent = 'Tempo rimanente: ' + duration + ' secondi';

  // Se il tempo è scaduto, interrompi il timer e fai qualcosa (ad esempio, invia il quiz)
  if (duration <= 0) {
    clearInterval(timer);
    // qui puoi aggiungere il codice per inviare il quiz o eseguire altre azioni in caso di tempo scaduto
  }
}, 1000); // 1000 millisecondi = 1 secondo



// Define quiz questions and answers
const quizData = [
    {
        question: 'What is the capital of France?',
        choices: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        correct: 'Paris'
    },
    {
        question: 'What is the largest country in the world?',
        choices: ['China', 'Russia', 'USA', 'Brazil'],
        correct: 'Russia'
    },
    {
        question: 'What is the currency of Japan?',
        choices: ['Yuan', 'Won', 'Yen', 'Euro'],
        correct: 'Yen'
    },
    {
        question: 'Who is the CEO of Tesla?',
        choices: ['Elon Musk', 'Jeff Bezos', 'Bill Gates', 'Mark Zuckerberg'],
        correct: 'Elon Musk'
    }
];

// Get quiz container and result container
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');

// Show quiz questions and choices
function showQuiz(timer) {
    let currentQuestion = 0;
    let score = 0;
    if (timer === 0) {
        currentQuestion++;
    }

    function showQuestion() {
        const question = quizData[currentQuestion];
        document.getElementById('question').textContent = question.question;

        const choices = document.getElementById('choices');
        choices.innerHTML = '';

        for (let i = 0; i < question.choices.length; i++) {
            const choice = question.choices[i];
            const li = document.createElement('li');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.id = `choice-${i}`;
            radio.name = 'choices';
            radio.value = choice;

            li.appendChild(radio);
            li.appendChild(document.createTextNode(choice));

            choices.appendChild(li);
        }
    }

    // Show first question on quiz start
    showQuestion();
    
    
    // Handle submit button click
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
        const selected = document.querySelector('input[name="choices"]:checked');
        if (!selected) return;

        if (selected.value === quizData[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            // Show final score
            resultContainer.style.display = '';
            quizContainer.style.display = 'none';
            document.getElementById('score').textContent = `${score} out of ${quizData.length}`;
        }
    });
}

// Start quiz on page load
window.addEventListener('load', showQuiz);
