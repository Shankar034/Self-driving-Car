console.log("This is Moving Car Project");

const carCanvas = document.getElementById("carCanvas");

const networkCanvas = document.getElementById("networkCanvas");

carCanvas.width=200;
networkCanvas.width=300;
// canvas.height = window.innerHeight;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
//x =100, y=100, w=30, h=50 

const road = new Road(carCanvas.width/2, carCanvas.width*0.9)
// const car = new Car(road.getLaneCenter(1), 100,30, 50,"AI");


const N=200;
const cars = generateCars(N);
let bestCar= cars[0];



if(localStorage.getItem("bestBrain")){
    for(let i=0; i<cars.length;i++){

        bestCar.brain = JSON.parse(
            localStorage.getItem("bestBrain"));
            if(i!=0){
                NeuralNetwork.mutate(cars[i].brain,0.2);
            }
    }
}

// const car = new Car(100, 100,30, 50);
// car.draw(ctx);

const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(2),-400,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(1),-800,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(0),-600,30,50,"DUMMY", 2),
    new Car(road.getLaneCenter(2),-900,30,50,"DUMMY", 2)
    
];



animate();

//function for the car which passes traffic

function save(){
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i =1; i<=N; i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"))
    }
    return cars;

}

function animate(time){
    for (let i=0; i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    //To prvent from collusion itself

    for(let i = 0; i<cars.length; i++ ){
        cars[i].update(road.borders, traffic);
    }

    // car.update(road.borders, traffic);


    bestCar = cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    // carCtx.translate(0, -cars[0].y+ carCanvas.height*0.7);
    carCtx.translate(0, -bestCar.y+ carCanvas.height*0.7);

    road.draw(carCtx);

    for(let i=0; i<traffic.length;i++){
        traffic[i].draw(carCtx,"cyan");
    }
    


    carCtx.globalAlpha = 0.2;
    for(let i = 0; i<cars.length; i++ ){

        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue",true);
    // cars[0].draw(carCtx, "blue",true);

    carCtx.restore();
    networkCtx.lineDashOffset= -time/50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain)
    // Visualizer.drawNetwork(networkCtx, cars[0].brain)
    requestAnimationFrame(animate);
}