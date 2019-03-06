//--------------------------------------------------------------------------------------
// rangeCheckX
// Ensure X is in range; return an in-range value if it's not
//
// SGMS Cougar Friday students: I *recommend* not changing anything inside this function!
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
//
// SGMS Cougar Friday students: I *recommend* not changing anything inside this function!
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
//
// SGMS Cougar Friday students: This function is for debugging. It probably won't do
// anything cool.
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