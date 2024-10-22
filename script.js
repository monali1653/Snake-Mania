let inputDir={x:0, y:0};        //snake is not moving
let speed=5;
let score=0;
let lastPaintTime = 0;
let snakeArr=[
    {x:7, y:10}
]
food={x:13, y:4};
function main(ctime){            //ctime-current the time at which it is running
    window.requestAnimationFrame(main);                        
    if(((ctime-lastPaintTime)/1000) < 1/speed){              //the screen will paint after every 0.2 sec
        return;
    }
   lastPaintTime=ctime;
   gameEngine(); 
}

function isCollide(snake){
    // if snake bump into itself
    for(let i=1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
        //if snake bump into the wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
            return true;
        }
    
}


function gameEngine(){
//Updating snake array and food
if(isCollide(snakeArr)){
    inputDir ={x:0, y:0};
    alert("Game Over. Press any key to play again!");
    snakeArr =[{x:7, y:10}];
    food={x:13, y:4};
    score = 0; 
    scoree.innerHTML="Score: " + score;
}

// If snake have eaten the food increament the score and regenarate the food
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    score+=1;
    scoree.innerHTML="Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a=2;
    let b=16;
    food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
}

//Moving the snake
for(let i=snakeArr.length-2; i>=0; i--){
    snakeArr[i+1]={...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

//Display the snake
board.innerHTML="";
snakeArr.forEach((e, index)=>{
snakeElement=document.createElement('div');
snakeElement.style.gridRowStart = e.y;
snakeElement.style.gridColumnStart =e.x;
if(index === 0){
snakeElement.classList.add('head');
}else{
    snakeElement.classList.add('snake');
}
board.appendChild(snakeElement);
});

//Diaplay the food
foodElement=document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart =food.x;
foodElement.classList.add('food');
board.appendChild(foodElement);
}
window.requestAnimationFrame(main);             //it will fire main but then will not fire main repeatedly
window.addEventListener('keydown', e=>{
inputDir={x:0, y:1} //Start the game
switch(e.key){
    case "ArrowUp":
        inputDir.x=0;
        inputDir.y= -1;                      //have to remove 1 from total distance travelled
        break;
    case "ArrowDown":
        inputDir.x=0;
        inputDir.y=1;
        break;
    case "ArrowLeft":
        inputDir.x=-1;
        inputDir.y=0;
        break;
    case "ArrowRight":
        inputDir.x=1;
        inputDir.y=0;
        break;
    
}
});