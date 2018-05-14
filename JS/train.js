console.log('hello');
let nav = document.querySelector('.nav');
let open = document.querySelector('.hamburger-menu-link');
let close = document.querySelector('.hamburger-menu-x');
let htmlObj = document.querySelector('html');

let best = document.querySelector('.best');
let team = document.querySelector('.team');
let menu = document.querySelector('.menu');
let reviews = document.querySelector('.reviews');
let slider = document.querySelector('.slider');
let contacts = document.querySelector('.contacts');

let refs = document.querySelectorAll('.nav__link');
const active = 'active';
const navActive = 'nav--active';
let flag = false;

open.addEventListener('click',function(event){
  event.preventDefault();
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  nav.classList.toggle(navActive);
  flag = true;
});

close.addEventListener('click',function(event){
  event.preventDefault();
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  nav.classList.toggle(navActive);
  flag = false; 
});

refs[0].addEventListener('click',function(event){
  event.preventDefault();
  if(flag==true){
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  best.classList.toggle(navActive);
}
  flag = false;
  best.scrollIntoView(true);
});

refs[1].addEventListener('click',function(event){
  event.preventDefault();
  if(flag==true){
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  nav.classList.toggle(navActive);
}
  flag = false;
  slider.scrollIntoView(true);
});


refs[2].addEventListener('click',function(event){
  event.preventDefault();
  if(flag==true){
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  nav.classList.toggle(navActive);
}
  flag = false;
  team.scrollIntoView(true);
});
refs[3].addEventListener('click',function(event){
  event.preventDefault();
  if(flag==true){
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  nav.classList.toggle(navActive);
}
  flag = false;
  menu.scrollIntoView(true);
});
refs[4].addEventListener('click',function(event){
  event.preventDefault();
  if(flag==true){
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  nav.classList.toggle(navActive);
}
  flag = false;
  reviews.scrollIntoView(true);
});
refs[5].addEventListener('click',function(event){
  event.preventDefault();
  if(flag==true){
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  nav.classList.toggle(navActive);
}
  flag = false;
  contacts.scrollIntoView(true);
});
