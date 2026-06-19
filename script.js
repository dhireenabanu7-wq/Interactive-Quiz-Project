
const questions = {

javascript: [

{
question:"Which keyword declares a block scoped variable?",
options:["var","int","let","define"],
answer:"let"
},

{
question:"Which method converts JSON to object?",
options:[
"JSON.parse()",
"JSON.stringify()",
"JSON.object()",
"JSON.convert()"
],
answer:"JSON.parse()"
},

{
question:"Which company created JavaScript?",
options:[
"Microsoft",
"Netscape",
"Google",
"Oracle"
],
answer:"Netscape"
},

{
question:"Which symbol is used for comments?",
options:[
"//",
"##",
"**",
"<!--"
],
answer:"//"
}

],

html:[

{
question:"HTML stands for?",
options:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"Hyper Transfer Markup Language",
"High Text Machine Language"
],
answer:"Hyper Text Markup Language"
},

{
question:"Which tag creates a hyperlink?",
options:[
"<a>",
"<link>",
"<href>",
"<url>"
],
answer:"<a>"
},

{
question:"Which CSS property changes text color?",
options:[
"font-color",
"text-color",
"color",
"background"
],
answer:"color"
},

{
question:"Which CSS property creates rounded corners?",
options:[
"radius",
"curve",
"border-radius",
"round"
],
answer:"border-radius"
}

],

java:[

{
question:"Java is...",
options:[
"Compiled",
"Interpreted",
"Both",
"None"
],
answer:"Both"
},

{
question:"Who developed Java?",
options:[
"Oracle",
"Sun Microsystems",
"Google",
"IBM"
],
answer:"Sun Microsystems"
},

{
question:"Which keyword creates object?",
options:[
"make",
"new",
"create",
"object"
],
answer:"new"
},

{
question:"Java is _____ language.",
options:[
"Procedural",
"Object Oriented",
"Machine",
"Assembly"
],
answer:"Object Oriented"
}

],

gk:[

{
question:"Capital of India?",
options:[
"Pune",
"Mumbai",
"Delhi",
"Bangalore"
],
answer:"Delhi"
},

{
question:"Largest planet?",
options:[
"Earth",
"Mars",
"Jupiter",
"Saturn"
],
answer:"Jupiter"
},

{
question:"National animal of India?",
options:[
"Lion",
"Tiger",
"Elephant",
"Horse"
],
answer:"Tiger"
},

{
question:"How many continents are there?",
options:[
"5",
"6",
"7",
"8"
],
answer:"7"
}

]

};

/* ==========================================
   VARIABLES
========================================== */

let selectedCategory = "";
let selectedDifficulty = "";

let quizQuestions = [];

let currentQuestion = 0;

let score = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let userAnswers = [];

let timer = null;

let timeLeft = 15;

let totalTimeTaken = 0;

let achievements = [];

/* ==========================================
   DOM ELEMENTS
========================================== */

const homeScreen =
document.getElementById("homeScreen");

const quizScreen =
document.getElementById("quizScreen");

const resultScreen =
document.getElementById("resultScreen");

const startQuizBtn =
document.getElementById("startQuizBtn");

const questionEl =
document.getElementById("question");

const optionsEl =
document.getElementById("options");

const progressBar =
document.getElementById("progressBar");

const timerEl =
document.getElementById("timer");

const nextBtn =
document.getElementById("nextBtn");

const scoreCounter =
document.getElementById("scoreCounter");

const questionCounter =
document.getElementById("questionCounter");

const navigatorEl =
document.getElementById("navigator");

const welcomeUser =
document.getElementById("welcomeUser");

/* ==========================================
   CATEGORY SELECTION
========================================== */

document
.querySelectorAll(".category")
.forEach(btn=>{

btn.addEventListener("click",()=>{

document
.querySelectorAll(".category")
.forEach(x=>x.classList.remove("selected-category"));

btn.classList.add("selected-category");

selectedCategory =
btn.dataset.category;

});

});

/* ==========================================
   DIFFICULTY SELECTION
========================================== */

document
.querySelectorAll(".difficulty")
.forEach(btn=>{

btn.addEventListener("click",()=>{

document
.querySelectorAll(".difficulty")
.forEach(x=>x.classList.remove("selected-difficulty"));

btn.classList.add("selected-difficulty");

selectedDifficulty =
btn.dataset.level;

});

});

/* ==========================================
   START QUIZ
========================================== */

startQuizBtn.addEventListener("click",startQuiz);

