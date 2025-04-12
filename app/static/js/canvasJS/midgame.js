
//import Button from "./button.js";

export default class middleGame {
    constructor(canvas, ctx, gamefieldObject) {
        this.ships_remain = 23
        this.hitted_button = 0
        this.canvas = canvas
        this.ctx = ctx
        this.gamefieldobj = gamefieldObject
    }



    game() {
        console.log("a")
        let x = event.clientX;
        let y = event.clientY;
        console.log(this.gamefieldobj)
        console.log(this.gamefieldobj.field2.button_list)
        for (let i=0; i<this.gamefieldobj.field2.button_list.length; i++) {
            if (this.gamefieldobj.field2.button_list[i].click(x, y) == true) {
                this.hitted_button = i
            }
        }
    }


}