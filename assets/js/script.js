//sliders

const swiperWorkProcess = document.querySelector('.work_process') || null;
if (swiperWorkProcess) {
  document.addEventListener('DOMContentLoaded', () => {
    const removeSlider = document.querySelector('.work_process__swiper');
    const removeGrid = document.querySelector('.work_process-grid');
    const width = window.innerWidth
    if (width < 768) {
      const swiper = new Swiper('.work_process__swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 50,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      removeGrid.remove();
    } else {
      removeSlider.remove()
    }
  })
}

const swiperConstructionStages = document.querySelector('.construction_stages') || null;
if (swiperConstructionStages) {
  document.addEventListener('DOMContentLoaded', () => {
    const removeSlider = document.querySelector('.construction_stages-swiper');
    const removeGrid = document.querySelector('.construction_stages-grid');
    const width = window.innerWidth
    if (width < 768) {
      const swiper = new Swiper('.construction_stages-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 50,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      removeGrid.remove();
    } else {
      removeSlider.remove()
    }
  })
}

const swiperReviews = document.querySelector('.construction_reviews') || null;
if (swiperReviews) {
  const sliderReviews = new Swiper('.construction_reviews-slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
      1880: {
        slidesPerView: 'auto',
        spaceBetween: 50,
      }
    }
  });
}

const swiperProjects = document.querySelector('.projects') || null;
if (swiperProjects) {
  const sliderProjects = new Swiper('.projects__swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 50,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
    }
  });
}


const swiperAboutUs = document.querySelector('.about_team__swiper') || null;
if (swiperAboutUs) {
  let sliderAboutUs = new Swiper('.about_team__swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 'auto',
      }
    }
  });
}

//


// tabs

const tabs = document.querySelectorAll('.tabs__btn-item');
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function () {
    for (let j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove('tabs__btn-item_active');
    }
    this.classList.add('tabs__btn-item_active');
  });
}

//


//form validation

const form = document.querySelector('.form') || null;
const reviewData = new FormData();
const thanksModal = document.querySelector('.thanks_modal');
if (form) {
  form.addEventListener('submit', (e) => {
    const userName = document.querySelector('#userName');
    const userPhone = document.querySelector('#userPhone');
    const textMessage = document.querySelector('#textMessage');
    resetField(form.querySelector('[name="phoneUser"]'));
    resetField(form.querySelector('[name="textMessage"]'));
    resetField(form.querySelector('[name="userName"]'));

    e.preventDefault();
    let valid = true;
    if (!phoneValidation(form.querySelector('[name="phoneUser"]'))) {
      valid = false;
      userPhone.classList.add('error');
    } else {
      userPhone.classList.remove('error');
    }
    if (!textValidation(form.querySelector('[name="textMessage"]'))) {
      valid = false;
      textMessage.classList.add('error');
    } else {
      textMessage.classList.remove('error');
    }
    if (!userValidation(form.querySelector('[name="userName"]'))) {
      valid = false;
      userName.classList.add('error');
    } else {
      userName.classList.remove('error');
    }
    if ( valid ) {
      reviewData.append('review_message', textMessage);
      reviewData.append('review_name', userName);
      reviewData.append('review_phone', userPhone);

      sendForm(
          reviewData,
          '/wp-admin/admin-ajax.php'
      ).then( response => {
          if ( response.status === 'success' ) {
              thanksModal.classList.add('thanks_modal-active');

              setTimeout(() => {
                  thanksModal.classList.remove('thanks_modal-active');
              }, 3000);
          } else {
          }
      });
  }
  });

  form.querySelector('[name="userName"]').addEventListener('input', () => {
    resetField(userName);
  });
  form.querySelector('[name="phoneUser"]').addEventListener('input', () => {
    resetField(userPhone);
  });
  form.querySelector('[name="textMessage"]').addEventListener('input', () => {
    resetField(textMessage);
  });
  function userValidation(elem) {
    const regex = /^[a-zA-Za-яА-Я -]{2,25}$/gm;;
    const elemVal = elem.value;
    let valid = false;
    valid = regex.test(elemVal);
    return valid;
  }

  function phoneValidation(elem) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const elemVal = elem.value;
    let valid = false;
    valid = regex.test(elemVal);
    return valid;
  }

  function textValidation(elem) {
    const regex = /^[a-zA-Za-яА-Я0-9 -]{2,450}$/gm;;
    const elemVal = elem.value;
    let valid = false;
    valid = regex.test(elemVal);
    return valid;
  }

  function resetField(elem) {
    elem.classList.remove('error');
  }
}


async function sendForm( formData, url ) {

  let request = await fetch(
      url,
      {
          method: 'POST',
          body: formData
      }
  );

  let response = await request.json();

  return response;
}
//



// header fixed

var element = document.querySelector('.header');
window.addEventListener('scroll', function () {
  if (window.scrollY > 1) {
    element.classList.add("fixed");
  } else {
    element.classList.remove("fixed");
  }
});

//


// overlay menu active

const mobileNav = document.querySelector('.menu_overlay');
const mobileMenuActive = document.querySelector('.mobile__menu');
const body = document.querySelector('body');
const closeBtn = document.querySelector('.content__top-left-close');
const bodyFixed = document.querySelector('.body__fixed');
const nav = document.querySelector('nav');

mobileMenuActive.addEventListener('click', () => {
  mobileNav.classList.add('menu_overlay-active');
  body.classList.add('body__fixed');
  closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('menu_overlay-active');
    body.classList.remove('body__fixed');
  });

});

//



// rubber textarea

var textarea = document.querySelector('textarea');
textarea.addEventListener('input', autoResize, false);
function autoResize() {
  this.style.height = '20px';
  this.style.height = this.scrollHeight + 'px';
}

//



// youtube player API

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    videoId: '8WtRKHwVROs',
    playerVars: {
      'controls': 1,
      'modestbranding': 1,
      'rel': 0,
      'showinfo': 0,
      'fs': 0,
      'autoplay': 0
    }
  });
}
function playVideo() {
  player.playVideo();
  document.getElementById("play").remove();
  document.getElementById("bg").style = 'display:none';
}

//


// accordion

const accordion = document.querySelectorAll('.accordion_item-title');

accordion.forEach((item) => {
  item.addEventListener('click', () => {
    const parent = item.parentNode;
    let content = item.nextElementSibling;
    
    if (parent.classList.contains('accordion_item-active' || null)) {
      parent.classList.remove('accordion_item-active');
    } else {
      document.querySelectorAll('.accordion_item').forEach((child) => child.classList.remove('accordion_item-active'))
      parent.classList.add('accordion_item-active')
      
      
    }
  })
})


 //


 // function closeModal

const closeModal = document.querySelector('.thanks_modal-close');
function closeThanksModal() {
  closeModal.addEventListener('click', () => {
    thanksModal.classList.remove('thanks_modal-active');
  })
}


//
closeThanksModal();