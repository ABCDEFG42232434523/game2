class Button {
    x;
    y;
    color;
    sprite;
    text;

    constructor(x, y, text, font_size, e) {
        this.sprite = new PIXI.Graphics();
        this.text = new PIXI.Text(text, {
            fontFamily: "'Noto Sans TC', 'Songti TC', serif",
            fill: 0x000000,
            fontSize: font_size,
            align: 'center',
        });
        this.text.x = x;
        this.text.y = y;
        this.sprite.beginFill(0x00ffff);
        this.sprite.drawRect(x, y, font_size * text.length, font_size);
        this.sprite.interactive = true; // 使矩形可交互
        this.sprite.buttonMode = true; // 设置为按钮模式
        // 移动端
        this.sprite.on("touchstart", e);
        // PC端
        this.sprite.on("click", e);
    }
}