function startQuiz(){

const playerName =
document.getElementById("playerName").value.trim();

if(playerName===""){

alert("Enter your name");

return;
}

if(selectedCategory===""){

alert("Select category");

return;
}

if(selectedDifficulty===""){

alert("Select difficulty");

return;
}

welcomeUser.innerHTML =
`👋 Welcome, ${playerName}`;

quizQuestions =
[...questions[selectedCategory]];

shuffleArray(quizQuestions);

homeScreen.classList.add("hidden");

quizScreen.classList.remove("hidden");

createNavigator();

loadQuestion();
}

/* ==========================================
   LOAD QUESTION
========================================== */

function loadQuestion(){

clearInterval(timer);

timeLeft = getTimeByDifficulty();

timerEl.innerHTML =
`⏱ ${timeLeft}`;

startTimer();

let q =
quizQuestions[currentQuestion];

questionEl.textContent =
q.question;

questionCounter.innerHTML =
`Question ${currentQuestion+1}
 / ${quizQuestions.length}`;

optionsEl.innerHTML = "";

let shuffledOptions =
[...q.options];

shuffleArray(shuffledOptions);

shuffledOptions.forEach(option=>{

const btn =
document.createElement("button");

btn.classList.add("option");

btn.innerText = option;

btn.addEventListener("click",()=>{

checkAnswer(btn,option);

});

optionsEl.appendChild(btn);

});

updateProgress();
}

/* ==========================================
   TIMER
========================================== */

function startTimer(){

timer = setInterval(()=>{

timeLeft--;

timerEl.innerHTML =
`⏱ ${timeLeft}`;

if(timeLeft<=0){

clearInterval(timer);

wrongAnswers++;

userAnswers.push("Skipped");

updateNavigator(false);

goNextQuestion();
}

},1000);

}

/* ==========================================
   ANSWER CHECK
========================================== */

function checkAnswer(button,selected){

clearInterval(timer);

const correct =
quizQuestions[currentQuestion].answer;

const allButtons =
document.querySelectorAll(".option");

allButtons.forEach(btn=>{

btn.disabled = true;

});

if(selected===correct){

button.classList.add("correct");

score += 10;

correctAnswers++;

userAnswers.push(true);

updateNavigator(true);

}
else{

button.classList.add("wrong");

wrongAnswers++;

userAnswers.push(false);

updateNavigator(false);

allButtons.forEach(btn=>{

if(btn.innerText===correct){

btn.classList.add("correct");

}

});

}

scoreCounter.innerHTML =
`Score: ${score}`;
}

/* ==========================================
   NEXT BUTTON
========================================== */

nextBtn.addEventListener("click",()=>{

const disabled =
document.querySelector(".option:disabled");

if(!disabled){

alert("Select an option first");

return;
}

goNextQuestion();

});

function goNextQuestion(){

currentQuestion++;

if(currentQuestion < quizQuestions.length){

loadQuestion();

}
else{

showResult();

}

}

/* ==========================================
   PROGRESS BAR
========================================== */

function updateProgress(){

let progress =

(currentQuestion /
quizQuestions.length) * 100;

progressBar.style.width =
progress + "%";
}

/* ==========================================
   NAVIGATOR
========================================== */

function createNavigator(){

navigatorEl.innerHTML="";

for(let i=0;i<quizQuestions.length;i++){

const box =
document.createElement("div");

box.classList.add("nav-box");

box.innerText = i+1;

navigatorEl.appendChild(box);

}

}

function updateNavigator(correct){

const boxes =
document.querySelectorAll(".nav-box");

if(correct){

boxes[currentQuestion]
.classList.add("nav-correct");

}
else{

boxes[currentQuestion]
.classList.add("nav-wrong");

}

}

/* ==========================================
   DIFFICULTY TIMER
========================================== */

function getTimeByDifficulty(){

if(selectedDifficulty==="easy")
return 20;

if(selectedDifficulty==="medium")
return 15;

return 10;
}

/* ==========================================
   SHUFFLE
========================================== */

function shuffleArray(arr){

for(let i=arr.length-1;i>0;i--){

const j =
Math.floor(Math.random()*(i+1));

[arr[i],arr[j]] =
[arr[j],arr[i]];
}

}
/* ==========================================
   RESULT SCREEN
========================================== */

