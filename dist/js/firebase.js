// send message to firebase
var firebaseConfig = {
	apiKey: 'AIzaSyCRfpzS7Wcjl2svU2QTtKGWAHhyBlpQqE0',
	authDomain: 'portfolio-9e975.firebaseapp.com',
	databaseURL: 'https://portfolio-9e975.firebaseio.com',
	projectId: 'portfolio-9e975',
	storageBucket: 'portfolio-9e975.appspot.com',
	messagingSenderId: '285689505677',
	appId: '1:285689505677:web:3e99cf9b1f2edb1bdbfc4',
	measurementId: 'G-Z1LV5NHN7L'
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// reference messages collection
var messagesRef = firebase.database().ref('messages');

const form = document.getElementById('form'),
	name = document.getElementById('name'),
	email = document.getElementById('email'),
	phone = document.getElementById('phone'),
	phone2 = document.querySelector('.form-control:nth-child(4)'),
	inputsError = document.querySelectorAll('.error'),
	inputsSuccess = document.querySelectorAll('.success'),
	msg = document.getElementById('msg');

form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();

	const inputsError = document.querySelectorAll('.error');
	const inputsSuccess = document.querySelectorAll('.success');

	//If there is at least 1 error input, message is not sent
	//else there are at min 3 or more valid inputs, form is valid then send message to firebase database
	if (inputsError.length >= 1) {
		document.querySelector('.alert').style.display = 'none';
		console.log('error');
	} else {
		submitForm();
		console.log('message sent');

		// Hide alert after 3 seconds, remove success class and reset form
		setTimeout(() => {
			document.querySelector('.alert').style.display = 'none';
			inputsSuccess.forEach(function(item) {
				item.classList.remove('success');
			});
			// Clear inputs after submit
			form.reset();
		}, 3000);
	}
});

function checkInputs() {
	// Get values from inputs. Trim() remove white spaces
	const nameValue = name.value.trim(),
		entityValue = entity.value.trim(),
		emailValue = email.value.trim(),
		phoneValue = phone.value.trim(),
		msgValue = msg.value.trim();

	if (nameValue === '') {
		// show error & add error class
		setErrorFor(name, 'Veuillez renseigner un nom svp');
	} else {
		// add success class
		setSuccessFor(name);
	}

	// if (entityValue === '') {
	// 	// show error & add error class
	// 	setErrorFor(entity, 'Veuillez renseigner un nom svp');
	// } else {
	// 	setSuccessFor(entity);
	// }

	if (emailValue === '') {
		// show error & add error class
		setErrorFor(email, 'Veuillez renseigner une adresse email svp');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Cette adresse email est invalide');
	} else {
		setSuccessFor(email);
	}

	if (phoneValue === '') {
		// if no phone number is defined, do nothing. And remove success class when submit
		phone.value = '';
		phone2.classList.remove('success');
		// if a number is defined, check if valid
	} else if (!isPhone(phoneValue)) {
		setErrorFor(phone, 'Ce numéro est invalide');
	} else {
		// add success class
		setSuccessFor(phone);
	}

	if (msgValue === '') {
		// show error & add error class
		setErrorFor(msg, 'Veuillez écrire un message svp');
	} else {
		// add success class
		setSuccessFor(msg);
	}
}

// add error class to form-control
function setErrorFor(input, message) {
	// .form-control
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');

	// add error message inside small tag
	small.innerText = message;

	// add error class
	formControl.className = 'form-control error';
}

// add success class to form-control
function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';

	// Show validation alert
	document.querySelector('.alert').style.display = 'block';
}

// Check if email format is valid
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
}

//Check if phone format is valid (french)
function isPhone(phone) {
	return /^((\+)33|0)[0-9](\d{2}){4}$/.test(phone);
}

// get form values
function getInputVal(id) {
	return document.getElementById(id).value;
}

// send message when submit
function submitForm() {
	var name = getInputVal('name');
	var entity = getInputVal('entity');
	var email = getInputVal('email');
	var phone = getInputVal('phone');
	var msg = getInputVal('msg');
	var checkedValue = document.getElementById('box-1').checked;

	if (checkedValue === true) {
		checkedValue === 'Particulier';
		console.log(checkedValue);
	}

	// Save message
	saveMessage(name, checkedValue, entity, email, phone, msg);
}

// Save message to firebase
function saveMessage(name, checkedValue, entity, email, phone, msg) {
	var newMessageRef = messagesRef.push();

	// send an object of data to message collection in firebase
	newMessageRef.set({
		name: name,
		checkedValue: checkedValue,
		entity: entity,
		email: email,
		phone: phone,
		message: msg
	});
}
