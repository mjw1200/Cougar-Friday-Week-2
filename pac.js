var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");

canvas.focus();

var ghostSpeed = 5;
var ghostY = 100;
var ghostX = 50;

const left = 37;
const up = 38;
const right = 39;
const down = 40;
const minGhostX = 0;
const maxGhostX = 1175;
const minGhostY = 25;
const maxGhostY = 550;

//--------------------------------------------------------------------------------------
// spellDirection
// Given a directional constant, return its string value
//
// SGMS Cougar Friday students: I *recommend* not changing anything inside this function!
//---------------------------------------------------------------------------------------
function spellDirection(direction) {
  if (direction === up)
    return "up";
  else if (direction === down)
    return "down";
  else if (direction === left)
    return "left";
  else if (direction === right)
    return "right";
  else
    return "non-arrow";
}

//--------------------------------------------------------------------------------------
// eraseGhost
// Erases a 28x28 pixel ghost, whose lower-left corner is at (x,y)
//
// SGMS Cougar Friday students: I *recommend* not changing anything inside this function!
//---------------------------------------------------------------------------------------
function eraseGhost(x,y) {
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x+28, y);
  ctx.lineTo(x+28, y-28);
  ctx.lineTo(x, y-28);
  ctx.lineTo(x,y);
  ctx.fill();
}

//---------------------------------------------------------------------------------------
// drawGhost
// Draws a 28x28 pixel ghost, whose lower-left corner is at (x,y)
//
// SGMS Cougar Friday students: I *recommend* not changing anything inside this function!
//---------------------------------------------------------------------------------------
function drawGhost(x, y, eyes) {
  var eyeX = 0;
  var eyeY = 0;
  
  eraseGhost(ghostX, ghostY);

  if (x < minGhostX)
    x = minGhostX;
  if (x > maxGhostX)
    x = maxGhostX;
  if (y < minGhostY)
    y = minGhostY;
  if (y > maxGhostY)
    y = maxGhostY;

  ghostX = x;
  ghostY = y;

  // Ghost body
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y-4);
  ctx.bezierCurveTo(x,y-22, x+6,y-28,x+14,y-28);
  ctx.bezierCurveTo(x+22,y-28,x+28,y-22,x+28,y-14);
  ctx.lineTo(x+28, y);
  ctx.lineTo(x+23.333,y-4.667);
  ctx.lineTo(x+18.666, y);
  ctx.lineTo(x+14,y-4.667);
  ctx.lineTo(x+9.333, y);
  ctx.lineTo(x+4.666, y-4.667);
  ctx.lineTo(x, y);
  ctx.fill();

  // Whites of eyes
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(x+8, y-20);
  ctx.bezierCurveTo(x+5,y-20,x+4,y-17,x+4,y-15);
  ctx.bezierCurveTo(x+4,y-13,x+5,y-10,x+8,y-10);
  ctx.bezierCurveTo(x+11,y-10,x+12,y-13,x+12,y-15);
  ctx.bezierCurveTo(x+12,y-17,x+11,y-20,x+8,y-20);
  ctx.moveTo(x+20, y-20);
  ctx.bezierCurveTo(x+17,y-20,x+16,y-17,x+16,y-15);
  ctx.bezierCurveTo(x+16,y-13,x+17,y-10,x+20,y-10);
  ctx.bezierCurveTo(x+23,y-10,x+24,y-13,x+24,y-15);
  ctx.bezierCurveTo(x+24,y-17,x+23,y-20,x+20,y-20);
  ctx.fill();

  // Pupils
  ctx.fillStyle = 'black';

  // Right
  ctx.beginPath();
  if (eyes === up) {
    eyeX = x+20;
    eyeY = y-18;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    // console.log("Right pupil, looking up: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === down) {
    eyeX = x+20;
    eyeY = y-12;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    // console.log("Right pupil, looking down: (" + eyeX + "," + eyeY + ")");
  }
  if (eyes === left || eyes === undefined) {
    eyeX = x+18;
    eyeY = y-14;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    // console.log("Right pupil, looking left: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === right) {
    eyeX = x+22;
    eyeY = y-14;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    // console.log("Right pupil, looking right: (" + eyeX + "," + eyeY + ")");
  }
  ctx.fill();

  // Left pupil
  ctx.beginPath();
  if (eyes === up) {
    eyeX = x+8;
    eyeY = y-18;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    // console.log("Left pupil, looking up: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === down) {
    eyeX = x+8;
    eyeY = y-12;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    // console.log("Left pupil, looking down: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === left || eyes === undefined) {
    eyeX = x+6;
    eyeY = y-14;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    // console.log("Left pupil, looking left: (" + eyeX + "," + eyeY + ")");
  }
  else if (eyes === right) {
    eyeX = x+10;
    eyeY = y-14;

    ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2, true);
    // console.log("Left pupil, looking right: (" + eyeX + "," + eyeY + ")");
  }
  ctx.fill();

  canvas.focus();
}

