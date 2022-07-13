import CLock from '../src/index.js';

function CountDownClock(){

    this.run = function(){

        console.log("Countdown clock is up and running...");
    }
    
    function init(){

        const settings = {


        }

        let clockCountDown = new CLock(settings);

        clockCountDownMapper(document.querySelectorAll('.countdown-item'),clockCountDown.getCountDown());
    }

    function clockCountDownMapper(uiElements,clockValues){

        uiElements.forEach(element => {

            element.setAttribute('data-value',clockValues[element.getAttribute('data-type')]);
        });
    }
}

const setup = () => {

    window.onload = () => {

        window.app = new CountDownClock();
        window.app.run();
    };
};

setup();