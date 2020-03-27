WIDTH = window.screen.width*0.8;
HEIGHT = window.screen.height*0.6;

class Boid{
  constructor() {
    this.position = createVector(random(WIDTH), random(HEIGHT));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.r = 12;
    this.controlDist = 100;
    this.maxSpeed = 4;
    this.maxForce = 1;
  }
  
  cohesion(boids){
    
    let total = 0;
    let avg = createVector();
    
    for(let other of boids) {
      let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      
      if(distance < this.controlDist && other != this){
        avg.add(other.position);
        total++;
      }
    }
    if(total > 0){
      avg.div(total);
      avg.sub(this.position);
      avg.setMag(this.maxSpeed);
      avg.sub(this.velocity);
      avg.limit(this.maxForce);
    }
    return avg;
  }
  
  align(boids){
    
    let total = 0;
    let avg = createVector();
    
    for(let other of boids) {
      let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      
      if(distance < this.controlDist && other != this){
        avg.add(other.velocity);
        total++;
      }
    }
    if(total > 0){
      avg.div(total);
      avg.setMag(this.maxSpeed);
      avg.sub(this.velocity);
      avg.limit(this.maxForce);
    } 
    return avg;
  }
  
  separate(boids){
    
    let total = 0;
    let avg = createVector();
    
    for(let other of boids) {
      let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      
      if(distance < this.controlDist && other != this){
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(distance);
        avg.add(diff);
        total++;
      }
    }
    if(total > 0){
      avg.div(total);
      avg.setMag(this.maxSpeed);
      avg.sub(this.velocity);
      avg.limit(this.maxForce);
    }
    return avg;
  }
  
  flock(boids) {
    let cohesion = this.cohesion(boids);
    let alignment = this.align(boids);
    let separation = this.separate(boids);
    
    cohesion.mult(slider1.value()/20);
    alignment.mult(slider2.value()/20);
    separation.mult(slider3.value()/20);
    
    this.acceleration.add(cohesion);
    this.acceleration.add(alignment);
    this.acceleration.add(separation);
  }
  
  optimizedFlock(boids) {
    let total = 0;
    let coh = createVector();
    let alg = createVector();
    let sep = createVector();
    
    for(let other of boids) {
      let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      
      if(distance < this.controlDist && other != this){
        //Cohesion
        coh.add(other.position);
        //Alignment
        alg.add(other.velocity);
        //Separation
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(distance);
        sep.add(diff);
        
        total++;
      }
    }
    if(total > 0){
      //Cohesion
      coh.div(total);
      coh.sub(this.position);
      coh.setMag(this.maxSpeed);
      coh.sub(this.velocity);
      coh.limit(this.maxForce);
      
      //Alignment
      alg.div(total);
      alg.setMag(this.maxSpeed);
      alg.sub(this.velocity);
      alg.limit(this.maxForce);
      
      //Separation
      sep.div(total);
      sep.setMag(this.maxSpeed);
      sep.sub(this.velocity);
      sep.limit(this.maxForce);
    }
    
    coh.mult(slider1.value()/20);
    alg.mult(slider2.value()/20);
    sep.mult(slider3.value()/20);
    
    this.acceleration.add(coh);
    this.acceleration.add(alg);
    this.acceleration.add(sep);
  }
  
  update(){
    
    if(this.position.x > WIDTH) this.position.x = 0;
    else if(this.position.x < 0) this.position.x = WIDTH;
    
    if(this.position.y > HEIGHT) this.position.y = 0;
    else if(this.position.y < 0) this.position.y = HEIGHT;
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.set(0,0);
  }
  
  show() {
    strokeWeight(1);
    stroke("blue")
    fill("lightBlue");
    circle(this.position.x, this.position.y, this.r);
    
    let target = this.velocity;
    target.setMag(this.r);
    let direction = p5.Vector.add(this.position, target);
  
    stroke("red")
    line(this.position.x, this.position.y, direction.x, direction.y);
  }

}