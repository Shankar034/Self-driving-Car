console.log("This is JS for car");

class Car {
  constructor(x, y, width, height, controlType, maxSpeed=3) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged= false;

    if(controlType != "DUMMY"){

      this.sensor = new Sensor(this);
    }

    this.controls = new Controls(controlType);
  }

  update(roadBorders, traffic) {
    if(!this.damaged){

      this.#move();
      this.polygon=this.#createPolygon();
      this.damaged = this.#assessDamage(roadBorders, traffic);
      // this.sensor.update(roadBorders);
    }
    if(this.sensor){
      
      this.sensor.update(roadBorders, traffic);
    }

  }



  #assessDamage(roadBorders, traffic){
    for(let i= 0; i<roadBorders.length;i++){
      if(polysIntersect(this.polygon, roadBorders[i])){
        return true;
      }
    }
    for(let i= 0; i<traffic.length;i++){
      if(polysIntersect(this.polygon, traffic[i].polygon)){
        return true;
      }
    }
  }

  #createPolygon(){
    const points =[];
    const rad=Math.hypot(this.width, this.height)/2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x:this.x-Math.sin(this.angle-alpha)*rad,
      y:this.y-Math.cos(this.angle-alpha)*rad
    });
    points.push({
      x:this.x-Math.sin(this.angle+alpha)*rad,
      y:this.y-Math.cos(this.angle+alpha)*rad
    });
    points.push({
      x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
      y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
    });
    points.push({
      x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
      y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
    });
    return points;

  }


  #move() {
    if (this.controls.forward) {
      // this.y-=2;
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      // this.y+=2;
      this.speed -= this.acceleration;
    }
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    // if(this.controls.left){
    //     // this.x-=2;
    //     this.angle+=0.03
    // }
    // if(this.controls.right){
    //     // this.x+=2;
    //     this.angle-=0.03
    // }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
    // this.y -= this.speed;
  }
//   draw(ctx) {
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.rotate(-this.angle);
//     ctx.beginPath();
//     ctx.rect(
//       //   this.x - this.width / 2,
//       //   this.y - this.height / 2,
//       -this.width / 2,
//       -this.height / 2,
//       this.width,
//       this.height
//     );
//     ctx.fill();

//     ctx.restore();

//     this.sensor.draw(ctx);
//   }

// }



draw(ctx, color) {

  if(this.damaged){
    ctx.fillStyle = "red"
  }else{
    ctx.fillStyle = color
    
  }

  ctx.beginPath();
  ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
  for(let i = 1; i<this.polygon.length; i++){
    ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
  }
  ctx.fill();
  if(this.sensor){

    this.sensor.draw(ctx);
  }
}

}


