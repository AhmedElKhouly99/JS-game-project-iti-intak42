

const container = document.getElementById("container");
const mainMenu = document.getElementsByClassName('menu');
const difficulty = document.getElementById('difficulty');
const settings = document.getElementById('settings');
const info = document.getElementById('how-to-play');
const pause = document.getElementById('pause-div');
const mode = document.getElementById('mode');
const single = document.getElementById('single');
const multi = document.getElementById("multi");
const gameover = document.getElementById('gameover');
const winTie = document.getElementById('win-tie');
const rankings = document.getElementById('rankings');

const restart = document.getElementById('restart-img');

const usernameS = document.getElementById('usernameS');
const loginS = document.getElementById('loginS');
const nickname = document.getElementById('nickname');

const usernameM = document.getElementById('usernameM');
const loginM = document.getElementById('loginM');
const nickname1 = document.getElementById('nickname1');
const nickname2 = document.getElementById('nickname2');


const so_img = document.getElementById('sound');
const mu_img = document.getElementById('music');
const music = new Audio('sound/m.mp3');
const b = new Audio('sound/b.wav');
const c = new Audio('sound/c.wav');
const f = new Audio('sound/f.wav');
const l = new Audio('sound/l.wav');
const e = new Audio('sound/e.wav');
music.setAttribute('loop', 'true');
music.volume = 0.15;
let level = 1;
let setting_menu = false;
let lives = 3;
var playerNames = [];
let allUsers = [];
let lengOfUsers;


class Users {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}

function getLocalStorage() {
    allUsers.splice(0, allUsers.length);
    lengOfUsers = localStorage.length;
    while (lengOfUsers--) {
        let s = localStorage.key(lengOfUsers);
        if(s.indexOf('_') == 0){        
            allUsers.push(new Users(s.slice(1,s.length), JSON.parse(localStorage.getItem(localStorage.key(lengOfUsers)))));
        }
    }
    allUsers.sort((u1, u2) => {
        if (u1.score > u2.score) return -1
        return u1.score < u2.score ? 1 : 0
    });
}


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
        // removeTemplate(gameover);
        // gameover.style.display = 'none'
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

function removeDiv() {
    setting_menu = true;

    setTimeout(() => { container.style.display = "none"; }, 700);
    difficulty.style.display = 'none';
    mode.style.display = 'none';
    settings.style.display = 'none';
    usernameM.style.display = 'none';
    usernameS.style.display = 'none';
    info.style.display = 'none';
    gameover.style.display = 'none';
    winTie.style.display = 'none';
    rankings.style.display = 'none';
    play = true;
    playBird();
    playMusic()

}
////// menu btn
document.getElementById('menu-img').addEventListener('click', () => {
    if (confirm("Are You Sure !?")) {
        setting_menu = false;
        removeTemplate(pause);
        displayMenu();
        artArea.clearRect(0, 0, canvas.width, canvas.height);
    }
});

document.getElementById('menu-img1').addEventListener('click', () => {
    if (confirm("Are You Sure !?")) {
        setting_menu = false;
        removeTemplate(gameover);
        displayMenu();
        artArea.clearRect(0, 0, canvas.width, canvas.height);
    }
});

document.getElementById('menu-img2').addEventListener('click', () => {
    if (confirm("Are You Sure !?")) {
        setting_menu = false;
        winTie.children[4].id = '';
        removeTemplate(winTie);
        displayMenu();
        artArea.clearRect(0, 0, canvas.width, canvas.height);
    }
});