//---------------------------------------------------------------------------------------
// moveGhost
// Moves a ghost up, down, left, or right by "speed" pixels
//
// SGMS Cougar Friday students: I *recommend* not changing anything inside this function!
//---------------------------------------------------------------------------------------
function moveGhost(direction) {
  // console.log("Moving ghost " + spellDirection(direction) + " from (" + ghostX + "," + ghostY + ")");

  var eyes = '';
  var x = ghostX;
  var y = ghostY;

  if (direction === up) {
    if (y-ghostSpeed >= minGhostY) {
      y -= ghostSpeed;
      eyes = up;
    }
  }
  else if (direction === down) {
    if (y+ghostSpeed <= maxGhostY) {
      y += ghostSpeed;
      eyes = down;
    }
  }
  else if (direction === right) {
    if (x+ghostSpeed <= maxGhostX) {
      x += ghostSpeed;
      eyes = right;
    }
  }
  else if (direction === left) {
    if (x-ghostSpeed >= minGhostX) {
      x -= ghostSpeed;
      eyes = left;
    }
  }

  if (eyes !== '') {
    // console.log("New ghost position is (" + ghostX + "," + ghostY + ")");
    eraseGhost(ghostX, ghostY);
    ghostX = x;
    ghostY = y;
    drawGhost(x, y, eyes);
  }
}

//---------------------------------------------------------------------------------------
// Handle arrow key presses
//
// SGMS Cougar Friday students: this handler doesn't do anything. What changes would you
// make so that it does something useful?
//---------------------------------------------------------------------------------------
$("#canvas").keydown(function (event) {
  // console.log("Keydown detected, keyCode is " + spellDirection(event.keyCode));

  if (event.keyCode === up) {
    moveGhost(up);
  }
  else if (event.keyCode === down) {
    moveGhost(down);
  }
  else if (event.keyCode === right) {
    moveGhost(right);
  }
  else if (event.keyCode === left) {
    moveGhost(left);
  }
});

// drawGhost(ghostX, ghostY, left);

// function roundedRect(ctx, x, y, width, height, radius) {
//   ctx.beginPath();
//   ctx.moveTo(x, y + radius);
//   ctx.lineTo(x, y + height - radius);
//   ctx.arcTo(x, y + height, x + radius, y + height, radius);
//   ctx.lineTo(x + width - radius, y + height);
//   ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
//   ctx.lineTo(x + width, y + radius);
//   ctx.arcTo(x + width, y, x + width - radius, y, radius);
//   ctx.lineTo(x + radius, y);
//   ctx.arcTo(x, y, x, y + radius, radius);
//   ctx.stroke();
// }

// ---------- The game board
// roundedRect(ctx, 12, 12, 150, 150, 15);
// roundedRect(ctx, 19, 19, 150, 150, 9);
// roundedRect(ctx, 53, 53, 49, 33, 10);
// roundedRect(ctx, 53, 119, 49, 16, 6);
// roundedRect(ctx, 135, 53, 49, 33, 10);
// roundedRect(ctx, 135, 119, 25, 49, 10);

// ---------- Dots and Pac-Man
// ctx.beginPath();
// ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
// ctx.lineTo(31, 37);
// ctx.fill();

// for (var i = 0; i < 8; i++) {
//   ctx.fillRect(51 + i * 16, 35, 4, 4);
// }

// for (i = 0; i < 6; i++) {
//   ctx.fillRect(115, 51 + i * 16, 4, 4);
// }

// for (i = 0; i < 8; i++) {
//   ctx.fillRect(51 + i * 16, 99, 4, 4);
// }
