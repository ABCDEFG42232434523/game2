const app = new PIXI.Application({
    backgroundColor: 0xFFFFFF,
    resizeTo: window,
});


let Table = null;

let gun = null;
// 预加载
PIXI.loader
    .add([
         "../data/image/Gun.png",
         "../data/image/Table.png",
        "../data/image/chh.png",
    ])
    .on("progress", (loader, res) => console.log(`正在加载 ${res.url}`))
    .load(setup);


function setup() {
    // let table = new PIXI.Sprite(PIXI.loader.resources["../data/image/Table.png"].texture);
    //
    // table.width = 800;
    // table.height = 400;
    //
    // table.x = (window.innerWidth / 2) - (800 / 2);
    // table.y = window.innerHeight / 2;

    Table = {
        sprite: new PIXI.Sprite(PIXI.loader.resources["../data/image/Table.png"].texture),
        init() {
            this.sprite.width = 800;
            this.sprite.height = 400;
            this.sprite.x = (window.innerWidth / 2) - (800 / 2);
            this.sprite.y = window.innerHeight / 2;

        }
    };

    Table.init();
    app.stage.addChild(Table.sprite);

    gun = new Gun(PIXI.loader.resources["../data/image/Gun.png"].texture);

    app.stage.addChild(gun.sprite);

    /**@param {number} dt */
    function game_loop(dt) {

    }

    document.getElementById('pixi-canvas').appendChild(app.view);
    app.ticker.add(game_loop);
    app.start();
}

