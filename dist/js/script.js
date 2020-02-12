// Scroll-line indicator
const scrollIndicatorElt = document.getElementById('scrollIndicator');
const maxScrollableHeight = document.body.scrollHeight - window.innerHeight;
window.addEventListener('scroll', moveScrollIndicator);

function moveScrollIndicator() {
	const percentage = (window.scrollY / maxScrollableHeight) * 100;
	scrollIndicatorElt.style.width = percentage + '%';
}

// Hide header when scrolldown
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

// Slide menu burger
const navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');
	const sideContainer = document.querySelector('.side-container');

	burger.addEventListener('click', () => {
		//Toggle nav
		sideContainer.classList.toggle('nav-active');
		nav.classList.toggle('nav-active');

		//Animate the links. "Link" = individual link; "Index" = bring back every links we have in the DOM
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				// divide links per 5 gives an equal delay for each one. +1 for adding delay on the first link
				link.style.animation = `navLinkFade 0.2s ease forwards ${index / 5 +
					0.5}s`;
			}
		});
	});
};

navSlide();

//Rotate burger when click
const burger = document.querySelector('.burger');
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

// TypeWriter effect
class TypeWriter {
	constructor(txtElement, words, wait = 3000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}

	type() {
		// Current index of words
		const current = this.wordIndex % this.words.length;
		// Get full text of current word
		const fullTxt = this.words[current];

		// check if deleting
		if (this.isDeleting) {
			//Remove char
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			//Add char
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		// Insert txt into element
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

		// Initial Type speed
		let typeSpeed = 200;

		if (this.isDeleting) {
			typeSpeed /= 2;
		}

		// if word complete
		if (!this.isDeleting && this.txt === fullTxt) {
			// make pause at end
			typeSpeed = this.wait;
			//Set deleting to true
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;

			//move to next word
			// this.wordIndex++;

			//pause before start typing
			typeSpeed = 500;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}
//Init On dom load
document.addEventListener('DOMContentLoaded', init);

//INIT App
function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');

	//Init TypeWriter
	new TypeWriter(txtElement, words, wait);
}

// Cogs icons animation on hover
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

// Contact form checkboxes function
const EntityInput = document.querySelector('.hidden-field'),
	labelChange = document.querySelector('.label-change'),
	checkPerso = document.querySelector('input[id="box-1"]'),
	checkAssoc = document.querySelector('input[id="box-2"]'),
	checkCorp = document.querySelector('input[id="box-3"]'),
	slideDownAnimation = document.querySelectorAll('.sda');

// console.log(checks);

checkPerso.addEventListener('click', checkHidePerso);
checkAssoc.addEventListener('click', checkDisplayAssoc);
checkCorp.addEventListener('click', checkDisplayCorp);

function checkHidePerso() {
	slideDownAnimation.forEach(item => {
		item.classList.add('slide-down-p2');
		item.classList.remove('slide-down-p1');
	});
	EntityInput.classList.add('slide-right-p2');
	EntityInput.classList.remove('error');
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
