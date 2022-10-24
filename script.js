let get = (x) => {
    return document.querySelector(x);
}
let create = (x) => {
    return document.createElement(x);
}

let questions = [
    {
        question: "Är Blåvalen är det största djuret (som människan känner till) som någonsin levt?",
        type: "radio",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Sant"
    },
    {
        question: "Sant eller falskt?",
        type: "radio",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Sant"
    },
    {
        question: "Vem upfann glödlampan?",
        type: "radio",
        answers: ["James Watt", "Nikola Tesla", "Thomas Edison", "Louis Breguet"],
        correctAnswer: "Thomas Edison",
    },
    {
        question: "Bor Hades i Hades?",
        type: "radio",
        answers: ["Sant", "Falskt"],
        correctAnswer: "Sant"
    },
    {
        question: "Vad dricker Fantomen helst?",
        type: "radio",
        answers: ["Cola", "Vatten", "Kaffe", "Mjölk"],
        correctAnswer: "Mjölk"
    },
    {
        question: "Vilket år blev Olof Palme skjuten?",
        type: "radio",
        answers: ["1985", "1986", "1987", "1988"],
        correctAnswer: "1986"
    },
    {
        question: "Hur länge sover en vuxen människa i Sverige i genomsnitt per natt?",
        type: "radio",
        answers: ["Strax under sju timmar", "Strax under åtta timmar", "Strax under nio timmar"],
        correctAnswer: "Strax under sju timmar"
    }
];

let checkboxQuestions = [
    {
        question: "Vilka två metoder kan jag använda om jag vill ta bort ett element i en array?",
        type: "checkbox",
        answers: ["pop", "push", "shift", "unshift"],
        correctAnswer: ["pop", "shift"],
    },
    {
        question: "Vilka tre länder är inte med i EU?",
        type: "checkbox",
        answers: ["Irland", "Island", "Norge", "Liechtenstein"],
        correctAnswer: ["Island", "Norge", "Liechtenstein"],
    },
    {
        question: "Vilka tre namn har du?",
        type: "checkbox",
        answers: ["Sofia", "Tove", "Helena", "Madeleine"],
        correctAnswer: ["Sofia", "Tove", "Helena"]
    }
];


//variables
let backgroundBtn = get(".backgroundBtn");
let container = get(".container");
let containerBonus = get(".containerBonus");
let scoreH4 = create("h4");
let submitBtn = create("button");
submitBtn.innerText = "Kolla svar";
let radioBtnValue = [];
counter = 0;
 
//funktion som skapar container till frågor

//funktion som skapar svars-alternativ
let createLi = (item, i, type) => {
    let li = create("li");
    li.innerHTML = `<input type="${type}" name="${type}question${i}" id="${item}${i}" value="${item}" class="${type}">
    <label for="${item}${i}">${item}</label>`;
    return li;
}

//skapar en div och en ul för varje fråga
//appendar frågor och svarsalternativ
let writeQuestions = (arr, secondArr) => {
    arr.forEach((question, i) => {
        let questionDiv = create("div");
        questionDiv.classList.add("question-div");
        let questionH3 = create("h3");
        let list = create("ul");
        questionH3.innerText = question.question;
        container.append(questionDiv);
        questionDiv.append(questionH3, list);
    
        question.answers.forEach(answer => {
                let li = createLi(answer, i, "radio");
                list.append(li);
        })
    })

    let h3 = create("h3");
    let p = create("p");
    h3.innerText = "Bonusfrågor!";
    h3.classList.add("bonus");
    p.innerText = "Bonusfrågor är frivilliga att svara på men krävs för att nå de högre betygsnivåerna. OBS, man får bara poäng om alla rätta alternativ är ikryssade under varje fråga. Ohoj!";
    container.append(h3, p);

    secondArr.forEach((question, i) => {
        let questionDiv = create("div");
        questionDiv.classList.add("question-div");
        let questionH3 = create("h3");
        let bonusQuestionP = create("p");
        let list = create("ul");
        questionH3.innerText = question.question;
        container.append(questionDiv);
        questionDiv.append(questionH3, list);
    
        question.answers.forEach(answer => {
                let li = createLi(answer, i, "checkbox");
                list.append(li);
        })
        questionDiv.append(bonusQuestionP);
    })

    container.append(submitBtn, scoreH4);
    submitBtn.addEventListener("click", () => {
        checkAnswers(arr, secondArr);
    })
}

