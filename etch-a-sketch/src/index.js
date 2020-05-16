const CSS_CLASSES = [
	'rangeslider--is-lowest-value',
	'rangeslider--is-highest-value'
];
const GRID = document.getElementById('grid');
var gridDimension;
var totalGridCells;

function askForDimensions() {
	gridDimension = prompt('Dimensions of the grid: ');
	
	if(!isNaN(parseInt(gridDimension, 10)) && gridDimension <= 24){
		GRID.style.setProperty('--grid-dimension', gridDimension);
	}else{
		alert('You have to input an integer or the number you inputted is to big');
		askForDimensions();
	}
}

function createGrid(gridSize) {
	GRID.style.setProperty('--grid-dimension', gridSize);
	totalGridCells = gridSize * gridSize;
	for(var i=0; i< totalGridCells; i++){
		GRID.appendChild(document.createElement('div')).className = 'item';
	}
}

function addEventListeners() {	
	let items = [].slice.call(document.getElementsByClassName('item'));
	items.forEach(items => items.addEventListener('mouseover', (event) => {
		event.target.classList.add('filled');

		document.getElementById('clearBtn').addEventListener('click', clearGrid);
		document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });


		$("p").mouseover(function(){
			$("p").css("background-color", "yellow");
		});
	}));
}

function clearGrid() {
	let items = [].slice.call(document.getElementsByClassName('item'));
	items.forEach(items => items.classList.remove('filled'));
}

function setUpSlider(){
	
	$('input[type=range]')
	  .rangeslider({
		polyfill: false,
		verticalClass: 'rangeslider--vertical'
	  }).on('input', function() {
			let cellNumberToClear;
			let offset;
			let currentSliderValue = $('input[type="range"]').val();

			$('#range-count').text(`${currentSliderValue}`);
			if(currentSliderValue > 10){
				offset = Math.floor((currentSliderValue/10) - 1) * gridDimension;
				cellNumberToClear = gridDimension;
			}else{
				offset = 0;
				cellNumberToClear = 0;

			}
			for(let i = 1; i <= cellNumberToClear; i++){
				$('.item')[totalGridCells - i - offset].classList.remove('filled');
			}
			let fraction = (this.value - this.min) / (this.max - this.min);
			if (fraction === 0) {
			this.nextSibling.classList.add(CSS_CLASSES[0]);
			} else if (fraction === 1) {
			this.nextSibling.classList.add(CSS_CLASSES[1]);
			} else {
			this.nextSibling.classList.remove(...CSS_CLASSES);
			}
		  });  
	$('input[type="range"]').val(0).change();
	document.getElementById("slider").setAttribute("max", gridDimension*10+5);
	$('input[type="range"]').rangeslider('update', true);
}

var slider = $('input[type=range]').rangeslider({
	polyfill: false,
	verticalClass: 'rangeslider--vertical'
});

$(document).ready(function() {
	
	askForDimensions();
	GRID.style.setProperty('--grid-dimension', gridDimension);
	createGrid(gridDimension);
	setUpSlider();
	addEventListeners();
});









