let currentQuestion
let startGame = document.querySelector('.start-game')
let container = document.querySelector('.container')
let question = document.querySelector('.question')
let answer = document.querySelector('.answers')
let answers = document.querySelectorAll('.answer')
let money = document.querySelector('.money')
let gameOver = document.querySelector('.game-over')
let winner = document.querySelector('.winner')
let earning = document.querySelector('.earning')
let replay = document.querySelector('.replay')
let earnings = document.querySelector('.earnings')
let fiftyfifty = document.querySelector('.fifty')
let fiftycanceled = document.querySelector('.fiftycanceled')
let callcanceled = document.querySelector('.callafriendcanceled')
let callafriend = document.querySelector('.callafriend')
let lifelines = document.querySelector('.lifelines')
let lifelinepara = document.querySelector('.lifelinepara')
let callafriendans = document.querySelector('.callafriendans')
let cancel = document.querySelector('.cancel')
let body= document.querySelector('body')
let overlay= document.querySelector('.overlay')
let timer= document.querySelector('.timer')
let logo= document.querySelector('.logo')
let phoneafriendcanceled = document.querySelector('.callafriendcanceled')
let score = 0
let fiftynum=true
let callnum=true
let clicked = false
let newArray
let removed
let check=[]

// function ranNum() {
//     currentQuestion = Math.floor(Math.random()*totalQuestions.length); 
//     check.push(currentQuestion)
       
//     let p= check.includes(currentQuestion)
//     for(let i=0; i<check.length; i++) {
//         currentQuestion = check[i]
//          if (p) {
//             currentQuestion = Math.floor(Math.random()*totalQuestions.length); }
//        else if(!p)
//             { currentQuestion=check[i]
//             // check.push(currentQuestion)
//         } 
          
//     } 
//    console.log(currentQuestion);
//    console.log(check);
//     return currentQuestion  
//   }
function playAudio(sound) {
 let audio= new Audio(`${sound}.mp3`)
 audio.play()
}
function showQuiz() {
   currentQuestion = Math.floor(Math.random()*totalQuestions.length); 
    document.querySelector('.question').textContent = totalQuestions[currentQuestion].Question
    totalQuestions[currentQuestion].Options.forEach(answer1 => {
        let opt = document.createElement('opt')
        opt.innerText = answer1.option
        opt.classList.add('answer')
        answer.appendChild(opt)
        if (answer1.correct) { opt.dataset.correct = answer1.correct }
        if (answer1.fifty=='true') { opt.dataset.fifty = answer1.fifty }
        opt.addEventListener('click', selectAnswer)
 })
 setTime()   
}

startGame.addEventListener('click', function () {
    playAudio('lets_play')
    timer.classList.remove('hid')
    container.classList.remove('hide')
    startGame.classList.add('hide')
    fiftyfifty.classList.remove('hide')
    callafriend.classList.remove('hide')
    lifelines.classList.remove('hidden')
   
    showQuiz()

})

document.querySelector(`.earn-0`).classList.add('active')
function selectAnswer(e) {   
const selectedOption = e.target
    console.log(selectedOption);
    const correct = selectedOption.dataset.correct
    if(!clicked) {
    clicked= true
    if (correct) {
    playAudio('correct_answer')  
    money.textContent = 0
    score+=1000
    money.textContent = `${score}`
    totalQuestions.splice(currentQuestion, 1)
    console.log(currentQuestion);
        document.querySelector(`.earn-${score}`).classList.add('active'),
        document.querySelector(`.earn-${score - 1000}`).classList.remove('active')
        document.querySelector(`.earn-0`).classList.remove('active')
        selectedOption.className += " blink"

       if (score == 10000) {
            replay.classList.remove('hide')
            winner.classList.remove('hide')
            window.setTimeout(() => {
             container.classList.add('hide')
            lifelines.classList.add('hidden')
        }, 600)

        } 
        window.setTimeout(() => {
            reset()
           showQuiz()
          clicked= false
       
        }, 1300)
    }
    else {

        if (score < 10000 && score >= 5000) {
            gameOver.textContent = `Sorry you lost the game, you have earned ${score} points`
        }
        else if(score==5000){
            console.log('Score is 5000');
            setTimeout(() => {
            document.querySelector('.earn-5000').classList.add('blink')
                
            }, 1000)
        }
        else  {
            gameOver.textContent = `Sorry you lost the game and all your earnings`
        }

        playAudio('wrong_answer')  
        selectedOption.className += " false"
        window.setTimeout(() => {
            container.classList.add('hide')
            lifelines.classList.add('hidden')
       
        }, 1000)
        gameOver.classList.remove('hide')
        replay.classList.remove('hide')
        
    }
 Array.from(answer.children).forEach(opt => { setStatus(opt, opt.dataset.correct) })
}
}
function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct')
    }
}
function reset() {

    while (answer.firstChild) {
        answer.removeChild(answer.firstChild)
    }
}

function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

fiftyfifty.addEventListener('click', function(){
            
    Array.from(answer.children).forEach(opt => { hideStatus(opt, opt.dataset.fifty,) })
    fiftynum=false
 
})

