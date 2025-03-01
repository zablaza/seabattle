/*
js module file structure
    -1- import statements
    -2- global variables
    -3- local module variables (let)
    -4- local file variables (let)
    -5- export classes, functions
    -6- classes, functions
    -7- calls
*/
//import playerGameField from "./gamefield.js";
import gameField from "./gamefield.js";
import ShipPlacement from "./chooser-init.js";

const host_address = "http://127.0.0.1:8000/"
const api_game_endpoint = "game_async/"

var current_state = 0

var canvas = document.getElementById("gamefield");
var ctx = canvas.getContext("2d");

var mainField = new gameField(canvas, ctx);
var chooserButton = new ShipPlacement(canvas, ctx, mainField);

function on_debug_button(event){
    //event.preventDefault();
    var payload_data = [mainField.field1.button_list, mainField.field1.current_step, mainField.field1.ship_amount, current_state]
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const request = new Request(
        api_game_endpoint,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',//'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken,
            },
            mode: 'same-origin', // Do not send CSRF token to another domain.
            body: JSON.stringify(payload_data),
        }
            )
    fetch(request).then(function(response) {
        if (response["status"] !== 200) {
            console.log(response["status"], "12er22efge23efe")
            throw new Error('Network response was not ok ' + response.statusText);
        }

        return response.json(); // Parse the JSON from the response
        })
        .then(function(data) {
            mainField.field1.ship_amount = data.data.payload_data.ship_amount
//            alert(JSON.stringify(data)); // Display the response data in an alert box
            //console.log(data); // Log the response data to the console
            if (data.status === 'success'){
                chooserButton.setForbiddenZoneAroundPlacedShip(chooserButton.iteration_number_i, chooserButton.iteration_number_a, chooserButton.aligment_number_b)
                mainField.draw()
            }
            else if (data.status === 'fail'){
                alert(JSON.stringify(data));
                if (data.data.status_code === 3){
                }
            }
            else if (data.status === 'error'){

            }
        })
        .then(function(error) {
            if (error)
                console.error('Error:', error); // Handle any errors that occurred during fetch
            });


//    //event.preventDefault()
//    console.log(mainField.field1.button_list, "button list")
//    console.log(mainField.field1.ship_cords, "ship_cords")
//    /*for (let a = 0; a < 11; a++) {
//        let list = []
//        for (let i = 0; i < 11; i++) {
//            list.push(mainField.field1.button_list[a*11+i])
//        }
//        mainField.button_list_for_python.push(list)
//    }*/
//    console.log(mainField.button_list_for_python, "button_list")
//    let but1 = document.getElementById("debug");
//    let list = [mainField.field1.button_list, mainField.field1.current_step]
//    but1.value = JSON.stringify(list);
//    console.log(but1.value);
//    console.log("state is written down")

}

//function ready(event) {
//    event.preventDefault();
//    console.log(mainField.button_list_for_python)
//    console.log(mainField) // подивитися як зробити глобальні змінні в джаваскріпт або подивитися як передати мейнфілд в параметр або зробити копію мейнфілд
//    let button = document.getElementById("debug_button")
//    button.addEventListener("submit", on_debug_button);
//}

function canvasSizeSetter() {
    canvas.width = 1200
    canvas.height = 1200
}
document.addEventListener('DOMContentLoaded', function(){
    mainField.fieldInit();
    chooserButton.chooserInit();
    });

visualViewport.onresize = () => {
    canvas.width = window.innerWidth - 5
    canvas.height = window.innerHeight - 5
    mainField.draw()
    chooserButton.chooserDraw();
    }

canvas.addEventListener("mousedown", function(event) {
    if (current_state == 0) {
        chooserButton.fieldReset()
        let is_ship_placed = chooserButton.chooserClickCheker(event);
        if (is_ship_placed === true) {
            on_debug_button(event)
        }
        current_state = chooserButton.fieldStart()
        chooserButton.chooserDraw();
    }
    if (current_state == 1){
    }
    mainField.draw()
    });

canvas.addEventListener("mousemove", function(event) {
    chooserButton.resetHover()
    chooserButton.startHover()
    chooserButton.chooserDraw();
    chooserButton.chooserHover(event);
    mainField.onMouseHover(event)
    mainField.draw()

    });

window.addEventListener("keydown", function(event) {
    // orientation changer on key 'r'
    if (event.keyCode === 82){
        console.log(mainField)
        chooserButton.changeAligment()
    }
})

canvasSizeSetter()



//document.addEventListener("DOMContentLoaded", ready)

//document.getElementById("debug_button").addEventListener("submit", on_debug_button);



