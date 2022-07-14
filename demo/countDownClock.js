import CLock from '../src/index.js';

function CountDownClock(){

    this.run = function(){

        console.log("Countdown clock is up and running...");

        init();
    }
    
    function init(){

        const wrapper = document.querySelector('.wrapper');

        const settings = {

            days:1,
            hours:1,
            minutes:1,
            seconds:5
        };

        let clockCountDown = new CLock(wrapper,settings);

        clockCountDown.start();
    }
}

const setup = () => {

    window.onload = () => {

        window.app = new CountDownClock();
        window.app.run();
    };
};

setup();