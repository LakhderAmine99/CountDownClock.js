# CountDownClock.js

A simple javascript count down template , component to reuse it in your applications.

## How To Use

- Get the wrapper elements for your clock count down:

if the wrapper is not specified then the document body will be selected as a wrapper.

``` javascript

const wrapper = document.querySelector('.wrapper');

```

- Setup the settings object ( this will be modified in future updates ):

``` javascript

const settings = {

    days:1,
    hours:1,
    minutes:1,
    seconds:5
};

```

- You can just forget about the settings object and set settings by your self after constructing the Clock object:

``` javascript

let clockCountDown = new CLock(wrapper,settings);

```

Or just use this ( you can also set the settings outside of the constructor ):

``` javascript

let clockCountDown = new CLock(wrapper);

clockCountDown.setDays(15);
clockCountDown.setHours(15);
clockCountDown.setMinutes(15);
clockCountDown.setSeconds(15);

// You can use the settings setter:

clockCountDown.setSettings(settings);

```

## Preview

## Authors