// ****************** Preloader blocks animation ****************** //
let preload = () => {
	// Hide scrollbars on the preloader screen
	const html = document.documentElement;
	// html.setAttribute('class', 'overflow-hidden');
	html.className += 'overflow-hidden';

	// Move each blocks with an incrementing interval of 500ms
	const blocks = document.querySelectorAll('.block');
	let interval = 0;
	blocks.forEach((block, i) => {
		setTimeout(() => {
			animate(block, i);
		}, interval);
		interval += 500;
	});

	function animate(block, index) {
		let position = index;
		setInterval(() => {
			switch (position) {
				case 0:
					block.style.top = '40px';
					position = 3;
					break;
				case 1:
					block.style.left = '40px';
					position = 0;
					break;
				case 2:
					block.style.top = '0px';
					position = 1;
					break;
				case 3:
					block.style.left = '0px';
					position = 2;
					break;
			}
		}, 1500);
	}

	const preloaderText = document.querySelector('.preloader-text');
	let dots = 1;
	setInterval(() => {
		switch (dots) {
			case 1:
				preloaderText.textContent = 'Loading...';
				dots++;
				break;
			case 2:
				preloaderText.textContent = 'Loading..';
				dots++;
				break;
			case 3:
				preloaderText.textContent = 'Loading.';
				dots++;
				break;
			case 4:
				preloaderText.textContent = 'Loading';
				dots++;
				break;
			case 5:
				preloaderText.textContent = 'Loading.';
				dots++;
				break;
			case 6:
				preloaderText.textContent = 'Loading..';
				dots++;
				break;
			case 7:
				preloaderText.textContent = 'Loading...';
				dots = 1;
				break;
		}
	}, 500);
};
preload();

// fade out function

const preloader = document.querySelector('.preloader');
function finishedLoading() {
	preloader.style.opacity = '0';
	setTimeout(() => {
		preloader.style.display = 'none';
	}, 500);
}

// when dom is loaded: Fade out preloader after 5s, remove class="overflow-hidden" on html tag.
document.addEventListener('DOMContentLoaded', () => {
	const html = document.documentElement;
	setTimeout(() => {
		finishedLoading();
		html.className -= 'overflow-hidden';
	}, 5000);
});

// ****************** Scroll-line indicator ****************** //

const scrollIndicatorElt = document.getElementById('scrollIndicator');
const maxScrollableHeight = document.body.scrollHeight - window.innerHeight;

window.addEventListener('scroll', moveScrollIndicator);

function moveScrollIndicator() {
	const percentage = (window.scrollY / maxScrollableHeight) * 100;
	scrollIndicatorElt.style.width = percentage + '%';
}

// ****************** Hide header when scrolldown ****************** //

const maxScrollXValue = document.body.scrollWidth;

console.log(maxScrollXValue)

// when #header is at bottom
if (maxScrollXValue < 450) {
	let prevScrollPos = window.pageYOffset;

	window.onscroll = () => {
		var currentScrollPos = window.pageYOffset;

		if (prevScrollPos > currentScrollPos) {
			document.getElementById('header').style.bottom = '0';
		} else {
			document.getElementById('header').style.bottom = '-100px';
		}
		prevScrollPos = currentScrollPos;
	};
} else if (maxScrollXValue > 450) {
	// get previous vertical position of the window
	let prevScrollPos = window.pageYOffset;

	// call anonymous function on scroll
	window.onscroll = () => {
		// Get vertical position after a scrolling
		var currentScrollPos = window.pageYOffset;

		// if prev is superior than current, the header is visible. If not, the header is hidden.
		if (prevScrollPos > currentScrollPos) {
			document.getElementById('header').style.top = '0';
		} else {
			document.getElementById('header').style.top = '-100px';
		}

		// then, the prev value is defined with the current value.
		prevScrollPos = currentScrollPos;
	};
}



// ****************** Slide menu burger ****************** //

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const sideContainer = document.querySelector('.side-container');

const navSlide = () => {
	burger.addEventListener('click', () => {
		//Toggle nav
		sideContainer.classList.toggle('nav-active');
		nav.classList.toggle('nav-active');
	});
};
navSlide();

