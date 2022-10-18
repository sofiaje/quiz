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
        question: "Jag bor i Kalmar",
        a: "sant",
        b: "falskt",
        correctAnswer: "falskt"
    }
    // ,
    // {
    //     question: "Jag föddes igår",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "falskt"
    // },
    // {
    //     question: "Mamma heter Anneli",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "sant"
    // },
    // {
    //     question: "Jorden är platt",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "falskt"
    // },
    // {
    //     question: "Ödlor styr världen",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "falskt"
    // },
    // {
    //     question: "Hades bor i Hades",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "sant"
    // },
    // {
    //     question: "Perseiderna dyker upp i juli",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "falskt"
    // },
    // {
    //     question: "Gräset är grönt",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "sant"
    // }
];

let container = get("#container");
let scoreH3 = create("h3");
let submitBtn = create("button");
submitBtn.innerText = "Kolla svar";
let radioBtnValue = [];
counter = 0;



questions.forEach((item, i) => {
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


let checkAnswers = (arr) => {
    if (document.querySelectorAll("[type='radio']:checked").length < arr.length) {
        scoreH3.innerText = "Du har inte fyllt i alla svaren."
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
                q.nextElementSibling.style.color = "green";
            } else {
                q.style.accentColor = "red";
                q.nextElementSibling.style.color = "red";
            }
            ;
        })
        scoreH3.innerText = `Du fick ${counter} rätt av ${arr.length} möjliga`;
    }
}


submitBtn.addEventListener("click", () => {
    checkAnswers(questions);
})
