class Player {
    x;
    y;
    sprite;
    text
    PH;

    constructor(x, y, sprite, ph, style) {
        style.fontSize = 40;
        style.fill = 0xfff000;
        this.sprite = new PIXI.Graphics();
        this.text = new PIXI.Text(sprite, style);
        this.text.x = 850;
        this.text.y = y;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = this.sprite.width * 4;
        this.sprite.height = this.sprite.height * 4;
        this.PH = ph;
        this.sprite.beginFill(0xff0000);
        this.sprite.drawCircle(850, 100, style.fontSize * 3);
    }
}