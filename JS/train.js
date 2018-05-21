
//navigation
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

open.addEventListener('click', function (event) {
  event.preventDefault();
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  nav.classList.toggle(navActive);
  flag = true;
});

close.addEventListener('click', function (event) {
  event.preventDefault();
  document.body.classList.toggle(active);
  htmlObj.classList.toggle(active);
  nav.classList.toggle(navActive);
  flag = false;
});

refs[0].addEventListener('click', function (event) {
  event.preventDefault();
  if (flag == true) {
    document.body.classList.toggle(active);
    htmlObj.classList.toggle(active);
    nav.classList.toggle(navActive);
  }
  flag = false;
  best.scrollIntoView(true);
});

refs[1].addEventListener('click', function (event) {
  event.preventDefault();
  if (flag == true) {
    document.body.classList.toggle(active);
    htmlObj.classList.toggle(active);
    nav.classList.toggle(navActive);
  }
  flag = false;
  slider.scrollIntoView(true);
});


refs[2].addEventListener('click', function (event) {
  event.preventDefault();
  if (flag == true) {
    document.body.classList.toggle(active);
    htmlObj.classList.toggle(active);
    nav.classList.toggle(navActive);
  }
  flag = false;
  team.scrollIntoView(true);
});
refs[3].addEventListener('click', function (event) {
  event.preventDefault();
  if (flag == true) {
    document.body.classList.toggle(active);
    htmlObj.classList.toggle(active);
    nav.classList.toggle(navActive);
  }
  flag = false;
  menu.scrollIntoView(true);
});
refs[4].addEventListener('click', function (event) {
  event.preventDefault();
  if (flag == true) {
    document.body.classList.toggle(active);
    htmlObj.classList.toggle(active);
    nav.classList.toggle(navActive);
  }
  flag = false;
  reviews.scrollIntoView(true);
});
refs[5].addEventListener('click', function (event) {
  event.preventDefault();
  if (flag == true) {
    document.body.classList.toggle(active);
    htmlObj.classList.toggle(active);
    nav.classList.toggle(navActive);
  }
  flag = false;
  contacts.scrollIntoView(true);
});

// menu

let menu_list = document.querySelectorAll('.menu__list-elem');
let activeObj = { numE: 0, hasE: false }

for (let index = 0; index < menu_list.length; index++) {
  const element = menu_list[index];
  if (element.classList.contains('.menu__list-elem--active')) {
    activeObj.hasE = true;
    active.numE = index;
  }
}

menu.addEventListener('click', function (event) {
  if (!!!closest(event.srcElement, 'menu__list-content')) {
    let parent = closest(event.srcElement, 'menu__list-elem');
    let currentIndex = 0;
    for (let index = 0; index < menu_list.length; index++) {
      const element = menu_list[index];
      if (element === parent) {
        currentIndex = index;
      }
    }
    if (activeObj.hasE === false) {
      parent.classList.toggle('menu__list-elem--active');
      activeObj.numE = currentIndex;
      activeObj.hasE = true;
    } else if (activeObj.numE != currentIndex) {
      menu_list[activeObj.numE].classList.toggle('menu__list-elem--active');
      parent.classList.toggle('menu__list-elem--active');
      activeObj.numE = currentIndex;
      activeObj.hasE = true;
    } else {
      menu_list[activeObj.numE].classList.toggle('menu__list-elem--active');
      activeObj.hasE = false;
    }
  }
});

function closest(el, cl) {
  let elem = el;
  while (!elem.classList.contains(cl)) {
    if (elem.tagName.toLowerCase() == 'html') return false;
    elem = elem.parentNode;
  }
  return elem;
}

//slider

let slider__list = document.querySelector('.slider__list');
let slider_back = document.querySelector('.slider-back');
let slider_forward = document.querySelector('.slider-forward');
const step = 20;
const maxX = 80;
const minX = 0;
let currentX = 0;
slider__list.style.transform = 'translateX(-'+ currentX + '%)'; 

slider_forward.addEventListener('click', function(event){
  console.log(event.srcElement);
  if (currentX<80) {
    currentX+=step;
    slider__list.style.transform = 'translateX(-'+ currentX + '%)'; 
  } else if (currentX==80) {
    currentX=0;
    slider__list.style.transform = 'translateX(-'+ currentX + '%)'; 
  }
});

slider_back.addEventListener('click', function(event){
  console.log(event.srcElement);
  if (currentX>0) {
    currentX-=step;
    console.log(currentX);
    slider__list.style.transform = 'translateX(-'+ currentX + '%)'; 
  } else if (currentX==0) {
    currentX=80;
    slider__list.style.transform = 'translateX(-'+ currentX + '%)'; 
  }
});


// reviews

// const openButtons = document.getElementsByClassName('.reviews__ref');
let reviewsParent = document.querySelector('.reviews');
const tamplate = document.querySelector('#overlayTemplate').innerHTML;
const overlay = createOverlay(tamplate);

reviewsParent.addEventListener('click', e=>{
  e.preventDefault();
  console.log(e.target.classList.contains('reviews__ref'));
  if (e.target.classList.contains('reviews__ref')) {
    console.log('yes');
    let reviewContent = closest(e.target,'reviews__wrap');
    console.log(reviewContent.childNodes[1].textContent);
    console.log(reviewContent.childNodes[3].textContent);
    if (!!reviewContent) {
      overlay.setContent(reviewContent.childNodes[1].textContent,reviewContent.childNodes[3].textContent);
      overlay.open();
    }
  }
});

function createOverlay(template){
  let fragment = document.createElement('div');
  fragment.innerHTML = template;


  const  overlayElement = fragment.querySelector('.overlay');
  const contentElement = fragment.querySelector('.overlay__text');
  const contentElementTitle = fragment.querySelector('.overlay__title');
  const closeElement = fragment.querySelector('.overlay__close');

  fragment = null;

  overlayElement.addEventListener('click', e => {
    console.log('click');
    if (e.target.parentNode=== overlayElement) {
      closeElement.click();
      console.log('click2');
    }
  });

  closeElement.addEventListener('click', ()=>{
    reviewsParent.removeChild(overlayElement);
  });

  return{
    open(){
      reviewsParent.appendChild(overlayElement);
    },
    close(){
      closeElement.click();
    },
    setContent(contentTitle,contentText){
      contentElement.textContent=contentText;
      contentElementTitle.textContent = contentTitle;
    }
  };
};


//one page
$(document).ready(function() {
  $('#fullpage').fullpage({
    scrollBar: true,
  });
});