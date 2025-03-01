
import Button from "./button.js";

export default classmiddleGame {
    constructor(canvas, ctx, gamefieldObject) {

    }



    game() {
        let x = event.clientX;
        let y = event.clientY;
        for (let i=0; i<gamefieldObject.field2.shipbuttonlist.length; i++) {
            if (gamefieldObject.field2.shipbuttonlist[i].click(x, y) == true) {
                gamefieldObject.field2.shipbuttonlist[i].click(x, y).is_hit = true
            }
        }
    }


}