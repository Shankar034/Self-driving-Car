console.log("This is Moving Car Project");

const canvas = document.getElementById("myCanvas");
canvas.width=200;
// canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
//x =100, y=100, w=30, h=50 

const road = new Road(canvas.width/2, canvas.width*0.9)
const car = new Car(road.getLaneCenter(1), 100,30, 50,"KEYS");
// const car = new Car(100, 100,30, 50);
// car.draw(ctx);

const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY", 2)
];



animate();

function animate(){
    for (let i=0; i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    //To prvent from collusion itself


    car.update(road.borders, traffic);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y+ canvas.height*0.7);

    road.draw(ctx);

    for(let i=0; i<traffic.length;i++){
        traffic[i].draw(ctx,"cyan");
    }
    car.draw(ctx, "blue");

    ctx.restore();
    requestAnimationFrame(animate);
}