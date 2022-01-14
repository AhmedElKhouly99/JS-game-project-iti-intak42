

const container = document.getElementById("container");
const mainMenu = document.getElementsByClassName('menu');
const difficulty = document.getElementById('difficulty');
const settings = document.getElementById('settings');
const info = document.getElementById('how-to-play');
const pause = document.getElementById('pause-div');
const mode = document.getElementById('mode');
const single = document.getElementById('single');
// const multi = document.getElementById("multi");
const multi =  document.getElementById("multi");
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
const music = new Audio('m.mp3');
const b = new Audio('b.wav');
const c = new Audio('c.wav');
music.setAttribute('loop', 'true');
let level = 1;
let setting_menu = false;
let lives = 3;
var playerNames = [];

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
        console.log(setting_menu);
        removeTemplate(pause);
        displayMenu();
        artArea.clearRect(0, 0, canvas.width, canvas.height);
    }
});

document.getElementById('menu-img1').addEventListener('click', () => {
    if (confirm("Are You Sure !?")) {
        setting_menu = false;
        console.log(setting_menu);
        removeTemplate(gameover);
        displayMenu();
        artArea.clearRect(0, 0, canvas.width, canvas.height);
    }
});

document.getElementById('menu-img2').addEventListener('click', () => {
    if (confirm("Are You Sure !?")) {
        setting_menu = false;
        console.log(setting_menu);
        winTie.children[4].id = ''
        removeTemplate(winTie);
        displayMenu();
        artArea.clearRect(0, 0, canvas.width, canvas.height);
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


function displayWinnerTie(name, score, isTie) {
    displayTemplate(winTie);
    if (isTie) {
        winTie.children[1].textContent = 'Draw';
        winTie.children[1].style.color = '#e3f5f4';
        winTie.children[4].textContent = 'Score';
    } else {
        winTie.children[1].textContent = 'Winner';
        winTie.children[1].style.color = '#6eff6e';
        winTie.children[4].id = 'score-p';
        winTie.children[4].textContent = name;
    }
    winTie.children[3].textContent = score;
}

function displayRankings(users){
    rankings.innerHTML = '';
    usernameM.forEach((user)=>{
        rankings.innerHTML += '<p>'+user.name+'      '+user.score+'</p>';
    });
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
restart.addEventListener('click', ()=>{

    removeTemplate(pause);
    removeDiv(this);
    startNewGame(['islam']);
    console.log("Restarting Game");
    startNewGame();
    
});

document.getElementById('restart-img1').addEventListener('click', ()=>{

    removeTemplate(gameover);
    removeDiv(this);
    startNewGame(['islam']);
    console.log("Restarting Game");
    startNewGame();
    
});

document.getElementById('restart-img2').addEventListener('click', ()=>{

    removeTemplate(winTie);
    winTie.children[4].id = '';
    removeDiv(this);
    startNewGame(['islam']);
    console.log("Restarting Game");
    startNewGame();

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

var multiplayer = false;
var players = [];


var keyFlags = { 'w': false, 's': false, 'a': false, 'd': false, ' ': false, 'f': false, 'ArrowUp': false, 'ArrowDown': false, 'ArrowLeft': false, 'ArrowRight': false };

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


const player1Conrollers = { up: 'ArrowUp', down: 'ArrowDown', right: 'ArrowRight', left: 'ArrowLeft', fire: ' ' };
const player2Conrollers = { up: 'w', down: 's', right: 'd', left: 'a', fire: 'f' };

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
            this.playerImage.src = 'player1.png';
            this.controllers = player1Conrollers;
        }
        else {
            this.playerImage.src = 'player2.png';
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

    getScore() {
        return this.score;
    }

    incrementScore() {
        this.score++;
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
            if (this.canFire) {
                this.fire();
                this.canFire = false;
                setTimeout(() => { this.canFire = true }, delayBetweenFire);
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
    moveUp() {
        this.currentY = Math.max(this.currentY - this.speedY, 0);
        console.log("Moving Up");
    }

    moveDown() {
        this.currentY = Math.min(this.currentY + this.speedY, canvasHeight - this.height);
        console.log("Moving Down");
    }

    draw() {

        artArea.drawImage(this.playerImage, this.currentX, this.currentY, this.width, this.height);

    }


}









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









function test() {
    if (play == false)
        return;
    artArea.clearRect(0, 0, canvasWidth, canvasHeight);
    deleteCrossed();
    detectBirdCollision();
    filtering();


    players.forEach((player) => {
        player.updateState();
        player.draw();
    });

    updateScore(multiplayer, players);

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
                bullet.ownerPlayer.incrementScore();
                ////////////////////////////////////////////////////////////////////////////////////
                //localStorage.score=sCore;
                /////////////////////////////////////////////////////////////////////////////////////
                //document.getElementById("score-content").innerText=localStorage.score;
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


    players.forEach((player) => {

        birds.forEach((bird) => {

            if (isPointInRectangle(bird.currentX, bird.currentY, player.currentX, player.currentY, player.width, player.height) ||
                isPointInRectangle(bird.currentX + bird.width, bird.currentY, player.currentX, player.currentY, player.width, player.height) ||

                isPointInRectangle(bird.currentX, bird.currentY + bird.height, player.currentX, player.currentY, player.width, player.height) ||

                isPointInRectangle(bird.currentX + bird.width, bird.currentY + bird.height, player.currentX, player.currentY, player.width, player.height)
            ) {
                console.log("-------------------------")
                player.lives--;
                console.log(player.lives);
                bird.crossed = true;
            }
            if (bird.currentX < (0 - bird.width)) {
                bird.crossed = true;//remove birds that crossed the window
                crossedBirds++;
                player.lives--;
            }
        });

    });
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



function updateScore(multiplayer, Player) {
    artArea.fillStyle = "#c2d2d4";
    artArea.font = "28px myfont";

    let player1 = Player[0];
    let player2 = Player[1];
    if (!multiplayer) {
        let x = 50;
        let y = 50;

        artArea.fillText(player1.username + " 's score : " + player1.score, x, y);
        drawLives(player1,canvasWidth-80,40);
    }
    else {

        artArea.fillText(player1.username + " 's score : " + player1.score, 50, 50);
        drawLives(player1,200,70);
        artArea.fillText(player2.username + " 's score : " + player2.score, canvasWidth - 450, 50);
        drawLives(player2,canvasWidth-300,70);
    }
}

function drawLives(player, px, py) {
    let lifes = new Image();
    if (player.lives == 3) {
        lifes.src = "lives3.png";
        artArea.drawImage(lifes,px,py,100,50 );
    }
    else if (player.lives == 2) {
        lifes.src = "life2.png";
        artArea.drawImage(lifes,px,py,100,50);
    }
    else if (player.lives == 1) {
        lifes.src = "life1.png";
        artArea.drawImage(lifes,px,py,50,50);
    }
    else {
        play = 0;
    }
}






//control player movement
window.addEventListener('keydown', (e) => {

    console.log(e.key);


    keyFlags[e.key] = true;






});



window.addEventListener('keyup', (e) => {
    keyFlags[e.key] = false;
});




setInterval(test, 25);      //generate  new frame every 30ms


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

    play = true;
    console.log("Game Started");
    console.log(players[0].username);
}
})