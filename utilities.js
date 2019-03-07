//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
// SGMS Cougar Friday students: This is boring music (https://youtu.be/WltLoI60SQ4?t=8).
// You probably don't want to change anything in here. I mean, you can, but nothing in
// here is cool or fun. You should spend your valuable time in the other code files.
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");

canvas.focus();

//--------------------------------------------------------------------------------------
// rangeCheckX
// Ensure X is in range; return an in-range value if it's not
//---------------------------------------------------------------------------------------
function rangeCheckX(x) {
  if (x < minCharacterX)
    x = minCharacterX;
  else if (x > maxCharacterX)
    x = maxCharacterX;

  debuggingOutput("X range-checked x to " + x);
  return x;
}

//--------------------------------------------------------------------------------------
// rangeCheckY
// Ensure Y is in range; return an in-range value if it's not
//---------------------------------------------------------------------------------------
function rangeCheckY(y) {
  if (y < minCharacterY)
    y = minCharacterY;
  if (y > maxCharacterY)
    y = maxCharacterY;
  
  debuggingOutput("Y range-checked x to " + y);
  return y;
}

//--------------------------------------------------------------------------------------
// spellDirection
// Given a directional constant, return its string value
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
// debuggingOutput
// Print a debugging statement to the console...if the big switch is on
//---------------------------------------------------------------------------------------
function debuggingOutput(message) {
  if (debugging) {
    console.log(message);
  }
}