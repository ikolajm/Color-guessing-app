// Determine how many Squares to produce
var numSquares = 6;
// Get color array
var colors = generateColors(numSquares);
// Get squares
var squares = document.querySelectorAll('.square');
// Get color for player to pick
var pickedColor = pickColor();
// Get text in view for player to guess
var colorDisplay = document.querySelector('#color');
// Get reaction text for each click (correct or incorrect)
var reaction = document.querySelector('.reaction');
// Get banner section
var banner = document.querySelector('header');
// Get reset button
var resetButton = document.querySelector('#reset');
// Get difficulty buttons
var mode = document.querySelectorAll('.difficulty');

// Event listeners for difficulty buttons
for (var i = 0; i < mode.length; i++) {
  // Add event listeners to each button
  mode[i].addEventListener('click', function() {
    // Remove active classes from both buttons
    mode[0].classList.remove('active');
    mode[1].classList.remove('active');
    // Add active class to whatever button was clicked
    this.classList.add('active');
    if (this.textContent === "Easy") {
      numSquares = 3;
    } else {
      numSquares = 6;
    }
    // Reset game with set parameters
    reset();
  });
}

// Function to reset the game
function reset() {
  // Reset reaction to blank
  reaction.textContent = "";
  // Reset reset button to say "reset"
  resetButton.textContent = "Reset";
  // Generate all new colors
  colors = generateColors(numSquares);
  // Pick new random color from array
  pickedColor = pickColor();
  // Change color display to match pickedColor
  colorDisplay.textContent = pickedColor;
  // Change color of squares to new array colors
  for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
  banner.style.background = "steelblue";
}

// Add event listener for reset button
resetButton.addEventListener('click', function() {
  reset();
});

// Put pickedColor rgb value in color display
colorDisplay.textContent = pickedColor;

// Get color of square[i] and give it color of colors[i]
for (var i = 0; i < colors.length; i++) {
  squares[i].style.backgroundColor = colors[i];

  // Add click event handlers to each squares
  squares[i].addEventListener('click', function() {
    // Grab color of clicked square
    var clickedColor = this.style.backgroundColor;
    // Compare color of this to pickedColor
    if (clickedColor === pickedColor) {
      // Tell player they are correct
      reaction.textContent = "Correct!";
      // Function to change color of all squares to correct guess color
      changeColors(clickedColor);
      // Chanege banner to the color of the correct guess
      banner.style.backgroundColor = clickedColor;
      // Set resetButton text to say 'play again'
      resetButton.textContent = "Play Again?";
    } else {
      // Incorrect guess fades out
      this.style.backgroundColor = "transparent";
      // Tell player to try again
      reaction.textContent = "Try Again!";
    }
  });
}

// Function to change color of all squares to correct guess color
function changeColors(color) {
  // Loop through all squares, change each color to match given color
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

// Function to pick a random color out of colors array
function pickColor() {
  var random =  Math.floor(Math.random() * colors.length);
  return colors[random];
}

// Function to create random color array
function generateColors(num) {
  // Make an array
  var arr = []
  // Add num random colors to array, repeat num times
  for (i = 0; i < num; i++) {
    // Get random color, push into array
    arr.push(generateRGB());
  }
  // Return the array
  return arr;
}

// Function to create random rgb values
function generateRGB() {
  // Get random red value
  var r = Math.floor(Math.random() * 256);
  // Get random green value
  var g = Math.floor(Math.random() * 256);
  // get random green value
  var b = Math.floor(Math.random() * 256);

  // Create string concatonating these values
  var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
  // Return string
  return rgb;
}
