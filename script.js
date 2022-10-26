let get = (x) => {
    return document.querySelector(x);
}
let create = (x) => {
    return document.createElement(x);
}

let questions = [
    {
        question: "Vad brukar man säga att man ska räkna när man inte kan sova?",
        type: "radio",
        answers: ["Katter", "Får", "Algebra", "Tår"],
        correctAnswer: "Får"
    },
    {
        question: "Sömnbehovet avtar med åldern",
        type: "radio",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Sant"
    },
    {
        question: "Vad står begreppet REM för?",
        type: "radio",
        answers: ["Relaxed eye movement", "Rare eye measurement", "Rapid eye movement", "Rest eye management"],
        correctAnswer: "Rapid eye movement",
    },
    {
        question: "I djurriket kan sömnvanorna se väldigt annorlunda ut, vilka av dessa sover i snitt mer än 15h per dygn?",
        type: "checkbox",
        answers: ["Katten", "Elefanten", "Bältdjuret", "Koalan"],
        correctAnswer: ["Katten", "Bältdjuret", "Koalan"]
    },
        {
        question: "I sagan om Törnrosa vilar en förbannelse över prinsessan, denna säger att hon kommer att sticka sig på en slända och falla i en hundraårig sömn. Hur gammal är Törnrosan när profetian går i uppfyllelse?",
        type: "radio",
        answers: ["13", "15", "16", "18"],
        correctAnswer: "16"
    },
    {
        question: "Hjärnans främre lober, den del som styr omdöme och planeringsförmåga, är extra aktiv när vi drömmer",
        type: "radio",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Falskt"
    },
    {
        question: "Sömnfobi är en irrationell rädsla för att somna, vad kallas detta med ett annat ord?",
        type: "radio",
        answers: ["Insomnia", "Hypnofobi", "Skotofobi", "Hypersomnia"],
        correctAnswer: "Hypnofobi"
    },
    {
        question: "Nedan följer några  myter om sömn, vilka stämmer?",
        type: "checkbox",
        answers: ["Man måste sova minst 8 timmar per natt", "Att vistas i dagsljus på dagen gör att man sover bättre", "En potatis innan läggdags kan ha en positiv effekt på sömnen", "Om man är trött när man vaknar så har man sovit otillräckligt"],
        correctAnswer: ["Att vistas i dagsljus på dagen gör att man sover bättre", "En potatis innan läggdags kan ha en positiv effekt på sömnen"],
    },
    {
        question: "Vad innebär begreppet sömnparalys?",
        type: "radio",
        answers: ["Man är medveten om att man sover", "Man har vaknat men kan inte röra sig", "Man drömmer ovanligt färgstarkt", "Man minns ej vad man drömt"],
        correctAnswer: "Man har vaknat men kan inte röra sig"
    },
    {
        question: "Rekordet för dygn utan sömn sägs ha slagits av en amerikansk discjockey på 1960-talet, hur många dygn vad han vaken?",
        type: "radio",
        answers: ["8", "10", "11", "14"],
        correctAnswer: "11"
    },
    {
        question: "Hur länge sover en vuxen människa i Sverige i genomsnitt per natt?",
        type: "radio",
        answers: ["Strax under sju timmar", "Strax under åtta timmar", "Strax under nio timmar"],
        correctAnswer: "Strax under sju timmar"
    },
    {
        question: "Sömnen är uppdelad i så kallade sömncykler, vilka olika faser brukar man tala om? ",
        type: "checkbox",
        answers: ["Drömsömnen", "Bassömnen", "Insomningsfasen", "Uppvakningsfasen", "Djupsömnen"],
        correctAnswer: ["Drömsömnen", "Bassömnen", "Insomningsfasen", "Djupsömnen"]
    }
];

//variabler
let backgroundBtn = get(".background-btn");
let container = get(".container");
let scoreH4 = create("h4");


let submitBtn = create("button");
submitBtn.classList.add("submit-btn");
submitBtn.innerText = "Kolla svar";
counter = 0;

//funktion som skapar svars-alternativ
let createLi = (item, i, type) => {
    let li = create("li");
    li.innerHTML = `<input type="${type}" name="${type}-question-${i}" id="${item}${i}" value="${item}">
    <label for="${item}${i}">${item}</label>`;
    return li;
}

