import CLock from '../src/index.js';

function CountDownClock(){

    this.run = function(){

        console.log("Countdown clock is up and running...");

        init();
    }
    
    function init(){

        const wrapper = document.querySelector('.wrapper');

        // const settings = {

        //     days:12,
        //     hours:11,
        //     minutes:1,
        //     seconds:5
        // }

        let clockCountDown = new CLock(wrapper);

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