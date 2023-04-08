//importing music
const introMusic = new Audio("./music/introSong.mp3");
const shootingSound = new Audio("./music/shoooting.mp3");
const gameoverSound = new Audio("./music/gameOver.mp3");
const killEnemySound = new Audio("./music/killEnemy.mp3");
const heavyWeaponSound = new Audio("./music/heavyWeapon.mp3");
const hugeWeaponSound = new Audio("./music/hugeWeapon.mp3");

introMusic.play();

const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");
const lightWeaponDamage = 10;
const heavyWeaponDamage = 20;
const hugeWeaponDamage = 50;
let playerscore = 0;
let difficulty = 2;

const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");

document.querySelector("input").addEventListener("click", (e) => {
  e.preventDefault();

  //stoping intro music
  introMusic.pause();
  form.style.display = "none";
  scoreBoard.style.display = "block";
  const userValue = document.getElementById("difficulty").value;
  if (userValue === "Easy") {
    setInterval(spownEnemy, 2000);
    return (difficulty = 5);
  }
  if (userValue === "Medium") {
    setInterval(spownEnemy, 1400);
    return (difficulty = 7);
  }
  if (userValue === "Hard") {
    setInterval(spownEnemy, 1000);
    return (difficulty = 9);
  }
  if (userValue === "Insane") {
    setInterval(spownEnemy, 800);
    return (difficulty = 11);
  }
});

//-------------------------------------------End Screen
const gameover = () => {
  //creating endscreen div and play again button
  const endScreenBanner = document.createElement("div");
  const gameoverBtn = document.createElement("button");
  const highScore = document.createElement("div");

  highScore.innerHTML = `High Score:${
    localStorage.getItem("highscore")
      ? localStorage.getItem("highscore")
      : playerscore
  } ? `;

  const oldHighScore =
    localStorage.getItem("highscore") && localStorage.getItem("highscore");
  if (playerscore > oldHighScore) {
    localStorage.setItem("highscore", playerscore);
    // updating high score html
    highScore.innerHTML = `High Score: ${playerscore}`;
  }
  gameoverBtn.innerHTML = "Play Again";
  endScreenBanner.appendChild(highScore);
  endScreenBanner.appendChild(gameoverBtn);
  // Making reload on clicking playAgain button
  gameoverBtn.onclick = () => {
    window.location.reload();
  };

  endScreenBanner.classList.add("gameover");
  document.querySelector("body").appendChild(endScreenBanner);
};