// Close side menu when click on links
const navClose = () => {
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (sideContainer.className === 'side-container nav-active') {
				sideContainer.classList.remove('nav-active');
				nav.classList.remove('nav-active');
				rotateBurger();
			}
		});
	});
};
navClose();

//Rotate burger when click
let showMenu = false;
burger.addEventListener('click', rotateBurger);

function rotateBurger() {
	if (!showMenu) {
		burger.classList.add('close');
		showMenu = true;
	} else {
		burger.classList.remove('close');
		showMenu = false;
	}
}

// ****************** Parallax on home section ****************** //

// window.onload = () => {
// 	const title = document.querySelector('.content .title'),
// 		typingText = document.querySelector('.content .typing-text');

// 	// Event on scroll window
// 	window.addEventListener('scroll', () => {
// 		// console.log(this.pageYOffset);
// 		// PageYOffset shows how many pixels the window scroll vertically. Divided by 2 to be half of the effectiveness
// 		title.style.transform = 'translateY(' + this.pageYOffset / 2 + '%)';
// 		typingText.style.transform = 'translateY(' + this.pageYOffset / 2.3 + '%)';
// 	});
// };

// ****************** TypeWriter effect ****************** //

// class TypeWriter {
// 	constructor(txtElement, words, wait = 3000) {
// 		this.txtElement = txtElement;
// 		this.words = words;
// 		this.txt = '';
// 		this.wordIndex = 0;
// 		this.wait = parseInt(wait, 10);
// 		this.type();
// 		this.isDeleting = false;
// 	}

// 	type() {
// 		// Current index of words
// 		const current = this.wordIndex % this.words.length;
// 		// Get full text of current word
// 		const fullTxt = this.words[current];

// 		// check if deleting
// 		if (this.isDeleting) {
// 			//Remove char
// 			this.txt = fullTxt.substring(0, this.txt.length - 1);
// 		} else {
// 			//Add char
// 			this.txt = fullTxt.substring(0, this.txt.length + 1);
// 		}

// 		// Insert txt into element
// 		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

// 		// Initial Type speed
// 		let typeSpeed = 200;

// 		if (this.isDeleting) {
// 			typeSpeed /= 2;
// 		}

// 		// if word complete
// 		if (!this.isDeleting && this.txt === fullTxt) {
// 			// make pause at end
// 			typeSpeed = this.wait;
// 			//Set deleting to true
// 			this.isDeleting = true;
// 		} else if (this.isDeleting && this.txt === '') {
// 			this.isDeleting = false;

// 			//move to next word
// 			// this.wordIndex++;

// 			//pause before start typing
// 			typeSpeed = 500;
// 		}

// 		setTimeout(() => this.type(), typeSpeed);
// 	}
// }
// //Init On dom load
// document.addEventListener('DOMContentLoaded', init);

// //INIT App
// function init() {
// 	const txtElement = document.querySelector('.txt-type');
// 	const words = JSON.parse(txtElement.getAttribute('data-words'));
// 	const wait = txtElement.getAttribute('data-wait');

// 	//Init TypeWriter
// 	new TypeWriter(txtElement, words, wait);
// }

// ****************** Toggle light/dark mode ****************** //

const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', () => {
	// Change the theme of the site
	document.body.classList.toggle('light');
});

// ****************** Cogs icons animation on hover ****************** //

const getCogs = document.querySelectorAll('.fa-cog'),
	getBox = document.querySelector('.service-box:nth-child(1)');

getBox.addEventListener('mouseover', spinOn);
getBox.addEventListener('mouseout', spinOff);

function spinOn() {
	for (let i = 0; i < getCogs.length; i++) {
		getCogs[i].classList.add('fa-spin');
	}
}
function spinOff() {
	for (let i = 0; i < getCogs.length; i++) {
		getCogs[i].classList.remove('fa-spin');
	}
}

// ****************** Contact form checkboxes function ****************** //

