// selections
let titreQuestion = document.querySelector(".titreQuestion");
let answers = document.querySelector(".answers");
let result = document.querySelector(".result");
let countdownElement = document.querySelector(".countdown");
let btnSubmit = document.querySelector(".btnSubmit");

let countdownInterval;
let rightAnswer = 0;
let i = 0;

function getQuestions() {
  fetch("./quiz_questions.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // question count at header
      document.querySelector(
        ".questCount"
      ).innerHTML += `<span> ${data.length} </span>`;

      // spans count ansewer
      for (let i = 0; i < data.length; i++) {
        document.querySelector(".spans").innerHTML += "<span></span>";
        if (i === 0) {
          document.querySelector(".spans span").className = "active";
        }
      }

      // add countDownTimer
      countDownTimer(30,data.length);

      // function to Add question DATA
      AddQuestion(data[i], data.length);

      btnSubmit.onclick = () => {
        if (i <= data.length - 1) {
          document.querySelectorAll("input[type=radio]").forEach((input) => {
            if (input.checked) {
              if (input.value === data[i]["right_answer"]) {
                rightAnswer++;
              }
            }
          });
          i++;
          titreQuestion.innerHTML = "";
          answers.innerHTML = "";
          AddQuestion(data[i], data.length);
          document.querySelectorAll(".spans span").forEach((sp, index) => {
            if (i === index) {
              sp.className = "active";
            }
            if (i > data.length - 1) {
              titreQuestion.innerHTML = "<h1>Your Result</h1>";
              if (rightAnswer < 3) {
                answers.innerHTML = `<div class="result"><p><span class="bad">Bad</span> your answered ${rightAnswer} from ${data.length}</p></div>`;
              }
              if (rightAnswer > 3 && rightAnswer < 6) {
                answers.innerHTML = `<div class="result"><p><span class="good">Good</span> your answered ${rightAnswer} from ${data.length}</p></div>`;
              }
              if (rightAnswer > 6) {
                answers.innerHTML = `<div class="result"><p><span class="perfect">Perfect</span> your answered ${rightAnswer} from ${data.length}</p></div>`;
              }
            }
          });
          clearInterval(countdownInterval);
          countDownTimer(30,data.length);
        }
      };
    });
}

getQuestions();

// Add questions DATA Function
function AddQuestion(obj, count) {
  if (i < count) {
    titreQuestion.innerHTML = `<h1> ${obj["title"]} </h1>`;
    answers.innerHTML = `<div>
    <input type="radio" name="radio" id="${obj["answer_1"]}" value="${obj["answer_1"]}"/> 
    <label for="${obj["answer_1"]}">${obj["answer_1"]} </label> 
    </div>
    <div>
    <input type="radio" name="radio" id="${obj["answer_2"]}" value="${obj["answer_2"]}"/> 
    <label for="${obj["answer_2"]}">${obj["answer_2"]} </label> 
    </div>
    <div>
    <input type="radio" name="radio" id="${obj["answer_3"]}" value="${obj["answer_3"]}"/> 
    <label for="${obj["answer_3"]}">${obj["answer_3"]} </label> 
    </div>
    <div>
    <input type="radio" name="radio" id="${obj["answer_4"]}" value="${obj["answer_4"]}"/> 
    <label for="${obj["answer_4"]}">${obj["answer_4"]} </label> 
    </div>`;
    document.querySelector("input[type=radio]").checked = true;
  }
}

function countDownTimer(duration,count){
  if (i < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        btnSubmit.click();
      }
    }, 1000);
  }

}


