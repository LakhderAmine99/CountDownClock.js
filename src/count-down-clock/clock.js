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
     * @type {HTMLDivElement[]} #settingsMenuLabels
     */
    #settingsMenuLabels = [];

    /**
     * @type {HTMLDivElement[]} #editableItemsElements
     */
    #editableItemsElements = [];

    /**
     * @type {HTMLDivElement[]} #optionalSettingsElements
     */
    #optionalSettingsElements = [];

    /**
     * @type {HTMLDivElement[]} #controlSettingsElements
     */
    #controlSettingsElements = [];

    /**
     * @type {HTMLElement} #settingsPanelWrapper
     */
    #settingsPanelWrapper = null;
    
    /**
     * @type {HTMLElement} #wrapper
     */
    #wrapper = null;

    /**
     * @type {HTMLElement} #clockDownWrapper
     */
    #countDownWrapper = null;

    /**
     * @type {string} #appName
     */
    #appName = "CountDownClock";

    /**
     * @type {string} #appVersion
     */
    #appVersion = "V 1.0.0";

    /**
     * @type {number} #timeOut
     */
    #timeOut = null;

    /**
     * @type {boolean} #isStarted
     */
    #isStarted = false;

    /**
     * @type {boolean} #isStateChanged
     */
    #isStateChanged = false;

    /**
     * @type {HTMLDivElement} #hidePanelElement
     */
    #hidePanelElement = null;

    /**
     * 
     * @param {HTMLElement} wrapper 
     * @param {{}} settings 
     */
    constructor(wrapper,settings){

        this.#appName.concat(this.#appVersion);

        this.#settings = this.#load() ? this.#load() : settings;

        this.#wrapper = wrapper || document.body;

        this.#initComponents();
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

        this.#save();
    }

    /**
     * 
     */
    #initComponents(){

        this.#createCountDownComponent();
        this.#createSettingsMenuComponent('Edit Timer','Controls','Visual Options');

        this.#createSettingsPanelWrapperComponent();

        this.#createSettingComponent('input',this.#editableItemsElements,['days','hours','minutes','seconds'],{

            title:'Edit Timer',
            childClass:'option-item',
            subChildClass:'editable-item'
        });

        this.#createSettingComponent('div',this.#controlSettingsElements,['start','stop','reset'],{

            title:'Controls',
            childClass:'option-item',
            subChildClass:'control-item'
        });

        this.#createSettingComponent('div',this.#optionalSettingsElements,['opacity','color','size'],{

            title:'visual Options',
            childClass:'option-item',
            subChildClass:'control-item'
        });

        this.#connectEventListeners();
    }

    /**
     * 
     * @param {string} elementType 
     * @param {HTMLElement} elements 
     * @param {[]} labels 
     * @param {{}} componentSettings 
     */
    #createSettingComponent(elementType,elements,labels,componentSettings){

        const itemsWrapper = document.createElement('div');

        itemsWrapper.classList.add('items-wrapper','flex-center','hide');

        const wrapperTitle = document.createElement('div');

        wrapperTitle.classList.add('panel-title');
        wrapperTitle.innerHTML = componentSettings.title;

        itemsWrapper.appendChild(wrapperTitle);

        let index = null;

        for(let label of labels){

            index = labels.indexOf(label);

            elements[index] = document.createElement(elementType);

            elements[index].setAttribute('data-option',label);

            if(elementType === 'input'){

                elements[index].value = this.#itemsElements[index].innerHTML;
            
            }else{

                elements[index].innerHTML = label;
            }

            elements[index].classList.add(componentSettings.childClass,componentSettings.subChildClass);

            itemsWrapper.appendChild(elements[index]);
        }
        
        this.#wrapper.appendChild(this.#hidePanelElement);
        this.#settingsPanelWrapper.appendChild(itemsWrapper);
    }

    /**
     * 
     */
    #createCountDownComponent(){

        const items = ['days','hours','minutes','seconds'];

        this.#countDownWrapper = document.createElement('div');
        this.#countDownWrapper.classList.add('count-down-clock-wrapper','flex-center');

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

            this.#countDownWrapper.appendChild(this.#itemsElements[index]);

            separator = document.createElement('div');
            separator.classList.add('countdown-sep');
            separator.innerHTML = ' : ';

            if(index < items.length - 1)
            this.#countDownWrapper.appendChild(separator);
        }

        this.#wrapper.appendChild(this.#countDownWrapper);
    }

    /**
     * 
     */
    #createSettingsPanelWrapperComponent(){

        this.#settingsPanelWrapper = document.createElement('div');
        this.#settingsPanelWrapper.classList.add('setting-panel','hide');

        this.#hidePanelElement = document.createElement('div');
        this.#hidePanelElement.classList.add('btn','hide-btn','flex-center','hide');
        this.#hidePanelElement.innerHTML = '+';

        this.#wrapper.appendChild(this.#settingsPanelWrapper);
    }

    /**
     * @param {string} labels
     */
    #createSettingsMenuComponent(...labels){

        const settingsWrapper = document.createElement('div');
        settingsWrapper.classList.add('settings-wrapper','flex-center');

        let index = null;

        for(let label of labels){

            index = labels.indexOf(label);

            this.#settingsMenuLabels[index] = document.createElement('div');
            this.#settingsMenuLabels[index].classList.add('setting-label','flex-center');
            this.#settingsMenuLabels[index].setAttribute('data-menu',label);
            this.#settingsMenuLabels[index].innerHTML = label;

            settingsWrapper.appendChild(this.#settingsMenuLabels[index]);
        }

        this.#wrapper.prepend(settingsWrapper);
    }

    /**
     * 
     */
    #connectEventListeners(){

        this.#settingsMenuLabels.forEach(label => label.addEventListener('click',(e) => this.#handlePanelVisibilty(e),false));
        this.#hidePanelElement.addEventListener('click',(e) => this.#handleHidingPanel(e),false);

        this.#controlSettingsElements.forEach(element => element.addEventListener('click',(e) => this.#handleControlSettings(e),false));
        this.#optionalSettingsElements.forEach(element => element.addEventListener('click',(e) => this.#handleOptionSettings(e),false));
        this.#editableItemsElements.forEach(element => element.addEventListener('input',(e) => this.#handleEditableSettings(e),false));
        this.#editableItemsElements.forEach(element => element.addEventListener('focusout',(e) => this.#handleFocusOutEditableSettings(e),false));
    }

    /**
     * 
     * @param {Event} e 
     */
    #handlePanelVisibilty(e){

        let menu = e.target.getAttribute('data-menu');

        if(this.#settingsPanelWrapper.classList.contains('hide')){

            this.#settingsPanelWrapper.classList.remove('hide');
        }

        if(this.#hidePanelElement.classList.contains('hide')){

            this.#hidePanelElement.classList.remove('hide');
        }

        switch(menu){

            case 'Edit Timer':

                this.#settingsPanelWrapper.children[0].classList.remove('hide');
                this.#settingsPanelWrapper.children[1].classList.add('hide');
                this.#settingsPanelWrapper.children[2].classList.add('hide');
                
                window.setTimeout(() => {

                    this.#settingsPanelWrapper.children[0].classList.add('fade-in');

                },400);

            break

            case 'Controls':

                if(this.#isStarted){

                    this.#controlSettingsElements[0].classList.add('selected','start');
                    this.#controlSettingsElements[1].classList.remove('selected','stop');
                }else{
                    this.#controlSettingsElements[1].classList.add('selected','stop');
                    this.#controlSettingsElements[0].classList.remove('selected','start');
                }
                    
                this.#settingsPanelWrapper.children[0].classList.add('hide');
                this.#settingsPanelWrapper.children[1].classList.remove('hide');
                this.#settingsPanelWrapper.children[2].classList.add('hide');

                window.setTimeout(() => {

                    this.#settingsPanelWrapper.children[1].classList.add('fade-in');

                },400);

            break

            case 'Visual Options':
            
                this.#settingsPanelWrapper.children[0].classList.add('hide');
                this.#settingsPanelWrapper.children[1].classList.add('hide');
                this.#settingsPanelWrapper.children[2].classList.remove('hide');

                window.setTimeout(() => {

                    this.#settingsPanelWrapper.children[2].classList.add('fade-in');

                },400);

            break
        }
    }

    /**
     * 
     */
    #handleHidingPanel(e){

        let target = e.target;

        target.classList.add('hide');
        this.#settingsPanelWrapper.classList.add('hide');
    }

    /**
     * 
     * @param {Event} e 
     */
    #handleControlSettings(e){

        let target = e.target;
        let option = target.getAttribute('data-option');
        let firstSiblingChild = target.parentElement.children[0];

        if(option !== 'reset'){

            while(firstSiblingChild){
                
                if(firstSiblingChild.classList.contains('selected')){
                    
                    firstSiblingChild.classList.remove('selected');

                    if(option === 'stop')
                        firstSiblingChild.classList.remove('start');
                    else
                        firstSiblingChild.classList.remove('stop');
                }
                
                firstSiblingChild = firstSiblingChild.nextSibling;
            }

            target.classList.add('selected',option);
        }

        switch(option){

            case 'start':

                if(!this.#isStarted)
                    this.start();

            break;

            case 'stop':

                if(this.#isStarted)
                    this.stop();

            break;

            case 'reset':
                this.reset();
            break
        }
    }

    /**
     * 
     * @param {*} e 
     */
    #handleOptionSettings(e){
        /**
         * @todo
         */
    }

    /**
     * 
     * @param {*} e 
     */
    #handleEditableSettings(e){

        let target = e.target;
        let option = target.getAttribute('data-option');
        let value = parseInt(target.value)<=0 || isNaN(parseInt(target.value)) ? 1 : parseInt(target.value);

        this.stop();

        switch(option){

            case 'days':
                this.setDays(value<100 ? value : 90);
            break;

            case 'hours':
                this.setHours(value<=24 ? value : 24);
            break;

            case 'minutes':
                this.setMinutes(value<=60 ? value : 60);
            break;

            case 'seconds':
                this.setSeconds(value<=60 ? value : 60);
            break;
        }

        target.value = value;
        this.#isStateChanged = true;
    }

    /**
     * 
     */
    #handleFocusOutEditableSettings(){

        if(!this.#isStarted){

            this.start();
        }
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
                
        this.#editableItemsElements.forEach(item => {
                
            item.setAttribute('data-value',this.#settings[item.getAttribute('data-option')]);
                
            item.value = item.getAttribute('data-value');
        });

        this.#save();
    }

    /**
     * 
     * @param {number} days 
     */
    setDays(days){

        this.#settings.days = days;

        this.#save();
    }

    /**
     * 
     * @param {number} hours 
     */
    setHours(hours){

        this.#settings.hours = hours;

        this.#save();
    }

    /**
     * 
     * @param {number} minutes 
     */
    setMinutes(minutes){

        this.#settings.minutes = minutes;

        this.#save();
    }

    /**
     * 
     * @param {number} seconds 
     */
    setSeconds(seconds){

        this.#settings.seconds = seconds;

        this.#save();
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

        this.#isStarted = true;
        this.#countDownWrapper.classList.remove('stopped');
        this.#timeOut = window.setInterval(() => this.#update(this),1000);
    }

    /**
     * 
     */
    stop(){

        this.#isStarted = false;
        this.#countDownWrapper.classList.add('stopped');
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
    #update(_this){

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

        if(this.#isStateChanged){

            _this.#itemsElements[3].innerHTML = seconds<10 ? '0'+seconds : seconds;
            _this.#itemsElements[2].innerHTML = minutes<10 ? '0'+minutes : minutes;
            _this.#itemsElements[1].innerHTML = hours<10 ? '0'+hours : hours;
            _this.#itemsElements[0].innerHTML = days<10 ? '0'+days : days;

            this.#isStateChanged = false;
        }
        
        _this.setCountDown(days,hours,minutes,seconds);        
    }

    /**
     * 
     * @returns 
     */
    #save(){

        return ClockLocalStorage.save(this.#appName,this.#settings);
    }

    /**
     * 
     * @returns 
     */
    #load(){

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