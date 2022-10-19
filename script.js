let get = (x) => {
    return document.querySelector(x);
}
let create = (x) => {
    return document.createElement(x);
}

let questions = [
    {
        question: "Vilken färg är bäst?",
        answers: ["Grön", "Gul", "Lila", "Turkos", "Blå", "rosa"],
        correctAnswer: "Grön"
    },
    {
        question: "Jag har två ben",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Sant"
    },
    {
        question: "Jag bor i Kalmar",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Falskt"
    },
        {
        question: "Vem styr världen?",
        answers: ["Sofia", "Ödlor", "Elon Musk", "Ingen"],
        correctAnswer: "Ödlor"
    },
    {
        question: "Hades bor i Hades",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Sant"
    },
    {
        question: "Perseiderna dyker upp i juli",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Falskt"
    },
    {
        question: "Vad dricker Fantomen helst?",
        answers: ["Cola", "Vatten", "Kaffe", "Mjölk"],
        correctAnswer: "Mjölk"
    },
    {
        question: "Vilken metod ska jag använda om jag vill lägga till ett element i början av en array?",
        answers: ["pop", "push", "shift", "unshift"],
        correctAnswer: "unshift"
    },
    {
        question: "Gräset är grönt",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Sant"
    },
    {
        question: "Vilket år blev olof palme mördad?",
        answers: ["1985", "1986", "1987", "1988"],
        correctAnswer: "1986"
    }
];

//variables
let backgroundBtn = get(".backgroundBtn");
let container = get(".container");
let scoreH4 = create("h4");
let submitBtn = create("button");
submitBtn.innerText = "Kolla svar";
let radioBtnValue = [];
counter = 0;
 
//funktion som skapar svars-alternativ
let createLi = (item, i) => {
    let li = create("li");
    li.innerHTML = `<input type="radio" name="question${i}" id="${item}${i}" value="${item}">
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
        let li = createLi(answer, i);
        list.append(li);
    })
})

container.append(submitBtn, scoreH4);


let checkAnswers = (arr) => {
    if (document.querySelectorAll("[type='radio']:checked").length < arr.length) {
        scoreH4.innerText = "Du har inte fyllt i alla svaren."
    } else {
        let radioBtnAnswers = document.querySelectorAll("[type='radio']:checked");
        radioBtnAnswers.forEach(item => {
            radioBtnValue.push(item.value);
        })
        radioBtnValue.forEach((item, i) => {
            let q = get(`[name='question${i}']:checked`);

            if (item === arr[i].correctAnswer) {
                counter++;
                q.style.accentColor = "green";
                q.nextElementSibling.innerHTML += ` &#10004`;
            } else {
                q.style.accentColor = "FireBrick";
                q.nextElementSibling.innerHTML += ` `;

            }
        })
        scoreResult(scoreH4, arr);
    }
}

let scoreResult = (score, arr) => {
    //lägg till effekt vid alla rätt?
    score.innerText = `Du fick ${counter} rätt av ${arr.length} möjliga! `;
    if (counter > (0.75 * arr.length)) {
        score.innerText += "\n Detta ger ett Mycket väl godkänt resultat. "
        score.style.color = "green";
    } else if (counter => (0.5 * arr.length)) {
        score.innerText += "\n Detta ger ett godkänt resultat. "
        score.style.color = "Coral";
    } else if (counter < (0.5 * arr.length)) {
        score.innerText += "\n Detta ger ett Underkänt resultat. "
        score.style.color = "FireBrick";
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

