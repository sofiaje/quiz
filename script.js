let get = (x) => {
    return document.querySelector(x);
}
let create = (x) => {
    return document.createElement(x);
}

let questions = [
    {
        question: "Grön är min bästa färg",
        a: "sant",
        b: "falskt",
        correctAnswer: "sant"
    },
    {
        question: "Jag har två ben",
        a: "sant",
        b: "falskt",
        correctAnswer: "sant"
    },
    {
        question: "Ja bor i Kalmar",
        a: "sant",
        b: "falskt",
        correctAnswer: "falskt"
    },
    {
        question: "Jag föddes igår",
        a: "sant",
        b: "falskt",
        correctAnswer: "falskt"
    },
    {
        question: "Mamma heter Anneli",
        a: "sant",
        b: "falskt",
        correctAnswer: "sant"
    },
    {
        question: "Jorden är platt",
        a: "sant",
        b: "falskt",
        correctAnswer: "falskt"
    },
    {
        question: "Ödlor styr världen",
        a: "sant",
        b: "falskt",
        correctAnswer: "falskt"
    }
];

let container = get("#container");
let submitBtn = create("button");
submitBtn.innerText = "Kolla svar";
let scoreH3 = create("h3");
let radioBtnValue = [];
counter = 0;

let writeQuestions = (arr) => {
    startBtn.remove();
    arr.forEach((item, i) => {
        let questionDiv = create("div");
        questionDiv.classList.add("question-div");
        let questionH3 = create("h3");
        let list = create("ul");
        questionH3.innerText = item.question;
        
        let liA = create("li");
        liA.innerHTML = `<input type="radio" name="question${i}" id="${item.a}${i}" value="${item.a}">
        <label for="${item.a}${i}">${item.a}</label>`;
        
        let liB = create("li");
        liB.innerHTML = `<input type="radio" name="question${i}" id="${item.b}${i}" value="${item.b}">
        <label for="${item.b}${i}">${item.b}</label>`;
    
        container.append(questionDiv);
        questionDiv.append(questionH3, list);
        list.append(liA, liB);
    })    
    
    container.append(submitBtn, scoreH3);
}


let startBtn = get("#start");
startBtn.addEventListener("click", () => {
    writeQuestions(questions);
})

submitBtn.addEventListener("click", () => {
    if (document.querySelectorAll("[type='radio']:checked").length < questions.length) {
        scoreH3.innerText = "Du har inte fyllt i alla svaren."
    } else {
        scoreH3.innerText = "Ja, hurra!"
        let radioBtnAnswers = document.querySelectorAll("[type='radio']:checked");
        radioBtnAnswers.forEach(item => {
            radioBtnValue.push(item.value);
        })
        radioBtnValue.forEach((item, i) => {
            if (item === questions[i].correctAnswer) {
                counter++;
            };
        })
        scoreH3.innerText = `du fick ${counter} rätt av 7 möjliga`;
    }
})