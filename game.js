

const container = document.getElementById("container");
const mainMenu = document.getElementsByClassName('menu');
const difficulty = document.getElementById('difficulty');
const settings = document.getElementById('settings');
const info = document.getElementById('how-to-play');
const pause = document.getElementById('pause-div');
const mode = document.getElementById('mode');
const single = document.getElementById('single');
const multi =  document.getElementById("multi");
const username = document.getElementById('username');
const login = document.getElementById('login');
const nickname = document.getElementById('nickname');
const so_img = document.getElementById('sound');
const mu_img = document.getElementById('music');
const music = new Audio('m.mp3');
const b = new Audio('b.wav');
const c = new Audio('c.wav');
music.setAttribute('loop', 'true');
let level = 1;
let setting_menu = false;



function playMusic() {
    music.play();
}

function playBird() {
    b.setAttribute('loop', 'true');
    b.play();
}

function mouseOver(btn, source) {
    btn.src = source;
}
function mouseOut(btn, source) {
    btn.src = source;
}

function removeMenu() {
    for (let i = 0; i < mainMenu.length; i++) {
        mainMenu[i].style.display = 'none';
    }
}

function displayMenu() {
    if (setting_menu) {
        removeTemplate(settings)
        displayTemplate(pause);
    } else {
        for (let i = 0; i < mainMenu.length; i++) {
            mainMenu[i].style.display = 'inline';
        }
    }
}


function displayTemplate(p) {
    p.style.display = 'block';
    for (let i = 0; i < p.children.length; i++) {
        p.children[i].classList.remove('up');
        p.children[i].classList.add('in');
    }

}

function removeTemplate(p) {
    for (let i = 0; i < p.children.length; i++) {
        p.children[i].classList.add('up');
        p.children[i].classList.remove('in');
    }

}

function removeDiv(level) {
    setting_menu = true;

    setTimeout(() => { container.style.display = "none"; }, 700);
    difficulty.style.display = 'none';
    mode.style.display = 'none';
    play = true;
    playBird();
    playMusic()
    ID = level.id;
    if (ID == 1) {
        level = 1;
    } else if (ID == 2) {
        level = 2;
    } else {
        level = 3;
    }

}

document.getElementById('menu-img').addEventListener('click', () => {
    if (confirm("Are You Sure !?")) {
        setting_menu = false;
        console.log(setting_menu);
        removeTemplate(pause);
        displayMenu();
    }
});


document.getElementById('sound').addEventListener('click', () => {
    if (b.muted) {
        b.muted = false;
        c.muted = false;
        document.getElementById("sound").src = "images/Sound_BTN_active.png";
        
    } else {
        b.muted = true;
        c.muted = true
        document.getElementById("sound").src = "images/Sound_BTN.png";
    }
});

document.getElementById('music').addEventListener('click', () => {
    if (music.muted) {
        music.muted = false;
        document.getElementById("music").src = "images/Music_BTN_active.png";
    } else {
        music.muted = true;
        document.getElementById("music").src = "images/Music_BTN.png";
    }
});

// single.addEventListener('click', ()=>{
//     //// Sinle Mode
// });


multi.addEventListener("click", ()=>{
///// multiplayer mode

});

/// Single mode
login.addEventListener('submit', (e)=>{
    e.preventDefault();
    removeTemplate(username);
    removeDiv(login);


});


//////////////////////////////////////////////////////////////////////
const canvas = document.getElementById("canvas");

const artArea = canvas.getContext('2d');


const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

var crossedBirds = 0;
var play = false;
let sCore = 0;
var birds = [];
var bullets = [];


var keyFlags = {'w' : false, 's' : false, 'a' : false, 'd' : false, ' ' : false, 'Shift' : false, 'ArrowUp' : false, 'ArrowDown' : false, 'ArrowLeft' : false, 'ArrowRight' : false};

const delayBetweenFire = 200;

class Bird {
    constructor() {
        /////////////////////////////////
        this.width = 80;
        this.height = 80;
        this.speedX = 3;
        this.speedY = 2;
        this.currentX = canvasWidth;
        this.currentY = this.speedY + Math.random() * (0.7 * (canvasHeight) - this.height);
        this.alive = true;
        this.crossed = false;
        this.birdImage = new Image();
        this.birdImage.src = 'bird.png';
        this.frameWidth = 473;
        this.frameHight = 468;
        this.currentFrame = 0;
        this.frameCount = 11;
        this.y = this.currentY;
    }

    move() {
        this.currentX -= this.speedX;
        this.currentY = this.y + this.speedY * Math.sin(this.currentX / 60);
        this.currentFrame = (this.currentFrame + 1) % this.frameCount;

    }
    draw() {
        artArea.drawImage(this.birdImage, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHight, this.currentX, this.currentY, this.width, this.height);
    }

}


class Player {
    constructor(controllers) {
        this.width = 80;
        this.height = 120;
        this.currentX = 5;
        this.currentY = (canvasHeight - this.height) / 2;
        this.speedX = 0;
        this.speedY = 10;
        this.playerImage = new Image();
        this.playerImage.src = 'player1.png';

        this.movingLeft = false;
        this.movingRight = false;
        this.movingUp = false;
        this.movingDown = false;
        this.firing = false;
        this.canFire = true;
        this.controllers = controllers;
    }

    updateControllersStates(){
        this.movingUp = keyFlags[this.controllers.up];
        this.movingDown = keyFlags[this.controllers.down];
        this.movingRight = keyFlags[this.controllers.right];
        this.movingLeft = keyFlags[this.controllers.left];
        this.firing = keyFlags[this.controllers.fire];
        
    }

