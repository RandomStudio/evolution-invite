
const submitEl = document.querySelector('.submit');

let hasError = false;

const setErrorMessage = message => {
	const error = message === 'Bad Request' ? 'Bad details. Amend and submit again.' : message;
	submitEl.innerText = 'Error: ' + error;
	submitEl.classList.add('has-error')
	hasError = true;
}

const resetError = () => {
	if (!hasError) {
		return;
	}
	submitEl.classList.remove('has-error')
	submitEl.classList.remove('is-disabled')
	submitEl.innerText = 'Submit RSVP'
}

const handleSubmit = async event => {
	submitEl.classList.add('is-disabled');
	submitEl.classList.add('is-loading');
	event.preventDefault();

	try {
		const email = document.querySelector('#email').value
		const response = await fetch(
			`https://deft-capybara-b966ac.netlify.app/.netlify/functions/addToNewsletterList?email=${email}`,
		);

		submitEl.classList.remove('loading');

		if (!response.ok) {
			const json = await response.json();
			setErrorMessage(json.message);
			return;
		}

		submitEl.innerText = 'Submitted';
	} catch (responseError) {
		setErrorMessage(responseError?.message ?? 'Server error');
	}

	return false;
};

