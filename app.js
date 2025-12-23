/* =========================================================
   iAlert + LASA Gaming (Bilingual + Levels + Progress + MCQ)
   ========================================================= */

const STORAGE_KEY = "ialert_progress_v1";
const LANG_KEY = "ialert_lang_v1";

/* ---------- i18n ---------- */
const I18N = {
  en: {
    appTitle: "🛑 iAlert + LASA Gaming",
    appSubtitle: "Medication Safety Micro-Learning",
    tip: "Tip: Complete each level to unlock the next one.",
    startContinue: "Start / Continue",
    back: "← Back",
    levelsBack: "← Levels",
    chooseLevel: "Choose a level",
    next: "Next",
    score: (s) => `Score: ${s}`,
    qOf: (i, n) => `Q ${i}/${n}`,
    level: (n, name) => `Level ${n} — ${name}`,
    completed: "Completed",
    locked: "Locked",
    unlockRule: "Complete the previous level to unlock.",
    moduleProgress: (done, total) => `Levels: ${done}/${total}`,
    doneMsg: (score, total) => `Level completed!\nScore: ${score}/${total}`,
    restart: "Back to levels",
    correct: "✅ Correct",
    incorrect: "❌ Incorrect",
    types: { mcq: "MCQ", tf: "True / False", scenario: "Scenario" },
    modules: {
      high: { title: "High-Alert Medications", desc: "Levels & scenarios based on policy safeguards" },
      lasa: { title: "LASA Drugs", desc: "Look-Alike / Sound-Alike pairs & prevention strategies" }
    },
    answers: { true: "True", false: "False" }
  },
  ar: {
    appTitle: "🛑 لعبة iAlert + LASA",
    appSubtitle: "تعلّم مصغّر لسلامة الدواء",
    tip: "معلومة: أكمل كل مستوى لفتح المستوى الذي يليه.",
    startContinue: "ابدأ / أكمل",
    back: "← رجوع",
    levelsBack: "← المستويات",
    chooseLevel: "اختر مستوى",
    next: "التالي",
    score: (s) => `النتيجة: ${s}`,
    qOf: (i, n) => `سؤال ${i}/${n}`,
    level: (n, name) => `المستوى ${n} — ${name}`,
    completed: "مكتمل",
    locked: "مقفول",
    unlockRule: "أكمل المستوى السابق للفتح.",
    moduleProgress: (done, total) => `المستويات: ${done}/${total}`,
    doneMsg: (score, total) => `تم إكمال المستوى!\nالنتيجة: ${score}/${total}`,
    restart: "رجوع للمستويات",
    correct: "✅ صحيح",
    incorrect: "❌ خطأ",
    types: { mcq: "اختيار من متعدد", tf: "صح/خطأ", scenario: "سيناريو" },
    modules: {
      high: { title: "الأدوية عالية الخطورة", desc: "مستويات وسيناريوهات مبنية على ضوابط السياسة" },
      lasa: { title: "أدوية متشابهة الاسم/اللفظ (LASA)", desc: "أزواج LASA واستراتيجيات منع الأخطاء" }
    },
    answers: { true: "صح", false: "خطأ" }
  }
};

let LANG = localStorage.getItem(LANG_KEY) || "en";

