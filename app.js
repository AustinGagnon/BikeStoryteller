


const canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      title = document.getElementById('title'),
      body = document.getElementById('body'),
      Height = canvas.height = 500,
      FPS = 120,
      playerHeight = 250,
      playerWidth = 250,
      avgSkySpeed = -1.5,
      avgStreetSpeed = -2,
      pageCount = 3;


let   Width = canvas.width = window.innerWidth-14,
      road = [],
      background = [],
      cars = [],
      landmarks = [],

      landmarkURL = ['images/2.png','images/4.png','images/5.png'],

      frame = 0;
      vSky = 0,
      dvSky = avgSkySpeed,
      vStreet = 0,
      dvStreet = avgStreetSpeed,
      onTimeout = true,
      landmarkBuffer = true;
      bikeSpeed = 70, //Higer is slower
      choice = null,
      counter = 0,
      character = [],
      pedal = true,
      pedalOff= false,
      expoNum = 0,
      expoNum1 = 0,
      expoNumTF = 1,
      expoChar = false;

const pages = [{
               title : "",
               body : "Left Click early to get a boost into the next scene."},
            {
               title : "",
               body: ""},
            {
               title : "",
               body: ""
            }];



let player = {
   img : null,
   x0 : -16000,
   y0 : 370,
   x1 : 50,
   y1 : 370,
};




// SCENE END //////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// SCENE START ////////////////////////////////////////////////////////////////////////////////

function initScroll(bg_URL, floor_URL) {
   road.push(new Image());
   road.push(new Image());
   background.push(new Image());
   background.push(new Image());

   // Format road segments
   for (let i = 0; i < road.length; i++){
      let r = road[i];
      r.onload = function() {
         context.drawImage(r , Width * i , 0 , Width , Height);
      }
   }
   // Format Background segments
   for (let i = 0; i < background.length; i++){
      let b = background[i]
      b.onload = function() {
         context.drawImage(b , Width * i , 0 , Width , Height);
      }
   }
   for (let i = 0; i < road.length; i++){
      road[i].src = floor_URL;
   }
   for (let i = 0; i < background.length; i++){
      background[i].src = bg_URL;
   }

}

function updateScroll() {
      vStreet += dvStreet;
      vSky += dvSky;
      if (Math.abs(vStreet)>= Width){
         vStreet = 0;
      }
      if(Math.abs(vSky) >= Width){
         vSky = 0;
      }
}

function renderSky() {
   for(let i = 0; i < background.length; i++){
      let b = background[i];
      context.drawImage(b,(Width * i) + vSky,0,canvas.width, canvas.height);
   }
}

function renderRoad() {
   for(let i = 0; i < road.length; i++){
      let r = road[i];
      context.drawImage(r,(Width * i) + vStreet,0,canvas.width,canvas.height);
   }
}

function updateSpeed(){
   if (!onTimeout){
      var proportion = player.x0/ (Width*.5);
      dvSky = avgSkySpeed + (avgSkySpeed * proportion * 2) - expoNum1;
      dvStreet = avgStreetSpeed + (avgStreetSpeed * proportion * 2) - expoNum1;
   }
}

// SCENE END //////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// CHARACTER START ////////////////////////////////////////////////////////////////////////////////


function initCharacter(url) {
   character.push(new Image());
   character.push(new Image());
   character.push(new Image());
   for (var i = 0; i < character.length; i++) {
      var c = character[i];
      c.onload = function() {
         context.drawImage(c,Width/16,0,playerWidth,playerHeight)
      }
      c.src = url[i];
   }
}

function updateCharacter(){
   let dY = (player.y1-player.y0),
       dX = (player.x1-player.x0);
   player.x0 += (dX / bikeSpeed)+expoNum1;
   if (player.x0 > Width - player.width){
      player.x0 = Width - player.width;
   }

   if (player.y0 >= Height * .6){
      player.y0 += dY / bikeSpeed;
   } else if (player.y0 > Height - playerHeight){
      player.y0 = Height - playerHeight - 1;
   } else {
      player.y0 = Height *.6;
      player.y1 = Height *.6;
   }

}

function expoCharacter() {
   if (landmarks.length > 0){
      var l = landmarks[0];
      expoNum1 = ((Width - player.x0 - playerWidth) / FPS)
      expoChar = true;
      setTimeout(()=>{expoNum1 = 0; expoChar = false}, 650);
   }
}

function renderCharacter() {
   // console.log(player.x0);
   frame += .14 + (.1 * (player.x0 / Width))
   if (player.x1 - player.x0 > -50 && Math.sin(frame) > 0 && !expoChar){
   // if (player.x1 - player.x0 > 0 && Math.sin((frame * .25) * (player.x1 - player.x0)/Width) > 0){
      context.drawImage(character[1],player.x0, player.y0 - (playerHeight / 2), playerWidth, playerHeight);
   } else if (expoChar) {
      context.drawImage(character[2],player.x0, player.y0 - (playerHeight / 2), playerWidth, playerHeight);

   } else {
      context.drawImage(character[0],player.x0, player.y0 - (playerHeight / 2), playerWidth, playerHeight);
   }

}

