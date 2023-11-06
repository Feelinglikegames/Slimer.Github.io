const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
const player = {
    x: 50,
    y: canvas.height / 2,
    width: 20,
    height: 20,
    speed: 5,
};

// Bullets
const bullets = [];

// Enemies
const enemies = [];

// Game loop
function gameLoop() {
    requestAnimationFrame(gameLoop);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
    if (keys["ArrowDown"] && player.y < canvas.height - player.height) player.y += player.speed;

    // Move bullets
    bullets.forEach(bullet => {
        bullet.x += 5;
    });

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw bullets
    ctx.fillStyle = "red";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 5);
    });

    // Spawn enemies
    if (Math.random() < 0.02) {
        const enemy = {
            x: canvas.width,
            y: Math.random() * canvas.height,
            width: 20,
            height: 20,
            speed: 2,
        };
        enemies.push(enemy);
    }

    // Move and draw enemies
    enemies.forEach(enemy => {
        enemy.x -= enemy.speed;
        ctx.fillStyle = "green";
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Collision detection
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + 5 > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 5 > enemy.y
            ) {
                // Remove bullet and enemy on collision
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
            }
        });
    });
}

// Keyboard input
const keys = {};
window.addEventListener("keydown", e => {
    keys[e.key] = true;
});

window.addEventListener("keyup", e => {
    keys[e.key] = false;
});

gameLoop();
