var renderer = PIXI.autoDetectRenderer({transparent: true});
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var bump = new Bump(PIXI);

var blanket = new PIXI.Sprite(PIXI.Texture.from("assets/blanket_800_600.png"));
stage.addChild(blanket);

var ant = new PIXI.Sprite(PIXI.Texture.from("assets/ant.png"));
ant.width = 50;
ant.height = 50;
ant.position.x = 750;
ant.position.y = 550;
stage.addChild(ant);

var food = [
    "assets/cherries.png", "assets/cherries.png", "assets/cherries.png",
    "assets/watermelon.png", "assets/watermelon.png", "assets/watermelon.png"
];
var foodSprites = [];

scatterFood();
function scatterFood() {
    for (i = 0; i < food.length; i++) {

        // assign sprite to a png from the food array
        var foodItem = new PIXI.Sprite(PIXI.Texture.from(food[i]));

        // "scatter" food by randomly generating x,y coordinates
        var xValue = Math.floor(Math.random() * 750) + 1;
        var yValue = Math.floor(Math.random() * 550) + 1;

        foodItem.width = 70;
        foodItem.height = 70;
        foodItem.position.x = xValue;
        foodItem.position.y = yValue;
        stage.addChild(foodItem);
        foodSprites[i] = foodItem;
    }
}

function keydownEventHandler(e) {

    if (e.keyCode == 87) { //w key
        ant.position.y -=10;
    }

    if (e.keyCode == 83) { //s key
        ant.position.y +=10;
    }

    if (e.keyCode == 65) { //a key
        ant.position.x -=10;
    }

    if (e.keyCode == 68) { //d key
        ant.position.x +=10;
    }
}

ant.interactive = true;

document.addEventListener("keydown", keydownEventHandler);

function animate() {
    bump.hit(ant,foodSprites, false, true, true,
        function (collision, platform) {
            stage.removeChild(platform);
        });
    ant.speed = 2;

    requestAnimationFrame(animate);
    renderer.render(stage);
}

animate(); 