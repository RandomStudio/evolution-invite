const images = document.querySelectorAll('.image img');

let i = 1;
window.setInterval(() => {
	console.log(i)
	images.forEach((image, index) => {
		image.className = index === i ? 'is-active' : ''
	})
	i = i < 2 ? i + 1 : 0;
}, 4000);