function hideStatus(element, fifty) {
   if (fifty=='true' &&fiftynum) {
     element.style.visibility='hidden'
     fiftyfifty.classList.add('hide')
     fiftycanceled.classList.remove('hide')
    }

}
function callStatus(element, correct) {
    if (correct && callnum) {
        callafriend.classList.add('hide')
        callcanceled.classList.remove('hide')
        let ans = document.createElement('ans')
        ans.innerText = `The correct answer is "${element.textContent}"`
        callafriendans.appendChild(ans)
        container.classList.add('hide')
        callafriendans.classList.remove('hide')
        overlay.classList.remove('hide')
      
     }
    }
 
callafriend.addEventListener('click', function() {
    Array.from(answer.children).forEach(opt => {callStatus(opt, opt.dataset.correct) })
    callnum=false
  
})
function callHide() {
    container.classList.remove('hide')
    callafriendans.classList.add('hide')
    overlay.classList.add('hide')
}
cancel.addEventListener('click' , callHide)
overlay.addEventListener('click' , callHide) 
let totalQuestions = [
    {
        Question: "Which of these is the world's largest animal",
        Options: [
            { option: `A: Blue Whale`, correct: true },
            { option: 'B: Elephant', fifty:'true' },
            { option: 'C: Dinosaur', fifty:'true' },
            { option: 'D: Dragon' }
        ]

    },
    {
        Question: "What is the meaning of defenestration",
        Options: [
            { option: `A: To cut down trees`, fifty:'true' },
            { option: 'B: A surgical procedure', fifty:'true' },
            { option: 'C: To throw out the window', correct: true },
            { option: 'D: To insert an object', }
        ]

    },
    {
        Question: "What does the English phrase 'To have a crush on someone' mean?",
        Options: [
            { option: `A: To hit them with your car`, fifty:'true' },
            { option: 'B: A type of candy', fifty:'true' },
            { option: 'C: To have feelings for them', correct: true },
            { option: 'D: To kill them', }
        ]

    },
    {
        Question: "In total, how many millimeters are there in a meter",
        Options: [
            { option: `A: one hundred`, fifty:'true' },
            { option: 'B: Ten', fifty:'true' },
            { option: 'C: One Million' },
            { option: 'D: One thousand', correct: true }
        ]

    },
   

    {
        Question: "Which word means a public sale in which goods or property are sold to the highest bidder? ",
        Options: [
            { option: `A: Referendum`, fifty:'true' },
            { option: 'B: Market', fifty:'true' },
            { option: 'C: Ballot' },
            { option: 'D: Auction', correct: true }
        ]

    },
    {
        Question: "What is Rihanna's full name?",
        Options: [
            { option: 'A: Raina Fernados',fifty:'true'},
            { option: 'B: Rihanat Fenty', },
            { option: 'C: Robyn Fendy', correct: true },
            { option: 'D: Rainbow Fentianos',fifty:'true' }
        ],
    },

    {
        Question: "Which of these elements is known as a liquid metal ",
        Options: [
            { option: `A: H2O` },
            { option: 'B: Hg', correct: true },
            { option: 'C: Ag', fifty:'true' },
            { option: 'D: Mg',fifty:'true' }
        ]

    },
    {
        Question: "Which of these describes the phones we carry with us?",
        Options: [
            { option: 'A: Senile',fifty:'true' },
            { option: 'B: Feline', },
            { option: 'C: Mobile', correct: true },
            { option: 'D:  Agile', fifty:'true'}
        ],
    },
    {
        Question: "Which of these means to abandon someone?",
        Options: [
            { option: 'A: To defenestrate',fifty:'true' },
            { option: 'B: To leave in a lurch', correct: true },
            { option: 'C: To put in the family way' },
            { option: 'D: To hibernate',fifty:'true' }
        ],
    },
    {
        Question: "Which of these alcoholic drinks originated from Mexico?",
        Options: [
            { option: 'A: Bourbon',fifty:'true' },
            { option: 'B: Gin', },
            { option: 'C: Tequila', correct: true },
            { option: 'D: Appletini',fifty:'true' }
        ],
    },
    {
        Question: "Who is the main character in the movie 'Bridesmaids'?",
        Options: [
            { option: 'A: Rita',fifty:'true' },
            { option: 'B: Brynn', },
            { option: 'C: Annie', correct: true },
            { option: 'D: Becca',fifty:'true'}
        ],
    },
    {
        Question: "In Greek mythology, Hades ruled which of these?",
        Options: [
            { option: 'A: Underworld', correct: true },
            { option: 'B: Sky', },
            { option: 'C: Heaven',fifty:'true' },
            { option: 'D: Sea',fifty:'true' }
        ],
    },
    {
        Question: "The author Lewis Carroll was known for writing about whose 'Adventures in Wonderland'?",
        Options: [
            { option: 'A: Felix',fifty:'true' },
            { option: 'B: Alice', correct: true },
            { option: 'C: Jane' },
            { option: 'D: Ainsley',fifty:'true' }
        ],
    },
    {
        Question: "In which of these does a child save pocket money ",
        Options: [
            { option: 'A: Cow catcher',fifty:'true' },
            { option: "B: Cat's cradle",fifty:'true' },
            { option: 'C: Piggy bank', correct: true },
            { option: 'D: Doggy bag', }
        ]

    },
    {
        Question: "Which of these is an infection in a computer system designed to corrupt data ",
        Options: [
            { option: 'A: Bacteria',fifty:'true' },
            { option: "B: Virus", correct: true },
            { option: 'C: Migraine',fifty:'true' },
            { option: 'D: Fungi' }
        ],

    },
    {
        Question: "Which of these is a fair ground attraction ",
        Options: [
            { option: 'A: Ferris wheel', correct: true },
            { option: "B: Harris wheel", },
            { option: 'C: Norris wheel', fifty:'true' },
            { option: 'D: Morris Wheel' ,fifty:'true'}
        ]
    },
    {
        Question: "Which of these U.S Presidents is not carved on mount Rushmore in South Dakota? ",
        Options: [
            { option: 'A: Abraham Lincoln', fifty:'true' },
            { option: "B: Theodore Roosevelt", fifty:'true' },
            { option: 'C: George Washington' },
            { option: 'D: Ulysses S. Grant', correct:true }
        ],

    },
    {
        Question: "Which of these spices is obtained from tree bark ",
        Options: [
            { option: 'A: Ginger' },
            { option: "B: Nutmeg", fifty:'true' },
            { option: 'C: Turmeric', fifty:'true' },
            { option: 'D: Cinnamon', correct: true }
        ],

    },
    {
        Question: "Calgary and Vancouver are cities in which country? ",
        Options: [
            { option: 'A: Canada', correct: true },
            { option: "B: Jamaica", fifty:'true' },
            { option: 'C: Spain' },
            { option: 'D: America', fifty: 'true' }
        ],

    },
    {
        Question: "Which of these people are known for mummifying bodies? ",
        Options: [
            { option: 'A: Greeks', fifty:'true' },
            { option: "B: Egyptians", correct:true },
            { option: 'C: Vikings' },
            { option: 'D: Romans', fifty: 'true' }
        ],

    },
    {
        Question: "Which of these drinks is colourless?",
        Options: [
            { option: 'A: Vodka', correct: true },
            { option: "B: Cassis", fifty:'true' },
            { option: 'C: Kir' },
            { option: 'D: Grenadine', fifty: 'true' }
        ],

    },
    {
        Question: "Narrow swift winds in the upper troposphere or lower atmosphere are known as the jet what? ",
        Options: [
            { option: 'A: Lag', fifty:'true'},
            { option: "B: Current"},
            { option: 'C: Stream', correct:true },
            { option: 'D: Flow', fifty: 'true' }
        ],

    },
    {
        Question: "The Yara river passes through which city? ",
        Options: [
            { option: 'A: Melbourne', correct: true },
            { option: "B: Adelaide", fifty:'true' },
            { option: 'C: Darwin' },
            { option: 'D: Perth', fifty: 'true' }
        ],

    },
    {
        Question: "Which of the following was the husband of the legendary female artist Frida Kahlo? ",
        Options: [
            { option: 'A: Diego Forlan', fifty:'true' },
            { option: "B: Diego Maradona", fifty:'true' },
            { option: 'C: Diego Garcia' },
            { option: 'D: Diego Rivera', correct:true }
        ],

    },
    {
        Question: "Which imaginary line on the earth's surface lies largely at 180 degrees longitude? ",
        Options: [
            { option: 'A: International date line', correct: true },
            { option: "B: Greenwich meridian", fifty:'true' },
            { option: 'C: Antartic circle' },
            { option: 'D: Tropic of capricorn', fifty: 'true' }
        ],

    },
    {
        
        Question: "Which inflatable building is a popular play area for children ?",
        Options: [
            { option: 'A: Bouncy School' },
            { option: "B: Bouncy supermarket", fifty:'true' },
            { option: 'C: Bouncy hospital', fifty:'true' },
            { option: 'D: Bouncy playhouse', correct:true }
        ],

    },
    {
        Question: "Which game show features the catchphrase 'Come on down' ",
        Options: [
            { option: 'A: The price is right', correct: true },
            { option: "B: Wheel of fortune", fifty:'true' },
            { option: 'C: Family Feud' },
            { option: 'D: Let us make a deal', fifty: 'true' }
        ],

    },
];
function friendReset() {
callafriendans.removeChild(callafriendans.lastElementChild)
     
   }

function setTime() {
    currentTime= new Date().getTime()
    intervalId= setInterval(() => {
      let interval = Math.floor((30000 + currentTime - new Date().getTime())/ 1000)
    timer.textContent=interval
        if(interval<0) {
            clearInterval(intervalId)
            timer.classList.add('hid')
            lifelines.classList.add('hidden')
            container.classList.add('hide')
           gameOver.classList.remove('hide')
            replay.classList.remove('hide')
           
            if( score<10000 ) {
            gameOver.textContent = `Sorry you lost the game, you have earned ${score} points`}  
        } else if(score==10000) {
            gameOver.classList.add('hide')
        }
      }, 1000)
}