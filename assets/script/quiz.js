const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In Java, which of these keywords would you put on a variable to make sure it is not modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

const answers = {
  correct_answers: 0,
  questions: questions.length,
  punteggio: 0,
};

window.onload = function () {


  let totalQuestionNumber = document.querySelector(".question-tot");
  totalQuestionNumber.innerText = " / " + questions.length;

  let questionIndex = 0;

  // randomizza l'ordine delle risposte
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //passaggio alla pagina successiva
  const gotoResultsPage = function () {
    window.location.assign(
      "./resultpage.html?correct_answers=" +
      answers.correct_answers +
      "&tot_questions=" +
      answers.questions
    );
  };
  //rimuove contenuto pagina e carica immagine
  const loadingResults = function () {
    let container = document.querySelector(".container");
    let footer = document.getElementById("footerQuiz");
    let main = document.querySelector("main");
    let image = document.createElement("img");
    let text = document.createElement("p");
    text.classList.add("titolo");
    text.innerHTML =
      "ATTENDI!";

    container.remove();
    footer.remove();



    main.style = "text-align: center;";

    main.appendChild(text);
  };
  //set timer
  let questionMaxTime = 30;
  let counter = questionMaxTime;

  const myTimer = function () {
    const timer = document.querySelector(".timer");
    counter--;
    timer.innerText = counter;
    //se il timer arriva a 0, se ci sono altre domande vai all domanda successiva e reset timer altrimenti pagina risultati
    if (counter === -1) {
      questionIndex++;
      if (questionIndex < questions.length) {
        newQuestion(questionIndex);
      } else {
        counter = questionMaxTime;
        //reset timer bar
        let timerBar = document.querySelector(".timer-bar");
        timerBar.classList.remove("animation");
        timerBar.offsetWidth;
        timerBar.classList.add("animation");
        //
        loadingResults();
        window.setTimeout(gotoResultsPage, 10);
      }
    }
  };
  window.setInterval(myTimer, 1000);

  //caricamento e visualizzazione domanda (question) e opzioni (options)
  const newQuestion = function (index) {
    const optionsNodes = document.querySelectorAll(".option");
    const question = document.querySelector(".titolo");
    const questionText = questions[index].question;
    let options = [];

    // reset timer
    const timer = document.querySelector(".timer");
    counter = questionMaxTime;
    timer.innerText = counter;
    //reset timer bar
    let timerBar = document.querySelector(".timer-bar");
    timerBar.classList.remove("animation");
    timerBar.offsetWidth;
    timerBar.classList.add("animation");

    if (questions[index].type !== "boolean") {
      options = questions[index].incorrect_answers;
      let optionCorrect = questions[index].correct_answer;
      let randomIndex = getRandomInt(options.length); //lenght va da 2 a 4 -> random va da 0 a 3
      options.splice(randomIndex, 0, optionCorrect); // aggiungo la risposta corretta ad un indice casuale

    } else {
      options = ["True", "False"];
    }
    optionsNodes.forEach((option, i) => {
      question.innerHTML = questionText;
      if (options[i]) {
        //rendo visibile elemento option
        option.style.cssText = "visibility: visible";
        option.innerText = options[i];
      } else {
        //rendo nascosto elemento option
        option.style.cssText = "visibility: hidden";
      }
      option.onclick = handleAnswer;
    });

    //aggiorna question number
    let questionNumber = document.querySelector(".question-num");
    questionNumber.innerText = index + 1;
  };
  // riconoscimento risposta
  const handleAnswer = function (e) {

    if (e.srcElement.innerText === questions[questionIndex].correct_answer) {
      answers.correct_answers++;
      answers.punteggio++;
    }
    questionIndex++;

    //se ci sono ancora domande
    if (questionIndex < questions.length) {
      newQuestion(questionIndex);
    } else {
      //altrimenti
      console.log(answers);
      counter = questionMaxTime;
      loadingResults();
      window.setTimeout(gotoResultsPage, 10);
    }
  };
  newQuestion(0);
};