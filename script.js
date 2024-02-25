//Game contants and varaible
let inputDir={x:0 ,y:0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('music.mp3');
let speed=5;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
];
let food={x:5,y:6};
let score=0;

//Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 >= 1/speed)
    {
        lastPaintTime=ctime;
    // console.log(ctime);
    gameEngine();
    }
   
}

function isColloide(snakeArr)
{
    //if they colloide with its own body part
    //i=1 bcz i=0 is head
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y )
        {
            return true;
        }
    }
    if(snakeArr[0].x === 18 || snakeArr[0].x === 0 || snakeArr[0].y === 18 || snakeArr[0].y === 0)
    {
        return true;
    }
    return false;

}
function gameEngine(){

    //part1: updating the snake array and food
   
    if(isColloide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over, press any key to restart.");
        snakeArr=[{x:13,y:15}];
       musicSound.play();
        score=0;
    }

    //if snake eat the food , we need to increment the score and regenerate the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y)
    {
        score +=1;
        if(HiScoreVal<score)
        {
            HiScoreVal=score;
            localStorage.setItem("hiscore",JSON.stringify(HiScoreVal));
            HI_show.innerHTML="HighScore: "+ HiScoreVal;
        }
       
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y });
        let maxi=2;
        let mini=16;
        food ={x: Math.round(Math.random()*(maxi-mini)+mini),y: Math.round(Math.random()*(maxi-mini)+mini)};

    }
    document.getElementById('score_show').innerHTML="Score: "+ score;
    //for moving

    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    //part2:display snake and food
   // let board=document.getElementById('board');

   //display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
    SnakeElement=document.createElement('div');
    SnakeElement.style.gridRowStart =e.y;
    SnakeElement.style.gridColumnStart =e.x;
    if(index==0)
    {
        SnakeElement.classList.add('head');
    }
    else{
        SnakeElement.classList.add('snake');
    }
    
    board.appendChild(SnakeElement);
 });

    //display food
    FoodElement=document.createElement('div');
    FoodElement.style.gridRowStart=food.y;
    FoodElement.style.gridColumnStart=food.x;
    FoodElement.classList.add('food');
    board.appendChild(FoodElement);

    
}



//Main logic of code start from here
let hiscore=localStorage.getItem('hiscore');
if(hiscore == null)
{
    HiScoreVal=0;
    localStorage.setItem('hiscore',JSON.stringify(HiScoreVal));
}
else{
    HiScoreVal= JSON.parse(hiscore);
    HI_show.innerHTML="HighScore: "+ HiScoreVal;
}
console.log(hiscore);

//it is animation used to paint and repaint while game is on in screen
window.requestAnimationFrame(main);


//for key pressed the direction of snake
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};         //game start
    moveSound.play();
    switch(e.key){
        case 'ArrowUp':
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
        break;
        case 'ArrowDown':
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
        break;
        case 'ArrowLeft':
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
        break;
        case 'ArrowRight':
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
        break;
    }

});