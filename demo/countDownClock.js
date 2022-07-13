import CLock from '../src/index.js';

function CountDownClock(){

    this.run = function(){

        console.log("Countdown clock is up and running...");

        init();
    }
    
    function init(){

        const wrapper = document.querySelector('.wrapper');

        const settings = {

            days:15,
            hours:11,
            minutes:12,
            seconds:45
        }

        let clockCountDown = new CLock(wrapper,settings);

        clockCountDown.startCountDown();
    }
}

const setup = () => {

    window.onload = () => {

        window.app = new CountDownClock();
        window.app.run();
    };
};

setup();