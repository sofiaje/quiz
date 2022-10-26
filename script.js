let get = (x) => {
    return document.querySelector(x);
}
let create = (x) => {
    return document.createElement(x);
}

let questions = [
    // {
    //     question: "Blåvalen är det största djuret som någonsin levt",
    //     type: "radio",
    //     answers: ["Sant", "Falskt"],
    //     correctAnswer: "Sant"
    // },
    // {
    //     question: "Sant eller falskt?",
    //     type: "radio",
    //     answers: ["Sant", "Falskt"],
    //     correctAnswer: "Sant"
    // },
    // {
    //     question: "Vem upfann glödlampan?",
    //     type: "radio",
    //     answers: ["James Watt", "Nikola Tesla", "Thomas Edison", "Louis Breguet"],
    //     correctAnswer: "Thomas Edison",
    // },
    // {
    //     question: "Bor Hades i Hades?",
    //     type: "radio",
    //     answers: ["Sant", "Falskt"],
    //     correctAnswer: "Sant"
    // },
    // {
    //     question: "Vilka länder är inte med i EU?",
    //     type: "checkbox",
    //     answers: ["Irland", "Island", "Norge", "Liechtenstein"],
    //     correctAnswer: ["Island", "Norge", "Liechtenstein"],
    // },
    // {
    //     question: "Vad dricker Fantomen helst?",
    //     type: "radio",
    //     answers: ["Cola", "Vatten", "Kaffe", "Mjölk"],
    //     correctAnswer: "Mjölk"
    // },
    // {
    //     question: "Vilket år blev Olof Palme skjuten?",
    //     type: "radio",
    //     answers: ["1985", "1986", "1987", "1988"],
    //     correctAnswer: "1986"
    // },
    {
        question: "Hur länge sover en vuxen människa i Sverige i genomsnitt per natt?",
        type: "radio",
        answers: ["Strax under sju timmar", "Strax under åtta timmar", "Strax under nio timmar"],
        correctAnswer: "Strax under sju timmar"
    },
    {
        question: "Vilka metoder kan jag använda om jag vill ta bort ett element i en array?",
        type: "checkbox",
        answers: ["pop", "push", "shift", "unshift"],
        correctAnswer: ["pop", "shift"],
    },
    {
        question: "Vilka namn har du?",
        type: "checkbox",
        answers: ["Sofia", "Tove", "Helena", "Madeleine"],
        correctAnswer: ["Sofia", "Tove", "Helena"]
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
                radioBtnAnswer.nextElementSibling.style.color = "Crimson";
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
                    box.nextElementSibling.style.color = "crimson";
                }
            })
            
            let checkboxComment = document.querySelector(`.p-${i}`);
            if (countAnswers === rightCheckboxAnswers.length) {
                counter++;
                title.innerText += " (1p)";
            } else {
                title.innerText += " (0p)";
                checkboxComment.innerText = `Det finns ${rightCheckboxAnswers.length} rätta svarsalternativ, \ndu måste hitta alla för att poäng.`
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
    } else if (counter > (0.5 * length)) {
        score.innerText += "\n Det ger ett godkänt resultat: helt ok va!"
        score.style.color = "Goldenrod";
    } else if (counter < (0.6 * length)) {
        score.innerText += "\n Underkänt! Kanske testa igen?"
        score.style.color = "IndianRed";
    }
}

//togglar dark-mode/light-mode 
backgroundBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    container.classList.toggle("dark-mode-container");
    document.querySelectorAll("button").forEach(item => {
        item.classList.toggle("button-dark-mode")
    })
})

//skriver ut frågorna
writeQuestions(questions);