//skapar en div och en ul för varje fråga
//appendar frågor och svarsalternativ
let writeQuestions = (arr) => {
    arr.forEach((question, i) => {
        let questionDiv = create("div");
        let questionH3 = create("h3");
        questionH3.classList.add(`h3-${i}`);
        questionH3.innerText = question.question;

        let list = create("ul");
        let questionP = create("p");
        questionP.classList.add(`p-${i}`);
        container.append(questionDiv);
        questionDiv.append(questionH3, questionP, list);
    
        if (question.type === "radio") {
            question.answers.forEach(answer => {
                    let li = createLi(answer, i, "radio");
                    list.append(li);
            })
        } else if (question.type === "checkbox") {
            question.answers.forEach(answer => {
                    let li = createLi(answer, i, "checkbox");
                    list.append(li);
            })
        }
    })
    container.append(submitBtn, scoreH4);
    submitBtn.addEventListener("click", () => {
        checkAnswers(arr);
    })
}

//kolla användarens svar
let checkAnswers = (arr) => {
    let checkbox = [];
    let rightCheckboxAnswers = [];
    let radioBtnAnswer = [];

    for (let i = 0; i < arr.length; i++) {
        let title = get(`.h3-${i}`);
        if (arr[i].type === "radio") {
            radioBtnAnswer = document.querySelector(`[name='radio-question-${i}']:checked`);
            if (radioBtnAnswer === null) {
                title.innerText += " (0p)";
            } else if (radioBtnAnswer.value === arr[i].correctAnswer) {
                counter++;
                radioBtnAnswer.nextElementSibling.style.color = "SeaGreen";
                title.innerText += " (1p)";
            } else {
                radioBtnAnswer.nextElementSibling.style.color = "IndianRed";
                title.innerText += " (0p)";
            }
        } else if (arr[i].type === "checkbox") {
            checkbox = document.querySelectorAll(`[name='checkbox-question-${i}']:checked`);
            rightCheckboxAnswers = arr[i].correctAnswer;

            let countAnswers = "";
            checkbox.forEach(box => {
                if (rightCheckboxAnswers.includes(box.value)) {
                    countAnswers++;
                    box.nextElementSibling.style.color = "SeaGreen";
                } else {
                    countAnswers--;
                    box.nextElementSibling.style.color = "IndianRed";
                }
            })
            
            let checkboxComment = document.querySelector(`.p-${i}`);
            if (countAnswers === rightCheckboxAnswers.length) {
                counter++;
                title.innerText += " (1p)";
            } else {
                title.innerText += " (0p)";
                checkboxComment.innerText = `Det finns ${rightCheckboxAnswers.length} rätta svarsalternativ, \ndu måste hitta alla för att få poäng.`
            }
        }
        scoreResult(scoreH4, arr);
        submitBtn.remove(); 
    }
}

//skriv ut resultat med gradering
let scoreResult = (score, arr) => {
    let length = arr.length;
    score.innerText = `Du fick ${counter} rätt av ${length} möjliga!`;    
    if (counter === length) {
        score.innerText += "\n Wooo! Hurra! Snyggt!"
        score.style.color = "SeaGreen";
    } else if (counter > (0.75 * length)) {
        score.innerText += "\n Bra jobbat! Ett Mycket väl godkänt resultat. "
        score.style.color = "SeaGreen";
    } else if (counter >= (0.5 * length)) {
        score.innerText += "\n Det ger ett godkänt resultat: helt ok va!"
        score.style.color = "Goldenrod";
    } else {
        score.innerText += "\n Underkänt! Somnade du?"
        score.style.color = "IndianRed";
    }
}

//togglar dark-mode/light-mode 
backgroundBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    container.classList.toggle("dark-mode-container");
    document.querySelectorAll("button").forEach(item => {
        item.classList.toggle("button-dark-mode");
    })
    get(".page-title").classList.toggle("page-title-dark-mode")
    get(".small").classList.toggle("image-hide");
})

//skriver ut frågorna
writeQuestions(questions);