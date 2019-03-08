//---------------------------------------------------------------------------------------
// drawPac
// Draws Pac-Man at (x,y) with mouth pointed in (direction). (state) is one of the
// constants mouthOpen, mouthHalfOpen, or mouthClosed, for animation.
//---------------------------------------------------------------------------------------
function drawPac(x, y, direction = right, state = mouthOpen) {
  x = rangeCheckX(x);
  y = rangeCheckY(y);

  debuggingOutput("Erasing Pac-Man at (" + pacX + "," + pacY + "); redrawing at (" + x + "," + y + ")");
  
  erasePac(pacX, pacY);
  
  //
  // Set global variables so we know our state
  pacDirection = direction;
  pacState = state;
  pacX = x;
  pacY = y;
  
  // Set Pac-Man's trademark color
  ctx.fillStyle = '#FFFD38';
  
  // Translate the origin from (0,0) to Pac-Man's location so we can rotate him correctly
  ctx.translate(pacX, pacY);
  
  // Rotations are clockwise. 0°/360° is the default.
  if (direction === down)
    ctx.rotate(1.571); // π/2 (90°)
  else if (direction === left)
    ctx.rotate(3.142); // π (180°)
  else if (direction === up)
    ctx.rotate(4.712); // 3π/2 (270°)

  // Draw Pac-Man. Because we translated to his location, his center is now at (0,0)
  ctx.beginPath();
  ctx.arc(0, 0, pacRadius, bottomJaw-closeInterval*state, topJaw+closeInterval*state, false)
  ctx.lineTo(0,0);
  ctx.fill();

  // Clear the transformation matrix, putting the origin back where it should be
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

//---------------------------------------------------------------------------------------
// erasePac
// Erases Pac-Man at (x,y)
//---------------------------------------------------------------------------------------
function erasePac(x, y) {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(x-pacRadius, y-pacRadius);
  ctx.lineTo(x-pacRadius, y+pacRadius);
  ctx.lineTo(x+pacRadius, y+pacRadius);
  ctx.lineTo(x+pacRadius, y-pacRadius);
  ctx.fill();
}

//---------------------------------------------------------------------------------------
// movePac
// Moves Pac-Man up, down, left, or right by "pacSpeed" pixels
//---------------------------------------------------------------------------------------
function movePac(direction) {
  var mouth = 0;
  var x = pacX;
  var y = pacY;

  if (direction === up) {
    if (y-pacSpeed >= minPacY) {
      y -= pacSpeed;
      mouth = up;
    }
  }
  else if (direction === down) {
    if (y+pacSpeed <= maxPacY) {
      y += pacSpeed;
      mouth = down;
    }
  }
  else if (direction === right) {
    if (x+pacSpeed <= maxPacX) {
      x += pacSpeed;
      mouth = right;
    }
  }
  else if (direction === left) {
    if (x-pacSpeed >= minPacX) {
      x -= pacSpeed;
      mouth = left;
    }
  }

  if (mouth !== 0) {
    drawPac(x, y, mouth, pacState);
  }
}

//---------------------------------------------------------------------------------------
// startAnimation
// Start Pac-Man a'flappin' his jaws
//---------------------------------------------------------------------------------------
function startAnimation() {
  animationID = setInterval(function() {
    var state = mouthOpen;
  
    animationCount++;
    if (animationCount % 4 === 0)
        state = mouthHalfOpen;
    else if (animationCount % 4 === 1)
        state = mouthClosed;
    else if (animationCount % 4 === 2)
        state = mouthHalfOpen;
    
    drawPac(pacX, pacY, pacDirection, state);
  }, 150)
}

//---------------------------------------------------------------------------------------
// stopAnimation
// Tell Pac-Man "Hey, that's enough jaw-flappin'!!"
//---------------------------------------------------------------------------------------
function stopAnimation() {
  clearInterval(animationID);
  animationID = 0;
}

//---------------------------------------------------------------------------------------
// Handle arrow key presses
//
// SGMS Cougar Friday students: this handler doesn't do anything. What changes would you
// make so that it does something useful?
//---------------------------------------------------------------------------------------
$("#canvas").keydown(function (event) {
  debuggingOutput("Keydown detected, keyCode is " + spellDirection(event.keyCode));

  if (event.keyCode === up) {
    // wat do?
  }
  else if (event.keyCode === down) {
    // wat do?
  }
  else if (event.keyCode === right) {
    // wat do?
  }
  else if (event.keyCode === left) {
    // wat do?
  }
});

