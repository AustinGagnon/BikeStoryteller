


const canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      title = document.getElementById('title'),
      body = document.getElementById('body'),
      Height = canvas.height = 500,
      FPS = 120,
      playerHeight = 250,
      playerWidth = 250,
      avgSkySpeed = -1.5,
      avgStreetSpeed = -4,
      pageCount = 3;


let   Width = canvas.width = window.innerWidth-14,
      road = [],
      background = [],
      cars = [],
      landmarks = [],
      landmarkURL = ['images/UCF.png','images/Naples_LM.png','images/landmark.png'],
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
               title : "About Me",
               body : "One Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet urna aliquam, luctus neque ut, consequat nisi. Vestibulum ac viverra magna, a finibus lorem. Nam pulvinar risus euismod tellus fringilla ullamcorper. Sed sapien augue, iaculis sed orci sed, tempus vulputate lorem. Proin mollis sodales justo, et semper tortor aliquet sed. Aliquam vitae turpis a mi efficitur accumsan. Sed aliquam bibendum congue. Suspendisse condimentum dolor in massa pulvinar, sit amet rhoncus turpis dictum. Nullam pulvinar placerat est quis convallis. Suspendisse potenti. Vivamus cursus dignissim est in ullamcorper. Suspendisse id sagittis massa. Vivamus quis nulla lobortis, blandit libero eu, pharetra erat. Vestibulum ultrices velit vel dolor interdum, et posuere tortor maximus. Vestibulum faucibus diam eget facilisis lacinia. Nullam fermentum ut justo vitae pharetra. Curabitur cursus ex eget aliquam mollis. Curabitur imperdiet accumsan facilisis. Curabitur pharetra et purus vitae ullamcorper. Donec sagittis, mi quis consequat viverra, libero mi aliquam diam, eu ultrices metus nulla vitae augue. Sed viverra dignissim nisi, ac consectetur erat auctor vehicula. Praesent id pretium velit. Nulla sit amet purus volutpat, eleifend nulla eget, consequat erat. Etiam tempus ac tellus eu fermentum. Sed porta enim in diam vulputate sollicitudin. Suspendisse vehicula nisi id pellentesque tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin et luctus urna. Fusce iaculis blandit urna, ac semper diam accumsan ac. Aliquam volutpat vel velit at varius. Aenean eu est quis orci eleifend fringilla. Ut pretium tincidunt nisl ut tempus. Aenean quis ex lacinia, auctor nibh vel, aliquam ipsum. Aliquam varius ac quam nec placerat. Donec nulla nibh, maximus eget porttitor ut, dignissim quis nisi. Nulla sit amet orci in nisi pretium dignissim aliquam ac erat. Nulla facilisi. Nunc vitae vehicula lacus. Vivamus ac elit a orci convallis lobortis. Ut ullamcorper elementum est at condimentum. Aliquam tempor fermentum sem in commodo. Proin auctor semper malesuada. Praesent at nisi ex. Praesent odio lacus, hendrerit condimentum sollicitudin vitae, volutpat ut justo. Duis pellentesque a sapien in rutrum. Donec sed erat pretium, molestie dolor scelerisque, porttitor sem. Quisque sit amet finibus leo, ac ornare velit. Proin auctor tortor dui. Nam sed sem faucibus, aliquam nisi nec, elementum nibh. Nullam suscipit interdum leo a commodo. Fusce tincidunt, dolor sed auctor suscipit, quam est consequat tellus, nec fringilla tortor dui et quam. Sed id ante mauris. Quisque quis pellentesque ipsum, sollicitudin molestie erat."},
            {
               title : "Naples FL",
               body: "Two Vestibulum lobortis consectetur tortor id ultricies. Pellentesque at nibh elit. Nullam volutpat egestas tempor. Sed a pulvinar odio. Integer consequat feugiat erat malesuada finibus. In elit augue, placerat vitae tellus vitae, aliquet imperdiet libero. Fusce elementum nulla tempus, feugiat elit eu, vehicula ante. Nulla sagittis dui nec venenatis pellentesque.Sed feugiat tortor sem, sed aliquet neque vestibulum sit amet. Phasellus consequat efficitur velit sed porta. Curabitur tincidunt vel diam sit amet pulvinar. Donec auctor fermentum lacus id porta. Aenean sollicitudin erat metus, nec volutpat felis tempus nec. Sed at aliquam lacus. Nullam sed iaculis sem, accumsan cursus nibh. Ut et fringilla arcu, non sollicitudin risus. Sed mattis rutrum metus, sit amet mollis purus tristique eu. Morbi aliquam ipsum mauris, non sagittis purus consectetur nec. Mauris cursus orci odio, fringilla sagittis libero rhoncus eu. Aliquam egestas velit placerat nibh hendrerit ullamcorper. Donec pretium lectus sed mauris ultrices pellentesque eget a justo. Cras et tristique enim. Ut scelerisque molestie accumsan. Morbi dolor lorem, mollis sit amet tempus ut, facilisis a neque. In in venenatis magna, id tincidunt orci. Donec egestas interdum blandit. Curabitur ac magna at est sollicitudin vehicula. Vestibulum scelerisque nisi eget neque laoreet consectetur. Sed non semper nisl, id ultricies turpis. Nunc ornare ornare euismod. Fusce non tristique elit, quis aliquam tellus. Sed malesuada leo massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non pretium nunc. Praesent volutpat pretium lectus at posuere. Cras a ipsum augue. Aliquam erat volutpat. Praesent vitae arcu diam. Tempor fermentum sem in commodo. Proin auctor semper malesuada. Praesent at nisi ex. Praesent odio lacus, hendrerit condimentum sollicitudin vitae, volutpat ut justo. Duis pellentesque a sapien in rutrum. Donec sed erat pretium, molestie dolor scelerisque, porttitor sem. Quisque sit amet finibus leo, ac ornare velit. Proin auctor tortor dui. Nam sed sem faucibus, aliquam nisi nec, elementum nibh. Nullam suscipit interdum leo a commodo. Fusce tincidunt, dolor sed auctor suscipit, quam est consequat tellus, nec fringilla tortor dui et quam. Sed id ante mauris. Quisque quis pellentesque ipsum, sollicitudin molestie erat."},
            {
               title : "Passions",
               body: "Three Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet urna aliquam, luctus neque ut, consequat nisi. Vestibulum ac viverra magna, a finibus lorem. Nam pulvinar risus euismod tellus fringilla ullamcorper. Sed sapien augue, iaculis sed orci sed, tempus vulputate lorem. Proin mollis sodales justo, et semper tortor aliquet sed. Aliquam vitae turpis a mi efficitur accumsan. Sed aliquam bibendum congue. Suspendisse condimentum dolor in massa pulvinar, sit amet rhoncus turpis dictum. Nullam pulvinar placerat est quis convallis. Suspendisse potenti. Vivamus cursus dignissim est in ullamcorper. Suspendisse id sagittis massa. Vivamus quis nulla lobortis, blandit libero eu, pharetra erat. Vestibulum ultrices velit vel dolor interdum, et posuere tortor maximus. Vestibulum faucibus diam eget facilisis lacinia. Nullam fermentum ut justo vitae pharetra. Curabitur cursus ex eget aliquam mollis. Curabitur imperdiet accumsan facilisis. Curabitur pharetra et purus vitae ullamcorper. Donec sagittis, mi quis consequat viverra, libero mi aliquam diam, eu ultrices metus nulla vitae augue. Sed viverra dignissim nisi, ac consectetur erat auctor vehicula. Praesent id pretium velit. Nulla sit amet purus volutpat, eleifend nulla eget, consequat erat. Etiam tempus ac tellus eu fermentum. Sed porta enim in diam vulputate sollicitudin. Suspendisse vehicula nisi id pellentesque tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin et luctus urna. Fusce iaculis blandit urna, ac semper diam accumsan ac. Aliquam volutpat vel velit at varius. Aenean eu est quis orci eleifend fringilla. Ut pretium tincidunt nisl ut tempus. Aenean quis ex lacinia, auctor nibh vel, aliquam ipsum. Aliquam varius ac quam nec placerat. Donec nulla nibh, maximus eget porttitor ut, dignissim quis nisi. Nulla sit amet orci in nisi pretium dignissim aliquam ac erat. Nulla facilisi. Nunc vitae vehicula lacus. Vivamus ac elit a orci convallis lobortis. Ut ullamcorper elementum est at condimentum. Aliquam tempor fermentum sem in commodo. Proin auctor semper malesuada. Praesent at nisi ex. Praesent odio lacus, hendrerit condimentum sollicitudin vitae, volutpat ut justo. Duis pellentesque a sapien in rutrum. Donec sed erat pretium, molestie dolor scelerisque, porttitor sem. Quisque sit amet finibus leo, ac ornare velit. Proin auctor tortor dui. Nam sed sem faucibus, aliquam nisi nec, elementum nibh. Nullam suscipit interdum leo a commodo. Fusce tincidunt, dolor sed auctor suscipit, quam est consequat tellus, nec fringilla tortor dui et quam. Sed id ante mauris. Quisque quis pellentesque ipsum, sollicitudin molestie erat."
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
         width : 1400,
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
      lm.x0 += (dvSky / 2) * expoNumTF + expoNum;
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
