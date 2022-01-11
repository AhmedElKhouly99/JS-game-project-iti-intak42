const container = document.getElementById("container");
const mainMenu = document.getElementsByClassName('menu');
const difficulty = document.getElementById('difficulty');
const settings = document.getElementById('settings');
const info = document.getElementById('how-to-play');
const pause = document.getElementById('pause-div');
const music = new Audio('m.mp3');
music.setAttribute('loop', 'true');
let setting_menu = false;
let level = 1;

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
    //     // for (let i = 0; i < settings.children.length; i++) {
    //     //     settings.children[i].classList.add('up');
    //     //     settings.children[i].classList.remove('in');
    //     // }
        removeTemplate(settings)
        displayTemplate(pause);
    } else {
        for (let i = 0; i < mainMenu.length; i++) {
            mainMenu[i].style.display = 'inline';
        }
    }
}

function diplayDifficulty() {
    difficulty.style.display = 'block';
    difficulty.classList.remove('up');
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
    play = true;
    // displayTemplate(pause);
    // pause.style.display='block';
    ID = level.id;
    if (ID == 1) {
        level = 1;
    } else if (ID == 2) {
        level = 2;
    } else {
        level = 3;
    }
}

document.getElementById('menu-img').addEventListener('click', ()=>{
    setting_menu = false;
    console.log(setting_menu);
    removeTemplate(pause);
    displayMenu();
});


//////////////////////////////////////////////////////////////////////
const canvas = document.getElementById("canvas");

const artArea = canvas.getContext('2d');


const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

var crossedBirds = 0;
var play = false;
let score = 0;
var birds = [];
var bullets = [];


class Bird {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.speedX = 3;
        this.speedY = 2;
        this.currentX = canvasWidth;
        this.currentY = this.speedY + Math.random() * (0.7 * (canvasHeight) - this.height);
        this.alive = true;
        this.crossed = false;
        this.birdImage = new Image();
        this.birdImage.src = 'raven.png';
        this.frameWidth = 271;
        this.frameHight = 194;
        this.currentFrame = 0;
        this.frameCount = 6;
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
    constructor() {
        this.width = 110;
        this.height = 100;
        this.currentX = canvasWidth / 2;
        this.currentY = canvasHeight - this.height - 10;
        this.speedX = 100;
        this.speedY = 10;
        this.playerImage = new Image();
        this.playerImage.src = 'player2.png';
    }
    fire() {
        console.log("Firing");
        bullets.push(new Bullet(this));
    }
    moveRight() {


        this.currentX = Math.min(this.speedX + this.currentX, canvasWidth - this.width);

    }
    moveLeft() {
        this.currentX = Math.max(this.currentX - this.speedX, 0);

    }
    draw() {

        artArea.drawImage(this.playerImage, this.currentX, this.currentY, this.width, this.height);

    }


}
var p = new Player();//creating player from player class


class Bullet {
    constructor(player) {
        this.width = 30;
        this.height = 40;
        this.currentX = player.currentX + Math.floor(player.width / 2.6);
        this.speedX = 0;
        this.speedY = 10;
        this.currentY = player.currentY - this.height + this.speedY;
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






setInterval(test, 30);//generate  new frame every 30ms


function test() {
    if (play == false)
        return;
    artArea.clearRect(0, 0, canvasWidth, canvasHeight);
    deleteCrossed();
    detectBirdCollision();
    filtering();
    updateScore();
    p.draw();

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
                score++;
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
    displayTemplate(pause);
    play = false;//to pause game
});



function updateScore() {

    artArea.fillStyle = "black";
    artArea.font = "30px";
    artArea.fillText('score:' + score, 50, 50);
}




//control player movement
window.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowRight') {

        p.moveRight();

    }
    if (e.key === 'ArrowLeft') {

        p.moveLeft();

    }
    if (e.code === 'Space')
        p.fire();


})
