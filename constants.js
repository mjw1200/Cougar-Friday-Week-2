const debugging = false;

const up = 38;
const down = 40;
const left = 37;
const right = 39;

const mouthOpen = 0;
const mouthHalfOpen = 1;
const mouthClosed = 2;

const pacRadius = 20;
const pacDiameter = pacRadius*2;
const minPacX = pacRadius;
const maxPacX = 1208-pacRadius;
const minPacY = pacRadius-4;
const maxPacY = 552-pacRadius;

const closeInterval = Math.PI/8;
const bottomJaw = Math.PI/4;
const topJaw = 7*Math.PI/4;

var pacSpeed = 10;
var pacY = 100;
var pacX = 50;
var animationCount = 0;
var pacDirection = right;
var pacState = mouthOpen;

