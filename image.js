const parent = document.querySelector('.image');
const images = document.querySelectorAll('.image img');

const preload = () => Promise.all([...images].map(async ({ srcset }) => {
	const image = new Image();
	image.decoding = 'async'
	image.srcset = srcset;
	await image.decode()
	return;
}));

const runSlider = () => {
	document.documentElement.style.transition = 'opacity 1s ease-in';
	document.documentElement.style.opacity = 1;
	document.documentElement.style.backgroundColor = 'transparent';
	let i = 1;
	window.setInterval(() => {
		images.forEach((image, index) => {
			image.className = index === i ? 'is-active' : ''
		})
		parent.style.backgroundImage = `url(${images[i].src})`;
		i = i < 2 ? i + 1 : 0;
	}, 4000);
}

preload().then(runSlider)