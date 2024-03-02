class Gun {
    sprite;
    constructor(image) {
        this.sprite = new PIXI.Sprite(image);
        this.sprite.width = 500;
        this.sprite.height = 150
        this.x = (window.innerWidth / 2) - (500 / 2);
        this.y = window.innerHeight / 2;
    }
    set x(x) {
        this.sprite.x = x;
    }
    set y(y) {
        this.sprite.y = y;
    }
}