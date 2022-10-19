let get = (x) => {
    return document.querySelector(x);
}
let create = (x) => {
    return document.createElement(x);
}

let questions = [
    // {
    //     question: "Grön är min bästa färg",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "sant"
    // },
    // {
    //     question: "Jag har två ben",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "sant"
    // },
    // {
    //     question: "Jag bor i Kalmar",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "falskt"
    // },
    // {
    //     question: "Jag föddes igår",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "falskt"
    // },
    {
        question: "Vad heter mamma?",
        type: 2,
        a: "Anna",
        b: "Anneli",
        c: "Lovisa",
        d: "Silivia",
        correctAnswer: "Anneli"
    },
    // {
    //     question: "Jorden är platt",
    //     a: "sant",
    //     b: "falskt",
    //     correctAnswer: "falskt"
    // },
    {
        question: "Vem styr världen?",
        type: 2,
        a: "Sofia",
        b: "Ödlor",
        c: "Elon Musk",
        d: "Ingen",
        correctAnswer: "Ödlor"
    },
    {
        question: "Hades bor i Hades",
        type: 1,
        a: "sant",
        b: "falskt",
        correctAnswer: "sant"
    },
    {
        question: "Perseiderna dyker upp i juli",
        type: 1,
        a: "sant",
        b: "falskt",
        correctAnswer: "falskt"
    },
    {
        question: "Gräset är grönt",
        type: 1,
        a: "sant",
        b: "falskt",
        correctAnswer: "sant"
    },
    {
        question: "Vilket år blev olof palme mördad?",
        type: 2,
        a: "1985",
        b: "1986",
        c: "1987",
        d: "1988",
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
 

let alternative = (item, i) => {
    let li = create("li");
    li.innerHTML = `<input type="radio" name="question${i}" id="${item}${i}" value="${item}">
    <label for="${item}${i}">${item}</label>`;
    return li;
}

questions.forEach((item, i) => {
    let questionDiv = create("div");
    questionDiv.classList.add("question-div");
    let questionH3 = create("h3");
    let list = create("ul");
    questionH3.innerText = item.question;

    if (item.type === 1) {
        container.append(questionDiv);
        questionDiv.append(questionH3, list);
        
        let liA = alternative(item.a, i);
        let liB = alternative(item.b, i);
        list.append(liA, liB);

    } else if (item.type === 2) {
        let liA = alternative(item.a, i);
        let liB = alternative(item.b, i);
        let liC = alternative(item.c, i);
        let liD = alternative(item.d, i);
        
        container.append(questionDiv);
        questionDiv.append(questionH3, list);
        list.append(liA, liB, liC, liD);
    }
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
    let buttons = document.querySelectorAll("button");
    buttons.forEach(item => {
        item.classList.toggle("button-dark-mode")
    })
})