document.getElementById('sound').addEventListener('click', () => {
    if (b.muted) {
        b.muted = false;
        c.muted = false;
        f.muted = false;
        document.getElementById("sound").src = "images/Sound_BTN_active.png";

    } else {
        b.muted = true;
        c.muted = true;
        f.muted = true;
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


function displayWinnerTie(name, score, isTie) {

    container.style.display = 'block';
    setting_menu = false;
    container.style.display = 'block';
    pause.style.display = 'none';
    b.pause();
    displayTemplate(winTie);
    if (isTie) {
        winTie.children[1].textContent = 'Draw';
        winTie.children[1].style.color = '#e3f5f4';
        winTie.children[4].id = 'score-p';
        winTie.children[4].textContent = 'Score';
    } else {
        winTie.children[1].textContent = 'Winner';
        winTie.children[1].style.color = '#6eff6e';
        winTie.children[4].id = 'score-p';
        winTie.children[4].textContent = name;
    }
    winTie.children[3].textContent = score;
}



function displayRankings() {
    getLocalStorage();
    rankings.children[2].innerHTML = '';
    let i = 0;
    allUsers.forEach((user) => {
        rankings.children[2].innerHTML += `<p>${i + 1}-${user.name}  : ${user.score}</p>`;
        i++;
    });
}


function gameOver(score) {
    b.pause();
    music.pause();
    l.play();
    setTimeout(playMusic, 2000);
    gameover.children[3].innerHTML = score;
    setting_menu = false;
    container.style.display = 'block';
    pause.style.display = 'none';
    displayTemplate(gameover);
}


/// Single mode
loginS.addEventListener('submit', (e) => {
    e.preventDefault();
    c.play();
    removeTemplate(usernameS);
    removeDiv(loginS);

    multiplayer = false;
    playerNames = [nickname.value];
    startNewGame();

    nickname.value = '';


});


///// multiplayer mode
loginM.addEventListener('submit', (e) => {
    e.preventDefault();
    removeTemplate(usernameM);
    removeDiv(loginM);

    multiplayer = true;
    playerNames = [nickname1.value, nickname2.value];
    startNewGame();

    nickname1.value = '';
    nickname2.value = '';


});



///// Restart btn
restart.addEventListener('click', () => {

    removeTemplate(pause);
    removeDiv(this);
    startNewGame();

});

document.getElementById('restart-img1').addEventListener('click', () => {

    removeTemplate(gameover);
    removeDiv(this);
    startNewGame();

});

document.getElementById('restart-img2').addEventListener('click', () => {

    removeTemplate(winTie);
    winTie.children[4].id = '';
    removeDiv(this);
    startNewGame();

});


function setPauseMenuScore(score) {
    pause.children[3].innerHTML = score
}

//////////////////////////////////////////////////////////////////////

const frameRate = 40;
const frameTimeOut = 1000 / frameRate;
const maxTimeBetweenBirds = 500;


const canvas = document.getElementById("canvas");

const artArea = canvas.getContext('2d');


const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

var crossedBirds = 0;
var play = false;
let sCore = 0;
var birds = [];
var bullets = [];

var multiplayer = false;
var players = [];

const explosion_image_paths = ['images/explosions/bird_explosion.png', 'images/explosions/rocket_explosion.png'];
var explosions = [];


const player1Conrollers = { up: 'ArrowUp', down: 'ArrowDown', right: 'ArrowRight', left: 'ArrowLeft', fire: ' ' };
const player2Conrollers = { up: 'w', down: 's', right: 'd', left: 'a', fire: '1' };

var keyFlags = { 'w': false, 's': false, 'a': false, 'd': false, ' ': false, '1': false, 'ArrowUp': false, 'ArrowDown': false, 'ArrowLeft': false, 'ArrowRight': false };

const delayBetweenFire = 200;



/* ************************************************** Bird Class ************************************************** */

class Bird {
    constructor() {
        /////////////////////////////////
        this.width = 80;
        this.height = 80;
        this.speedX = Math.max(Math.random() * 10 * level, 2);
        this.speedY = Math.random() * 50;
        this.currentX = canvasWidth;
        this.currentY = this.speedY + Math.random() * (canvasHeight - 2 * this.speedY - this.height);
        this.alive = true;
        this.crossed = false;
        this.birdImage = new Image();
        this.birdImage.src = 'images/bird.png';
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





/* ************************************************** Player Class ************************************************** */


class Player {
    constructor(playerStyle, username) {
        this.width = 80;
        this.height = 120;
        this.currentX = 5;
        this.currentY = (canvasHeight - this.height) / 2;
        this.speedX = 0;
        this.speedY = 10;

        this.playerImage = new Image();


        if (playerStyle == 1) {
            this.playerImage.src = 'images/player1.png';
            this.controllers = player1Conrollers;
        }
        else {
            this.playerImage.src = 'images/player2.png';
            this.controllers = player2Conrollers;
        }



        this.movingLeft = false;
        this.movingRight = false;
        this.movingUp = false;
        this.movingDown = false;
        this.firing = false;
        this.canFire = true;

        this.score = 0;
        this.lives = 3;

        this.username = username;

    }
    decrementLives(){
        this.lives = Math.max(this.lives - 1, 0);
        if(this.lives == 0){
            this.die();
        }

    }

    die(){
        explosions.push(new Explosion(this.currentX, this.currentY, 1));
        e.play();
    }

    isAlive() {
        return this.lives >= 1;
    }

    incrementLives() {
        this.lives++;
        if (this.lives > 3)
            this.lives = 3;
    }

    getScore() {
        return this.score;
    }

    incrementScore() {
        this.score++;
        if (this.score % 25 == 0) {
            this.incrementLives();
        }
    }

    updateControllersStates() {
        this.movingUp = keyFlags[this.controllers.up];
        this.movingDown = keyFlags[this.controllers.down];
        this.movingRight = keyFlags[this.controllers.right];
        this.movingLeft = keyFlags[this.controllers.left];
        this.firing = keyFlags[this.controllers.fire];

    }

    updateState() {
        this.updateControllersStates();
        //Move if moving and fire if firing

        if (this.movingUp) {
            this.moveUp();
        }
        if (this.movingDown) {
            this.moveDown();
        }
        if (this.movingRight) {

            this.moveRight();
        }
        if (this.movingLeft) {
            this.moveLeft();
        }
        if (this.firing) {
            if (this.canFire && this.isAlive()) {
                this.fire();
                this.canFire = false;
                setTimeout(() => { this.canFire = true }, delayBetweenFire);
            }
        }
    }

    fire() {
        bullets.push(new Bullet(this));
        f.play();
    }
    moveRight() {


        this.currentX = Math.min(this.speedX + this.currentX, canvasWidth - this.width);

    }
    moveLeft() {
        this.currentX = Math.max(this.currentX - this.speedX, 0);

    }
    moveUp() {
        this.currentY = Math.max(this.currentY - this.speedY, 0);
    }

    moveDown() {
        this.currentY = Math.min(this.currentY + this.speedY, canvasHeight - this.height);
    }

    draw() {
        if (this.isAlive()) {
            artArea.drawImage(this.playerImage, this.currentX, this.currentY, this.width, this.height);
        }
    }


}

/* ************************************************** Bullet Class ************************************************** */

class Bullet {
    constructor(player) {
        this.ownerPlayer = player;
        this.width = 42;
        this.height = 16;
        this.speedX = 10;
        this.speedY = 0;
        this.currentX = player.currentX + player.width - this.speedX;
        this.currentY = player.currentY + (player.height / 2) - (this.height / 2);
        this.hitBird = false;
        this.crossed = false;
        this.fireImage = new Image();
        this.fireImage.src = 'images/fire.png';


    }
    move() {
        this.currentX += this.speedX;
        this.currentY -= this.speedY;
    }
    draw() {

        artArea.drawImage(this.fireImage, this.currentX, this.currentY, this.width, this.height);

    }
}


/* ************************************************** Explosion Class ************************************************** */

class Explosion{
    constructor(x, y, type){    //if bird, type = 0 but if spaceship, type = 1
        this.currentX = x;
        this.currentY = y;

        this.width = 80;
        this.height = 80;

        this.explosionImage = new Image();
        this.explosionImage.src = explosion_image_paths[type];

        this.currentFrame = 0;
        this.frameWidth = 128;
        this.frameHight = 128;
        this.frameCount = 64;
        this.frameRows = 8;
        this.framColumns = 8;

        this.done = false;
    }
    draw(){
        if(this.done){
            return;
        }
        else{
            var imageOffsetX = (this.currentFrame % this.frameRows) * this.frameWidth;
            var imageOffsetY = Math.floor((this.currentFrame / this.framColumns)) * this.frameHight;
            artArea.drawImage(this.explosionImage , imageOffsetX, imageOffsetY, this.frameWidth, this.frameHight, this.currentX, this.currentY, this.width, this.height);
        }
    }
    updateState(){
        this.currentFrame++;
        if(this.currentFrame >= this.frameCount){
            this.done = true;
        }
    }
}


function drawEplosions(){
    explosions.forEach((explosion) => {
        explosion.draw();
        explosion.updateState();
    })
}


/* ************************************************** Global Functions ************************************************** */

function generateNewFrame() {
    if (play == false)
        return;
    artArea.clearRect(0, 0, canvasWidth, canvasHeight);
    detectBirdCollision();
    drawEplosions();
    filtering();
    deleteCrossed();


    players.forEach((player) => {
        player.updateState();
        player.draw();
    });

    updateScore(multiplayer, players);

    [...birds, ...bullets].forEach((bird) => { bird.move(); bird.draw(); })//instead of using two lines


    checkEndOfGame();
}

function ckeckLocalStorage(isMulti) {
    if (localStorage.getItem('_'+players[0].username) == null) {
        localStorage.setItem('_'+players[0].username, players[0].score);
    } else if (JSON.parse(localStorage.getItem('_'+players[0].username)) < players[0].score) {
        localStorage.setItem('_'+players[0].username, players[0].score);
    }
    if (isMulti) {
        if (localStorage.getItem('_'+players[1].username) == null) {
            localStorage.setItem('_'+players[1].username, players[1].score);
        } else if (JSON.parse(localStorage.getItem('_'+players[1].username)) < players[1].score) {
            localStorage.setItem('_'+players[1].username, players[1].score);
        }
    }
}


function checkEndOfGame() {
    if (!multiplayer) {   //Single Player
        if (!players[0].isAlive()) {
            setTimeout(()=>{
                play = false;
                gameOver(players[0].score);
            }, frameTimeOut * 64);            
        }
    }
    else {
        if (!(players[0].isAlive() || players[1].isAlive())) {  //Both Died
            setTimeout( () => {
                play = false;
                if (players[0].score == players[1].score) {   //Tie
                    displayWinnerTie('', players[0].score, true);
                } else if (players[0].score > players[1].score) {  //Player 1 wins
                    displayWinnerTie(players[0].username, players[0].score, false)
                } else {
                    displayWinnerTie(players[1].username, players[1].score, false)
                }
            }, frameTimeOut * 64);
        }
    }
    ckeckLocalStorage(multiplayer);
}



function isPointInRectangle(pointX, pointY, ulX, ulY, width, height) {
    return (pointX >= ulX && pointX <= (ulX + width)) && (pointY >= ulY && pointY <= (ulY + height));
}

// killing function 
function detectBirdCollision() {
    //for each fire gun kill each  bird that match this condition 
    bullets.forEach((bullet) => {
        birds.forEach((bird) => {
            if (isPointInRectangle(bullet.currentX + bullet.width, bullet.currentY, bird.currentX, bird.currentY, bird.width, bird.height) ||
                isPointInRectangle(bullet.currentX + bullet.width, bullet.currentY + bullet.height, bird.currentX, bird.currentY, bird.width, bird.height)) {
                bullet.ownerPlayer.incrementScore();
                ////////////////////////////////////////////////////////////////////////////////////
                explosions.push(new Explosion(bird.currentX, bird.currentY, 0));
                bird.alive = false;
                bullet.hitBird = true;
            }
        })

    })

}


//removing killed bird and the fire 
function filtering() {
    birds = birds.filter(bird => (bird.alive && (!bird.crossed)));
    bullets = bullets.filter(bullet => (!(bullet.hitBird) && (!bullet.crossed)));
    explosions = explosions.filter(explosion => !explosion.done);
}

function generateNewBird(){
    if(play){
        birds.push(new Bird());
    }
    setTimeout(generateNewBird, maxTimeBetweenBirds * Math.random());
}




function deleteCrossed() {

    bullets.forEach((bullet) => {
        if (bullet.currentX - bullet.width > canvasWidth || bullet.currentX < 0 || bullet.currentY + bullet.height < 0 || bullet.currentY > canvasHeight)
            bullet.crossed = true;
    })


    players.forEach((player) => {
        if (player.isAlive()) {
            birds.forEach((bird) => {

                if (isPointInRectangle(bird.currentX, bird.currentY, player.currentX, player.currentY, player.width, player.height) ||
                    isPointInRectangle(bird.currentX + bird.width, bird.currentY, player.currentX, player.currentY, player.width, player.height) ||
                    isPointInRectangle(bird.currentX, bird.currentY + bird.height, player.currentX, player.currentY, player.width, player.height) ||
                    isPointInRectangle(bird.currentX + bird.width, bird.currentY + bird.height, player.currentX, player.currentY, player.width, player.height)
                ) {
                    explosions.push(new Explosion(bird.currentX, bird.currentY, 0));
                    player.decrementLives();
                    bird.crossed = true;
                }
                if (bird.currentX < (0 - bird.width)) {
                    bird.crossed = true;//remove birds that crossed the window
                    crossedBirds++;
                    player.decrementLives();
                }
            });

        }
    });
}








function updateScore(multiplayer, Player) {
    artArea.fillStyle = "#c2d2d4";
    artArea.font = "28px myfont";

    let player1 = Player[0];
    let player2 = Player[1];
    if (!multiplayer) {


        artArea.fillText(player1.username + " 's score : " + player1.score, 50, 50);
        drawLives(player1, canvasWidth - 120, 40);
    }
    else {

        artArea.fillText(player1.username + " 's score : " + player1.score, 50, 50);
        drawLives(player1, 200, 70);
        artArea.fillText(player2.username + " 's score : " + player2.score, canvasWidth - 450, 50);
        drawLives(player2, canvasWidth - 300, 70);
    }
}

function drawLives(player, px, py) {
    let lifes = new Image();
    if (player.lives == 3) {
        lifes.src = "images/lives3.png";
        artArea.drawImage(lifes, px, py, 60, 40);
    }
    else if (player.lives == 2) {
        lifes.src = "images/life2.png";
        artArea.drawImage(lifes, px, py, 60, 40);
    }
    else if (player.lives == 1) {
        lifes.src = "images/life1.png";
        artArea.drawImage(lifes, px, py, 60, 40);
    }
}


function startNewGame() {
    artArea.clearRect(0, 0, canvasWidth, canvasWidth);
    
    if (multiplayer == false) {   //Single Player
        players = [new Player(1, playerNames[0])];
    }
    else {
        players = [new Player(1, playerNames[0]), new Player(2, playerNames[1])];
    }
    crossedBirds = 0;
    
    bullets = [];
    birds = [];
    explosions = [];
    
    play = true;
    console.log("Game Started");
}




/* ************************************************** Event Listners ************************************************** */

//control player movement
window.addEventListener('keydown', (e) => {
    keyFlags[e.key] = true;

    if (e.key == 'Escape') {
        container.style.display = 'block';
        b.pause();
        if (setting_menu) {
            displayTemplate(pause);

            if (multiplayer) {
                setPauseMenuScore((players[0].getScore() + ' : ' + players[1].getScore()));
            } else {
                setPauseMenuScore(players[0].getScore());
            }

        }
        play = false;
    }
});


window.addEventListener('keyup', (e) => {
    keyFlags[e.key] = false;
});



window.addEventListener('blur', () => {
    container.style.display = 'block';
    b.pause();
    if (setting_menu) {
        removeTemplate(settings);
        displayTemplate(pause);
        if (multiplayer) {
            setPauseMenuScore((players[0].getScore() + ' : ' + players[1].getScore()));
        } else {
            setPauseMenuScore(players[0].getScore());
        }
    }
    play = false;//to pause game
});




/* ************************* Functions to be called before game starts ************************* */
generateNewBird();
setInterval(generateNewFrame, frameTimeOut);      //generate  new frame every 25ms 