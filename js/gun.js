class Gun {

    init_x;
    init_y;

    sprite;
    constructor(image) {
        this.sprite = new PIXI.Sprite(image);
        this.sprite.width = 500;
        this.sprite.height = 150
        this.x = (window.innerWidth / 2) - (500 / 2);
        this.y = window.innerHeight / 2;
    }
    set x(x) {
        this.init_x = this.sprite.x = x;
    }
    set y(y) {
        this.init_y = this.sprite.y = y;
    }

    rotate(r) {

    }

    goto(short_mode) {
        switch (short_mode) {
            case Mode.My:
                this.sprite.x = (window.innerWidth / 2) + 400;
                break;
            case Mode.Mouse:
                this.sprite.x = (window.innerWidth / 2) - 400;
                break;
        }
    }
}