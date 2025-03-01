import AbstractButton from "./abstract.js";

export default class BaseButton extends AbstractButton{
    constructor(pos_x, pos_y, width, height, ctx) {
    super();
    this.position_x = pos_x;
    this.position_y = pos_y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.is_clicked = false
    this.ishovered = false
    this.is_active = true

    }
}