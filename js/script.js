var direction = { x: 0, y: 0 };
var lastPaintTime = 0;
var speed = 8;
var a = 2;
var b = 16;
var snakeArr = [
    { x: 11, y: 10 },
]
var food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
const board = document.querySelector('.snake-box');
var score = 0;
var highest = 0;

var isRunning = true;

const highscdiv = document.querySelector('.hscore');
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    if(isRunning) {
        gameEngine();
    }
    
}

function gameEngine() {
    //update
    if (isCollide(snakeArr)) {
        direction = { x: 0, y: 0 };
        alert("game over your sore is : "+score);
        snakeArr = [{ x: 13, y: 15 }];
        highest= Math.max(highest,score);
        highscdiv.innerHTML = highest;
        score = 0;
    }

    //snake hav eaten

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y })
        score+=10;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //move snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    //render snake
    board.innerHTML = '';
    snakeArr.forEach((el, index) => {
        var snakeEl = document.createElement('div');
        snakeEl.style.gridRowStart = el.y;
        snakeEl.style.gridColumnStart = el.x;
        if (index === 0) {
            snakeEl.classList.add('head')
        }
        else {
            snakeEl.classList.add('snake')
        }
        board.appendChild(snakeEl);
    })

    //render food

    var foodEl = document.createElement('div');
    foodEl.style.gridRowStart = food.y;
    foodEl.style.gridColumnStart = food.x;
    foodEl.classList.add('food')
    board.appendChild(foodEl);
}


function isCollide(snkar) {
    for (let i = 2; i < snkar.length; i++) {
        if (snkar[i].x === snkar[0].x && snkar[i].y === snkar[0].y) return true;
    }
    if (snkar[0].x >= 20 || snkar[0].y >= 20 || snkar[0].x <= 0 || snkar[0].y <= 0) return true;
    return false;
}


//main logic


 window.requestAnimationFrame(main);


window.addEventListener('keydown', (e) => {
    switch (e.key) {
        
        case 'ArrowUp':
            if(snakeArr.length>1){
                if(snakeArr[1].y!=snakeArr[0].y-1){
                    isRunning = true;
            direction.x = 0;
            direction.y = -1;
                }
            }else{
                isRunning = true;
            direction.x = 0;
            direction.y = -1;
            }
            
            break;
        case 'ArrowDown':
            if(snakeArr.length>1){
                if(snakeArr[1].y!=snakeArr[0].y+1){
                    isRunning = true;
                direction.x = 0;
                direction.y = +1;
                }
            }else{
                isRunning = true;
                direction.x = 0;
                direction.y = +1;
            }
            
            break;
        case 'ArrowLeft':
            if(snakeArr.length>1){
                if(snakeArr[1].x!=snakeArr[0].x-1){
                    isRunning = true;
                direction.x = -1;
                direction.y = 0;
                }
            }else{
                isRunning = true;
                direction.x = -1;
                direction.y = 0;
            }
            
            break;
        case 'ArrowRight':
            if(snakeArr.length>1){
                if(snakeArr[1].x!=snakeArr[0].x+1){
                    isRunning = true;
            direction.x = 1;
            direction.y = 0;
                }
            }else{
                isRunning = true;
            direction.x = 1;
            direction.y = 0;
            }
            break;
        case ' ':
            isRunning = !isRunning;
            break;
        default:
            break;
    }
})