playerPosition = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
class Player {
  constructor(x, y, radius, color) {
    this.xx = x;
    this.yy = y;
    this.radius = radius;
    this.colorr = color;
  }
  draw() {
    context.beginPath();

    context.arc(
      this.xx,
      this.yy,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.colorr;
    context.fill();
  }
}
//-----------------------------------
class Weapon {
  constructor(x, y, radius, color, velocity, damage) {
    this.xx = x;
    this.yy = y;
    this.radius = radius;
    this.colorr = color;
    this.velocity = velocity;
    this.damage = damage;
  }
  draw() {
    context.beginPath();

    context.arc(
      this.xx,
      this.yy,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.colorr;
    context.fill();
  }
  update() {
    this.draw();
    (this.xx += this.velocity.x), (this.yy += this.velocity.y);
  }
}

//-----------------------------------
class HugeWeapon {
  constructor(x, y, damage) {
    this.xx = x;
    this.yy = y;
    this.colorr = "rgba(27,255,0,1)";
    this.damage = damage;
  }
  draw() {
    context.beginPath();
    context.fillStyle = this.colorr;
    context.fillRect(this.xx, this.yy, 200, canvas.height);

    context.fill();
  }
  update() {
    this.draw();
    this.xx += 20;
  }
}

//------------------------------------------
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.xx = x;
    this.yy = y;
    this.radius = radius;
    this.colorr = color;
    this.velocity = velocity;
  }
  draw() {
    context.beginPath();

    context.arc(
      this.xx,
      this.yy,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.colorr;
    context.fill();
  }
  update() {
    this.draw();
    (this.xx += this.velocity.x), (this.yy += this.velocity.y);
  }
}

//----------------------------------------------- creating partical animation
class Partical {
  constructor(x, y, radius, color, velocity) {
    this.xx = x;
    this.yy = y;
    this.radius = radius;
    this.colorr = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    context.save();
    context.globalAlpha = this.alpha;
    context.beginPath();

    context.arc(
      this.xx,
      this.yy,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.colorr;
    context.fill();
    context.restore();
  }
  update() {
    this.draw();
    (this.xx += this.velocity.x), (this.yy += this.velocity.y);
    this.alpha -= 0.01;
  }
}
//-----------------------------------------------
const pranjal = new Player(playerPosition.x, playerPosition.y, 15, "white");

//---------------------

const weapons = [];
const hugeWeapons = [];
const enemies = [];
const particals = [];

//-------------------------------
const spownEnemy = () => {
  const enemySize = Math.random() * (40 - 5) + 5;
  const enemyColor = `hsl(${Math.floor(Math.random() * 360)},100%,50%)`;
  let random;
  if (Math.random() < 0.5) {
    random = {
      x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
      y: Math.random() * canvas.height,
    };
  } else {
    random = {
      x: Math.random() * canvas.width,
      y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
    };
  }

  const myAngle = Math.atan2(
    canvas.height / 2 - random.y,
    canvas.width / 2 - random.x
  );
  const velocity = {
    x: Math.cos(myAngle) * difficulty,
    y: Math.sin(myAngle) * difficulty,
  };

  enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
};

let animationId;
function animation() {
  //this function is used for animation

  animationId = requestAnimationFrame(animation);
  scoreBoard.innerHTML = `Score:${playerscore}`;
  context.fillStyle = "rgba(49,49,49,0.2) ";
  context.fillRect(0, 0, canvas.width, canvas.height);
  pranjal.draw();

  particals.forEach((partical, particalindex) => {
    if (partical.alpha <= 0) {
      particals.splice(particalindex, 1);
    } else {
      partical.update();
    }
  });

  //------------------------------generating hugeWeapon
  hugeWeapons.forEach((hugeWeapon, hugeWeaponIndex) => {
    hugeWeapon.update();
    if (hugeWeapon.xx > canvas.width) {
      hugeWeapons.splice(hugeWeaponIndex, 1);
    } else {
      hugeWeapon.update();
    }
  });

  weapons.forEach((Weapon, weaponIndex) => {
    Weapon.update();
    if (
      Weapon.x + Weapon.radius < 1 ||
      Weapon.y + Weapon.radius < 1 ||
      Weapon.x - Weapon.radius > canvas.width ||
      Weapon.y - Weapon.radius > canvas.height
    ) {
      weapons.splice(weaponIndex, 1);
    }
  });
  enemies.forEach((item, itemIndex) => {
    item.update();
    const distanceBetweenPlayerAndEnemy = Math.hypot(
      pranjal.xx - item.xx,
      pranjal.yy - item.yy
    );
    if (distanceBetweenPlayerAndEnemy - (pranjal.radius + item.radius) < 1) {
      cancelAnimationFrame(animationId);
      // stoping all sounds
      killEnemySound.pause();
      gameoverSound.pause();
      hugeWeaponSound.pause();
      heavyWeaponSound.pause();
      shootingSound.pause();
      return gameover();
    }

    hugeWeapons.forEach((hugeWeapon, hugeWeaponIndex) => {
      const distanceBetweenPlayerAndHugeWeapon = hugeWeapon.xx - item.xx;

      if (
        distanceBetweenPlayerAndHugeWeapon <= 200 &&
        distanceBetweenPlayerAndHugeWeapon >= -200
      ) {
        playerscore += 10;
        //Rendering player score
        scoreBoard.innerHTML = `Score:${playerscore}`;

        setTimeout(() => {
          killEnemySound.play();
          enemies.splice(itemIndex, 1);
        }, 0);
      }
    });

    weapons.forEach((wea, weaponIndex) => {
      const distanceBetweenWeaponAndEnemy = Math.hypot(
        wea.xx - item.xx,
        wea.yy - item.yy
      );
      if (distanceBetweenWeaponAndEnemy - (wea.radius + item.radius) < 1) {
        if (item.radius > wea.damage + 8) {
          gsap.to(item, {
            radius: item.radius - wea.damage,
          });
          setTimeout(() => {
            weapons.splice(weaponIndex, 1);
          }, 0);
        } else {
          for (let i = 0; i < item.radius * 3; i++) {
            particals.push(
              new Partical(wea.xx, wea.yy, 3, item.colorr, {
                x: (Math.random() - 0.5) * Math.random() * 2,
                y: (Math.random() - 0.5) * Math.random() * 2,
              })
            );
          }
          playerscore += 10;
          //Rendering player score
          scoreBoard.innerHTML = `Score:${playerscore}`;

          setTimeout(() => {
            killEnemySound.play();
            enemies.splice(itemIndex, 1);
            weapons.splice(weaponIndex, 1);
          }, 0);
        }
      }
    });
  });
}

//------------------------------- event listener for heavy weapon aka right mouse click
canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (playerscore <= 0) {
    return;
  }
  heavyWeaponSound.play();
  //Rendering player score
  playerscore -= 2;
  scoreBoard.innerHTML = `Score:${playerscore}`;
  //finding angle between player position(center )and click co-ordinates
  const myAngle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );

  //making const speed for light weapon
  const velocity = {
    x: Math.cos(myAngle) * 6,
    y: Math.sin(myAngle) * 6,
  };

  //adding weapon into weapons array
  weapons.push(
    new Weapon(
      canvas.width / 2,
      canvas.height / 2,
      25,
      "cyan",
      velocity,
      heavyWeaponDamage
    )
  );
});

//------------------------------- event listener for light weapon aka left mouse click
canvas.addEventListener("click", (e) => {
  shootingSound.play();
  //finding angle between player position(center )and click co-ordinates
  const myAngle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );

  //making const speed for light weapon
  const velocity = {
    x: Math.cos(myAngle) * 6,
    y: Math.sin(myAngle) * 6,
  };

  //adding weapon into weapons array
  weapons.push(
    new Weapon(
      canvas.width / 2,
      canvas.height / 2,
      6,
      "white",
      velocity,
      lightWeaponDamage
    )
  );
});

addEventListener("keypress", (e) => {
  if (e.key === " ") {
    if (playerscore < 20) {
      return;
    }
    //Rendering player score
    playerscore -= 20;
    scoreBoard.innerHTML = `Score:${playerscore}`;
    hugeWeaponSound.play();
    hugeWeapons.push(new HugeWeapon(0, 0, hugeWeaponDamage));
  }
});
addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
addEventListener("resize", (e) => {
  // canvas.height = window.innerHeight;
  // canvas.width = window.innerWidth;
  window.location.reload();
});

animation();
