const parent = document.querySelector('.image');
const images = document.querySelectorAll('.image img');

let i = 1;
window.setInterval(() => {
	images.forEach((image, index) => {
		image.className = index === i ? 'is-active' : ''
	})
	parent.style.backgroundImage = `url(${images[i].src})`;
	i = i < 2 ? i + 1 : 0;
}, 4000);