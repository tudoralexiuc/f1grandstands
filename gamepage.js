console.log("ready :)");


var myGamePiece;
var myObstacles = [];
var myScore;
var myBackground;

async function updateHighScore(score) {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    await supabase
        .from('race')
        .insert([{
            user: supabase.auth.user().id,
            score: score,
            created_at: time
        }])
}

function startGame() {
    /* adding the player model to the game at a position */
    myGamePiece = new component(46, 100, "images/gamepics/redf1.png", 220, 600, "image");
    /* adding a score counter component */
    myScore = new component("30px", "Consolas", "white", 25, 30, "text");
    myBackground = new component(480, 720, "images/gamepics/background2.png", 0, 0, "background");
    myGameArea.start();
}

var myGameArea = {
    /* creating the game area and size */
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.querySelector(".playarea").innerHTML = "";
        document.querySelector(".playarea").appendChild(this.canvas);
        this.frameNo = 0;
        /* update the game area 50 times per second */
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

/* setting up the necessary components and constructors for the game */
function component(width, height, color, x, y, type) {
    this.gamearea = myGameArea;
    this.type = type;
    /* this is to be able to link an image to the blank obstacles or the background */
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        /* if the 'type' is an image */
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

            /* if the 'type' is text */
        } else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);

        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;


    }
    /* crash functionality */
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;

    }

}

function updateGameArea() {
    var x, y, minDistance, maxDistance;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            console.log("game over");
            console.log(myScore.text);
            (async () => await updateHighScore(myScore.text.split("SCORE: ")[1]))();
            return;
        }
    }
    /* obstacles functionality */
    myGameArea.clear();
    myGameArea.frameNo += 1;
    /* rate of the obstacle spawning in and random positions along x */
    /* OIL PUDDLE */
    if (myGameArea.frameNo == 1 || everyinterval(500)) {
        y = myGameArea.canvas.height - 2000;
        minDistance = 25;
        maxDistance = 455;
        x = Math.floor(Math.random() * (maxDistance - minDistance + 1) + minDistance)

        myObstacles.push(new component(100, 100, "images/gamepics/oilpuddle.png", x, y, "image"))
    }
    /* YELLOW CAR */
    if (myGameArea.frameNo == 1 || everyinterval(60)) {
        /* spawn positions for the obstacles */
        y = myGameArea.canvas.height - 900;
        minDistance = 50;
        maxDistance = 430;
        /* math for the random spawning of the enemy cars along the x-axis */
        x = Math.floor(Math.random() * (maxDistance - minDistance + 1) + minDistance)

        myObstacles.push(new component(46, 100, "images/gamepics/yellowf1.png", x, y, "image"))
    }
    /* copy of first obstacle to have an additional enemy colour at different spawn rate */
    /* GREEN CAR */
    if (myGameArea.frameNo == 1 || everyinterval(100)) {
        y = myGameArea.canvas.height - 1500;
        minDistance = 50;
        maxDistance = 430;
        x = Math.floor(Math.random() * (maxDistance - minDistance + 1) + minDistance)

        myObstacles.push(new component(46, 100, "images/gamepics/greenf1.png", x, y, "image"))
    }

    /* TIRE WALL */
    if (myGameArea.frameNo == 1 || everyinterval(750)) {
        y = myGameArea.canvas.height - 3000;
        minDistance = 0;
        maxDistance = 480;
        x = Math.floor(Math.random() * (maxDistance - minDistance + 1) + minDistance)

        myObstacles.push(new component(100, 35, "images/gamepics/tirewall.png", x, y, "image"))
    }
    /* background */

    myBackground.newPos();
    myBackground.update();


    /* speed of enemy cars */
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += +4;
        myObstacles[i].update();
    }

    /* score */
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    /* speed of player car with arrow key functions */
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {
        myGamePiece.speedX = -4;
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
        myGamePiece.speedX = 4;
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.speedY = -4;
    }
    if (myGameArea.keys && myGameArea.keys[40]) {
        myGamePiece.speedY = 5;
    }
    myGamePiece.newPos();
    myGamePiece.update();

    /*prevent arrowkeys from moving the page while playing*/
    window.addEventListener("keydown", function (e) {
        if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
}