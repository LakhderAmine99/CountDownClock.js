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
     * @param {HTMLElement} wrapper 
     * @param {{}} settings 
     */
    constructor(wrapper,settings){

        this.#appName.concat(this.#appVersion);

        this.#settings = settings || this.load();
        this.#wrapper = wrapper || document.body;
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value 
     * @returns True if the settings successfuly setting up , false otherwise.
     */
    setSetting(key,value){

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
     */
    #createCountDownComponent(){

        /** @todo */
    }

    /**
     * 
     * @param {number} days 
     * @param {number} hours 
     * @param {number} minutes 
     * @param {number} seconds 
     */
    setCountDown(days,hours,minutes,seconds){

        this.#settings.days = days || '00';
        this.#settings.hours = hours || '00';
        this.#settings.minutes = minutes || '00';
        this.#settings.seconds = seconds || '00';

        return this.save();
    }

    /**
     * 
     * @param {number} days 
     * @returns 
     */
    setDays(days){

        this.#settings.days = days || '00';

        return this.save();
    }

    /**
     * 
     * @param {number} hours 
     * @returns 
     */
    setHours(hours){

        this.#settings.hours = hours || '00';

        return this.save();
    }

    /**
     * 
     * @param {number} minutes 
     * @returns 
     */
    setMinutes(minutes){

        this.#settings.minutes = minutes || '00';

        return this.save();
    }

    /**
     * 
     * @param {number} seconds 
     * @returns 
     */
    setSeconds(seconds){

        this.#settings.seconds = seconds || '00';

        return this.save();
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
     * @param {{}} itemsValues
     */
    mapCountDown(itemsValues){

        /** @todo */
    }

    /**
     * 
     */
    startCountDown(){
        
        /** @todo */
    }

    /**
     * 
     */
    stopCountDown(){

        /** @todo */
    }

    /**
     * 
     */
    resetCountDown(){

        /** @todo */
    }

    /**
     * 
     */
    updateCountDown(){

        /** @todo */
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
}

export default Clock;