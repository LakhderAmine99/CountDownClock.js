import ClockLocalStorage from "../storage/ClockLocalStorage.js";

/**
 * 
 * @module Clock
 * @class
 */
class Clock {

    /**
     * @type {{}} #settings
     */
    #settings = null;

    /**
     * @type {HTMLDivElement[]} #itemsElements
     */
    #itemsElements = [];
    
    /**
     * @type {HTMLElement} #wrapper
     */
    #wrapper = null;

    /**
     * @type {string} #appName
     */
    #appName = "CountDownClock";

    /**
     * @type {string} #appVersion
     */
    #appVersion = "V 1.0.0";

    /**
     * 
     */
    #timeOut = null;

    /**
     * 
     * @param {HTMLElement} wrapper 
     * @param {{}} settings 
     */
    constructor(wrapper,settings){

        this.#appName.concat(this.#appVersion);

        this.#settings = this.load() ? this.load() : settings;

        this.#wrapper = wrapper || document.body;

        this.#createCountDownComponent();
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value 
     * @returns True if the settings successfuly setting up , false otherwise.
     */
    #setSetting(key,value){

        if(key && value){
   
            if(this.#settings.hasOwnProperty(key) && this.#settings[key] !== value){
                
                this.#settings[key] = value;
                return true;
            }
        }

        return false;
    }

    /**
     * 
     * @param {{}} settings 
     */
    setSettings(settings){

        this.#settings = settings;

        this.#setSetting('days',this.#settings['days']);
        this.#setSetting('hours',this.#settings['hours']);
        this.#setSetting('minutes',this.#settings['minutes']);
        this.#setSetting('seconds',this.#settings['seconds']);

        this.save();
    }

    /**
     * 
     */
    #createCountDownComponent(){

        const items = ['days','hours','minutes','seconds'];
        const countDownWrapper = document.createElement('div');
        
        countDownWrapper.classList.add('count-down-clock-wrapper');
        countDownWrapper.classList.add('flex-center');

        let index = null;
        let separator = null;

        for(let item of items){
            
            index = items.indexOf(item);

            this.#itemsElements[index] = document.createElement('div');
            this.#itemsElements[index].classList.add('countdown-item');

            this.#itemsElements[index].setAttribute('data-type',item);
            this.#itemsElements[index].setAttribute('data-reset-value',this.#settings[item]);
            this.#itemsElements[index].setAttribute('data-value',this.#settings[item]);

            this.#itemsElements[index].innerHTML = parseInt(this.#settings[item])<10 ? '0'+this.#settings[item] : this.#settings[item];

            countDownWrapper.appendChild(this.#itemsElements[index]);

            separator = document.createElement('div');
            separator.classList.add('countdown-sep');
            separator.innerHTML = ' : ';

            if(index < items.length - 1)
                countDownWrapper.appendChild(separator);
        }

        this.#wrapper.appendChild(countDownWrapper);
    }

    /**
     * 
     * @param {number} days 
     * @param {number} hours 
     * @param {number} minutes 
     * @param {number} seconds 
     */
    setCountDown(days,hours,minutes,seconds){

        this.#settings.days = days;
        this.#settings.hours = hours;
        this.#settings.minutes = minutes;
        this.#settings.seconds = seconds;

        this.#itemsElements.forEach(item => {

            item.setAttribute('data-value',this.#settings[item.getAttribute('data-type')]);
        });

        this.save();
    }

    /**
     * 
     * @param {number} days 
     */
    setDays(days){

        this.#settings.days = days;

        this.save();
    }

    /**
     * 
     * @param {number} hours 
     */
    setHours(hours){

        this.#settings.hours = hours;

        this.save();
    }

    /**
     * 
     * @param {number} minutes 
     */
    setMinutes(minutes){

        this.#settings.minutes = minutes;

        this.save();
    }

    /**
     * 
     * @param {number} seconds 
     */
    setSeconds(seconds){

        this.#settings.seconds = seconds;

        this.save();
    }

    /**
     * 
     * @returns 
     */
    getCountDown(){

        return {

            days:this.#settings.days,
            hours:this.#settings.hours,
            minutes:this.#settings.minutes,
            seconds:this.#settings.seconds
        };
    }

    /**
     * 
     */
    start(){

        this.#timeOut = window.setInterval(() => this.update(this),1000);
    }

    /**
     * 
     */
    stop(){

        window.clearInterval(this.#timeOut);
    }

    /**
     * 
     */
    reset(){

        this.setCountDown(

            this.#itemsElements[0].getAttribute('data-reset-value'),
            this.#itemsElements[1].getAttribute('data-reset-value'),
            this.#itemsElements[2].getAttribute('data-reset-value'),
            this.#itemsElements[3].getAttribute('data-reset-value')
        );
    }

    /**
     * 
     * @param {this} _this 
     */
    update(_this){

        let seconds = parseInt(_this.#settings.seconds);
        let minutes = parseInt(_this.#settings.minutes);
        let hours = parseInt(_this.#settings.hours);
        let days = parseInt(_this.#settings.days);

        seconds -= 1;
        _this.#itemsElements[3].innerHTML = seconds<10 ? '0'+seconds : seconds;

        if(seconds == 0){

            minutes -= 1;
            seconds = 60;
            _this.#itemsElements[2].innerHTML = minutes<10 ? '0'+minutes : minutes;
            
            if(minutes == 0){
                
                hours -= 1;
                minutes = 60;
                _this.#itemsElements[2].innerHTML = minutes<10 ? '0'+minutes : minutes;
                _this.#itemsElements[1].innerHTML = hours<10 ? '0'+hours : hours;
                
                if(hours == 0){
                    
                    days -= 1;
                    hours = 24;
                    _this.#itemsElements[1].innerHTML = hours<10 ? '0'+hours : hours;
                    _this.#itemsElements[0].innerHTML = days<10 ? '0'+days : days;
                }
            }
        }
        
        _this.setCountDown(days,hours,minutes,seconds);        
    }

    /**
     * 
     * @returns 
     */
    save(){

        return ClockLocalStorage.save(this.#appName,this.#settings);
    }

    /**
     * 
     * @returns 
     */
    load(){

        return ClockLocalStorage.load(this.#appName);
    }

    /**
     * 
     */
    remove(){

        ClockLocalStorage.remove(this.#appName);
    }
}

export default Clock;