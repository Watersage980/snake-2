
//O campo
var blockSize = 25;
var rows = 31;
var cols = 31;
var board;
var context;

//Cabeça da cobra
var cobraX = blockSize * 5;
var cobraY = blockSize * 5;
var velocidadeX = 0;
var velocidadeY = 0;

var cobraCorpo = [];

//Maçã
var macaX;
var macaY;

var gameOver = false;


window.onload = function() { //quando carregar roda essa função
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //desenha no campo

    colocaMaca();
    document.addEventListener("keyup", trocaDirecao);
    //update();
    setInterval(update, 1000/10); //cada 0,1 segundos roda update
}

function update(){
    if (gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height); //cria o campo

    context.fillStyle="red";
    context.fillRect(macaX, macaY, blockSize, blockSize);

    if (cobraX == macaX && cobraY == macaY){
        cobraCorpo.push([macaX, macaY]);
        colocaMaca();
    }

    for (let i = cobraCorpo.length-1; i>0; i--){
        cobraCorpo[i] = cobraCorpo[i-1];
    }
    if (cobraCorpo.length){
        cobraCorpo[0] = [cobraX, cobraY];
    }

    context.fillStyle="lime"; //desenha a cobra
    cobraX += velocidadeX * blockSize;
    cobraY += velocidadeY * blockSize;
    context.fillRect(cobraX, cobraY, blockSize, blockSize);
    for (let i = 0; i < cobraCorpo.length; i++){
        context.fillRect(cobraCorpo[i][0], cobraCorpo[i][1], blockSize, blockSize);
    }

    //condições do fim
    if (cobraX < 0 || cobraX > cols*blockSize || cobraY < 0 || cobraY > rows*blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < cobraCorpo.length; i++){
        if (cobraX == cobraCorpo[i][0] && cobraY == cobraCorpo[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
}

function trocaDirecao(e){
    if (e.code == "ArrowUp" && velocidadeY != 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    }
    else if (e.code == "ArrowDown" && velocidadeY != -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    }
    else if (e.code == "ArrowLeft" && velocidadeX != 1) {
        velocidadeX = -1;
        velocidadeY = 0;
    }
    else if (e.code == "ArrowRight" && velocidadeX != -1) {
        velocidadeX = 1;
        velocidadeY = 0;
    }
}

function colocaMaca(){ //coloca as maçãs de forma aleatória
    macaX = Math.floor(Math.random() * cols) * blockSize; //random = 0/1; * cols -> 0-30.999999; floor -> 0-30 * blockSize
    macaY = Math.floor(Math.random() * rows) * blockSize;
}
