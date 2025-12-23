let questions = [];
let index = 0;

const DATA = {
  high: [
    {
      q: "Insulin is a high-alert medication.",
      a: ["True", "False"],
      c: 0
    },
    {
      q: "Heparin dosing errors can cause serious harm.",
      a: ["True", "False"],
      c: 0
    }
  ],
  lasa: [
    {
      q: "Hydralazine and Hydroxyzine are LASA drugs.",
      a: ["True", "False"],
      c: 0
    },
    {
      q: "Tall-Man lettering helps reduce LASA errors.",
      a: ["True", "False"],
      c: 0
    }
  ]
};

function startGame(type) {
  questions = DATA[type];
  index = 0;
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[index];
  document.getElementById("question").innerText = q.q;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  q.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = () => checkAnswer(i);
    answers.appendChild(btn);
  });
}

function checkAnswer(choice) {
  const correct = questions[index].c;
  document.getElementById("feedback").innerText =
    choice === correct ? "✅ Correct" : "❌ Incorrect";
}

function nextQuestion() {
  index++;
  document.getElementById("feedback").innerText = "";
  if (index >= questions.length) {
    alert("Module completed!");
    location.reload();
  } else {
    loadQuestion();
  }
}
