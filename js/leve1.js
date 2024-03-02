function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const app = new PIXI.Application({
    backgroundColor: 0xFFFFFF,
    resizeTo: window,
});

const AllSpritePH = 3;

let Table = null;
let gun = null;
let mouse_sprite = null;
let player = null;
let short_my_button = null;
let short_mouse_button = null;
let mode = Mode.My;
let index = 0;


let fontStyle = {
    fontFamily: "'Noto Sans TC', 'Songti TC', serif",
    fill: 0x000000,
    fontSize: 50,
    align: 'center',
};

let mouse_text = new PIXI.Text("", fontStyle);
let player_text = new PIXI.Text("", fontStyle);

let bullets = [];
let add_Bullet = true;
let loop = 4;
for (let i = 0; i < loop; i++) {
    if (Math.floor(Math.random() * 2) === 0) {
        bullets.push(BulletType.NullBullet);
        add_Bullet = false;
        loop = 5;
        BulletType.NullBulletNumber++;
        continue;
    }
    BulletType.BulletNumber++;
    bullets.push(BulletType.Bullet);
}

if (add_Bullet) {
    bullets.push(BulletType.Bullet);
}

//alert(`${BulletType.BulletNumber}实弹  ${BulletType.NullBulletNumber}空弹`);

// 预加载
PIXI.loader
    .add([
        "../data/image/Gun.png",
        "../data/image/Table.png",
        "../data/image/lbd.png",
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

    console.log(bullets);


    Table = {
        sprite: new PIXI.Sprite(PIXI.loader.resources["../data/image/Table.png"].texture),
        width: 800,
        height: 400,
        init() {
            this.sprite.width = this.width;
            this.sprite.height = this.height;
            this.sprite.x = (window.innerWidth / 2) - (800 / 2);
            this.sprite.y = window.innerHeight / 2;

        }
    };

    Table.init();
    app.stage.addChild(Table.sprite);


    mouse_sprite = new Mouse(
        0,
        window.innerHeight / 2,
        PIXI.loader.resources["../data/image/lbd.png"].texture,
        AllSpritePH);
    app.stage.addChild(mouse_sprite.sprite);

    player = new Player(
        Table.width / 21,
        window.innerHeight / 2,
        "You",
        AllSpritePH,
        fontStyle);
    app.stage.addChild(player.sprite);
    app.stage.addChild(player.text);


    gun = new Gun(PIXI.loader.resources["../data/image/Gun.png"].texture);
    //console.log(gun.sprite.rotation)
    app.stage.addChild(gun.sprite);



    mouse_text.y = 50;
    mouse_text.x = 10;
    app.stage.addChild(mouse_text);

    player_text.y = 50;
    player_text.x = 600;

    app.stage.addChild(player_text);



    short_mouse_button = new Button(
        150,
        200,
        "它", 100,
        async () => {
            switch (bullets[index]) {
                case BulletType.NullBullet:
                    //await sleep(1000);
                    mode = Mode.Mouse;
                    break;
                case BulletType.Bullet:
                    mouse_sprite.PH--;
                    //await sleep(1000);
                    mode = Mode.Mouse
                    break;
            }
            index++;

        });

    short_my_button = new Button(
        window.innerWidth - 100 * 3,
        200,
        "自己", 100,
        async () => {

            gun.sprite.rotation = 180;
            let x = gun.sprite.x;
            gun.x = 100;

            switch (bullets[index]) {
                case BulletType.NullBullet:
                    break;
                case BulletType.Bullet:
                    player.PH--;
                    await sleep(1000);
                    mode = Mode.Mouse;
                    break;
            }
            index++;
        });

    app.stage.addChild(short_mouse_button.sprite);
    app.stage.addChild(short_mouse_button.text);
    app.stage.addChild(short_my_button.sprite);
    app.stage.addChild(short_my_button.text);


    /**@param {number} dt */
    async function game_loop(dt) {

        switch (mode) {
            case Mode.My:
                gun.goto(Mode.My);
                my(dt);
                break;
            case Mode.Mouse:
                gun.goto(Mode.Mouse);
                mouse(dt);
                break;
        }
        defaultPanel();
        await sleep(4);
    }
    document.getElementById('pixi-canvas').appendChild(app.view);
    app.ticker.add(game_loop);
    app.start();
}

function my(dt) {
    gun.sprite.scale.x = -2;
}

async function mouse(dt) {
    gun.sprite.scale.x = 2;
    // 打自己
    if (Math.floor(Math.random() * 2) === 0) {
        switch (bullets[index]) {
            case BulletType.NullBullet:
                break;
            case BulletType.Bullet:
                mouse_sprite.PH--;
                await sleep(2000);
                mode = Mode.My;
                break;
        }
        index++;
    } else {
        switch (bullets[index]) {
            case BulletType.NullBullet:
                await sleep(1000);
                mode = Mode.My;
                break;
            case BulletType.Bullet:
                mouse_sprite.PH--;
                await sleep(1000);
                mode = Mode.My;
                break;
        }
        index++;
    }


    //setTimeout(() => mode = Mode.My, 1000);
}

function defaultPanel() {
    mouse_text.text = `Dog血量：${mouse_sprite.PH}/${AllSpritePH}`;
    player_text.text = `${player.text.text}血量：${player.PH}/${AllSpritePH}`
    if (index > bullets.length) {
        index = 0;
        let loop = 4;
        BulletType.init();
        for (let i = 0; i < loop; i++) {
            if (Math.floor(Math.random() * 2) === 0) {
                bullets[i] = BulletType.NullBullet;
                add_Bullet = false;
                loop = 5;
                BulletType.NullBulletNumber++;
                continue;
            }
            BulletType.BulletNumber++;
            bullets[i] = BulletType.Bullet;
        }
        console.log(bullets);
        console.log(index);
       // alert(`${BulletType.BulletNumber}实弹  ${BulletType.NullBulletNumber}空弹`);
    }

}