let questions = [];
let index = 0;
let score = 0;

const DATA = {
  high: [
    { q: "Insulin is a high-alert medication.", a: ["True", "False"], c: 0, why: "Small dosing errors can cause severe hypoglycemia." },
    { q: "Heparin dosing errors can cause serious harm.", a: ["True", "False"], c: 0, why: "Over/underdosing can cause bleeding or thrombosis." },
    { q: "Concentrated potassium (KCl) should be stored with extra controls.", a: ["True", "False"], c: 0, why: "Concentrated electrolytes have a high harm potential if misused." },
    { q: "High-alert meds benefit from independent double-checks (when applicable).", a: ["True", "False"], c: 0, why: "Double-checks reduce selection, dose, and pump-setting errors." },
    { q: "Standard concentrations reduce infusion errors for high-alert meds.", a: ["True", "False"], c: 0, why: "Standardization lowers calculation and preparation variation." },
    { q: "Using smart pumps/drug libraries helps reduce infusion-related errors.", a: ["True", "False"], c: 0, why: "Dose-error reduction systems add guardrails." },
    { q: "Look-alike packaging increases risk when high-alert meds are stored together.", a: ["True", "False"], c: 0, why: "Separation/labeling reduces selection errors." },
    { q: "Independent verification of patient + drug + dose is important before administration.", a: ["True", "False"], c: 0, why: "Patient ID and med verification prevent wrong-patient/wrong-drug events." },
    { q: "A clear, complete order (dose, route, frequency) reduces high-alert medication errors.", a: ["True", "False"], c: 0, why: "Ambiguity increases the chance of misinterpretation." },
    { q: "High-alert medications always require extra caution during transitions of care.", a: ["True", "False"], c: 0, why: "Handoffs are a common point for dose/duplication errors." }
  ],

  lasa: [
    { q: "Hydralazine and Hydroxyzine are a LASA risk pair in practice.", a: ["True", "False"], c: 0, why: "Similar names can be confused verbally or when reading quickly." },
    { q: "Tall Man lettering can help reduce LASA errors.", a: ["True", "False"], c: 0, why: "It highlights the differing parts of similar names." },
    { q: "Reading back verbal orders can prevent sound-alike errors.", a: ["True", "False"], c: 0, why: "Read-back confirms what was heard and intended." },
    { q: "Storing LASA drugs next to each other with similar labels is safest.", a: ["True", "False"], c: 1, why: "Separation/alerts reduce wrong-selection risk." },
    { q: "Using indication on prescriptions can reduce LASA selection errors.", a: ["True", "False"], c: 0, why: "Indication helps confirm the intended medication." },
    { q: "Barcode scanning (when available) helps prevent LASA selection errors.", a: ["True", "False"], c: 0, why: "Scanning verifies the product against the order/patient." },
    { q: "Verifying generic name in addition to brand name can reduce LASA errors.", a: ["True", "False"], c: 0, why: "Cross-checking names reduces confusion." },
    { q: "Extra caution is needed when drug names are similar AND doses differ greatly.", a: ["True", "False"], c: 0, why: "Dose mismatch is a red flag for selection errors." },
    { q: "Standardized storage labels (LASA alerts) help reduce look-alike errors.", a: ["True", "False"], c: 0, why: "Visual cues improve attention at selection time." },
    { q: "Avoiding dangerous abbreviations helps reduce LASA-related mix-ups.", a: ["True", "False"], c: 0, why: "Ambiguous abbreviations can look/sound similar." }
  ]
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startGame(type) {
  questions = shuffle(DATA[type]).slice(0, 10); // 10 questions
  index = 0;
  score = 0;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[index];
  document.getElementById("question").innerText = `Q${index + 1}/10: ${q.q}`;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = () => checkAnswer(i);
    answers.appendChild(btn);
  });

  document.getElementById("feedback").innerText = `Score: ${score}`;
}

function checkAnswer(choice) {
  const q = questions[index];
  const correct = q.c;

  if (choice === correct) {
    score++;
    document.getElementById("feedback").innerText = `✅ Correct — ${q.why}\nScore: ${score}`;
  } else {
    document.getElementById("feedback").innerText = `❌ Incorrect — ${q.why}\nScore: ${score}`;
  }
}

function nextQuestion() {
  index++;
  if (index >= questions.length) {
    alert(`Module completed!\nFinal Score: ${score}/10`);
    location.reload();
  } else {
    loadQuestion();
  }
}