    updateState(){
        this.updateControllersStates();
        //Move if moving and fire if firing
        
        console.log(keyFlags);
        console.log("Right: " + this.movingRight);
        console.log("Left: " + this.movingLeft);
        console.log("Up: " + this.movingUp);
        console.log("down: " + this.movingDown);
        


        if(this.movingUp){
            this.moveUp();
        }
        if(this.movingDown){
            this.moveDown();
        }
        if(this.movingRight){
            
            this.moveRight();
        }
        if(this.movingLeft){
            this.moveLeft();
        }
        if(this.firing){
            if(this.canFire){
                this.fire();
                this.canFire = false;
                setTimeout(() => {this.canFire = true}, delayBetweenFire);
            }
        }
    }

    fire() {
        console.log("Firing a Bullet");
        bullets.push(new Bullet(this));
    }
    moveRight() {


        this.currentX = Math.min(this.speedX + this.currentX, canvasWidth - this.width);

    }
    moveLeft() {
        this.currentX = Math.max(this.currentX - this.speedX, 0);

    }
    moveUp(){
        this.currentY = Math.max(this.currentY - this.speedY, 0);
        console.log("Moving Up");
    }
    
    moveDown(){
        this.currentY = Math.min(this.currentY + this.speedY, canvasHeight - this.height);
        console.log("Moving Down");
    }

    draw() {

        artArea.drawImage(this.playerImage, this.currentX, this.currentY, this.width, this.height);

    }


}


const player1Conrollers = {up:'ArrowUp', down:'ArrowDown', right:'ArrowRight', left : 'ArrowLeft', fire : ' '};
const player2Conrollers = {up:'w', down:'s', right:'d', left : 'a', fire : 'Shift'};



var p = new Player(player1Conrollers);//creating player from player class
var p2 = new Player(player2Conrollers);
p2.playerImage.src = 'player2.png';
// p2.width = 100;
// p2.height = 150;


class Bullet {
    constructor(player) {
        this.width = 50;
        this.height = 40;
        this.currentX = player.currentX + Math.floor(player.width / 2.6)+50;
        this.speedX = 10;
        this.speedY = 0;
        this.currentY = player.currentY +this.height-8;
        this.hitBird = false;
        this.crossedHiegt = false;
        this.fireImage = new Image();
        this.fireImage.src = 'fire.png';
    }
    move() {
        this.currentX += this.speedX;
        this.currentY -= this.speedY;
    }
    draw() {

        artArea.drawImage(this.fireImage, this.currentX, this.currentY, this.width, this.height);

    }
}






setInterval(test, 25);//generate  new frame every 30ms


function test() {
    if (play == false)
        return;
    artArea.clearRect(0, 0, canvasWidth, canvasHeight);
    deleteCrossed();
    detectBirdCollision();
    filtering();
    updateScore();
    p.updateState();
    p.draw();

    p2.updateState();
    p2.draw();

    [...birds, ...bullets].forEach((bird) => { bird.move(); bird.draw(); })//instead of using two lines


}





function isPointInRectangle(pointX, pointY, ulX, ulY, width, height) {
    return (pointX >= ulX && pointX <= (ulX + width)) && (pointY >= ulY && pointY <= (ulY + height));
}

// killin function 
function detectBirdCollision() {
    //for each fire gun kill each  bird that match this condition 
    bullets.forEach((bullet) => {
        pointX = bullet.currentX;
        pointY = bullet.currentY;
        birds.forEach((bird) => {
            if (isPointInRectangle(pointX, pointY, bird.currentX, bird.currentY, bird.width, bird.height)) {
                sCore++;
                ////////////////////////////////////////////////////////////////////////////////////
                localStorage.score=sCore;
                /////////////////////////////////////////////////////////////////////////////////////
                document.getElementById("score-content").innerText=localStorage.score;
                bird.alive = false;
                bullet.hitBird = true;
            }
        })

    })

}




//removing killed bird and the fire 
function filtering() {
    birds = birds.filter(bird => (bird.alive && (!bird.crossed)));
    bullets = bullets.filter(bullet => (!(bullet.hitBird) && (!bullet.crossedHiegt)))
}

//creating new bird after 400ms
setInterval(() => {
    if (play) birds.push(new Bird());
}, 400);



function deleteCrossed() {

    [...birds, ...bullets].forEach((object) => {
        if (object.currentX < (0 - object.width)) {
            object.crossed = true;//remove birds that crossed the window
            crossedBirds++;
        }
        if (object.currentY < (0 - object.height)) {
            object.crossedHiegt = true;//remove fire from array when exceed canvas height

        }
    })
}






window.addEventListener('focus', () => {
    console.log("Playing");
    // play = true;//to resume game 
});



window.addEventListener('blur', () => {
    console.log("Pausing");
    container.style.display = 'block';
    b.pause();
    if (setting_menu) {
        displayTemplate(pause);
    }
    play = false;//to pause game
});



function updateScore() {
    artArea.fillStyle = "#c2d2d4";
    artArea.font = "30px myfont";
    artArea.fillText('score:' + sCore, 50, 50);
}







//control player movement
window.addEventListener('keydown', (e) => {

    console.log(e.key);


/*     if((e.key == p.controllers.fire) && (keyFlags[p.controllers.fire] == false)){
        p.fire();
        p.canFire = false;
        setTimeout(() => {p.canFire = true}, delayBetweenFire);
    }
    if((e.key == p2.controllers.fire) && (keyFlags[p2.controllers.fire] == false)){
        p2.fire();
        p2.canFire = false;
        setTimeout(() => {p2.canFire = true}, delayBetweenFire);
    } */

    keyFlags[e.key] = true;





})



window.addEventListener('keyup', (e)=> {
    keyFlags[e.key] = false;
});



