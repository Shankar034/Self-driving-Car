console.log("This is Moving Car Project");

const canvas = document.getElementById("myCanvas");
canvas.width=200;
// canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
//x =100, y=100, w=30, h=50 
const car = new Car(100, 100,30, 50);
car.draw(ctx);


animate();

function animate(){
    car.update();
    canvas.height = window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate);
}