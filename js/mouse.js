class Mouse {
    x;
    y;
    sprite;
    PH;

    constructor(x, y, sprite, ph) {
        this.sprite = new PIXI.Sprite(sprite);
        this.x = x;
        this.sprite.y = this.y = (y - 150);
        this.PH = ph;
        this.sprite.width = this.sprite.width * 2;
        this.sprite.height = this.sprite.height * 3;
    }
}