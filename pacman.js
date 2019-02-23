// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellet = 4;


// Define your ghosts here
let inky = {
  menu_option: '1',
  name: 'Inky',
  color: 'Red',
  character: 'Shadow',
  edible: false
};

let blinky = {
  menu_option: '2',
  name: 'Blinky',
  color: 'Cyan',
  character: 'Speedy',
  edible: false
};

let pinky = {
  menu_option: '3',
  name: 'Pinky',
  color: 'Pink',
  character: 'Bashful',
  edible: false
};

let clyde = {
  menu_option: '4',
  name: 'Clyde',
  color: 'Orange',
  character: 'Pokey',
  edible: false
}

// replace this comment with your four ghosts setup as objects
let ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  gameOver();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives} \n\nPower-Pellets: ${powerPellet}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellet > 0 ) {
    console.log('(p) Eat Power-Pellet');
  }
  for (var i = 1; i <= 4; i++) {
    // outputs "(#) Eat ____"
    console.log(`(${i}) Eat ${ghosts[i-1].name} (${ghosts[i-1].edible ? 'edible' : 'inedible'})`);
  };
  console.log('(q) Quit');
};


function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  // ghost.edible ? console.log('Chomperz') : lives--;
  if (ghost.edible === true) {
    console.log(`\nChomperz! The ${ghost.color} ${ghost.name} ghost was eaten.`);
    score += 200;
    ghost.edible = false;
  } else {
    console.log(`\nOh no! The ${ghost.color} ${ghost.name} ghost took one of your lives!`);
    lives--;
  }
}

function eatPowerPellet() {
  if (powerPellet <= 0) {
    console.log('\nThere are no more Power-Pellets left!');
  } else {
    score += 50;
    powerPellet--;
    for (let i = 0; i < ghosts.length; i++) {
      ghosts[i].edible = true;
    };
    console.log('\nConsumed power pellet. All ghosts are edible now!');
  }
};

function gameOver() {
  if (lives <= 0) {
    process.exit();
  }
};

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    case 'p':
      eatPowerPellet();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 1200); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