// CHARACTER END //////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// CARS START /////////////////////////////////////////////////////////////////////////////////////

function initCars(url){

   cars.push({
      img : new Image(),
      x0 : Width,
      y0 : 215,
      x1 : Width + 15,
      y1 : 235,
      width : 400,
      height: 200,
   });
   cars.push({
      img : new Image(),
      x0 : -1200,
      y0 : 295,
      x1 : -1215,
      y1 : 235,
      width : 400,
      height: 200,
   });

   for (var i = 0; i < cars.length; i++) {
      var c =cars[i];
      c.img.onload = function(){
         context.drawImage(c.img, 0, 215,c.width,c.height);
      }
      c.img.src = url[i];
      c.img.style.position = 'absolute';
   }
}

function updateCars() {
   for (var i = 0; i < cars.length; i++){
      let c = cars[i],
          temp = c.x0;
      if (c.x0 > -2500 && c.x0 <2500){
         c.x0 += (c.x0 - c.x1);
         c.x1 = temp;
         c.img.style.zIndex = c.z;
      }
   }
}

function renderCars() {
   for(let i = 0; i < cars.length; i++){
      let c = cars[i];
      context.drawImage(c.img,c.x0,c.y0,c.width,c.height)
   }
}

// CARS END ///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// LANDMARKS START ////////////////////////////////////////////////////////////////////////////////

function initLandmark(url) {

      landmarks.push({
         img : new Image(),
         x0 : Width + 100,
         y0 : 0,

         width : 5400,

         height: 365,
      });
      var l = landmarks
      l[l.length-1].img.onload = function(){
         context.drawImage(l[l.length-1].img,l[l.length-1].x0,l[l.length-1].y0,l[l.length-1].width,l[l.length-1].height)
      }
      l[l.length-1].img.src = url
}

function updateLandmark() {
   console.log(landmarks.length);
   if (landmarks.length >= 1){
      var lm = landmarks[0];
      lm.x0 += (.7 * dvSky) * expoNumTF + expoNum;
   }
}

function expoLandmark() {
   // FPS = 120
   // TD = Total Distance needed to travel => l.x0 + l.width
   // TD / FPS (Chunk )
   if (landmarks.length > 0 && landmarkBuffer){
      var l = landmarks[0];
      expoNum = -1 * (l.x0 + l.width) / (FPS / 2);
      expoNumTF = 0;
      setTimeout(()=>{expoNum = 0}, 500);
      landmarkBuffer = false;
      // onTimeout = true;
      setTimeout(()=>{
         landmarkBuffer = true;
         onTimeout = false
         expoNumTF = 1;
      },1020);
   }

}

function renderLandmark() {
   if (landmarks.length > 0){
      var l = landmarks[0];
      context.drawImage(l.img,l.x0,l.y0,l.width,l.height);
      // If landmark leaves screen
      if (l.x0 < 0 - l.width-1){
      // remove from array
         landmarks.shift()
      }
   }
}

// LANDMARKS END //////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// USER CONTROL START /////////////////////////////////////////////////////////////////////////////

function mouseXY(e) {
   if (!onTimeout){
      player.x1 = e.screenX;
      player.y1 = e.screenY;
      console.log(player.x1, player.y1);
      if (player.y1 < Height * .6){
         player.y1 = Height * .6;
      }
   }
}

function updateCircles() {
   let mid = Width / 2;
   // if ()

}



function choice1() {
   if (!onTimeout){
      title.innerHTML = pages[counter].title;
      body.innerHTML = pages[counter].body;
      expoLandmark();
      expoCharacter();
      initLandmark(landmarkURL[counter])
      counter++;
      counter = counter % pageCount;
   }
}

function init() {
   canvas.addEventListener('click',choice1);
   initScroll('images/clouds.png','images/street.png');
   initCars(['images/CarRed.png','images/CarBlue.png']);
   initCharacter(['images/bike1b.png','images/bike1.png','images/bike2.png']);
   // initLandmark(landmarkURL[0]);
   setInterval(update,1000/FPS);
   //Wait 3 seconds before giving user control
   setTimeout(()=>{onTimeout = false},1000*3)
}

function update() {
   // frame++;
   Width = canvas.width = window.innerWidth-14
   context.clearRect(0,0,Width,Height);
   updateScroll();
   updateCars();
   updateCharacter();
   updateSpeed();
   updateLandmark();
   // updateCircles();
   renderSky();
   renderSky();
   renderLandmark()
   renderLandmark()
   renderRoad();
   renderRoad();
   renderCars();
   renderCars();
   // renderCircles();
   renderCharacter();

}

init();
