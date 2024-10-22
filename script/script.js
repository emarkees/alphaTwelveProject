const hamburger = document.getElementById('hamburger');
const menuIcon = document.getElementById('menu-icon');
const navLinksContainer = document.querySelector('.nav-links-container');


//Function to toggle the menu and sidebar
function toggleMenu() {
  navLinksContainer.classList.toggle('active');
  if (hamburger.classList.toggle('active')) {
  //   menuIcon.src = './Assets/Images/hamburger.svg'
  // } else {
  //   menuIcon.src = './Assets/Images/Home.png';
  }
};

// Add click event listener to the hamburger menu
hamburger.addEventListener('click', toggleMenu);

document.querySelectorAll('nav-menu')
.forEach((n) => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navLinksContainer.classList.remove('active')
}));

