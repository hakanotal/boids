boids = [];
let slider1, slider2, slider3, button;

function reset() {
  boids.splice(0, boids.length);
  for(i=0; i<150; i++) boids.push(new Boid());  
}

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT); 
  cnv.center();
  
  slider1 = select("#cohesion");
  slider2 = select("#alignment");
  slider3 = select("#separation");
  button = select("#reset");
  button.mousePressed(reset);
  
  reset();
}

function draw() {
  background("lightGray");
  
  for(let boid of boids){
    //boid.flock(boids);
    boid.optimizedFlock(boids);
  }
  for(let boid of boids){
    boid.update();
    boid.show();
  }
  
}