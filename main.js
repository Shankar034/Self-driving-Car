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
const car = new Car(road.getLaneCenter(1), 100,30, 50,"AI");
// const car = new Car(100, 100,30, 50);
// car.draw(ctx);

const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY", 2)
];



animate();

function generateCars(N){
    
}

function animate(time){
    for (let i=0; i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    //To prvent from collusion itself


    car.update(road.borders, traffic);
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -car.y+ carCanvas.height*0.7);

    road.draw(carCtx);

    for(let i=0; i<traffic.length;i++){
        traffic[i].draw(carCtx,"cyan");
    }
    car.draw(carCtx, "blue");

    carCtx.restore();
    networkCtx.lineDashOffset= -time/50;
    Visualizer.drawNetwork(networkCtx, car.brain)
    requestAnimationFrame(animate);
}