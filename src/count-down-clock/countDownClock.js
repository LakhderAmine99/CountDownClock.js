function CountDownClock(){

    this.run = function(){

        console.log("Countdown clock is up and running...");
    }
}

const setup = () => {

    window.onload = () => {

        window.app = new CountDownClock();
        window.app.run();
    };
};

setup();