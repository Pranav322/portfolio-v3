// HTML5 Racing Game - Speed Racer
class RacingGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.score = 0;
    this.speed = 0;
    this.gameRunning = false;
    this.keys = {};

    // Player car
    this.player = {
      x: this.canvas.width / 2 - 25,
      y: this.canvas.height - 120,
      width: 50,
      height: 80,
      speed: 5,
      color: '#3b82f6',
    };

    // Game objects
    this.enemies = [];
    this.coins = [];
    this.roadLines = [];
    this.particles = [];
    this.powerUps = [];

    // Power-up effects
    this.nitroActive = false;
    this.nitroTimer = 0;
    this.magnetActive = false;
    this.magnetTimer = 0;

    // Road animation
    this.roadOffset = 0;
    this.roadSpeed = 3;

    // Spawning timers
    this.enemySpawnTimer = 0;
    this.coinSpawnTimer = 0;
    this.powerUpSpawnTimer = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.createRoadLines();
    this.gameRunning = true;
    this.gameLoop();
  }

  setupEventListeners() {
    document.addEventListener('keydown', e => {
      this.keys[e.key.toLowerCase()] = true;
    });

    document.addEventListener('keyup', e => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  createRoadLines() {
    for (let i = 0; i < 20; i++) {
      this.roadLines.push({
        x: this.canvas.width / 2 - 5,
        y: i * 40,
        width: 10,
        height: 20,
      });
    }
  }

  update() {
    if (!this.gameRunning) return;

    this.handleInput();
    this.updateRoad();
    this.updateEnemies();
    this.updateCoins();
    this.updatePowerUps();
    this.updateParticles();
    this.spawnObjects();
    this.checkCollisions();
    this.updateScore();
  }

  handleInput() {
    // Move left
    if ((this.keys['arrowleft'] || this.keys['a']) && this.player.x > 200) {
      this.player.x -= this.player.speed;
    }

    // Move right
    if (
      (this.keys['arrowright'] || this.keys['d']) &&
      this.player.x < this.canvas.width - this.player.width - 200
    ) {
      this.player.x += this.player.speed;
    }

    // Move up (accelerate)
    const acceleration = this.nitroActive ? 4 : 2;
    const maxSpeed = this.nitroActive ? 300 : 200;

    if ((this.keys['arrowup'] || this.keys['w']) && this.speed < maxSpeed) {
      this.speed += acceleration;
      this.roadSpeed = 3 + this.speed / 50;
    } else if (this.speed > 60) {
      this.speed -= 1;
      this.roadSpeed = 3 + this.speed / 50;
    }

    // Move down (brake)
    if ((this.keys['arrowdown'] || this.keys['s']) && this.speed > 0) {
      this.speed -= 3;
      this.roadSpeed = Math.max(1, 3 + this.speed / 50);
    }
  }

  updateRoad() {
    this.roadOffset += this.roadSpeed;

    this.roadLines.forEach(line => {
      line.y += this.roadSpeed;
      if (line.y > this.canvas.height) {
        line.y = -20;
      }
    });
  }

  updateEnemies() {
    this.enemies.forEach((enemy, index) => {
      enemy.y += this.roadSpeed + enemy.speed;

      if (enemy.y > this.canvas.height) {
        this.enemies.splice(index, 1);
        this.score += 10;
      }
    });
  }

  updateCoins() {
    this.coins.forEach((coin, index) => {
      coin.y += this.roadSpeed;
      coin.rotation += 0.1;

      if (coin.y > this.canvas.height) {
        this.coins.splice(index, 1);
      }
    });
  }

  updatePowerUps() {
    // Update power-up timers
    if (this.nitroActive) {
      this.nitroTimer--;
      if (this.nitroTimer <= 0) {
        this.nitroActive = false;
      }
    }

    if (this.magnetActive) {
      this.magnetTimer--;
      if (this.magnetTimer <= 0) {
        this.magnetActive = false;
      }

      // Magnet effect - attract nearby coins
      this.coins.forEach(coin => {
        const dx = this.player.x + this.player.width / 2 - coin.x;
        const dy = this.player.y + this.player.height / 2 - coin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = 0.3;
          coin.x += dx * force;
          coin.y += dy * force;
        }
      });
    }

    // Update power-up positions
    this.powerUps.forEach((powerUp, index) => {
      powerUp.y += this.roadSpeed;
      powerUp.rotation += 0.05;

      if (powerUp.y > this.canvas.height) {
        this.powerUps.splice(index, 1);
      }
    });
  }

  updateParticles() {
    this.particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;

      if (particle.life <= 0) {
        this.particles.splice(index, 1);
      }
    });
  }

  spawnObjects() {
    // Spawn enemies
    this.enemySpawnTimer++;
    if (this.enemySpawnTimer > 120 - this.speed / 5) {
      this.spawnEnemy();
      this.enemySpawnTimer = 0;
    }

    // Spawn coins
    this.coinSpawnTimer++;
    if (this.coinSpawnTimer > 200) {
      this.spawnCoin();
      this.coinSpawnTimer = 0;
    }

    // Spawn power-ups
    this.powerUpSpawnTimer++;
    if (this.powerUpSpawnTimer > 600) {
      // Less frequent than coins
      this.spawnPowerUp();
      this.powerUpSpawnTimer = 0;
    }
  }

  spawnEnemy() {
    const lanes = [250, 350, 450, 550];
    const x = lanes[Math.floor(Math.random() * lanes.length)];

    this.enemies.push({
      x: x,
      y: -80,
      width: 50,
      height: 80,
      speed: Math.random() * 2 + 1,
      color: ['#ef4444', '#f59e0b', '#06b6d4'][Math.floor(Math.random() * 3)],
    });
  }

  spawnCoin() {
    const lanes = [270, 370, 470, 570];
    const x = lanes[Math.floor(Math.random() * lanes.length)];

    this.coins.push({
      x: x,
      y: -20,
      radius: 15,
      rotation: 0,
    });
  }

  spawnPowerUp() {
    const lanes = [270, 370, 470, 570];
    const x = lanes[Math.floor(Math.random() * lanes.length)];
    const types = ['nitro', 'magnet'];
    const type = types[Math.floor(Math.random() * types.length)];

    this.powerUps.push({
      x: x,
      y: -30,
      width: 30,
      height: 30,
      type: type,
      rotation: 0,
    });
  }

  checkCollisions() {
    // Check enemy collisions
    this.enemies.forEach(enemy => {
      if (this.isColliding(this.player, enemy)) {
        this.gameOver();
      }
    });

    // Check coin collisions
    this.coins.forEach((coin, index) => {
      const distance = Math.sqrt(
        Math.pow(this.player.x + this.player.width / 2 - coin.x, 2) +
          Math.pow(this.player.y + this.player.height / 2 - coin.y, 2)
      );

      if (distance < coin.radius + 25) {
        this.coins.splice(index, 1);
        this.score += 50;
        this.createCoinParticles(coin.x, coin.y);
      }
    });

    // Check power-up collisions
    this.powerUps.forEach((powerUp, index) => {
      if (this.isColliding(this.player, powerUp)) {
        this.powerUps.splice(index, 1);
        this.activatePowerUp(powerUp.type);
        this.createPowerUpParticles(powerUp.x, powerUp.y, powerUp.type);
      }
    });
  }

  isColliding(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  activatePowerUp(type) {
    if (type === 'nitro') {
      this.nitroActive = true;
      this.nitroTimer = 300; // 5 seconds at 60fps
    } else if (type === 'magnet') {
      this.magnetActive = true;
      this.magnetTimer = 360; // 6 seconds at 60fps
    }
  }

  createCoinParticles(x, y) {
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 30,
        color: '#fbbf24',
      });
    }
  }

  createPowerUpParticles(x, y, type) {
    const color = type === 'nitro' ? '#ef4444' : '#06b6d4';
    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 40,
        color: color,
      });
    }
  }

  updateScore() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('speed').textContent = this.speed;
  }

  render() {
    // Clear canvas
    this.ctx.fillStyle = '#111827';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw road
    this.drawRoad();

    // Draw road lines
    this.ctx.fillStyle = '#ffffff';
    this.roadLines.forEach(line => {
      this.ctx.fillRect(line.x, line.y, line.width, line.height);
    });

    // Draw enemies
    this.enemies.forEach(enemy => {
      this.drawCar(enemy.x, enemy.y, enemy.width, enemy.height, enemy.color);
    });

    // Draw coins
    this.coins.forEach(coin => {
      this.drawCoin(coin.x, coin.y, coin.radius, coin.rotation);
    });

    // Draw power-ups
    this.powerUps.forEach(powerUp => {
      this.drawPowerUp(
        powerUp.x,
        powerUp.y,
        powerUp.width,
        powerUp.height,
        powerUp.type,
        powerUp.rotation
      );
    });

    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.life / 30;
      this.ctx.fillRect(particle.x, particle.y, 4, 4);
      this.ctx.globalAlpha = 1;
    });

    // Draw player car
    this.drawCar(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height,
      this.player.color
    );

    // Add engine particles for player
    if (this.speed > 80) {
      const particleCount = this.nitroActive ? 6 : 3;
      const color = this.nitroActive ? '#ef4444' : '#3b82f6';

      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: this.player.x + this.player.width / 2 + (Math.random() - 0.5) * 20,
          y: this.player.y + this.player.height,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 3 + 2,
          life: this.nitroActive ? 15 : 20,
          color: color,
        });
      }
    }

    // Draw power-up status indicators
    this.drawPowerUpStatus();
  }

  drawRoad() {
    // Draw road background
    this.ctx.fillStyle = '#374151';
    this.ctx.fillRect(200, 0, 400, this.canvas.height);

    // Draw road edges
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(195, 0, 10, this.canvas.height);
    this.ctx.fillRect(595, 0, 10, this.canvas.height);

    // Draw grass
    this.ctx.fillStyle = '#059669';
    this.ctx.fillRect(0, 0, 200, this.canvas.height);
    this.ctx.fillRect(600, 0, 200, this.canvas.height);
  }

  drawCar(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);

    // Car details
    this.ctx.fillStyle = '#1f2937';
    this.ctx.fillRect(x + 5, y + 10, width - 10, 20); // windshield
    this.ctx.fillRect(x + 5, y + height - 30, width - 10, 20); // rear window

    // Wheels
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(x - 5, y + 15, 10, 15);
    this.ctx.fillRect(x + width - 5, y + 15, 10, 15);
    this.ctx.fillRect(x - 5, y + height - 30, 10, 15);
    this.ctx.fillRect(x + width - 5, y + height - 30, 10, 15);
  }

  drawCoin(x, y, radius, rotation) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);

    // Outer circle
    this.ctx.fillStyle = '#fbbf24';
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Inner circle
    this.ctx.fillStyle = '#f59e0b';
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius - 3, 0, Math.PI * 2);
    this.ctx.fill();

    // Dollar sign
    this.ctx.fillStyle = '#92400e';
    this.ctx.font = '16px bold sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('$', 0, 5);

    this.ctx.restore();
  }

  drawPowerUp(x, y, width, height, type, rotation) {
    this.ctx.save();
    this.ctx.translate(x + width / 2, y + height / 2);
    this.ctx.rotate(rotation);

    if (type === 'nitro') {
      // Nitro boost icon
      this.ctx.fillStyle = '#ef4444';
      this.ctx.fillRect(-width / 2, -height / 2, width, height);

      this.ctx.fillStyle = '#dc2626';
      this.ctx.fillRect(-width / 2 + 3, -height / 2 + 3, width - 6, height - 6);

      // Flame icon
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.font = '16px bold sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('🔥', 0, 5);
    } else if (type === 'magnet') {
      // Magnet icon
      this.ctx.fillStyle = '#06b6d4';
      this.ctx.fillRect(-width / 2, -height / 2, width, height);

      this.ctx.fillStyle = '#7c3aed';
      this.ctx.fillRect(-width / 2 + 3, -height / 2 + 3, width - 6, height - 6);

      // Magnet symbol
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '16px bold sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('🧲', 0, 5);
    }

    this.ctx.restore();
  }

  drawPowerUpStatus() {
    const statusY = 10;
    let statusX = 10;

    if (this.nitroActive) {
      const progress = this.nitroTimer / 300;
      this.ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
      this.ctx.fillRect(statusX, statusY, 100, 20);

      this.ctx.fillStyle = '#ef4444';
      this.ctx.fillRect(statusX, statusY, 100 * progress, 20);

      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '12px sans-serif';
      this.ctx.fillText('NITRO', statusX + 5, statusY + 14);

      statusX += 110;
    }

    if (this.magnetActive) {
      const progress = this.magnetTimer / 360;
      this.ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
      this.ctx.fillRect(statusX, statusY, 100, 20);

      this.ctx.fillStyle = '#06b6d4';
      this.ctx.fillRect(statusX, statusY, 100 * progress, 20);

      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '12px sans-serif';
      this.ctx.fillText('MAGNET', statusX + 5, statusY + 14);
    }
  }

  gameOver() {
    this.gameRunning = false;
    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('gameOver').style.display = 'block';
  }

  restart() {
    this.score = 0;
    this.speed = 60;
    this.player.x = this.canvas.width / 2 - 25;
    this.enemies = [];
    this.coins = [];
    this.particles = [];
    this.powerUps = [];
    this.enemySpawnTimer = 0;
    this.coinSpawnTimer = 0;
    this.powerUpSpawnTimer = 0;
    this.nitroActive = false;
    this.nitroTimer = 0;
    this.magnetActive = false;
    this.magnetTimer = 0;
    this.gameRunning = true;
    document.getElementById('gameOver').style.display = 'none';
  }

  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }
}

// Initialize game
let game;

window.onload = () => {
  game = new RacingGame();
};

function restartGame() {
  game.restart();
}
