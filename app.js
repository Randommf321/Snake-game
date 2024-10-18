let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
let gridSize = 20;
let snakeColor = "purple";
let foodColor = "yellow";
let snake = [{ x: 12, y: 8 }];
let food = { x: 2, y: 1 };
let dx = 1, dy = 0; 
let points = document.querySelector('.points')
let count = 0;

// Draw snake 
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// Draw food
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
	if(snake.x==food.x && snake.y==food.x){
		++count
		setInterval(game);
	}

}

// Move snake 
function moveSnake() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    
    if(head.x==food.x&&head.y==food.y){
        ++count;
        points.innerText="Points:"+ (count);
        food={
            x:Math.floor(Math.random()*(canvas.width/gridSize)),
            y:Math.floor(Math.random()*(canvas.height/gridSize))
        };
    }else{
        snake.pop();
    }

    
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        alert("Game Over");
		snake =[{ x: Math.floor(Math.random() * (canvas.width / gridSize)),  y: Math.floor(Math.random() * (canvas.height / gridSize))}]
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
}

let game=setInterval(moveSnake,200);

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key == "ArrowLeft") {
        if (dx !== 1) {
            dx = -1;
            dy = 0;
        }
    } else if (e.key == "ArrowRight") {
        if (dx !== -1) {
            dx = 1;
            dy = 0;
        }
    } else if (e.key == "ArrowUp") {
        if (dy !== 1) {  
            dx = 0;
            dy = -1;
        }
    } else if (e.key == "ArrowDown") {
        if (dy !== -1) {  
            dx = 0;
            dy = 1;
        }
    }
});
