let pendulum1;
let pendulum2;
let pendulum3;
let pendulum4;
let pendulum5;
let initialDraw = true;

const angelToRadiansConversion = {
    30: 3.141592653589793 / 6,
    45: 3.141592653589793 / 4,
    60: 3.141592653589793 / 3,
    120: -3.141592653589793 / 6,
    135: -3.141592653589793 / 4,
    150: -3.141592653589793 / 3
}


function setup() {
    noLoop();
    createCanvas(850, 600);
    frameRate(10);
    // Make a new Pendulum with an origin position and armlength
    pendulum1 = new Pendulum(100, 0, 105, PI / 8, 5, 'one');
    pendulum2 = new Pendulum(300, 0, 300, -PI / 4, 1, 'two');
    pendulum3 = new Pendulum(450, 0, 105, -PI / 4, 1.5, 'three');
    pendulum4 = new Pendulum(600, 0, 105, PI / 8, 1.5, 'four');
    pendulum5 = new Pendulum(750, 0, 500, -PI / 8, 8, 'five');

    initializePendulums([pendulum1, pendulum2, pendulum3, pendulum4, pendulum5])
}

function draw() {
    background(51);
    if (!initialDraw) {
        pendulum1.updateCoordinates()
            .then(() => pendulum1.display())
            .catch((err) => console.log(`Error while updating pendulum1: ${err}`));
        pendulum2.updateCoordinates()
            .then(() => pendulum2.display())
            .catch((err) => console.log(`Error while updating pendulum2: ${err}`));
        pendulum3.updateCoordinates()
            .then(() => pendulum3.display())
            .catch((err) => console.log(`Error while updating pendulum3: ${err}`));
        pendulum4.updateCoordinates()
            .then(() => pendulum4.display())
            .catch((err) => console.log(`Error while updating pendulum4: ${err}`));
        pendulum5.updateCoordinates()
            .then(() => pendulum5.display())
            .catch((err) => console.log(`Error while updating pendulum5: ${err}`));
    }
}

function pause() {
    noLoop();
}

function resume() {
    loop();
}

function updatePendulums() {
    let angel1 = document.getElementById('angle1').value;
    let armLength1 = document.getElementById('arm1').value;
    let mass1 = document.getElementById('mass1').value;
    pendulum1 = new Pendulum(100, 0, armLength1, angelToRadiansConversion[angel1], parseInt(mass1), 'one');

    let angel2 = document.getElementById('angle2').value;
    let armLength2 = document.getElementById('arm2').value;
    let mass2 = document.getElementById('mass2').value;
    pendulum2 = new Pendulum(300, 0, armLength2, angelToRadiansConversion[angel2], parseInt(mass2), 'two');

    let angel3 = document.getElementById('angle3').value;
    let armLength3 = document.getElementById('arm3').value;
    let mass3 = document.getElementById('mass3').value;
    pendulum3 = new Pendulum(450, 0, armLength3, angelToRadiansConversion[angel3], parseInt(mass3), 'three');

    let angel4 = document.getElementById('angle4').value;
    let armLength4 = document.getElementById('arm4').value;
    let mass4 = document.getElementById('mass4').value;
    pendulum4 = new Pendulum(600, 0, armLength4, angelToRadiansConversion[angel4], parseInt(mass4), 'four');

    let angel5 = document.getElementById('angle5').value;
    let armLength5 = document.getElementById('arm5').value;
    let mass5 = document.getElementById('mass5').value;
    pendulum5 = new Pendulum(750, 0, armLength5, angelToRadiansConversion[angel5], parseInt(mass5), 'five');

    initializePendulums([pendulum1, pendulum2, pendulum3, pendulum4, pendulum5])
}

function initializePendulums(pendulums) {
    try {
        const promise0 = initializePendulum(pendulum1);
        const promise1 = initializePendulum(pendulum2);
        const promise2 = initializePendulum(pendulum3);
        const promise3 = initializePendulum(pendulum4);
        const promise4 = initializePendulum(pendulum5);
        Promise.all([promise0, promise1, promise2, promise3, promise4]).then(() => {
            initialDraw = false, loop();
        }).catch((error) => console.log(`Error while initializing pendulums: ${error}`))
    } catch (error) {
        console.log(error);
    }
}
