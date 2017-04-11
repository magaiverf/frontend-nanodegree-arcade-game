'use strict';

var INITIAL_POS_X = 200,
    INITIAL_POS_Y = 400;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = INITIAL_POS_X;
    this.y = INITIAL_POS_Y;
    this.speed = 90;
};

Player.prototype.update = function() {
    if (this.y == -50) {
        alert('YOU WINS!!!');
        this.startOver();
    }
};

Player.prototype.startOver = function() {
    this.x = INITIAL_POS_X;
    this.y = INITIAL_POS_Y;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handle the user input moving the player on the screen
Player.prototype.handleInput = function(key) {
    var initialX = 0, finalX = 400, initialY = -100, finalY = 450;

    switch (key) {
        case 'left':
            if ((this.x - this.speed) > initialX)
                this.x -= this.speed;
            break;    
        case 'up':
            if ((this.y - this.speed) > initialY)
                this.y -= this.speed;
            break;    
        case 'right':
            if ((this.x + this.speed) < finalX)
                this.x += this.speed;
            break;    
        case 'down':
            if ((this.y + this.speed) < finalY)
                this.y += this.speed;
            break;    
    }

    this.update();
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(1, 60, 100), new Enemy(1, 140, 200), new Enemy(1, 220, 300)];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var checkCollisions = function () {    
    var count = allEnemies.length;
    for (var index = 0; index < count; index++) {
        var enemy = allEnemies[index];        

        // verify the enemy's position + image size to confirm if there's a collision.
        var collisonX = enemy.x + 70 >= player.x && enemy.x <= player.x + 70;
        var collisonY = enemy.y >= player.y && enemy.y <= player.y + 85;

        if (collisonX && collisonY) {
            alert('YOU LOSE!!!');
            player = new Player();
        }
    }
};
