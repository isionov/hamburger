
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
  $('body').addClass('active');
  $('html').addClass('active');
  $('.nav').addClass('nav--active')
  flag = true;
});

close.addEventListener('click', function (event) {
  event.preventDefault();
  $('body').removeClass('active');
  $('html').removeClass('active');
  $('.nav').removeClass('nav--active')
  flag = false;
});

// slider

let slider__list = document.querySelector('.slider__list');
let slider_back = document.querySelector('.slider-back');
let slider_forward = document.querySelector('.slider-forward');
const step = 20;
const maxX = 80;
const minX = 0;
let currentX = 0;
slider__list.style.transform = 'translateX(-' + currentX + '%)';

slider_forward.addEventListener('click', function (event) {
  console.log(event.srcElement);
  if (currentX < 80) {
    currentX += step;
    slider__list.style.transform = 'translateX(-' + currentX + '%)';
  } else if (currentX == 80) {
    currentX = 0;
    slider__list.style.transform = 'translateX(-' + currentX + '%)';
  }
});

slider_back.addEventListener('click', function (event) {
  console.log(event.srcElement);
  if (currentX > 0) {
    currentX -= step;
    console.log(currentX);
    slider__list.style.transform = 'translateX(-' + currentX + '%)';
  } else if (currentX == 0) {
    currentX = 80;
    slider__list.style.transform = 'translateX(-' + currentX + '%)';
  }
});


// reviews

let reviewsParent = document.querySelector('.reviews');
const tamplate = document.querySelector('#overlayTemplate').innerHTML;
const overlay = createOverlay(tamplate);

reviewsParent.addEventListener('click', e => {
  e.preventDefault();
  console.log(e.target.classList.contains('reviews__ref'));
  if (e.target.classList.contains('reviews__ref')) {
    console.log('yes');
    let reviewContent = closest(e.target, 'reviews__wrap');
    console.log(reviewContent.childNodes[1].textContent);
    console.log(reviewContent.childNodes[3].textContent);
    if (!!reviewContent) {
      overlay.setContent(reviewContent.childNodes[1].textContent, reviewContent.childNodes[3].textContent);
      overlay.open();
    }
  }
});

function createOverlay(template) {
  let fragment = document.createElement('div');
  fragment.innerHTML = template;


  const overlayElement = fragment.querySelector('.overlay');
  const contentElement = fragment.querySelector('.overlay__text');
  const contentElementTitle = fragment.querySelector('.overlay__title');
  const closeElement = fragment.querySelector('.overlay__close');

  fragment = null;

  overlayElement.addEventListener('click', e => {
    console.log('click');
    if (e.target.parentNode === overlayElement) {
      closeElement.click();
      console.log('click2');
    }
  });

  closeElement.addEventListener('click', () => {
    reviewsParent.removeChild(overlayElement);
  });

  return {
    open() {
      reviewsParent.appendChild(overlayElement);
    },
    close() {
      closeElement.click();
    },
    setContent(contentTitle, contentText) {
      contentElement.textContent = contentText;
      contentElementTitle.textContent = contentTitle;
    }
  };
};

//team
$(function () {

  $('.acco__trigger').on('click', function (e) {
    e.preventDefault();

    let $this = $(this),
      liPicked = $this.closest('.acco__item'),
      acco = $this.closest('.acco'),
      accoItems = acco.find('.acco__item');
    activeItem = accoItems.filter('.acco__item--active');
    if (liPicked.hasClass('acco__item--active')) {
      liPicked.removeClass('acco__item--active');
    } else {
      liPicked.addClass('acco__item--active');
      activeItem.removeClass('acco__item--active');
    }

  })
});




//one page

const sections = $('.section');
const display = $('.maincontent');
let inScroll = false;

const setActiveFixedMenu = itemEq => {
  $('.fixed-menu__item').eq(itemEq).addClass('fixed-menu__link--active').siblings().removeClass('fixed-menu__link--active');
}

const performTransition = sectionEq => {
  const position = `-${sectionEq * 100}%`;

  if (inScroll) return;
  inScroll = true;
  sections.eq(sectionEq).addClass('section--active').siblings().removeClass('section--active');
  display.css({
    transform: `translateY(${position})`,
    '-webkit-transform': `translateY(${position})`
  });

  const transitionDuration = parseInt(display.css('transition-duration')) * 1000;
  setTimeout(() => {
    inScroll = false;
    setActiveFixedMenu(sectionEq);
  },
    transitionDuration + 300)

};

const scrollToSection = direction => {
  const activeSection = sections.filter('.section--active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();
  switch (true) {
    case direction==='up' && !!prevSection.length :
     performTransition(prevSection.index());
      break;
    case direction==='down' && !!nextSection.length :
    performTransition(nextSection.index());
      break;
  };

};

$(document).on({
  wheel : e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? 'down' : 'up';
    if (!e.originalEvent.ctrlKey) {
      scrollToSection(direction);
    }

    // if (!!e.originalEvent.target.closest('.contacts__content')) {
    //   console.log('set Options');
    //   map.setOptions({scrollwheel: false});
    //   console.log(map);
    //  }
  },
  keydown : e =>{
    switch (e.keyCode) {
      case 40:
        scrollToSection('down');
        break;
      case 38:
        scrollToSection('up');
        break;
    
      default:
        break;
    }
  },
  touchemove : e =>{
    e.preventDefault;
  }

});

$('[data-scroll-to]').on('click', e =>{
  e.preventDefault;
  const targetScroll =parseInt($(e.currentTarget).data('scroll-to'));
  console.log(targetScroll);
  performTransition(targetScroll);
  $('body').removeClass('active');
  $('html').removeClass('active');
  $('.nav').removeClass('nav--active')
})

$('.fixed-menu__item').on('click', e =>{
 
  performTransition($(e.currentTarget).index());
})


let md = new MobileDetect(window.navigator.userAgent);
if (md.mobile() || md.tablet()) {
  $(document).swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      swipeDirection = direction==='up'? 'down' : 'up';
      scrollToSection(swipeDirection);
    }
  });
}


function initMap() {
  // The location of Uluru
  var uluru = {lat: 59.900128, lng: 30.426957};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, center: uluru, gestureHandling: 'cooperative'});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}


// AJAX

$('#order-form').on('submit', submitForm);

function submitForm (ev) {
    ev.preventDefault();
    
    var form = $(ev.target),
        data = form.serialize(),
        url = form.attr('action'),
        type = form.attr('method');

    ajaxForm(form).done(function(msg) {
        var mes = msg.mes,
            status = msg.status;
        
        if (status === 'OK') {
            console.log('<p class="success">' + mes + '</p>');
        } else{
          console.log('<p class="error">' + mes + '</p>');
        }
    }).fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

};

// Универсальная функция для работы с формами
var ajaxForm = function (form) {
    var data = form.serialize(),
        url = form.attr('action');
    
    return $.ajax({
        type: type,
        url: url,
        dataType : 'JSON',
        data: data
    })
};