/* ---------- Data (Starter set; scalable) ----------
   ملاحظة: هذه مجموعة بداية “Policy-based style”.
   نقدر نزيدها ونفصلها أكثر داخل كل Level بسهولة.
--------------------------------------------------- */
const APP = {
  modules: {
    high: {
      theme: "high",
      levels: [
        {
          id: "high_l1",
          name_en: "Identification & Risk",
          name_ar: "التعريف والخطورة",
          questions: [
            {
              type: "mcq",
              q_en: "High-alert medications are medicines that have a high risk of causing significant patient harm if used in error.",
              q_ar: "الأدوية عالية الخطورة هي أدوية قد تسبب ضررًا كبيرًا للمريض إذا حدث خطأ في استخدامها.",
              options_en: ["True", "False", "Only hazardous chemicals", "Only antibiotics"],
              options_ar: ["صح", "خطأ", "فقط المواد الخطرة", "فقط المضادات الحيوية"],
              correct: 0,
              explain_en: "High-alert meds require extra safeguards because even small errors can cause serious harm.",
              explain_ar: "تتطلب أدوية عالية الخطورة ضوابط إضافية لأن الأخطاء البسيطة قد تسبب أذى شديد."
            },
            {
              type: "mcq",
              q_en: "Which practice BEST reduces risk with high-alert medications?",
              q_ar: "أي ممارسة تُقلل الخطر بشكل أفضل مع الأدوية عالية الخطورة؟",
              options_en: ["Independent double-check", "Rely on memory", "Skip verification", "Store together without labels"],
              options_ar: ["التحقق المزدوج المستقل", "الاعتماد على الذاكرة", "تجاوز التحقق", "تخزينها معًا بدون ملصقات"],
              correct: 0,
              explain_en: "Independent double-check is a key safeguard for high-alert medications.",
              explain_ar: "التحقق المزدوج المستقل من أهم ضوابط الأدوية عالية الخطورة."
            },
            {
              type: "scenario",
              q_en: "A high-alert medication order is missing the route and frequency. What should happen FIRST?",
              q_ar: "وصفة دواء عالي الخطورة ناقصة (الطريق/الجرعة/التكرار). ما الإجراء الأول؟",
              options_en: ["Clarify the order before processing", "Guess the route", "Dispense immediately", "Ask after administration"],
              options_ar: ["توضيح الوصفة قبل الصرف/التنفيذ", "تخمين الطريق", "الصرف فورًا", "السؤال بعد الإعطاء"],
              correct: 0,
              explain_en: "Ambiguous orders increase risk; clarify before dispensing/administration.",
              explain_ar: "الوصفات غير الواضحة تزيد الخطر؛ يجب التوضيح قبل الصرف/الإعطاء."
            },
            {
              type: "tf",
              q_en: "High-alert medication safety depends on systems, not only individual vigilance.",
              q_ar: "سلامة الأدوية عالية الخطورة تعتمد على الأنظمة وليس على انتباه الفرد فقط.",
              correct: 0,
              explain_en: "Standardization and safeguards reduce reliance on memory and attention alone.",
              explain_ar: "التوحيد والضوابط تقلل الاعتماد على الذاكرة والانتباه فقط."
            },
            {
              type: "mcq",
              q_en: "Which group is MOST likely considered concentrated electrolytes requiring extra controls?",
              q_ar: "أي مجموعة تُعتبر غالبًا من الإلكتروليتات المركزة التي تحتاج ضوابط إضافية؟",
              options_en: ["Concentrated potassium salts (e.g., KCl) and hypertonic sodium solutions", "Normal saline 0.9% only", "Oral vitamins", "Topical creams"],
              options_ar: ["أملاح البوتاسيوم المركزة (مثل KCl) ومحاليل الصوديوم مفرطة التوتر", "محلول ملحي 0.9% فقط", "فيتامينات فموية", "كريمات موضعية"],
              correct: 0,
              explain_en: "Concentrated electrolytes are high-risk and usually require segregation and safeguards.",
              explain_ar: "الإلكتروليتات المركزة عالية الخطورة وغالبًا تتطلب فصلًا وضوابط."
            }
          ]
        },

        {
          id: "high_l2",
          name_en: "Storage & Labeling",
          name_ar: "التخزين والوسم",
          questions: [
            {
              type: "scenario",
              q_en: "Potassium Chloride ampoules are found in an open ward cupboard. What is the BEST action?",
              q_ar: "تم العثور على أمبولات كلوريد البوتاسيوم في خزانة مفتوحة بالعنبر. ما أفضل إجراء؟",
              options_en: ["Remove to a restricted/controlled storage area with warning labels", "Keep them but move to top shelf", "Store next to water for injection", "Dilute at bedside"],
              options_ar: ["نقلها لمكان تخزين مقيد/مراقب مع ملصقات تحذيرية", "تركها مع وضعها بالأعلى", "تخزينها بجانب ماء الحقن", "تخفيفها بجانب السرير"],
              correct: 0,
              explain_en: "Segregation + controlled storage + warning labeling reduce selection and misuse errors.",
              explain_ar: "الفصل + التخزين المراقب + الملصقات التحذيرية تقلل أخطاء الاختيار وسوء الاستخدام."
            },
            {
              type: "mcq",
              q_en: "Which is a good LASA prevention method that can also apply to high-risk storage bins?",
              q_ar: "أي إجراء يُعد مفيدًا لتقليل أخطاء تشابه الأسماء ويمكن تطبيقه على صناديق التخزين عالية الخطورة؟",
              options_en: ["Tall Man lettering on bin labels", "Remove labels", "Use handwritten abbreviations", "Store all similar names together"],
              options_ar: ["استخدام Tall Man على الملصقات", "إزالة الملصقات", "اختصارات بخط اليد", "تخزين المتشابهات معًا دائمًا"],
              correct: 0,
              explain_en: "Tall Man lettering and clear labels reduce look-alike errors.",
              explain_ar: "استخدام Tall Man والملصقات الواضحة يقلل أخطاء التشابه."
            },
            {
              type: "tf",
              q_en: "High-alert medications should be stored with clear warning labels and separated when confusion risk exists.",
              q_ar: "يجب تخزين الأدوية عالية الخطورة بملصقات تحذيرية واضحة وفصلها عند وجود خطر التباس.",
              correct: 0,
              explain_en: "Labeling and segregation are core risk reduction strategies.",
              explain_ar: "الوسم والفصل من أهم استراتيجيات تقليل المخاطر."
            },
            {
              type: "scenario",
              q_en: "Two ampoules look similar: Calcium Chloride 10% and Water for Injection 10 mL. What reduces risk MOST?",
              q_ar: "أمبولتان متشابهتان: كلوريد الكالسيوم 10% وماء للحقن 10 مل. ما أكثر ما يقلل الخطر؟",
              options_en: ["Separate storage + warning labels + double-check before selection", "Rely on color only", "Keep them together", "Ask after administration"],
              options_ar: ["فصل التخزين + ملصقات تحذير + تحقق مزدوج قبل الاختيار", "الاعتماد على اللون فقط", "تخزينهما معًا", "السؤال بعد الإعطاء"],
              correct: 0,
              explain_en: "Selection errors are common with look-alike ampoules; separation and checks help.",
              explain_ar: "أخطاء الاختيار شائعة مع الأمبولات المتشابهة؛ الفصل والتحقق يساعدان."
            },
            {
              type: "mcq",
              q_en: "Which statement is BEST about concentrated electrolytes?",
              q_ar: "أي عبارة هي الأفضل عن الإلكتروليتات المركزة؟",
              options_en: ["They are intended to be diluted prior to administration", "They can be given undiluted routinely", "They are low-risk", "No special controls needed"],
              options_ar: ["مصممة لتخفيفها قبل الإعطاء", "تعطى غير مخففة بشكل روتيني", "منخفضة الخطورة", "لا تحتاج ضوابط خاصة"],
              correct: 0,
              explain_en: "Concentrated electrolytes are generally intended to be diluted before administration.",
              explain_ar: "الإلكتروليتات المركزة غالبًا يُقصد بها التخفيف قبل الإعطاء."
            }
          ]
        },

        {
          id: "high_l3",
          name_en: "Prescribing & Dispensing",
          name_ar: "الوصف والصرف",
          questions: [
            {
              type: "mcq",
              q_en: "What is the BEST approach for high-alert medication orders in electronic systems (CPOE) when available?",
              q_ar: "ما أفضل نهج لوصفات الأدوية عالية الخطورة في الأنظمة الإلكترونية (CPOE) عند توفرها؟",
              options_en: ["Use CPOE to standardize and reduce errors", "Avoid using the system", "Only accept verbal orders", "Use abbreviations to save time"],
              options_ar: ["استخدام CPOE للتوحيد وتقليل الأخطاء", "تجنب استخدام النظام", "الاعتماد على الأوامر الشفهية فقط", "استخدام اختصارات لتوفير الوقت"],
              correct: 0,
              explain_en: "Electronic ordering can reduce ambiguity and support safety checks.",
              explain_ar: "الطلب الإلكتروني يقلل الغموض ويدعم فحوصات السلامة."
            },
            {
              type: "scenario",
              q_en: "A pharmacist notices insulin strength mismatch. What should happen?",
              q_ar: "لاحظ الصيدلي عدم تطابق في قوة الإنسولين. ماذا يجب أن يحدث؟",
              options_en: ["Clarify with prescriber before dispensing", "Dispense the closest strength", "Ignore and label later", "Ask patient to decide"],
              options_ar: ["التواصل للتوضيح قبل الصرف", "صرف أقرب قوة", "تجاهل ووضع ملصق لاحقًا", "ترك القرار للمريض"],
              correct: 0,
              explain_en: "Always clarify discrepancies before dispensing high-alert medications.",
              explain_ar: "يجب توضيح التعارض قبل صرف الأدوية عالية الخطورة."
            },
            {
              type: "tf",
              q_en: "Independent double-check is part of high-alert medication risk reduction.",
              q_ar: "التحقق المزدوج المستقل جزء من تقليل مخاطر الأدوية عالية الخطورة.",
              correct: 0,
              explain_en: "Double-check reduces dose and selection errors.",
              explain_ar: "يقلل التحقق المزدوج أخطاء الجرعة والاختيار."
            },
            {
              type: "mcq",
              q_en: "Which is MOST important to include in a high-alert medication order?",
              q_ar: "ما الأكثر أهمية تضمينه في وصفة دواء عالي الخطورة؟",
              options_en: ["Dose, route, frequency (complete order)", "Only drug name", "Only patient name", "Only diagnosis"],
              options_ar: ["الجرعة والطريق والتكرار (وصفة مكتملة)", "اسم الدواء فقط", "اسم المريض فقط", "التشخيص فقط"],
              correct: 0,
              explain_en: "Complete orders reduce misinterpretation and wrong administration.",
              explain_ar: "الوصفة المكتملة تقلل سوء الفهم والخطأ في الإعطاء."
            },
            {
              type: "scenario",
              q_en: "A high-alert infusion requires preparation. What reduces preparation errors MOST?",
              q_ar: "تحضير تسريب دواء عالي الخطورة. ما الذي يقلل أخطاء التحضير أكثر؟",
              options_en: ["Standard concentrations + independent double-check", "Prepare without references", "Change concentration each time", "Skip documentation"],
              options_ar: ["تراكيز قياسية + تحقق مزدوج مستقل", "تحضير بدون مراجع", "تغيير التركيز كل مرة", "تجاوز التوثيق"],
              correct: 0,
              explain_en: "Standardization and checks reduce calculation and compounding errors.",
              explain_ar: "التوحيد والتحقق يقللان أخطاء الحساب والتحضير."
            }
          ]
        },

        {
          id: "high_l4",
          name_en: "Administration & Monitoring",
          name_ar: "الإعطاء والمتابعة",
          questions: [
            {
              type: "scenario",
              q_en: "Before starting an IV insulin infusion, what is the BEST safeguard?",
              q_ar: "قبل بدء تسريب إنسولين وريدي، ما أفضل إجراء أمان؟",
              options_en: ["Independent double-check of drug, concentration, and rate", "Start first then confirm", "Skip pump settings review", "Assume it is correct"],
              options_ar: ["تحقق مزدوج مستقل من الدواء والتركيز والمعدل", "ابدأ ثم تأكد", "تجاوز مراجعة إعدادات المضخة", "افترض أنه صحيح"],
              correct: 0,
              explain_en: "Infusion rate errors can cause severe harm; double-check is critical.",
              explain_ar: "أخطاء معدل التسريب قد تسبب ضررًا شديدًا؛ التحقق المزدوج مهم."
            },
            {
              type: "mcq",
              q_en: "What is a good practice when high-alert meds are involved in handoffs/transitions of care?",
              q_ar: "ما الممارسة الجيدة عند انتقال الرعاية ووجود أدوية عالية الخطورة؟",
              options_en: ["Medication reconciliation and clear handoff communication", "No need to mention them", "Only verbal handoff without documentation", "Delay until discharge"],
              options_ar: ["مطابقة الأدوية وتواصل واضح عند التسليم", "لا حاجة لذكرها", "تسليم شفهي فقط بلا توثيق", "تأجيل حتى الخروج"],
              correct: 0,
              explain_en: "Transitions are high-risk for omission/duplication/dose errors.",
              explain_ar: "الانتقالات عالية الخطورة لأخطاء النقص/التكرار/الجرعات."
            },
            {
              type: "tf",
              q_en: "Monitoring is an essential part of safe use for many high-alert medications.",
              q_ar: "المتابعة جزء أساسي من الاستخدام الآمن للعديد من الأدوية عالية الخطورة.",
              correct: 0,
              explain_en: "Monitoring helps detect toxicity or underdosing early.",
              explain_ar: "المتابعة تساعد في اكتشاف السمية أو نقص الجرعة مبكرًا."
            },
            {
              type: "scenario",
              q_en: "A nurse selects a look-alike ampoule for administration. What is the BEST prevention step?",
              q_ar: "اختيار أمبول مشابه بالخطأ قبل الإعطاء. ما أفضل خطوة لمنع ذلك؟",
              options_en: ["Use barcode scanning and independent verification (when available)", "Rely on memory", "Skip label reading", "Administer quickly"],
              options_ar: ["استخدام الباركود والتحقق المستقل (عند توفره)", "الاعتماد على الذاكرة", "تجاوز قراءة الملصق", "الإعطاء بسرعة"],
              correct: 0,
              explain_en: "Technology + verification reduces wrong drug selection.",
              explain_ar: "التقنية + التحقق يقللان خطأ اختيار الدواء."
            },
            {
              type: "mcq",
              q_en: "Which is MOST appropriate documentation practice after administering high-alert meds?",
              q_ar: "أي توثيق هو الأنسب بعد إعطاء دواء عالي الخطورة؟",
              options_en: ["Complete and timely documentation including dose/time/monitoring", "Document later if time permits", "No documentation needed", "Only document if adverse event occurs"],
              options_ar: ["توثيق كامل وفي الوقت المناسب يشمل الجرعة/الوقت/المتابعة", "توثيق لاحقًا إذا توفر وقت", "لا حاجة للتوثيق", "توثيق فقط عند حدوث ضرر"],
              correct: 0,
              explain_en: "Accurate documentation supports safety, audit, and continuity of care.",
              explain_ar: "التوثيق الدقيق يدعم السلامة والتدقيق واستمرارية الرعاية."
            }
          ]
        },

        {
          id: "high_l5",
          name_en: "High-Risk Scenarios",
          name_ar: "سيناريوهات عالية الخطورة",
          questions: [
            {
              type: "scenario",
              q_en: "A near-miss occurred with a high-alert medication. What is the BEST next step to improve safety?",
              q_ar: "حدثت شبه حادثة مع دواء عالي الخطورة. ما أفضل خطوة لاحقة لتحسين السلامة؟",
              options_en: ["Report and analyze causes, then implement risk-reduction strategies", "Ignore because no harm occurred", "Blame an individual only", "Hide to avoid paperwork"],
              options_ar: ["الإبلاغ وتحليل الأسباب ثم تطبيق استراتيجيات تقليل المخاطر", "تجاهل لأن لا ضرر حدث", "لوم فرد فقط", "إخفاء لتجنب الإجراءات"],
              correct: 0,
              explain_en: "Learning systems + reporting support sustainable improvements.",
              explain_ar: "التعلم والإبلاغ يدعمان تحسينات مستدامة."
            },
            {
              type: "scenario",
              q_en: "A medication error report shows recurring high-alert incidents. What is the BEST system response?",
              q_ar: "تقارير الأخطاء تُظهر تكرار حوادث أدوية عالية الخطورة. ما أفضل استجابة نظامية؟",
              options_en: ["Embed training into core competencies and monitor compliance", "Do nothing", "Tell staff to be careful", "Reduce reporting"],
              options_ar: ["إدراج التدريب ضمن الكفاءات الأساسية ومراقبة الالتزام", "لا شيء", "قولوا انتبهوا", "تقليل الإبلاغ"],
              correct: 0,
              explain_en: "Competency + monitoring reinforces safeguards and reduces recurrence.",
              explain_ar: "الكفاءة + المراقبة تعزز الضوابط وتقلل التكرار."
            },
            {
              type: "mcq",
              q_en: "Which combination BEST reflects a safety culture for high-alert meds?",
              q_ar: "أي مجموعة تعكس أفضل ثقافة سلامة للأدوية عالية الخطورة؟",
              options_en: ["Standardization + double-checks + reporting + continuous improvement", "Speed only", "No documentation", "Individual memory only"],
              options_ar: ["التوحيد + تحقق مزدوج + إبلاغ + تحسين مستمر", "السرعة فقط", "لا توثيق", "الذاكرة الفردية فقط"],
              correct: 0,
              explain_en: "Multiple layers of defense reduce harm.",
              explain_ar: "طبقات دفاع متعددة تقلل الضرر."
            },
            {
              type: "scenario",
              q_en: "A high-alert medication requires dilution. What is the safest approach?",
              q_ar: "دواء عالي الخطورة يحتاج تخفيفًا. ما النهج الأكثر أمانًا؟",
              options_en: ["Follow approved dilution guidance and verify calculations with a second checker", "Dilute based on experience only", "Dilute without labeling", "Skip double-check to save time"],
              options_ar: ["اتباع إرشادات التخفيف المعتمدة والتحقق من الحسابات بمراجع ثانٍ", "تخفيف حسب الخبرة فقط", "تخفيف بدون وسم", "تجاوز التحقق لتوفير الوقت"],
              correct: 0,
              explain_en: "Dilution errors are high-risk; follow guidance and verify.",
              explain_ar: "أخطاء التخفيف عالية الخطورة؛ اتبع الإرشادات وتحقق."
            },
            {
              type: "scenario",
              q_en: "A staff member is unsure about a high-alert medication process. What should they do?",
              q_ar: "موظف غير متأكد من إجراء دواء عالي الخطورة. ماذا يفعل؟",
              options_en: ["Stop and consult policy/pharmacy/supervisor before proceeding", "Proceed quickly", "Ask later", "Guess"],
              options_ar: ["التوقف واستشارة السياسة/الصيدلية/المشرف قبل المتابعة", "المتابعة بسرعة", "السؤال لاحقًا", "التخمين"],
              correct: 0,
              explain_en: "Pause-and-clarify prevents harm.",
              explain_ar: "التوقف للتوضيح يمنع الضرر."
            },
            {
              type: "mcq",
              q_en: "What is the BEST way to sustain high-alert safety improvements over time?",
              q_ar: "ما أفضل طريقة لاستدامة تحسينات سلامة الأدوية عالية الخطورة؟",
              options_en: ["Ongoing training + audits + monitoring compliance", "One-time memo only", "Rely on new staff only", "Stop measuring"],
              options_ar: ["تدريب مستمر + تدقيق + مراقبة الالتزام", "تعميم مرة واحدة فقط", "الاعتماد على الموظفين الجدد فقط", "إيقاف القياس"],
              correct: 0,
              explain_en: "Sustainability requires measurement and reinforcement.",
              explain_ar: "الاستدامة تحتاج قياسًا وتعزيزًا مستمرًا."
            }
          ]
        }
      ]
    },

    // LASA: Starter levels (نفس النظام). نوسعها لاحقًا بقائمة 2025 كاملة.
    lasa: {
      theme: "lasa",
      levels: [
        {
          id: "lasa_l1",
          name_en: "LASA Basics",
          name_ar: "أساسيات LASA",
          questions: [
            {
              type: "mcq",
              q_en: "Tall Man lettering is used to reduce LASA errors by highlighting differences in similar drug names.",
              q_ar: "يستخدم Tall Man لتقليل أخطاء LASA عبر إبراز الاختلاف في الأسماء المتشابهة.",
              options_en: ["True", "False", "Only for dose calculation", "Only for IV pumps"],
              options_ar: ["صح", "خطأ", "فقط لحساب الجرعات", "فقط للمضخات"],
              correct: 0,
              explain_en: "Tall Man lettering helps differentiate look-alike/sound-alike names.",
              explain_ar: "يساعد Tall Man على التفريق بين الأسماء المتشابهة."
            },
            {
              type: "scenario",
              q_en: "A verbal order sounds like a similar drug name. What is the BEST action?",
              q_ar: "أمر شفهي يبدو كاسم دواء مشابه. ما أفضل إجراء؟",
              options_en: ["Read back and confirm the drug name & indication", "Proceed immediately", "Ask later", "Write an abbreviation"],
              options_ar: ["القراءة العكسية والتأكيد على الاسم والاستطباب", "المتابعة فورًا", "السؤال لاحقًا", "كتابة اختصار"],
              correct: 0,
              explain_en: "Read-back reduces sound-alike errors.",
              explain_ar: "القراءة العكسية تقلل أخطاء التشابه الصوتي."
            },
            {
              type: "tf",
              q_en: "Separating LASA products in storage reduces wrong-selection errors.",
              q_ar: "فصل منتجات LASA في التخزين يقلل أخطاء الاختيار الخاطئ.",
              correct: 0,
              explain_en: "Segregation and alerts reduce mix-ups.",
              explain_ar: "الفصل والتنبيه يقللان الالتباس."
            },
            {
              type: "mcq",
              q_en: "Which prevention strategy is MOST effective when available?",
              q_ar: "أي استراتيجية وقاية هي الأكثر فاعلية عند توفرها؟",
              options_en: ["Barcode scanning + verification", "Memory only", "Skip labels", "Keep similar items together"],
              options_ar: ["الباركود + التحقق", "الذاكرة فقط", "تجاوز الملصقات", "تجميع المتشابهات معًا"],
              correct: 0,
              explain_en: "Barcode verification helps prevent wrong-drug selection.",
              explain_ar: "التحقق بالباركود يمنع اختيار دواء خاطئ."
            },
            {
              type: "scenario",
              q_en: "Two products have similar packaging. What is BEST?",
              q_ar: "منتجان متشابهان في الشكل. ما الأفضل؟",
              options_en: ["Use warning labels + separate bins + double-check name", "Rely on color", "Ignore", "Store in same bin"],
              options_ar: ["ملصقات تحذير + فصل + تحقق مزدوج من الاسم", "الاعتماد على اللون", "تجاهل", "التخزين بنفس الصندوق"],
              correct: 0,
              explain_en: "Multiple safeguards reduce look-alike errors.",
              explain_ar: "تعدد الضوابط يقلل أخطاء التشابه."
            }
          ]
        },
        { id:"lasa_l2", name_en:"Common Pairs", name_ar:"أزواج شائعة", questions: [
          { type:"mcq",
            q_en:"Which pair represents a LASA risk that needs extra caution?",
            q_ar:"أي زوج يمثل خطر LASA ويحتاج حذرًا إضافيًا؟",
            options_en:["Humulin N / Humulin R","Paracetamol / Vitamin C","Metformin / Omeprazole","Ibuprofen / Diclofenac"],
            options_ar:["هيومولين N / هيومولين R","باراسيتامول / فيتامين C","ميتفورمين / أوميبرازول","إيبوبروفين / ديكلوفيناك"],
            correct:0,
            explain_en:"Similar insulin names/products can be confused; use verification safeguards.",
            explain_ar:"منتجات الإنسولين المتشابهة قد تُلبس؛ استخدم ضوابط التحقق."
          },
          { type:"scenario",
            q_en:"A nurse asks for 'Hydralazine' but the vial selected is 'Hydroxyzine'. What should stop this?",
            q_ar:"ممرضة طلبت 'Hydralazine' لكن تم اختيار 'Hydroxyzine'. ما الذي يمنع ذلك؟",
            options_en:["Barcode scan / second check / confirm indication","Speed up workflow","Skip label reading","Store together"],
            options_ar:["باركود/تحقق ثانٍ/تأكيد الاستطباب","تسريع العمل","تجاوز قراءة الملصق","تخزينهما معًا"],
            correct:0,
            explain_en:"Verification steps prevent look-alike/sound-alike selection errors.",
            explain_ar:"خطوات التحقق تمنع أخطاء الاختيار بسبب التشابه."
          },
          { type:"tf", q_en:"Including indication on the order can reduce LASA errors.", q_ar:"كتابة الاستطباب في الوصفة يقلل أخطاء LASA.", correct:0,
            explain_en:"Indication helps confirm the intended medication.", explain_ar:"الاستطباب يساعد على تأكيد الدواء المقصود."},
          { type:"mcq",
            q_en:"Best storage practice for LASA drugs is:",
            q_ar:"أفضل ممارسة تخزين لأدوية LASA هي:",
            options_en:["Separate + label + use alerts","Store all together","Remove labels","Rely on memory"],
            options_ar:["فصل + وسم + تنبيهات","تخزينها معًا","إزالة الملصقات","الاعتماد على الذاكرة"],
            correct:0, explain_en:"Segregation and alerts reduce mix-ups.", explain_ar:"الفصل والتنبيه يقللان الالتباس."
          },
          { type:"scenario",
            q_en:"During transcription, a similar name is selected from the list. Best action?",
            q_ar:"أثناء النسخ تم اختيار اسم مشابه من القائمة. ما أفضل إجراء؟",
            options_en:["Stop and verify with original order + read-back if verbal","Proceed","Assume correct","Fix after administration"],
            options_ar:["التوقف والتحقق من الأصل + قراءة عكسية إذا كان شفهيًا","المتابعة","الافتراض أنه صحيح","التصحيح بعد الإعطاء"],
            correct:0, explain_en:"Verification at transcription prevents downstream harm.", explain_ar:"التحقق أثناء النسخ يمنع الضرر لاحقًا."
          }
        ]},
        { id:"lasa_l3", name_en:"Prescribing & Transcribing", name_ar:"الوصف والنسخ", questions: [
          { type:"mcq", q_en:"Which is MOST helpful on LASA orders?", q_ar:"ما الأكثر فائدة في وصفات LASA؟",
            options_en:["Write generic + brand + indication","Use abbreviations only","Use unclear handwriting","No indication"],
            options_ar:["كتابة الاسم العلمي + التجاري + الاستطباب","اختصارات فقط","خط غير واضح","بدون استطباب"],
            correct:0, explain_en:"More identifiers reduce confusion.", explain_ar:"مزيد من المحددات يقلل الالتباس."},
          { type:"tf", q_en:"Read-back is recommended for preventing sound-alike errors.", q_ar:"القراءة العكسية موصى بها لمنع أخطاء التشابه الصوتي.", correct:0,
            explain_en:"Read-back confirms intended medication.", explain_ar:"تؤكد القراءة العكسية الدواء المقصود."},
          { type:"scenario", q_en:"A prescriber writes a confusing name. Best step?", q_ar:"كتب الطبيب اسمًا مربكًا. أفضل خطوة؟",
            options_en:["Clarify before dispensing/administering","Guess","Ask later","Proceed"],
            options_ar:["التوضيح قبل الصرف/الإعطاء","التخمين","السؤال لاحقًا","المتابعة"],
            correct:0, explain_en:"Clarify ambiguous orders early.", explain_ar:"التوضيح المبكر للغموض ضروري."},
          { type:"mcq", q_en:"Tall Man lettering is mainly for:", q_ar:"يستخدم Tall Man أساسًا لـ:",
            options_en:["Differentiating similar names","Changing dosage","Replacing barcodes","Speeding up dispensing"],
            options_ar:["تمييز الأسماء المتشابهة","تغيير الجرعات","استبدال الباركود","تسريع الصرف"],
            correct:0, explain_en:"It highlights the different parts of names.", explain_ar:"يبرز الأجزاء المختلفة في الاسم."},
          { type:"scenario", q_en:"Selecting from dropdown list: best defense?", q_ar:"اختيار من قائمة منسدلة: أفضل دفاع؟",
            options_en:["Pause + verify indication + second check","Click quickly","Assume first match","No review"],
            options_ar:["توقف + تحقق من الاستطباب + تحقق ثانٍ","ضغط سريع","الافتراض أن أول خيار صحيح","بدون مراجعة"],
            correct:0, explain_en:"Human factors errors occur in lists; verification helps.", explain_ar:"أخطاء بشرية تحدث في القوائم؛ التحقق يساعد."}
        ]},
        { id:"lasa_l4", name_en:"Storage & Dispensing", name_ar:"التخزين والصرف", questions: [
          { type:"tf", q_en:"Separating bins for LASA medicines reduces wrong selection.", q_ar:"فصل الصناديق لأدوية LASA يقلل اختيار دواء خاطئ.", correct:0,
            explain_en:"Segregation reduces mix-ups.", explain_ar:"الفصل يقلل الالتباس."},
          { type:"mcq", q_en:"Best label practice is:", q_ar:"أفضل ممارسة للملصقات هي:",
            options_en:["Use bold/clear labels + Tall Man where applicable","Remove labels","Handwritten abbreviations","Small faint labels"],
            options_ar:["ملصقات واضحة وبخط غامق + Tall Man عند الحاجة","إزالة الملصقات","اختصارات بخط اليد","ملصقات صغيرة باهتة"],
            correct:0, explain_en:"Clear labeling improves selection safety.", explain_ar:"الملصقات الواضحة تحسن أمان الاختيار."},
          { type:"scenario", q_en:"A LASA pair is frequently confused. Best system response?", q_ar:"زوج LASA يتكرر الالتباس به. أفضل استجابة نظامية؟",
            options_en:["Add alerts + separate storage + training + audit","Do nothing","Hide reporting","Tell staff be careful"],
            options_ar:["تنبيهات + فصل التخزين + تدريب + تدقيق","لا شيء","إخفاء الإبلاغ","قولوا انتبهوا"],
            correct:0, explain_en:"Layered defenses reduce recurrence.", explain_ar:"طبقات دفاع تقلل التكرار."},
          { type:"mcq", q_en:"Barcode scanning helps mainly by:", q_ar:"يساعد الباركود أساسًا عبر:",
            options_en:["Verifying correct product against order","Replacing labels","Changing dose","Speeding up typing"],
            options_ar:["تأكيد المنتج الصحيح مقابل الوصفة","استبدال الملصقات","تغيير الجرعة","تسريع الكتابة"],
            correct:0, explain_en:"Scanning reduces wrong-drug selection.", explain_ar:"يقلل الباركود اختيار دواء خاطئ."},
          { type:"scenario", q_en:"Two similar ampoules stored together. Best immediate fix?", q_ar:"أمبولتان متشابهتان مخزنتان معًا. أفضل حل فوري؟",
            options_en:["Separate now + add warning label","Leave as is","Move to top shelf","Ask later"],
            options_ar:["فصل الآن + إضافة ملصق تحذير","تركها كما هي","نقلها للأعلى","السؤال لاحقًا"],
            correct:0, explain_en:"Separation + warnings reduce selection error now.", explain_ar:"الفصل + التحذير يقللان خطأ الاختيار فورًا."
          }
        ]},
        { id:"lasa_l5", name_en:"Scenarios", name_ar:"سيناريوهات", questions: [
          { type:"scenario", q_en:"A near-miss LASA error occurred. Best next step?", q_ar:"حدثت شبه حادثة LASA. أفضل خطوة لاحقة؟",
            options_en:["Report + analyze + implement prevention","Ignore","Blame only","Hide"],
            options_ar:["الإبلاغ + تحليل + تطبيق الوقاية","تجاهل","لوم فقط","إخفاء"],
            correct:0, explain_en:"Reporting supports learning and prevention.", explain_ar:"الإبلاغ يدعم التعلم والوقاية."
          },
          { type:"scenario", q_en:"A patient has allergy and a similar name drug is selected. Best action?", q_ar:"مريض لديه حساسية وتم اختيار دواء باسم مشابه. ما أفضل إجراء؟",
            options_en:["Stop + verify order/drug + confirm allergy","Proceed","Ask later","Assume ok"],
            options_ar:["توقف + تحقق من الوصفة/الدواء + تأكيد الحساسية","المتابعة","السؤال لاحقًا","افتراض أنه لا مشكلة"],
            correct:0, explain_en:"Verification prevents harm.", explain_ar:"التحقق يمنع الضرر."
          },
          { type:"mcq", q_en:"Most effective long-term LASA control is:", q_ar:"أكثر ضبط فعال طويل المدى لـ LASA هو:",
            options_en:["Standardized process + audits + training + alerts","One-time memo","Memory only","Stop reporting"],
            options_ar:["عملية موحدة + تدقيق + تدريب + تنبيهات","تعميم مرة واحدة","الذاكرة فقط","إيقاف الإبلاغ"],
            correct:0, explain_en:"Sustained controls require measurement and reinforcement.", explain_ar:"الاستدامة تحتاج قياسًا وتعزيزًا."
          },
          { type:"tf", q_en:"Including indication on prescriptions reduces LASA errors.", q_ar:"ذكر الاستطباب في الوصفات يقلل أخطاء LASA.", correct:0,
            explain_en:"Indication helps confirm intended drug.", explain_ar:"الاستطباب يثبت الدواء المقصود."
          },
          { type:"scenario", q_en:"During night shift, a LASA drug is requested. Best safe step?", q_ar:"في مناوبة ليلية طُلب دواء LASA. أفضل خطوة أمان؟",
            options_en:["Use read-back + verify name + second check","Rush","Skip checks","Store together"],
            options_ar:["قراءة عكسية + تحقق من الاسم + تحقق ثانٍ","الاستعجال","تجاوز التحقق","تخزينها معًا"],
            correct:0, explain_en:"Night shift increases error risk; safeguards matter.", explain_ar:"المناوبة الليلية تزيد خطر الأخطاء؛ الضوابط مهمة."
          }
        ]}
      ]
    }
  }
};

