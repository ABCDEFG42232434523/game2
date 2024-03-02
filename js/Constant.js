const Mode = class {
    #My = "My";
    #Mouse = "Mouse";

    static get My() {
        return this.#My
    }

    static get Mouse() {
        return this.#Mouse
    }
};