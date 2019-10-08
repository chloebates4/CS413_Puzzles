// load main menu
var gameport = document.getElementById("menu");

//bootstrapping pixi.js
var renderer = PIXI.autoDetectRenderer({transparent: true});
gameport.appendChild(renderer.view);

//root of scene graph
var stage = new PIXI.Container();
//PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
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


function onPlayButtonDown() {
    // load game background
    var game_board = new PIXI.Sprite(PIXI.Texture.from("assets/background_lawn.png"));
    game_board.width = renderer.screen.width;
    game_board.height = renderer.screen.height;
    stage.addChild(game_board);

    var hand = new PIXI.Sprite(PIXI.Texture.from("assets/hand.png"));

    hand.position.x = 740;
    hand.position.y = 540;
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

function animate() {
    requestAnimationFrame(animate);

    renderer.render(stage);
}

animate();