/* ---------- Progress store ---------- */
function loadProgress(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return {};
    return JSON.parse(raw);
  } catch { return {}; }
}
function saveProgress(p){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
function getModuleProgress(moduleId){
  const p = loadProgress();
  return p[moduleId] || { levels: {} };
}
function setLevelProgress(moduleId, levelId, obj){
  const p = loadProgress();
  if(!p[moduleId]) p[moduleId] = { levels:{} };
  p[moduleId].levels[levelId] = obj;
  saveProgress(p);
}

/* ---------- Helpers ---------- */
function t(){ return I18N[LANG]; }

function setDir(){
  document.documentElement.lang = LANG;
  document.documentElement.dir = (LANG === "ar") ? "rtl" : "ltr";
}

function pct(n, d){
  if(d<=0) return 0;
  return Math.round((n/d)*100);
}

function moduleStats(moduleId){
  const module = APP.modules[moduleId];
  const prog = getModuleProgress(moduleId);
  const totalLevels = module.levels.length;

  let doneLevels = 0;
  let totalAnswered = 0;
  let totalQs = 0;

  module.levels.forEach(l=>{
    const lp = prog.levels[l.id];
    const answered = lp?.answeredCount || 0;
    const total = l.questions.length;
    totalAnswered += answered;
    totalQs += total;
    if(lp?.completed) doneLevels++;
  });

  return {
    doneLevels,
    totalLevels,
    percent: pct(doneLevels, totalLevels),
    answeredPercent: pct(totalAnswered, totalQs) // optional
  };
}

function levelName(moduleId, level){
  return LANG === "ar" ? level.name_ar : level.name_en;
}

function questionText(q){
  return LANG === "ar" ? q.q_ar : q.q_en;
}
function optionsText(q){
  if(q.type === "tf"){
    return [t().answers.true, t().answers.false];
  }
  return LANG === "ar" ? q.options_ar : q.options_en;
}

function qTypeLabel(q){
  if(q.type === "scenario") return t().types.scenario;
  if(q.type === "tf") return t().types.tf;
  return t().types.mcq;
}

/* ---------- Views ---------- */
const homeView = document.getElementById("homeView");
const moduleView = document.getElementById("moduleView");
const quizView = document.getElementById("quizView");

function showHome(){
  document.body.classList.remove("theme-high","theme-lasa");
  homeView.classList.remove("hidden");
  moduleView.classList.add("hidden");
  quizView.classList.add("hidden");
  renderHome();
}

function showModule(moduleId){
  const mod = APP.modules[moduleId];
  document.body.classList.remove("theme-high","theme-lasa");
  document.body.classList.add(mod.theme === "high" ? "theme-high" : "theme-lasa");

  homeView.classList.add("hidden");
  moduleView.classList.remove("hidden");
  quizView.classList.add("hidden");

  document.getElementById("moduleName").textContent = t().modules[moduleId].title;
  document.getElementById("moduleDesc").textContent = t().modules[moduleId].desc;

  renderLevels(moduleId);
}

/* ---------- Render Home ---------- */
function renderHome(){
  setDir();
  document.getElementById("appTitle").textContent = t().appTitle;
  document.getElementById("appSubtitle").textContent = t().appSubtitle;
  document.getElementById("homeHint").textContent = t().tip;

  document.getElementById("highTitle").textContent = t().modules.high.title;
  document.getElementById("lasaTitle").textContent = t().modules.lasa.title;

  document.getElementById("openHighBtn").textContent = t().startContinue;
  document.getElementById("openLasaBtn").textContent = t().startContinue;

  const hs = moduleStats("high");
  document.getElementById("highLevelsDone").textContent = t().moduleProgress(hs.doneLevels, hs.totalLevels);
  document.getElementById("highPercent").textContent = `${hs.percent}%`;
  document.getElementById("highProgress").style.width = `${hs.percent}%`;

  const ls = moduleStats("lasa");
  document.getElementById("lasaLevelsDone").textContent = t().moduleProgress(ls.doneLevels, ls.totalLevels);
  document.getElementById("lasaPercent").textContent = `${ls.percent}%`;
  document.getElementById("lasaProgress").style.width = `${ls.percent}%`;
}

/* ---------- Render Levels ---------- */
function renderLevels(moduleId){
  const mod = APP.modules[moduleId];
  const prog = getModuleProgress(moduleId);
  const list = document.getElementById("levelsList");
  list.innerHTML = "";

  mod.levels.forEach((lvl, idx)=>{
    const lp = prog.levels[lvl.id] || { answeredCount:0, score:0, completed:false };
    const totalQ = lvl.questions.length;

    const isUnlocked = (idx === 0) || (prog.levels[mod.levels[idx-1].id]?.completed);
    const percentDone = pct(lp.answeredCount, totalQ);

    const row = document.createElement("div");
    row.className = "level-item" + (isUnlocked ? "" : " locked");

    const left = document.createElement("div");
    left.className = "level-left";
    const title = document.createElement("div");
    title.className = "level-title";
    title.textContent = t().level(idx+1, levelName(moduleId, lvl));

    const sub = document.createElement("div");
    sub.className = "level-sub";
    const status = lp.completed ? `✅ ${t().completed}` : (isUnlocked ? `${percentDone}%` : `🔒 ${t().locked} — ${t().unlockRule}`);
    sub.textContent = status;

    left.appendChild(title);
    left.appendChild(sub);

    const btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.type = "button";
    btn.textContent = isUnlocked ? (lp.completed ? t().restart : t().startContinue) : "🔒";
    btn.disabled = !isUnlocked;
    btn.onclick = ()=> startLevel(moduleId, lvl.id);

    row.appendChild(left);
    row.appendChild(btn);
    list.appendChild(row);
  });

  document.getElementById("backHomeBtn").textContent = t().back;
}

/* ---------- Quiz Engine ---------- */
let CURRENT = { moduleId:null, levelId:null, index:0, score:0, answered:0, locked:false };

function startLevel(moduleId, levelId){
  const mod = APP.modules[moduleId];
  const lvl = mod.levels.find(x=>x.id===levelId);

  CURRENT.moduleId = moduleId;
  CURRENT.levelId = levelId;
  CURRENT.index = 0;
  CURRENT.score = 0;
  CURRENT.answered = 0;

  homeView.classList.add("hidden");
  moduleView.classList.add("hidden");
  quizView.classList.remove("hidden");

  document.body.classList.remove("theme-high","theme-lasa");
  document.body.classList.add(mod.theme === "high" ? "theme-high" : "theme-lasa");

  document.getElementById("backLevelsBtn").textContent = t().levelsBack;
  document.getElementById("nextBtn").textContent = t().next;

  renderQuestion();
}

function getCurrentLevel(){
  const mod = APP.modules[CURRENT.moduleId];
  return mod.levels.find(x=>x.id===CURRENT.levelId);
}

function renderQuestion(){
  const lvl = getCurrentLevel();
  const q = lvl.questions[CURRENT.index];

  document.getElementById("quizHeaderLine").textContent =
    t().level(lvlIndex(CURRENT.moduleId, CURRENT.levelId)+1, levelName(CURRENT.moduleId, lvl));

  document.getElementById("quizProgressLine").textContent = t().qOf(CURRENT.index+1, lvl.questions.length);

  document.getElementById("questionType").textContent = qTypeLabel(q);
  document.getElementById("questionText").textContent = questionText(q);

  document.getElementById("scoreLine").textContent = t().score(CURRENT.score);

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  const explain = document.getElementById("explainBox");
  explain.classList.add("hidden");
  explain.textContent = "";

  const opts = optionsText(q);

  // Disable next until answered
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.disabled = true;

  opts.forEach((txt, i)=>{
    const b = document.createElement("button");
    b.className = "answer-btn";
    b.type = "button";
    b.textContent = txt;
    b.onclick = ()=> answerQuestion(i);
    answersDiv.appendChild(b);
  });
}

function answerQuestion(choice){
  const lvl = getCurrentLevel();
  const q = lvl.questions[CURRENT.index];
  const correct = q.correct;

  const buttons = Array.from(document.querySelectorAll(".answer-btn"));
  buttons.forEach((b, i)=>{
    b.disabled = true;
    if(i === correct) b.classList.add("correct");
    if(i === choice && i !== correct) b.classList.add("wrong");
  });

  if(choice === correct) CURRENT.score++;
  CURRENT.answered++;

  document.getElementById("scoreLine").textContent = t().score(CURRENT.score);

  const explain = document.getElementById("explainBox");
  const ex = (LANG === "ar" ? q.explain_ar : q.explain_en) || "";
  explain.textContent = (choice === correct ? t().correct : t().incorrect) + " — " + ex;
  explain.classList.remove("hidden");

  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion(){
  const lvl = getCurrentLevel();
  CURRENT.index++;

  if(CURRENT.index >= lvl.questions.length){
    // Complete level
    const total = lvl.questions.length;

    // Completion rule:
    // - mark completed if score >= 70%
    const pass = (CURRENT.score / total) >= 0.70;

    setLevelProgress(CURRENT.moduleId, CURRENT.levelId, {
      answeredCount: total,
      score: CURRENT.score,
      completed: pass
    });

    alert(t().doneMsg(CURRENT.score, total));

    showModule(CURRENT.moduleId);
    renderHome();
    return;
  }

  renderQuestion();
}

function lvlIndex(moduleId, levelId){
  const mod = APP.modules[moduleId];
  return mod.levels.findIndex(l=>l.id===levelId);
}

/* ---------- Language Toggle ---------- */
function applyLangUI(){
  const langBtn = document.getElementById("langBtn");
  if(langBtn) langBtn.textContent = (LANG === "ar") ? "English" : "العربية";
  renderHome();
}
function initLangToggle(){
  const langBtn = document.getElementById("langBtn");
  if(!langBtn) return;
  langBtn.addEventListener("click", ()=>{
    LANG = (LANG === "en") ? "ar" : "en";
    localStorage.setItem(LANG_KEY, LANG);
    applyLangUI();
  });
}

/* ---------- Wiring ---------- */
document.getElementById("openHighBtn").addEventListener("click", ()=> showModule("high"));
document.getElementById("openLasaBtn").addEventListener("click", ()=> showModule("lasa"));
document.getElementById("backHomeBtn").addEventListener("click", ()=> showHome());
document.getElementById("backLevelsBtn").addEventListener("click", ()=> showModule(CURRENT.moduleId));
document.getElementById("nextBtn").addEventListener("click", ()=> nextQuestion());

document.addEventListener("DOMContentLoaded", ()=>{
  initLangToggle();
  applyLangUI();
  showHome();
});