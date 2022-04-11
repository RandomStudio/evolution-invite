const parent = document.querySelector('.image');
const images = document.querySelectorAll('.image img');

const preload = () => Promise.all([...images].map(async ({ srcset }) => {
	const image = new Image();
	image.decoding = 'async'
	image.srcset = srcset;
	image.sizes = "(max-width: 939px) 100vw, 50vw"
	await image.decode()

	return;
}));

const runSlider = () => {
	document.body.style.transition = 'opacity 1s ease-in';
	document.body.style.opacity = 1;
	let i = 1;
	window.setInterval(() => {
		images.forEach((image, index) => {
			image.className = index === i ? 'is-active' : ''
		})
		i = i < 2 ? i + 1 : 0;
	}, 6000);
}

preload().then(runSlider)