const slides = Array.from(document.querySelectorAll('.slide')); // Array.from() converts a NodeList to an Array
const slider = document.querySelector('.slider');
const buttons = document.querySelectorAll('.buttons div');
const dotEl = document.querySelector('.dots');
let startX;

// get the next and previous slides ready for use at any moment
const getNextPrev = () => {
	const activeSlide = document.querySelector('.slide.active');
	const activeIndex = slides.indexOf(activeSlide);
	const allSlidesCount = slides.length;

	let nextSlide, prevSlide;

	if (allSlidesCount <= 2) {
		if (activeIndex === 0) {
			nextSlide = slides[1];
			prevSlide = slides[1];
			prevSlide.classList.remove('animate');
		} else {
			nextSlide = slides[0];
			prevSlide = slides[0];
			prevSlide.classList.remove('animate');
		}
	} else {
		nextSlide = slides[activeIndex + 1];
		prevSlide = slides[activeIndex - 1];
	}

	if (nextSlide === undefined) {
		nextSlide = slides[0];
	}

	if (prevSlide === undefined) {
		prevSlide = slides[slides.length - 1];
	}

	return [nextSlide, prevSlide];
};

// get the position of the slides
const getPosition = () => {
	const activeSlide = document.querySelector('.slide.active');
	const activeIndex = slides.indexOf(activeSlide);
	const nextPrev = getNextPrev();
	const nextSlide = nextPrev[0];
	const prevSlide = nextPrev[1];

	slides.forEach((slide, index) => {
		if (index === activeIndex) {
			slide.style.transform = 'translateX(0)';
		} else if (slide === prevSlide) {
			slide.style.transform = 'translateX(-100%)'; // move the previous slide to the left out of the window
		} else if (slide === nextSlide) {
			slide.style.transform = 'translateX(100%)'; // move the next slide to the right out of the window
		} else {
			slide.style.transform = 'translateX(100%)';
		}

		slide.addEventListener('transitionend', () => {
			slide.classList.remove('animate');
		});
	});
};

// check for interaction with arrows and call the appropriate function
buttons.forEach((button, index) => {
	button.addEventListener('click', () => {
		if (button.classList.contains('next')) getNextSlide();
		if (button.classList.contains('prev')) getPrevSlide();
	});
});

// simply get the next slide
const getNextSlide = () => {
	const activeSlide = document.querySelector('.slide.active');
	const nextPrev = getNextPrev();
	const nextSlide = nextPrev[0];

	if (activeSlide.classList.contains('animate')) return;
	activeSlide.classList.add('animate'); // add the animate class in other to add the transition effect to slides
	nextSlide.classList.add('animate');
	activeSlide.classList.remove('active');
	nextSlide.classList.add('active');

	getPosition();
	getActiveDot();
};

// simply get the previous slide
const getPrevSlide = () => {
	const activeSlide = document.querySelector('.slide.active');
	const nextPrev = getNextPrev();
	const prevSlide = nextPrev[1];

	if (activeSlide.classList.contains('animate')) return;
	activeSlide.classList.add('animate');
	prevSlide.classList.add('animate');
	activeSlide.classList.remove('active');
	prevSlide.classList.add('active');

	getPosition();
	getActiveDot();
};

// add the dots to the slider
slides.forEach((slide) => {
	const dot = document.createElement('div');
	dot.classList.add('dot');
	dotEl.appendChild(dot);
});

// this function will get the active dot and add the active class to it
const getActiveDot = () => {
	const allDots = document.querySelectorAll('.dots .dot');
	const activeSlide = document.querySelector('.slide.active');
	const activeIndex = slides.indexOf(activeSlide);

	allDots.forEach((dot) => {
		dot.classList.remove('active');
	});

	allDots[activeIndex].classList.add('active');
	allDots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			moveToDot(index);
		});
	});
};

// this function will move the slider to the dot that was clicked
const moveToDot = (index) => {
	slides.forEach((slide) => {
		slide.classList.remove('active');
	});

	slides[index].classList.add('active');
	getPosition();
	getActiveDot();
};

// Section for touch events for use in mobile devices
const handleTouchStart = (e) => {
	startX = e.touches[0].clientX;
};

const handleTouchEnd = (e) => {
	const endX = e.changedTouches[0].clientX;
	const deltaX = endX - startX; // this will give us the distance between the start and end of the touch

	if (deltaX > 50) {
		getPrevSlide();
	} else if (deltaX < -50) {
		getNextSlide();
	}
};

// this function will autoplay the slider
const autoPlay = () => {
	setInterval(() => {
		getNextSlide();
	}, 5000);
};

// This section calls all functions and events to trigger start of the slider

slider.addEventListener('touchstart', handleTouchStart, false);
slider.addEventListener('touchend', handleTouchEnd, false);

if (slider.classList.contains('autoplay')) {
	autoPlay();
}

moveToDot(0);
getActiveDot();
getPosition();
