const Mode = class {
    static get My() {
        return "My";
    }
    static get Mouse() {
        return "Mouse";
    }
};


const BulletType = class {

    static init() {
        this.NullBulletNumber = 0;
        this.BulletNumber = 0;
    }

    static NullBulletNumber = 0;
    static BulletNumber = 0;

    static get NullBullet() {
        return "nullbullet";
    }
    static get Bullet() {
        return "button"
    }
};