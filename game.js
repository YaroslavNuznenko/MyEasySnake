document.addEventListener("DOMContentLoaded", ready);
function ready () {
    var canvas, snake, keyCodeNow,
        snake_x = -1, snake_y = 60,objects_size=20, check_y = 0,
        check_x = -1, dir_num = 20, tail = [], snakeLength = 4,
        eat_x=1, eat_y=1, score = 0;

    canvas = document.getElementById('main');
    snake = canvas.getContext('2d');

    function FindEatPos(pos) {
        pos = Math.floor(Math.random() * (400 - 0)) + 0;
        return pos % 20!==0 ? FindEatPos(): pos;
    }

    eat_x = FindEatPos(eat_x);
    eat_y = FindEatPos(eat_y);

    setInterval(MoveSnake, 1000/10);
    document.addEventListener("keydown", getKeyCode);

    function getKeyCode(event) {
        keyCodeNow = event.keyCode;
        if (keyCodeNow) {
            switch (keyCodeNow) {
                case 87:
                    check_y = 0;
                    check_x = -1;
                    dir_num = -20;
                    break;
                case 65:
                    check_y = -1;
                    check_x = 0;
                    dir_num = -20;
                    break;
                case 68:
                    check_y = -1;
                    check_x = 0;
                    dir_num = +20;
                    break;
                case 83:
                    check_y = 0;
                    check_x = -1;
                    dir_num = +20;
                    break;
            }
        }
    }

    function MoveSnake() {
        if (snake_y >= (1000 - snake_y)) snake_y = 0;
        if (snake_y < 0) snake_y = canvas.height;
        if (snake_x >= (1000 - snake_x)) snake_x = 0;
        if (snake_x < 0) snake_x = canvas.width;
        snake.fillStyle = 'black';
        snake.fillRect(0, 0, canvas.height, canvas.width);
        snake.fillStyle = 'red';
        snake.fillRect(snake_x, snake_y, objects_size-2, objects_size-2);

        if(snake_y === eat_y && snake_x === eat_x){
            eat_x = FindEatPos(eat_x);
            eat_y = FindEatPos(eat_y);
            snakeLength++;
            score++;
        }
        for(var i=0;i<tail.length;i++){
            snake.fillRect(tail[i].x, tail[i].y, objects_size-2, objects_size-2);
        }
        for(var i=1;i<tail.length;i++){
            if(tail[0].x ===tail[i].x && tail[0].y===tail[i].y){
                snakeLength=5;
                score=0
            }
        }
        snake.fillStyle = 'lime';
        snake.fillRect(eat_x, eat_y, objects_size-2, objects_size-2);
        if (check_y != -1 && check_x === -1)
            snake_y += dir_num;
        if (check_x != -1 && check_y === -1)
            snake_x += dir_num;
        tail.push({x: snake_x, y: snake_y});
        while(tail.length>snakeLength){
            tail.shift();
        }
        document.getElementById('score').textContent = score;
    }

}
