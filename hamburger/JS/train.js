// Support function

function closest(elem, parentClass) {
  while (elem.parentNode) {
    if (elem.parentNode.classList.contains(parentClass)) {
      return elem.parentNode;
    }
    elem = elem.parentNode;
  }
  return null;
}

//navigation

(function() {
  let open = document.querySelector(".hamburger-menu-link");
  let close = document.querySelector(".hamburger-menu-x");

  open.addEventListener("click", function(event) {
    event.preventDefault();
    $("body").addClass("active");
    $("html").addClass("active");
    $(".nav").addClass("nav--active");
    flag = true;
  });

  close.addEventListener("click", function(event) {
    event.preventDefault();
    $("body").removeClass("active");
    $("html").removeClass("active");
    $(".nav").removeClass("nav--active");
    flag = false;
  });
})();

// slider
(function() {
  let slider__list = document.querySelector(".slider__list");
  let slider_back = document.querySelector(".slider-back");
  let slider_forward = document.querySelector(".slider-forward");
  const step = 20;
  let currentX = 0;
  slider__list.style.transform = "translateX(-" + currentX + "%)";

  slider_forward.addEventListener("click", function(event) {
    if (currentX < 80) {
      currentX += step;
      slider__list.style.transform = "translateX(-" + currentX + "%)";
    } else if (currentX == 80) {
      currentX = 0;
      slider__list.style.transform = "translateX(-" + currentX + "%)";
    }
  });

  slider_back.addEventListener("click", function(event) {
    if (currentX > 0) {
      currentX -= step;
      slider__list.style.transform = "translateX(-" + currentX + "%)";
    } else if (currentX == 0) {
      currentX = 80;
      slider__list.style.transform = "translateX(-" + currentX + "%)";
    }
  });
})();

//team
$(function() {
  $(".acco__trigger").on("click", function(e) {
    e.preventDefault();

    let $this = $(this),
      liPicked = $this.closest(".acco__item"),
      acco = $this.closest(".acco"),
      accoItems = acco.find(".acco__item");
    activeItem = accoItems.filter(".acco__item--active");
    if (liPicked.hasClass("acco__item--active")) {
      liPicked.removeClass("acco__item--active");
    } else {
      liPicked.addClass("acco__item--active");
      activeItem.removeClass("acco__item--active");
    }
  });
});

// menu
(function() {
  let activeElem = null;
  let menuElem = document.querySelectorAll(".menu__list-elem");

  menuElem.forEach((elem, index, arr) => {
    elem.addEventListener("click", e => {
      let content = e.currentTarget.getElementsByClassName(
        "menu__list-content"
      )[0];

      if (activeElem) {
        activeElem.style.width = "0";
      }

      if (activeElem === content) {
        activeElem = null;
      } else {
        content.style.width = "100%";
        activeElem = content;
      }
    });
  });
})();

// reviews
(function() {
  let reviewsParent = document.querySelector(".reviews");
  const tamplate = document.querySelector("#overlayTemplate").innerHTML;
  const overlay = createOverlay(tamplate);

  reviewsParent.addEventListener("click", e => {
    e.preventDefault();

    if (e.target.classList.contains("reviews__ref")) {
      let reviewContent = closest(e.target, "reviews__wrap");

      if (!!reviewContent) {
        overlay.setContent(
          reviewContent.childNodes[1].textContent,
          reviewContent.childNodes[3].textContent
        );
        overlay.open();
      }
    }
  });

  function createOverlay(template) {
    let fragment = document.createElement("div");
    fragment.innerHTML = template;

    const overlayElement = fragment.querySelector(".overlay");
    const contentElement = fragment.querySelector(".overlay__text");
    const contentElementTitle = fragment.querySelector(".overlay__title");
    const closeElement = fragment.querySelector(".overlay__close");

    fragment = null;

    overlayElement.addEventListener("click", e => {
      if (e.target.parentNode === overlayElement) {
        closeElement.click();
      }
    });

    closeElement.addEventListener("click", () => {
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
  }
})();

//one page

(function() {
  const sections = $(".section");

  const setActiveFixedMenu = itemEq => {
    $(".fixed-menu__item")
      .eq(itemEq)
      .addClass("fixed-menu__link--active")
      .siblings()
      .removeClass("fixed-menu__link--active");
  };

  const performTransition = function(sectionEq) {
    setTimeout(() => {
      sections[sectionEq].scrollIntoView({ behavior: "smooth" });
    }, 0);

    setActiveFixedMenu(sectionEq);
    sections
      .eq(sectionEq)
      .addClass("section--active")
      .siblings()
      .removeClass("section--active");
  };

  const scrollToSection = direction => {
    const activeSection = sections.filter(".section--active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();
    switch (true) {
      case direction === "up" && !!prevSection.length:
        performTransition(prevSection.index());
        break;
      case direction === "down" && !!nextSection.length:
        performTransition(nextSection.index());
        break;
    }
  };

  $(document).on({
    wheel: e => {
      const deltaY = e.originalEvent.deltaY;
      const direction = deltaY > 0 ? "down" : "up";
      if (!e.originalEvent.ctrlKey) {
        scrollToSection(direction);
      }
    },
    keydown: e => {
      switch (e.keyCode) {
        case 40:
          scrollToSection("down");
          break;
        case 38:
          scrollToSection("up");
          break;

        default:
          break;
      }
    },
    touchemove: e => {
      e.preventDefault;
    }
  });

  $("[data-scroll-to]").on("click", e => {
    e.preventDefault;
    const targetScroll = parseInt($(e.currentTarget).data("scroll-to"));
    performTransition(targetScroll);
    $("body").removeClass("active");
    $("html").removeClass("active");
    $(".nav").removeClass("nav--active");
  });

  $(".fixed-menu__item").on("click", e => {
    performTransition($(e.currentTarget).index());
  });

  let md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile() || md.tablet()) {
    $(document).swipe({
      //Generic swipe handler for all directions
      swipe: function(
        event,
        direction,
        distance,
        duration,
        fingerCount,
        fingerData
      ) {
        swipeDirection = direction === "up" ? "down" : "up";
        scrollToSection(swipeDirection);
      }
    });
  }
})();

// Map

(function() {
  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.76, 37.64],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 7
    });
    myMap.behaviors.disable("scrollZoom");
  }
  ymaps.ready(init);
})();

// AJAX

$("#order-form").on("submit", submitForm);

function submitForm(ev) {
  ev.preventDefault();

  var form = $(ev.target),
    data = form.serialize(),
    url = form.attr("action"),
    type = form.attr("method");

  ajaxForm(form)
    .done(function(msg) {
      var mes = msg.mes,
        status = msg.status;

      if (status === "OK") {
        console.log('<p class="success">' + mes + "</p>");
      } else {
        console.log('<p class="error">' + mes + "</p>");
      }
    })
    .fail(function(jqXHR, textStatus) {
      alert("Request failed: " + textStatus);
    });
}

// Универсальная функция для работы с формами
var ajaxForm = function(form) {
  var data = form.serialize(),
    url = form.attr("action");

  return $.ajax({
    type: type,
    url: url,
    dataType: "JSON",
    data: data
  });
};
