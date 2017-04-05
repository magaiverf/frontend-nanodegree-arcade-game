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
    this.x = 200;
    this.y = 400;
    this.speed = 90;
};

Player.prototype.update = function() {

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handle the user input moving the player on the screen
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if ((this.x - this.speed) > 0)
                this.x -= this.speed;
            break;    
        case 'up':
            if ((this.y - this.speed) > -100)
                this.y -= this.speed;
            break;    
        case 'right':
            if ((this.x + this.speed) < 400)
                this.x += this.speed;
            break;    
        case 'down':
            if ((this.y + this.speed) < 450)
                this.y += this.speed;
            break;    
    }
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
    checkVictory();
});

var checkVictory = function() {
    if (player.y == -50) {
        alert('YOU WINS!!!');
        player = new Player();
    }
};

var checkCollisions = function () {    
    for (var index = 0; index < allEnemies.length; index++) {
        var enemie = allEnemies[index];        

        // verify the enemie's position + image size to confirm if there's a collision.
        var collisonX = enemie.x + 70 >= player.x && enemie.x <= player.x + 70;
        var collisonY = enemie.y >= player.y && enemie.y <= player.y + 85;

        if (collisonX && collisonY) {
            alert('YOU LOSE!!!');
            player = new Player();
        }
    }
};
