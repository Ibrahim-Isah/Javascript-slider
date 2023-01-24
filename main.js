const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.slider');
const buttons = document.querySelectorAll('.buttons div');
const dotEl = document.querySelector('.dots');


function getNextPrev() {
	const activeSlide = document.querySelector('.slide.active');
	const activeIndex = slides.indexOf(activeSlide);
	const allSlidesCount = slides.length;
 
    console.log(allSlidesCount)
	let nextSlide, prevSlide;

	if (allSlidesCount <= 2) {
        if(activeIndex === 0) {
            nextSlide = slides[1];
            prevSlide = slides[1];
            prevSlide.classList.remove('animate')
        } else {
            nextSlide = slides[0];
            prevSlide = slides[0];
            prevSlide.classList.remove('animate')
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
}

function getPosition() {
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);
    const nextPrev = getNextPrev();
    const nextSlide = nextPrev[0];
    const prevSlide = nextPrev[1];

    slides.forEach((slide, index) => {
        if (index === activeIndex) {
            slide.style.transform = 'translateX(0)';
        } else if(slide === prevSlide) {
            slide.style.transform = 'translateX(-100%)';
        } else if(slide === nextSlide) {
            slide.style.transform = 'translateX(100%)';
        } else {    
            slide.style.transform = 'translateX(100%)';
        }
     
        slide.addEventListener('transitionend', () => {
            slide.classList.remove('animate');
        })
    });

}

getPosition();

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if(button.classList.contains('next')) getNextSlide();
        if(button.classList.contains('prev')) getPrevSlide();
    });
}

);

function getNextSlide() {
    const activeSlide = document.querySelector('.slide.active');
    const nextPrev = getNextPrev();
    const nextSlide = nextPrev[0];
    const prevSlide = nextPrev[1];
    const nextIndex = slides.indexOf(nextSlide);

    if(activeSlide.classList.contains('animate')) return;
    activeSlide.classList.add('animate');
    nextSlide.classList.add('animate');
    activeSlide.classList.remove('active');
    nextSlide.classList.add('active');

    getPosition();
    getActiveDot();
}

function getPrevSlide() {
    const activeSlide = document.querySelector('.slide.active');
    const nextPrev = getNextPrev();
    const nextSlide = nextPrev[0];
    const prevSlide = nextPrev[1];
    const prevIndex = slides.indexOf(prevSlide);

    if(activeSlide.classList.contains('animate')) return;
    activeSlide.classList.add('animate');
    prevSlide.classList.add('animate');
    activeSlide.classList.remove('active');
    prevSlide.classList.add('active');

    getPosition();
    getActiveDot();
}


slides.forEach((slide,index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotEl.appendChild(dot);
});


function getActiveDot() {
    const allDots = document.querySelectorAll('.dots .dot');
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);

    allDots.forEach(dot => {
        dot.classList.remove('active');
    });


    allDots[activeIndex].classList.add('active');
    allDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToDot(index);
        });
    }
    );

}

function moveToDot(index) {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    slides[index].classList.add('active');
    getPosition();
    getActiveDot();
}

function autoPlay() {
    setInterval(() => {
        getNextSlide();
    }, 5000);
}

if(slider.classList.contains('autoplay')) {
    autoPlay();
}

moveToDot(0);
getActiveDot();