//kolla användarens svar
//if else beroende på typ? 
let checkAnswers = (arr, secondArr) => {
    
    //rätta radio-frågor
    if (document.querySelectorAll("[type='radio']:checked").length < arr.length) {
        scoreH4.innerText = "Du har inte fyllt i de första, obligatoriska frågorna. \nGissa om du inte kan!"
    } else {
        let radioBtnAnswers = document.querySelectorAll(" .radio:checked");
        radioBtnAnswers.forEach(item => {
            radioBtnValue.push(item.value);
        })

        radioBtnValue.forEach((item, i) => {
            let q = get(`[name='radioquestion${i}']:checked`);

            if (item === arr[i].correctAnswer) {
                counter++;
                // q.style.accentColor = "SeaGreen";
                q.nextElementSibling.innerHTML += ` - Rätt svar`;
                q.nextElementSibling.style.color = "SeaGreen";
            } else {
                // q.style.accentColor = "IndianRed";
                q.nextElementSibling.innerHTML += ` - Fel svar`;
                q.nextElementSibling.style.color = "IndianRed";
            }
        })


        //rätta bonusfrågor
        //------------------------------------------
        //hämta svaren från en fråga i taget
        let checkbox = [];
        let checkboxValue = [];
        let rightcheckboxAnswers = [];
        for (let i = 0; i < secondArr.length; i++) {
            checkbox = document.querySelectorAll(`[name='checkboxquestion${i}']:checked`); //userinput första frågan

            rightcheckboxAnswers = secondArr[i].correctAnswer;
            console.log("rightcheckboxanswers", i, rightcheckboxAnswers);

            //för att få ut values på userinput
            //skriva ut rätt/fel svar
            countAnswers = "";
            checkbox.forEach(item => {
                if (rightcheckboxAnswers.includes(item.value)) {
                    // console.log(item);
                    item.nextElementSibling.style.color = "SeaGreen"
                    item.nextElementSibling.innerText += " - Rätt svar" 
                    countAnswers++;
                    checkboxValue.push(item.value);
                } else {
                    item.nextElementSibling.style.color = "IndianRed"
                    item.nextElementSibling.innerText += " - Fel svar" 
                }
            })
            if (countAnswers === rightcheckboxAnswers.length) {
                counter++;
            }
        }

        //------------------------------------------
        scoreResult(scoreH4, arr, secondArr);
        submitBtn.remove(); 
    }
}

//skriv ut resultat med gradering
//hur vill du ha det? Fixa!
let scoreResult = (score, arr, secondArr) => {
    let length = arr.length + secondArr.length;
    score.innerText = `Du fick ${counter} rätt av ${length} möjliga!`;    
    if (counter === length) {
        score.innerText += "\n Wooo! Hurra! Snyggt!"
    } else if (counter > (0.75 * length)) {
        score.innerText += "\n Bra jobbat! Ett Mycket väl godkänt resultat. "
        score.style.color = "SeaGreen";
    } else if (counter >= (0.5 * arr.length)) {
        score.innerText += "\n Det ger godkänt: ett helt ok resultat."
        score.style.color = "LightSalmon";
    } else if (counter < (0.5 * length)) {
        score.innerText += "\n Underkänt! Kanske testa igen?"
        score.style.color = "IndianRed";
    }
}

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

writeQuestions(questions, checkboxQuestions);

