document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  let gameSpeed = 5;
  let gameOver = false;
  let score = 0;
  
  const dinoSprite = new Image();
  dinoSprite.src = 'img/dino.png';
  const dino = {
      x: 50,
      y: canvas.height - 70,
      width: 40,
      height: 60,
      jumping: false
  };

  const marioSprite = new Image();
  marioSprite.src = 'img/mario.png';
  const mario = {
      x: canvas.width,
      y: dino.y,
      width: 40,
      height: 60
  };

  window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !dino.jumping && !gameOver) {
          dino.jumping = true;
          dino.speed = -10;
      }
  });
  

  function collision(dino, mario) {
      return dino.x < mario.x + mario.width &&
             dino.x + dino.width > mario.x &&
             dino.y < mario.y + mario.height &&
             dino.y + dino.height > mario.y;
  }

  function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      

      if (dino.jumping) {
          dino.y += dino.speed;
          dino.speed += 0.5;
          if (dino.y >= canvas.height - 70) {
              dino.jumping = false;
              dino.y = canvas.height - 70;
          }
      }
      ctx.drawImage(dinoSprite, dino.x, dino.y, dino.width, dino.height);

   
      mario.x -= gameSpeed;
      if (mario.x < -mario.width) {
          mario.x = canvas.width;
          score += 5;
          if(score>10){
          gameSpeed++;
          } //
      }
      ctx.drawImage(marioSprite, mario.x, mario.y, mario.width, mario.height);

   
      if (collision(dino, mario)) {
          gameOver = true;
          gameSpeed = 0;
          ctx.fillStyle = "red";
          ctx.font = "30px Arial";
          ctx.fillText("Reprovou em DJW", canvas.width / 2 - 100, canvas.height / 2);
      }

      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText(`Pontuação: ${score}`, canvas.width - 140, 30);
      
      if (!gameOver) {
          requestAnimationFrame(update);
      }
  }

  update();
});
