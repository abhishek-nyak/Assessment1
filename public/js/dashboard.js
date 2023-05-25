// dashboard.js


const menuButton = document.querySelector('.menu-button');
const dashboardMenu = document.querySelector('.dashboard-menu');

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('open'); // Add 'open' class to toggle animation
  dashboardMenu.classList.toggle('show');
});