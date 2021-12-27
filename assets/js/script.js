const dino = document.querySelector(".dino");
const background = document.querySelector('.background')

let pontos = document.getElementsByTagName('h1')[0];

document.addEventListener("keyup", anim_dino_handle_Keyup);
document.addEventListener('click', anim_click)


let isJumping = false;
let position = 0;
let gamestop = false;
let winner = 0;


pontos.style.textAlign = 'right'
pontos.style.marginRight = '5%'

function anim_dino_handle_Keyup(event) {
  //ver se a telca pressionado é 32 = espaço .. (site keycode.info codigo das teclas)
  if (event.keyCode === 32) {
   // console.log('pressionou')
         if(!isJumping){ jump(); }
         if(gamestop == true){
             location.reload();
         }
  }
}
function anim_click(event){
   // console.log('pressionou')
          if(!isJumping){ jump(); }
         if(gamestop == true){
          location.reload();
         }
          
}
function jump() {

  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      //DESCIDA
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);

          isJumping = false;


        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      //PULANDO

      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20); //intervalo de execucao do codigo a cada 20ms
}

function createObstacles(){
    const obstacles = document.createElement('div')
    let obstacles_Position = 1300;
    let randomTime = Math.random() * 6000;

   // console.log(randomTime)
    obstacles.classList.add('obstacles');
    obstacles.style.left = 1300 + 'px';
    background.appendChild(obstacles);

    let leftInterval = setInterval(() => {
    
        if(obstacles_Position < -60){
            clearInterval(leftInterval);
            background.removeChild(obstacles)

            winner += 40;
            pontos.innerHTML = `placar:${winner}`
        }
        else if(obstacles_Position > 0 && obstacles_Position < 60    && position < 60)//se nessa regiao ele esta na area do 'dino' entao gameover
        {
            // game over
            clearInterval(leftInterval);
            gamestop = true;
           document.body.innerHTML = '<h1 class=game-over>Fim de Jogo</h1>'
          
        }
        else{
          obstacles_Position -= 10; //alteração da dificuldade dos obstaculos ate o 'dino'
          obstacles.style.left = obstacles_Position + 'px'  
        }
          if(winner >= 500){
            obstacles_Position -= 5; //alteração da dificuldade dos obstaculos ate o 'dino'
    
          }
          if(winner >= 2000){
            clearInterval(leftInterval);
            gamestop = true;
            document.body.innerHTML = '<h1 class=game-over>Voce Venceu</h1>'
          }
            
     },20)

     setTimeout(createObstacles, randomTime);
}
createObstacles();
