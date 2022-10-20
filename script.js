let get = (x) => {
    return document.querySelector(x);
}
let create = (x) => {
    return document.createElement(x);
}

let questions = [
    // {
    //     question: "Vilken färg är bäst?",
    //     type: "radio",
    //     answers: ["Grön", "Gul", "Lila", "Turkos"],
    //     correctAnswer: "Grön"
    // },
    // {
    //     question: "Jag har två ben",
    //     type: "radio",
    //     answers: ["Sant", "Falskt"],
    //     correctAnswer: "Sant"
    // },
    // {
    //     question: "Jag bor i Kalmar",
    //     type: "radio",
    //     answers: ["Sant", "Falskt"],
    //     correctAnswer: "Falskt"
    // },
    //     {
    //     question: "Vem styr världen?",
    //     type: "radio",
    //     answers: ["Sofia", "Ödlor", "Elon Musk", "Ingen"],
    //     correctAnswer: "Ödlor"
    // },
    // {
    //     question: "Hades bor i Hades",
    //     type: "radio",
    //     answers: ["Sant", "Falskt"],
    //     correctAnswer: "Sant"
    // },
    {
        question: "Perseiderna dyker upp i juli",
        type: "radio",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Falskt"
    },
    // {
    //     question: "Vilka metoder kan jag använda om jag vill lägga till ett element i en array?",
    //     type: "checkbox",
    //     answers: ["pop", "push", "shift", "unshift"],
    //     correctAnswer: ["unshift", "push"]
    // },
    {
        question: "Vad dricker Fantomen helst?",
        type: "radio",
        answers: ["Cola", "Vatten", "Kaffe", "Mjölk"],
        correctAnswer: "Mjölk"
    },
    {
        question: "Gräset är grönt",
        type: "radio",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Sant"
    },
    // {
    //     question: "Vilket år blev Olof Palme skjuten?",
    //     type: "radio",
    //     answers: ["1985", "1986", "1987", "1988"],
    //     correctAnswer: "1986"
    // },
    // {
    //     question: "Vilka metoder kan jag använda om jag vill lägga till ett element i en array?",
    //     type: "checkbox",
    //     answers: ["pop", "push", "shift", "unshift"],
    //     correctAnswer: ["unshift", "push"]
    // }
];

//variables
let backgroundBtn = get(".backgroundBtn");
let container = get(".container");
let scoreH4 = create("h4");
let submitBtn = create("button");
submitBtn.innerText = "Kolla svar";
let radioBtnValue = [];
let checkBoxValue = [];
counter = 0;
 
//funktion som skapar svars-alternativ
let createLi = (item, i, type) => {
    let li = create("li");
    li.innerHTML = `<input type="${type}" name="question${i}" id="${item}${i}" value="${item}" class="${type}">
    <label for="${item}${i}">${item}</label>`;
    return li;
}

//skapar en div och en ul för varje fråga
//appendar frågor och svarsalternativ
questions.forEach((question, i) => {
    let questionDiv = create("div");
    questionDiv.classList.add("question-div");
    let questionH3 = create("h3");
    let list = create("ul");
    questionH3.innerText = question.question;
    container.append(questionDiv);
    questionDiv.append(questionH3, list);

    question.answers.forEach(answer => {
        if (questions[i].type === "radio") {
            let li = createLi(answer, i, "radio");
            list.append(li);
        } else if (questions[i].type === "checkbox") {
            let li = createLi(answer, i, "checkbox");
            list.append(li);
        }
    })
})

container.append(submitBtn, scoreH4);

//if else beroende på typ? 
let checkAnswers = (arr) => {
    
    // if (document.querySelectorAll("[type='radio']:checked").length < arr.length) {
    //     scoreH4.innerText = "Du har inte fyllt i alla svaren! \nGissa om du inte kan."
    // } else {
        
        arr.sort((a,b) => b.type.localeCompare(a.type));

        let radioBtnAnswers = document.querySelectorAll(" .radio:checked");
        radioBtnAnswers.forEach(item => {
            radioBtnValue.push(item.value);
        })

        let checkBoxAnswers = document.querySelectorAll(" .checkbox:checked");
        checkBoxAnswers.forEach(item => {
            checkBoxValue.push(item.value);
        })


        radioBtnValue.forEach((item, i) => {
            let q = get(`[name='question${i}']:checked`);

            if (item === arr[i].correctAnswer) {
                counter++;
                q.style.accentColor = "SeaGreen";
                q.nextElementSibling.innerHTML += ` - Rätt svar`;
            } else {
                q.style.accentColor = "IndianRed";
                q.nextElementSibling.innerHTML += ` - Fel svar`;
            }
        })
        scoreResult(scoreH4, arr);
        submitBtn.remove(); 
    }
// }

let scoreResult = (score, arr) => {
    score.innerText = `Du fick ${counter} rätt av ${arr.length} möjliga! `;
    if (counter > (0.75 * arr.length)) {
        score.innerText += "\n Detta ger ett Mycket väl godkänt resultat. "
        score.style.color = "SeaGreen";
    } else if (counter => (0.5 * arr.length)) {
        score.innerText += "\n Detta ger ett godkänt resultat. "
        score.style.color = "LightSalmon";
    } else if (counter < (0.5 * arr.length)) {
        score.innerText += "\n Detta ger ett Underkänt resultat. "
        score.style.color = "IndianRed";
    }
}

submitBtn.addEventListener("click", () => {
    checkAnswers(questions);
})

backgroundBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    container.classList.toggle("dark-mode-container");
    let labels = document.querySelectorAll("label");
    labels.forEach(item => {
        item.classList.toggle("dark-mode-label")
    })
    let buttons = document.querySelectorAll("button");
    buttons.forEach(item => {
        item.classList.toggle("button-dark-mode")
    })
})

