/**
 * 
 * @module ClockLocalStorage
 * @class
 */

class ClockLocalStorage {

    constructor(){}

    /**
     * 
     * @param {string} key 
     * @param {string} value 
     * @returns
     */
    static save(key,value){

        try{

            localStorage.setItem(key,JSON.stringify(value));

        }catch(e){

            alert('Error occured while saving new items !',e);
            return false;
        }

        return true;
    }

    /**
     * 
     * @param {string} key 
     * @returns 
     */
    static load(key){

        try{

            return JSON.parse(localStorage.getItem(key));

        }catch(e){

            alert('Error occured while loading items !',e);
        }
    }

    static remove(key){

        localStorage.removeItem(key);
    }
}

export default ClockLocalStorage;