let get = (x) => {
    return document.querySelector(x);
}
let create = (x) => {
    return document.createElement(x);
}

let container = get("#container");


let questions = [
    {
        question: "Grön är min bästa färg",
        a: true,
        b: false,
        correctAnswer: true
    },
    {
        question: "Jag har två ben",
        a: true,
        b: false,
        correctAnswer: true
    },
    {
        question: "Ja bor i Kalmar",
        a: true,
        b: false,
        correctAnswer: false
    },
    {
        question: "Jag föddes igår",
        a: true,
        b: false,
        correctAnswer: false
    },
    {
        question: "Mamma heter Anneli",
        a: true,
        b: false,
        correctAnswer: true
    },
    {
        question: "Jorden är platt",
        a: true,
        b: false,
        correctAnswer: false
    },
    {
        question: "Ödlor styr världen",
        a: true,
        b: false,
        correctAnswer: false
    }
];
let submitBtn = create("button");
submitBtn.innerText = "Kolla svar";
    

let writeQuestions = (arr) => {
    startBtn.remove();
    arr.forEach((item, i) => {
        console.log(i);
        let questionDiv = create("div");
        questionDiv.classList.add("question-div");
        let questionH3 = create("h3");
        let list = create("ul");
        questionH3.innerText = item.question;
        
        let liA = create("li");
        liA.innerHTML = `<input type="radio" name="question${i}" id="${item.a}${i}">
        <label for="${item.a}${i}">${item.a}</label>`;
        
        let liB = create("li");
        liB.innerHTML = `<input type="radio" name="question${i}" id="${item.b}${i}">
        <label for="${item.b}${i}">${item.b}</label>`;
    
    
        container.append(questionDiv);
        questionDiv.append(questionH3, list);
        list.append(liA, liB);
    })    
    
    container.append(submitBtn);
}


let startBtn = get("#start");
startBtn.addEventListener("click", () => {
    writeQuestions(questions);
})

submitBtn.addEventListener("click", () => {
    console.log("jag klickar")
})