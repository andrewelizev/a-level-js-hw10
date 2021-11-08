// GitHub https://github.com/andrewelizev/a-level-js-hw10

// Lesson 10



const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));
let toggle = true;

const lightRed = document.getElementById('light-red');
const lightYellow = document.getElementById('light-yellow');
const lightGreen = document.getElementById('light-green');

const pedestrianLightRed = document.getElementById('pedestrian-light-red');
const pedestrianLightGreen = document.getElementById('pedestrian-light-green');
const pedestrianLightOnBtn = document.getElementById('btn-pedestrian-light-on');

const redOn = function() { lightRed.classList.add('light-red'); };
const redOff = function() { lightRed.classList.remove('light-red'); };

const yellowOn = function() { lightYellow.classList.add('light-yellow'); };
const yellowOff = function() { lightYellow.classList.remove('light-yellow'); };

const greenOn = function() { lightGreen.classList.add('light-green'); };
const greenOff = function() { lightGreen.classList.remove('light-green'); };

const pedestrianGreenOn = function() { pedestrianLightGreen.classList.add('light-green'); };
const pedestrianGreenOff = function() { pedestrianLightGreen.classList.remove('light-green'); };

const pedestrianRedOn = function() { pedestrianLightRed.classList.add('light-red'); };
const pedestrianRedOff = function() { pedestrianLightRed.classList.remove('light-red'); };


async function trafficLight() {
    while (toggle) {
        redOn();
        await delay(1000);
        redOff();

        yellowOn();
        await delay(1000);
        yellowOff();

        greenOn();
        await delay(1000);
        greenOff();
    }
}

async function pedestrianTrafficLight() {
    pedestrianRedOff();

    pedestrianGreenOn();
    await delay(3000);
    pedestrianGreenOff();

    pedestrianRedOn();
}

async function rulerLights() {
    await domEventPromise(pedestrianLightOnBtn, 'click');
    toggle = false;
    yellowOff();
    greenOff();
    redOn();

    await pedestrianTrafficLight();
    toggle = true;
    trafficLight();
}

function domEventPromise(element, eventName) {
    function handler(resolve, event) {
        return resolve(event);
    }

    return new Promise(function(resolve) {
        return element.addEventListener(eventName, (event) => handler(resolve, event));
    })
        .then((event) => {
            return element.removeEventListener(eventName, handler);
        });
}

domEventPromise(pedestrianLightOnBtn, 'click')
    .then(e => console.log('event click happens', e));

rulerLights();
trafficLight();