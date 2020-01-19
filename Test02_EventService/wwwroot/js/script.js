'use strict';

let form = document.querySelector('.event-form'),
    inputs = form.getElementsByTagName('input'),
    currentTime = document.querySelector('#current-time'),
    eventResult = document.querySelector('#result-event');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let request = new XMLHttpRequest(),
        formData = new FormData(form);
    request.open('POST', '/Home/AddEvent');
    request.send(formData);

    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = null;
    }
    inputs[0].focus();
});

// для начального запуска ровно в 00 секунд
let startSecond = new Date().getSeconds(),
    deltaSecond = (60 - startSecond)*1000;

setTimeout(function run() {
    showResult();
    setTimeout(run, 10000);
}, deltaSecond);

let showResult = function() {
    let request = new XMLHttpRequest();
    request.open('GET', '/Home/GetResult');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    request.addEventListener('readystatechange', function () {
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response); 
            currentTime.textContent = data.time;
            eventResult.value = data.value;
        } else {
            currentTime.textContent = "Произошла ошибка";
        }
    });
};