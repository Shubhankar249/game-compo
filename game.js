let canvas=document.getElementById('myCanvas'), score=document.getElementById('score');
let pen=canvas.getContext("2d");
let H=canvas.height, W=canvas.width;
let virus1, virus2, virus3;
let player, sc=0, prev=0;

function init() {
    virus1={
        x:50,
        y:0,
        w:16,
        h:16,
        image: new Image(),
        direction: 'down'
    };
    virus1.image.src= 'assets/v1.png';

    virus2={...virus1};virus3={...virus1};
    virus2.x=89; virus2.y=30; virus2.direction='up';
    virus3.x=150;virus3.y=103;


    player={
        x:0,
        y:70,
        w:14,
        h:14,
        image: new Image()
    };
    player.image.src='assets/superhero.png';

    window.addEventListener('keydown', key=> {
        if (key.key==="ArrowRight")  player.x+=3;
        if (key.key===" ")  clearInterval(game);
    });

    score.innerText="0";
}

function draw() {
    pen.clearRect(0, 0, W, H);

    pen.drawImage(virus1.image, virus1.x, virus1.y, virus1.w, virus1.h);
    pen.drawImage(virus2.image, virus2.x, virus2.y, virus2.w, virus2.h);
    pen.drawImage(virus3.image, virus3.x, virus3.y, virus3.w, virus3.h);

    pen.drawImage(player.image, player.x, player.y, player.w, player.h);
}

function updateDirection(virus) {
    virus.direction==='down'? virus.y+=3 : virus.y-=3;

    if (virus.y>=H - virus.w)   virus.direction='up';
    else if (virus.y<=0) virus.direction = 'down';
}

function collided(virus) {
    return !(player.y > virus.y + virus.h || player.y + player.h < virus.y ||
        player.x > virus.x + virus.w || player.x + player.w < virus.x);
}

function update() {
    updateDirection(virus1);
    updateDirection(virus2);
    updateDirection(virus3);

    if (collided(virus1) || collided(virus2) || collided(virus3))  {
        alert('You lost');
        clearInterval(game);
    }

    if (player.x!==prev && player.x%12===0) {prev=player.x;sc+=5;score.innerText=sc.toString()}
}

function gameLoop() {
    draw();
    update();

    if (player.x>=W-player.w)
        clearInterval(game);
}

init();
let game=setInterval(gameLoop, 45);
