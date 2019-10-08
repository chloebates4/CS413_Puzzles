// load main menu
var gameport = document.getElementById("menu");

//bootstrapping pixi.js
var renderer = PIXI.autoDetectRenderer({transparent: true});
gameport.appendChild(renderer.view);

var bump = new Bump(PIXI);
//root of scene graph
var stage = new PIXI.Container();
var texture = PIXI.Texture.from("assets/leaves_background.png");

var menu_background = new PIXI.Sprite(texture);
loadMenu();
function loadMenu() {
    menu_background.width = renderer.screen.width;
    menu_background.height = renderer.screen.height;
    stage.addChild(menu_background);

    // add play button
    var playBtn = new PIXI.Sprite(PIXI.Texture.from("assets/play_button_fall.png"));
    playBtn.position.x = 100;
    playBtn.position.y = 400;
    playBtn.buttonMode = true;
    playBtn.interactive = true;
    playBtn.buttonMode = true;
    playBtn
        .on('pointerdown', onPlayButtonDown);

    stage.addChild(playBtn);

    // add credits button
    var credsBtn = new PIXI.Sprite(PIXI.Texture.from("assets/credits_button_fall.png"));
    credsBtn.position.x = 500;
    credsBtn.position.y = 410;
    credsBtn.buttonMode = true;
    credsBtn.interactive = true;
    credsBtn.buttonMode = true;
    credsBtn
        .on('pointerdown', onCredButtonDown);

    stage.addChild(credsBtn);
}

var hand = new PIXI.Sprite(PIXI.Texture.from("assets/hand.png"));

hand.position.x = 740;
hand.position.y = 540;
hand.interactive = true;

function onPlayButtonDown() {
    // load game background
    var game_board = new PIXI.Sprite(PIXI.Texture.from("assets/background_lawn.png"));
    game_board.width = renderer.screen.width;
    game_board.height = renderer.screen.height;
    stage.addChild(game_board);

    // add the hand sprite that was created above
    stage.addChild(hand);

    // add menu button
    var menuBtn = new PIXI.Sprite(PIXI.Texture.from("assets/button_menu_fall.png"));
    menuBtn.position.x = 20;
    menuBtn.position.y = 520;
    menuBtn.buttonMode = true;
    menuBtn.interactive = true;
    menuBtn.buttonMode = true;
    menuBtn
        .on('pointerdown', loadMenu);

    stage.addChild(menuBtn);
    scatterLeaves();

    let people_text = new PIXI.Text(
        'How to play: use W, A, S, D keys to move the hand to gather the leaves. ',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 15,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    people_text.x = 10;
    people_text.y = 10;
    stage.addChild(people_text);
}

function onCredButtonDown() {
    var credits_board = new PIXI.Sprite(PIXI.Texture.from("assets/credits_background_lawn.png"));
    credits_board.width = renderer.screen.width;
    credits_board.height = renderer.screen.height;
    stage.addChild(credits_board);
    let people_text = new PIXI.Text(
        'Chloe Bates',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 25,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    people_text.x = 300;
    people_text.y = 285;
    stage.addChild(people_text);

    let creds_title_text = new PIXI.Text(
        'CREDITS',
        {fontFamily : "\"Courier New\", Courier, monospace",
            fontSize: 75,
            fontWeight: "bold",
            fill : ["#fa0"],
            align : 'center'});

    creds_title_text.x = 225;
    creds_title_text.y = 35;
    stage.addChild(creds_title_text);

    // add menu title
    var menuBtn = new PIXI.Sprite(PIXI.Texture.from("assets/button_menu_fall.png"));
    menuBtn.position.x = 20;
    menuBtn.position.y = 520;
    menuBtn.buttonMode = true;
    menuBtn.interactive = true;
    menuBtn.buttonMode = true;
    menuBtn
        .on('pointerdown', loadMenu);

    stage.addChild(menuBtn);
}

var leaves = [
    "assets/red_leaf.png", "assets/red_leaf.png", "assets/red_leaf.png",
    "assets/yellow_leaf.png", "assets/yellow_leaf.png", "assets/yellow_leaf.png",
    "assets/orange_leaf.png", "assets/orange_leaf.png", "assets/orange_leaf.png",
];
var leavesSprites = [];

// add leaves to game
function scatterLeaves() {

    for (i = 0; i < leaves.length; i++) {

        // assign sprite to a png from the leaves array
        var leaf = new PIXI.Sprite(PIXI.Texture.from(leaves[i]));

        // "scatter" leaves by randomly generating x,y coordinates
        var xValue = Math.floor(Math.random() * 750) + 1;
        var yValue = Math.floor(Math.random() * 550) + 1;

        leaf.width = 70;
        leaf.height = 70;
        leaf.position.x = xValue;
        leaf.position.y = yValue;
        stage.addChild(leaf);
        leavesSprites[i] = leaf;

    }
}

function keydownEventHandler(e) {

    if (e.keyCode === 87) { //w key
        hand.position.y -=10;
    }

    if (e.keyCode === 83) { //s key
        hand.position.y +=10;
    }

    if (e.keyCode === 65) { //a key
        hand.position.x -=10;
    }

    if (e.keyCode === 68) { //d key
        hand.position.x +=10;
    }
}

// listen for user moving the hand
document.addEventListener("keydown", keydownEventHandler);


function animate() {
    // detect collision
    bump.hit(hand,leavesSprites, false, true, true,
        function (collision, platform) {
            stage.removeChild(platform);
        });
    hand.speed = 2;
    requestAnimationFrame(animate);

    renderer.render(stage);
}

animate();
