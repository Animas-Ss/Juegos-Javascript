console.log("conectado");

//constastes y variables

const colors = ['green', 'red', 'yellow', 'blue'];
let playing =  false;
let level = 0;
let clicks = 0;
let pattern = [];

//funciones
const restart = (() => {
    playing = false;
    level = 0;
    pattern = [];
    document.querySelector('p').innerHTML = 'ANIMAS';
});

const checkSequence = ((color) => {
    if(pattern[clicks] !== color){
        alert('Perdiste');
        restart();
    }
});

const animateClick = ((color, clickClass) => {
        document.getElementById(`${color}`).classList.add(clickClass);
    setTimeout(()=> {
        document.getElementById(`${color}`).classList.remove(clickClass);
    }, 150);
});

const animateSequence = ((idx) => {
    let color = pattern[idx];
    setTimeout(() => {
        document.querySelector('#' + color).animate([{opacity:"0"},{opacity: "1"}],{duration:1000});
        if(++idx < pattern.length){
            animateSequence(idx);
        }
    }, 500);
});

const nextSequence = (() => {
    let idx = Math.floor(Math.random() * 4);
    let newColor = colors[idx];
    pattern.push(newColor);
    document.querySelector('p').innerHTML = `${++level}`;
})

// eventos 
let botones = document.querySelectorAll('.color-btn')

botones.forEach((element) => {
    element.addEventListener('click', (e) => {
        let color = e.target.id;
        let clickClass = color + '-click';
    if(playing){
        animateClick(color, clickClass)
        checkSequence(color);
        if(++clicks === level) {
            clicks = 0;
            nextSequence();
            animateSequence(0);
        }
    }
})
})


document.querySelector('.play-click').addEventListener('click', () => {
    if(!playing) {
        clicks = 0;
        nextSequence();
        animateSequence(0);
        playing = true;
    }
})