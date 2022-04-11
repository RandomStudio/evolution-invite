
const formEl = document.getElementById('form');
const submitEl = document.querySelector('.submit');

const nameEl = document.getElementById('name')
const emailEl = document.getElementById('email')

let hasError = false;

const setErrorMessage = message => {
	const error = message === 'Bad Request' ? 'Bad details. Amend and submit again.' : message;
	submitEl.innerText = 'Error: ' + error;
	submitEl.classList.add('has-error')
	hasError = true;
}

const handleChange = () => {
	if (!emailEl.value.includes('@') || nameEl.value.length < 3) {
		submitEl.classList.add('is-disabled')
		submitEl.disabled = true;
		return;
	}

	submitEl.classList.remove('is-disabled')
	submitEl.disabled = false;
	submitEl.classList.remove('has-error')
	submitEl.innerText = 'Submit RSVP'
}

const handleSubmit = async event => {
	submitEl.classList.add('is-disabled');
	submitEl.disabled = true;
	submitEl.classList.add('is-loading');
	submitEl.innerHTML = 'Submitting...';
	event.preventDefault();

	try {
		const email = document.querySelector('#email').value
		const name = document.querySelector('#name').value
		const response = await fetch(
			`https://deft-capybara-b966ac.netlify.app/.netlify/functions/addToNewsletterList?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`,
		);

		submitEl.classList.remove('is-loading');

		if (!response.ok) {
			const json = await response.json();
			setErrorMessage(json.message);
			return;
		}

		submitEl.innerText = 'See you there!';
	} catch (responseError) {
		setErrorMessage(responseError?.message ?? 'Server error');
	}

	return false;
};

formEl.addEventListener('submit', handleSubmit)
submitEl.addEventListener('click', handleSubmit)

nameEl.addEventListener('change', handleChange)
emailEl.addEventListener('change', handleChange)