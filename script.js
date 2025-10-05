const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const resultBtn = document.getElementById("resultBtn");
const totalScore = document.getElementById("totalScore");
const resultDiv = document.querySelector(".result");
const displayQuestions = document.querySelector(".displayQuestions")
const radios = document.querySelectorAll('input[type="radio"]');
const question = document.getElementById("question");
const labels = Array.from(document.querySelector(".options").getElementsByTagName("label"));

submitBtn.classList.add("disabled");
nextBtn.classList.add("disabled");
resultBtn.style.display = "none";
resultDiv.style.display = "none";

let index = 0, ans = "", score = 0, label = "";
let questions = [];

async function loadQuestions(){
  const response = await fetch("questions.json");
  const data = await response.json();
  questions = data.questions;
  displayQuiz();
}

document.addEventListener("DOMContentLoaded", loadQuestions);

const quizLevel = document.createElement("h2");
quizLevel.style.textAlign = "right";
displayQuestions.prepend(quizLevel);

function displayQuiz(){
  if(index < 10) quizLevel.textContent = "Easy Level";
  else quizLevel.textContent = "Intermediate Level";

  const current = questions[index];
  question.textContent = `Q ${index + 1}: ${questions[index].question}`;
  labels.forEach((label, i) => {
    label.textContent = current.answers[i].text;
  })
}

radios.forEach(radio => {
    radio.addEventListener("click", event => {
        submitBtn.classList.remove("disabled");
        nextBtn.classList.add("disabled");
        label = document.querySelector(`label[for="${event.target.id}"]`);
    })
})

submitBtn.addEventListener("click", event => {
            ans = label.textContent;
            nextBtn.classList.remove("disabled");
            submitBtn.classList.add("disabled");
        })

nextBtn.addEventListener("click", event => {
  checkQuestion(ans);
  radios.forEach(radio => radio.checked = false);
  if(index < questions.length - 1){
    index++;
    displayQuiz();
    nextBtn.classList.add("disabled");
  }
  else{
    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    displayQuestions.style.display = "none";
    resultBtn.style.display = "Block";
  }
})

resultBtn.addEventListener("click",  event => {
      resultDiv.style.display = "block";
      totalScore.textContent = `Your Total Score is: ${score}`;
    })

function checkQuestion(ans){
    questions[index].answers.forEach(answer => {
      if(answer.correct){
        const correctAnswer = answer.text;
        if(correctAnswer === ans) score++;
      }
    })
}