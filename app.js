let useSeq = [];
let gameSeq = [];

let level = 0;
let maxLevel = 0;
let start = false;

let highScore = document.querySelector('#high-score');

let btns = ['yellow','red','green','purple'];

let h2 = document.querySelector('h2');

document.addEventListener('keypress', function(){
    if(start == false) {
        start = true;
        levelUp();
    }
});

function levelUp(){
    useSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function gameFlash(btn){
    btn.classList.add('gameFlash');
    setTimeout(() => {
       btn.classList.remove('gameFlash'); 
    }, 250);
}

function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(() => {
       btn.classList.remove('userFlash'); 
    }, 250);
}

function checkAns(idx) {
    if(gameSeq[idx] === useSeq[idx]) {
        if(useSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    } else {
        h2.innerHTML = `Gameover! your score is <b>${level}</b> <br/> Press any key to start.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },300);
        reset();
    }
}

function reset(){
    if(maxLevel < level) {
        maxLevel = level;
    } 
    highScore.innerText = maxLevel;
    level = 0;
    useSeq = [];
    gameSeq = [];
    start = false;
}

function btnPress() {
    let btn = this;
    let userColor = btn.getAttribute('id');
    useSeq.push(userColor); 
    userFlash(btn);

    checkAns(useSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}