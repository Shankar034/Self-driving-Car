console.log("This is Moving Car Project");

const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width=200;

const ctx = canvas.getContext("2d");
//x =100, y=100, w=30, h=50 
const car = new Car(100, 100,30, 50);
car.draw(ctx);


animate();

function animate(){
    car.update();
    car.draw(ctx);
    requestAnimationFrame(animate);
}