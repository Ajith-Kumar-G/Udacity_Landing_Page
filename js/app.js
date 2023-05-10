/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

// Global Variables
const sections = ["About", "Rules", "Play", "Leaderboard"];
const navitems = ["Home", "About", "Rules", "Play", "Leaderboard"];


// Helper Functions
function navbar_responsive() {
  let x = document.querySelector(".navbar__menu");
  if (x.className === "navbar__menu") {
    x.className += " responsive";
  } else {
    x.className = "navbar__menu";
  }
}
function isElementInViewport (el) {
  let ele_vp = el.getBoundingClientRect();
  return (
   ( ele_vp.top +(ele_vp.height/3))>= 0 &&
    ele_vp.left >= 0 &&
    (ele_vp.bottom -(ele_vp.height/3) )<= (window.innerHeight) && 
    ele_vp.right <= (window.innerWidth)
  );
}

let prevScrollpos = window.scrollY;
function hideNav(){
  let currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".page__header").style.top = "0";
  } else {

    document.querySelector(".page__header").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}
document.addEventListener("DOMContentLoaded", () =>{
  scrollSection();
}
);

document.addEventListener("scroll", ()=>{hideNav();toggleActive();});
// Begin Main Functions



// building the nav

let navbar = document.getElementById("navbar__list");

for (const element of navitems) {
  let navitem = document.createElement("li");
  navitem.className = "nav-item";
  navitem.innerHTML = `<a>${element}</a>`;
  navbar.appendChild(navitem);
}
let navitem = document.createElement("li");
navitem.className = "more_items";
navitem.innerHTML = `<a href="javascript:void(0);"  onclick="navbar_responsive()"> More</a>`
navbar.appendChild(navitem);

// ScrollTO 
function scrollSection(){
  const nav_list =document.querySelectorAll("#navbar__list li.nav-item");
  const section_elements = document.querySelector("main").children;
  for(let i=0;i<section_elements.length;i++) {
    nav_list[i].addEventListener("click", function(event){
      event.preventDefault()
      section_elements[i].scrollIntoView({ block: "center",behavior:'smooth' });
    });
  }
}


// Add class 'active' to section when near top of viewport
function toggleActive(){
  const nav_list =document.querySelectorAll("#navbar__list li.nav-item");
  const section_elements = document.querySelector("main").children;
  for(let i=0;i<section_elements.length;i++) {
    if(isElementInViewport(section_elements[i])){
      const curr = document.querySelector(".your-active-class");
      const curr_nav  = document.querySelector(".active_nav");
      if(curr && curr !== section_elements[i]){
        curr.classList.remove("your-active-class");
      }
      if(curr_nav &&  curr_nav !== nav_list[i]){
        curr_nav.classList.remove("active_nav");
      }
      section_elements[i].classList.add("your-active-class");
      nav_list[i].classList.add("active_nav")
      break;
    }

  }
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


