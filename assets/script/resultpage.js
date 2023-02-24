let param = new URLSearchParams(location.search); //richiama gli elementi dalla pagina precedente
let correct_answers = param.get("correct_answers");
let questions = param.get("tot_questions");

let outPercPos = 0; // percentuale risposte positive
let outPercNeg = 0; // percentuale risposte negative
let didYouPass = Boolean; // esito test, + di 60% è passato

// riceve risultato test e numero totale domande
//produce percentuali giuste e sbagliate ed esito del test
const resultsTest = (cor, tot) => {
  outPercPos = Math.round((cor / tot) * 100); // calcola percentuale risposte positive
  outPercNeg = Math.round((1 - cor / tot) * 100);

  const posPercentage = document.querySelector(".percentPos"); // selettore nodo percentuale positiva
  posPercentage.innerText = `${outPercPos}`;

  const negPercentage = document.querySelector(".percentNeg"); // calcola percentuale risposte negative
  negPercentage.innerText = `${outPercNeg}`; // selettore nodo percentuale negativa

  const posQuestion = document.getElementById("posQuestion");
  posQuestion.innerText = `${cor}/${tot}`;

  const negQuestion = document.querySelector("#negQuestion");
  negQuestion.innerText = `${tot - cor}/${tot}`;

  if (Math.round(outPercPos) >= 60) {
    // test passaggio esame + 60%
    // aggiunta immagini
    didYouPass = true;
    
    const passedTestSel = document.querySelectorAll(".passedTest");
    passedTestSel.forEach(element => {
      element.style.visibility = "visible";
    });

    const innerCirclePhoto = document.querySelector(".innerCircle");
    innerCirclePhoto.style.backgroundSize = "cover";
    innerCirclePhoto.style.borderRadius = "50%";

  } else if (Math.round(outPercPos) < 60) {
    didYouPass = false;
  
   
    const passedTestSel = document.querySelectorAll(".notPassedTest");
    passedTestSel.forEach(element => {
      element.style.visibility = "visible";
    });

    const innerCirclePhoto = document.querySelector(".innerCircle");
    innerCirclePhoto.style.backgroundSize = "cover";
    innerCirclePhoto.style.borderRadius = "50%";
    innerCirclePhoto.style.color = "red";
    innerCirclePhoto.style.fontWeight = "bold";
    innerCirclePhoto.style.fontSize = "1em";


    const failedTest = document.querySelector(".innerCircle");
    failedTest.innerHTML = `<h4 class="congSubtitle" style="color:red">
              Failed test! <br>
              <span class="blue">You didn't pass the exam.</span>
            </h4>
            <p><br>We'll send you the report in a few minutes. Check your email (including promotion / spam folder)</p>`;
    const blueAdvise = document.querySelector("div.innerCircle span.blue");
    blueAdvise.style.color = "darkViolet";
  } else {
    return 0;
  }
  console.log(outPercPos, outPercNeg, didYouPass);
  circlePercentage(outPercNeg);
  return 1;
};

const circlePercentage = (redCircleAmount) => {
  // converto percentuali in gradi di rotazione
  console.log("circlePercentage eseguita, input della funzione", redCircleAmount);
  let degConv = Math.round(1 - redCircleAmount * 3.6);

  // creo i selettori per i cerchi
  const circleAcqua = document.querySelector(".color1");
  const circlePink = document.querySelector(".color2");
  const circleBackground = document.querySelector(".color3");

  // centro e ruoto i cerchi per evitare conflitti con foglio css
  circlePink.style.transform = `translate(-50%,-50%) rotate(${1 - degConv - 46}deg)`;
  circlePink.style.top = "50%";
  circlePink.style.left = "50%";
  circleAcqua.style.transform = `translate(-50%,-50%) rotate(${-46}deg)`;

  //stabilisco orientamento in base alla percentuale delle risposte giuste
  // lavorando di spicchi ogni 25% bisogna cambiare anche la colorazione e non solo la gradazione
  if (redCircleAmount <= 25) {
  } else if (redCircleAmount >= 25 && redCircleAmount < 50) {
    circlePink.style.borderColor = "#d20094 transparent transparent #d20094";
    circleAcqua.style.borderColor = "#00ffff transparent transparent #00ffff";
  } else if (redCircleAmount >= 50 && redCircleAmount < 75) {
    circlePink.style.borderColor = "#d20094 #00ffff transparent #d20094";
    circleAcqua.style.borderColor = "#00ffff transparent transparent transparent";
    circleBackground.style.borderColor = "#d20094 #d20094 #d20094 #00ffff";
  } else if (redCircleAmount >= 75 && redCircleAmount < 100) {
    circlePink.style.borderColor = "#d20094 transparent #d20094 #d20094";
    circleAcqua.style.borderColor = "transparent #d20094 transparent transparent";
    circleBackground.style.borderColor = "#00ffff";
  } else if ((redCircleAmount = 100)) {
    circlePink.style.borderColor = "#d20094";
    circleAcqua.style.borderColor = "transparent";
    circleBackground.style.borderColor = "#d20094";
  } else {
    return 0;
  }
  return 1;
};
resultsTest(correct_answers, questions);