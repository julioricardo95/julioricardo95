let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.section_nav_list');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('open');
}
console.log('hola')