function showResult(){

quizScreen.classList.add("hidden");

resultScreen.classList.remove("hidden");

const totalQuestions =
quizQuestions.length;

const accuracy =
Math.round(
(correctAnswers / totalQuestions) * 100
);

const averageTime =
Math.round(
(totalQuestions * getTimeByDifficulty()) /
totalQuestions
);

document.getElementById("finalScore")
.innerHTML =
`Score : ${score}`;

document.getElementById("accuracy")
.innerHTML =
`Accuracy : ${accuracy}%`;

document.getElementById("avgTime")
.innerHTML =
`Avg Time : ${averageTime}s`;

const rank = getRank(accuracy);

document.getElementById("rank")
.innerHTML =
`Rank : ${rank}`;

generateAchievements(
accuracy,
correctAnswers
);

saveLeaderboard(
score,
accuracy,
rank
);

loadLeaderboard();

drawChart();
}

/* ==========================================
   RANK SYSTEM
========================================== */

function getRank(percent){

if(percent >= 95)
return "👑 Legend";

if(percent >= 85)
return "🏆 Master";

if(percent >= 70)
return "🔥 Expert";

if(percent >= 50)
return "⭐ Advanced";

return "📘 Beginner";
}

/* ==========================================
   ACHIEVEMENTS
========================================== */

function generateAchievements(
accuracy,
correctCount
){

achievements = [];

if(accuracy >= 90){

achievements.push(
"🎯 Accuracy King"
);

}

if(correctCount ===
quizQuestions.length){

achievements.push(
"👑 Perfect Score"
);

}

if(score >= 30){

achievements.push(
"🔥 High Scorer"
);

}

if(selectedDifficulty === "hard"){

achievements.push(
"⚡ Hard Mode Challenger"
);

}

const achievementBox =
document.getElementById(
"achievements"
);

achievementBox.innerHTML = "";

achievements.forEach(item=>{

const badge =
document.createElement("div");

badge.classList.add("badge");

badge.innerText = item;

achievementBox.appendChild(
badge
);

});

}

/* ==========================================
   CHART.JS RESULT ANALYTICS
========================================== */

function drawChart(){

const canvas =
document.getElementById(
"resultChart"
);

new Chart(canvas,{

type:"doughnut",

data:{

labels:[
"Correct",
"Wrong"
],

datasets:[{

data:[
correctAnswers,
wrongAnswers
],

backgroundColor:[
"#2ecc71",
"#e74c3c"
]

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:true
}

}

}

});

}

/* ==========================================
   LEADERBOARD
========================================== */

function saveLeaderboard(
score,
accuracy,
rank
){

const playerName =
document.getElementById(
"playerName"
).value;

let leaderboard =

JSON.parse(
localStorage.getItem(
"quizLeaderboard"
)
)

|| [];

leaderboard.push({

name:playerName,

score:score,

accuracy:accuracy,

rank:rank

});

leaderboard.sort(
(a,b)=>b.score-a.score
);

leaderboard =
leaderboard.slice(0,10);

localStorage.setItem(
"quizLeaderboard",
JSON.stringify(
leaderboard
)
);

}

function loadLeaderboard(){

const list =
document.getElementById(
"leaderboardList"
);

list.innerHTML = "";

const leaderboard =

JSON.parse(
localStorage.getItem(
"quizLeaderboard"
)
)

|| [];

leaderboard.forEach(
(player,index)=>{

const li =
document.createElement("li");

li.innerHTML =

`${index+1}. 
${player.name}
 — ${player.score} pts
 (${player.rank})`;

list.appendChild(li);

});

}

/* ==========================================
   RESTART QUIZ
========================================== */

document
.getElementById("restartBtn")
.addEventListener(
"click",
restartQuiz
);

function restartQuiz(){

currentQuestion = 0;

score = 0;

correctAnswers = 0;

wrongAnswers = 0;

userAnswers = [];

achievements = [];


clearInterval(timer);

scoreCounter.innerHTML =
"Score : 0";

progressBar.style.width =
"0%";

resultScreen.classList.add(
"hidden"
);

homeScreen.classList.remove(
"hidden"
);

document.getElementById(
"playerName"
).value = "";

document
.querySelectorAll(
".category"
)
.forEach(btn=>{

btn.classList.remove(
"selected-category"
);

});

document
.querySelectorAll(
".difficulty"
)
.forEach(btn=>{

btn.classList.remove(
"selected-difficulty"
);

});

selectedCategory = "";
selectedDifficulty = "";

}

/* ==========================================
   DARK MODE
========================================== */

const themeBtn =
document.getElementById(
"themeToggle"
);

themeBtn.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"dark"
);

if(
document.body.classList.contains(
"dark"
)
){

themeBtn.innerHTML = "☀️";

}
else{

themeBtn.innerHTML = "🌙";

}

});

/* ==========================================
   LOAD SAVED LEADERBOARD
========================================== */

loadLeaderboard();