const EntityInput = document.querySelector('.hidden-field'),
	labelChange = document.querySelector('.label-change'),
	checkPerso = document.querySelector('input[id="box-1"]'),
	checkAssoc = document.querySelector('input[id="box-2"]'),
	checkCorp = document.querySelector('input[id="box-3"]'),
	slideDownAnimation = document.querySelectorAll('.sda');

checkPerso.addEventListener('click', checkHidePerso);
checkAssoc.addEventListener('click', checkDisplayAssoc);
checkCorp.addEventListener('click', checkDisplayCorp);

function checkHidePerso() {
	slideDownAnimation.forEach(item => {
		item.classList.add('slide-down-p2');
		item.classList.remove('slide-down-p1');
	});
	EntityInput.classList.add('slide-right-p2');
}

// display hidden input and move down following inputs when click on assoc
function checkDisplayAssoc() {
	EntityInput.classList.remove('slide-right-p2');
	EntityInput.classList.remove('slide-right');
	EntityInput.classList.toggle('slide-right');
	labelChange.innerText = "Comment s'appelle votre association ?";
	slideDownAnimation.forEach(item => {
		item.classList.remove('slide-down-p2');
		item.classList.add('slide-down-p1');
	});

	if (checkAssoc.checked == false) {
		EntityInput.classList.add('slide-right-p2');
		slideDownAnimation.forEach(item => {
			item.classList.add('slide-down-p2');
		});
	}
}

// display hidden input and move down following inputs when click on corp
function checkDisplayCorp() {
	EntityInput.classList.remove('slide-right-p2');
	EntityInput.classList.remove('slide-right');
	EntityInput.classList.toggle('slide-right');
	labelChange.innerText = "Comment s'appelle votre entreprise ?";
	slideDownAnimation.forEach(item => {
		item.classList.remove('slide-down-p2');
		item.classList.add('slide-down-p1');
	});

	if (checkCorp.checked == false) {
		EntityInput.classList.add('slide-right-p2');
		slideDownAnimation.forEach(item => {
			item.classList.add('slide-down-p2');
		});
	}
}

// Just one chbx checked at a time
function onlyOne(checkbox) {
	var checkboxes = document.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach(item => {
		if (item !== checkbox) {
			item.checked = false;
		}
	});
}

// ****************** elements display on scroll with Intersection Observer API ****************** //
const ratio = 0.1;
const options = {
	// root element, display area = null => check if element is visible on the screen
	root: null,
	// set margin to element
	rootMargin: '0px',
	// if threshold set to .1 = 10% of the element must be visible in the screen to make the API working
	threshold: ratio
};

const handleIntersect = (entries, observer) => {
	entries.forEach(function (entry) {
		if (entry.intersectionRatio > ratio) {
			entry.target.classList.add('reveal-visible');
			observer.unobserve(entry.target);
		}
	});
};

const observer = new IntersectionObserver(handleIntersect, options);

document.querySelectorAll('.reveal').forEach(r => {
	observer.observe(r);
});

// ****************** modal "mentions légales" ****************** //

var modalBtn = document.querySelector('.modal-btn');
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');

modalBtn.addEventListener('click', () => {
	modalBg.classList.add('bg-active');
})

modalClose.addEventListener('click', () => {
	modalBg.classList.remove('bg-active');
})

// Close modal when click anywhere outside of it
window.onclick = function (event) {
	if (event.target == modalBg) {
		modalBg.classList.remove('bg-active');
	}
}


// ****************** hide/show scroll to top button when scrollY = 10% ****************** //

const scrollToTop = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', showScrollToTop);

function showScrollToTop() {
	var scrollYPosition = window.scrollY;
	var maxScrollYValue = document.body.scrollHeight;

	// scroll-to-top's button visible at 10% of the max scrollable height
	var scrollTopIconVisiblePosition = maxScrollYValue * (10 / 100);

	if (scrollYPosition >= scrollTopIconVisiblePosition) {
		scrollToTop.style.opacity = "1";
	} else if (scrollYPosition < scrollTopIconVisiblePosition) {
		scrollToTop.style.opacity = "0";

	}
}