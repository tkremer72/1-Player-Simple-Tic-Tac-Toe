/* Peferred method with JS Event Listener */
const toggleButton = document.getElementById('toggle-menu');
const naviList = document.getElementById('navi-list');
toggleButton.addEventListener('click', () => {
     naviList.classList.toggle('active');
})

/* HTML Event Method */

/* function toggleMenu() {
     const naviList = document.getElementById('navi-list');
     naviList.classList.toggle('active');
} */