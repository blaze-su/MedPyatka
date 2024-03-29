;
var $ = document;

window.onload = () => {
  if ($.querySelector('.nav__list')) navMenu();
  if ($.querySelector('.control-sort')) listingSort($.querySelector('.listing__generated-container'));
  if ($.querySelector('.listing-filter')) listingFilter();
  if ($.querySelector('.search')) search($.querySelector('.listing'));
  if ($.querySelector('.cart__grid-overview')) cartGalery();
  if ($.querySelector('.go-top')) goTop();
  if ($.querySelector('.header-contacts'))
    $.querySelector('.header-contacts').onclick = () => popup('contacts');
  if ($.querySelector('.cart-info__presence'))
    $.querySelector('.cart-info__presence').onclick = () => popup('product');
  if ($.querySelector('.pagination')) pagination();
  if ($.querySelector('.listing-filter__control')) filterShow();
  if ($.querySelector('.cart__preview-btn')) productPreview();
  swiper();
};

var listingSort = block => {
  var option = $.querySelectorAll('.control-sort__option');
  option.forEach(item => {
    item.onclick = e => {
      var select = e.target.parentElement;

      select.classList.toggle('-open');

      if (select.classList.contains('-open')) {
        select.addEventListener('mouseleave', () => {
          select.classList.remove('-open');
          if (block) block.style.marginTop = "0px";
        })
      }

      var height = select.offsetHeight + 8;
      if (block) {
        if (block.style.marginTop != "0px" && block.style.marginTop != "")
          block.style.marginTop = "0px";
        else
          block.style.marginTop = "calc( -" + height + "px + " + 2.222 + "rem)";
      }
    }
  })
},
productPreview = () => {
  var items = [], curr;
  var main = () => {
    if ($.body.clientWidth <= 519) {
      if (items.length === 0) {
        for (let i = 0; i < $.querySelectorAll('.cart__preview').length; i++) {
          var item = $.querySelectorAll('.cart__preview')[i];
          items.push(item.getAttribute('src'));
          if ($.querySelector('.cart__photo').getAttribute('src') === item.getAttribute('src'))
            curr = i;
        }
      }
      $.querySelectorAll('.cart__preview-btn').forEach(item => {
        item.onclick = () => {
          if (item.classList.contains('-next')) {
            if (curr !== items.length - 1)
              $.querySelector('.cart__photo').setAttribute('src', items[++curr])
          }
          if (item.classList.contains('-prev')) {
            if (curr !== 0)
              $.querySelector('.cart__photo').setAttribute('src', items[--curr])
          }
        }
      })
    } else {
      if ($.querySelector('.cart__photo').getAttribute('src') !== $.querySelector('.cart__preview-item.-active').children[0].getAttribute('src')) {
        $.querySelector('.cart__preview-item.-active').classList.remove('-active');
        $.querySelectorAll('.cart__preview-item').forEach(item => {
          if (item.children[0].getAttribute('src') === $.querySelector('.cart__photo').getAttribute('src'))
            item.classList.add('-active');
          return false;
        })
      }
      $.querySelectorAll('.cart__preview-btn').forEach(item => {
        item.onclick = () => {
          if (item.classList.contains('-next')) {
            if ($.body.offsetWidth > 1169) $.querySelector('.cart__preview-list').scrollBy(0, 110);
            else $.querySelector('.cart__preview-list').scrollBy(100, 0);
          }
          if (item.classList.contains('-prev')) {
            if ($.body.offsetWidth > 1169)
              $.querySelector('.cart__preview-list').scrollBy(0, -110);
            else $.querySelector('.cart__preview-list').scrollBy(-100, 0);
          }
        }
      })
    }
  }
  main();
  window.addEventListener('resize', () => main());
},
navMenu = () => {
  var nav = $.querySelector('.nav__list'),
    navItems = nav.querySelectorAll('.nav__item'),
    lastNavItem = navItems[navItems.length - 1],
    navRemItems = $.querySelectorAll('.nav-remainder__item'),
    currLength,
    lengths = [],
    lastChildLength,
    maxLength,
    hidden = "-hidden";
  
  navItems.forEach((item, i) => {
    if (i !== navItems.length - 1) lengths.push(item.offsetWidth);
    else lastChildLength = item.offsetWidth;
    item.classList.add(hidden);
    item.classList.remove('-visible');
  });
  maxLength = nav.offsetWidth - 20 - lastChildLength;

  var _checkHiddenItem = () => {
    for (let i = 0; i < navItems.length - 1; i++) {
      if (navItems[i].classList.contains(hidden)) return true;
    }
  };

  var main = (resize) => {
    currLength = -20;
    lengths.forEach((item, i) => {
      if (resize === true) maxLength = nav.offsetWidth - 20 - lastChildLength;

      currLength += item + 20;

      if (currLength <= maxLength) {
        navItems[i].classList.remove(hidden);
        navRemItems[i].classList.add(hidden);
      } else {
        navItems[i].classList.add(hidden);
        navRemItems[i].classList.remove(hidden);
      }
    });

    if (_checkHiddenItem() === true) lastNavItem.classList.remove(hidden);

    if (resize === true) {
      if (_checkHiddenItem() !== true) lastNavItem.classList.add(hidden);
    }
  };

  main(false);
  window.addEventListener("resize", () => main(true));
},
listingFilter = () => {
  var option = $.querySelectorAll('.listing-filter__item-header');
  option.forEach(item => {
    item.onclick = e => {
      var item = e.target;
      while (item.parentElement.classList.contains('listing-filter__item') == false) item = item.parentElement;
      item = item.parentElement;
      item.classList.toggle('-open');
    }
  })
},
search = block => {
  var option = $.querySelectorAll('.search-form__option');
  option.forEach(item => {
    item.onclick = e => {
      var select = e.target.parentElement;
      if (select.classList.contains('-open')) {
        select.children[0].innerHTML = e.target.innerHTML;
      }
      select.classList.toggle('-open');
      
      select.addEventListener('mouseleave', () => {
        select.classList.remove('-open');
        if (block) block.style.marginTop = "0px";
      })
      
      var height = select.offsetHeight - 11;

      if (block) {
        if (block.style.marginTop != "0px" && block.style.marginTop != "")
          block.style.marginTop = "0px";
        else
          block.style.marginTop = "calc( -" + height + "px + " + 1.667 + "rem)";
      }
    }
  })
},
cartGalery = () => {
  var main = $.querySelector('.cart__photo');
  var preview = $.querySelectorAll('.cart__preview-item');

  preview.forEach(item => {
    if (item.childNodes[0].getAttribute('src') === main.getAttribute('src')) {
      item.classList.add('-active');
      return false;
    }
  })

  var _active = el => {
    $.querySelector('.cart__preview-item.-active').classList.remove('-active');
    el.classList.add('-active');
  }

  $.querySelector('.cart__preview-list').onclick = e => {
    if (e.target.classList.contains('cart__preview-item')) {
      main.setAttribute('src', e.target.childNodes[0].getAttribute('src'));
      _active(e.target);
    }
    if (e.target.classList.contains('cart__preview')) {
      main.setAttribute('src', e.target.getAttribute('src'));
      _active(e.target.parentElement);
    }
  }

  // maximize photo
  main.onclick = () => {
    var bg = $.createElement('div'),
      close = $.createElement('div'),
      next = $.createElement('div'),
      prev = $.createElement('div'),
      img = $.createElement('img');
    
    bg.className = 'modal';
    close.className = 'modal__close';
    next.className = 'modal__btn -next';
    prev.className = 'modal__btn -prev';
    img.className = 'modal__img';

    $.querySelector('.cart').appendChild(bg);
    bg.appendChild(close);
    bg.appendChild(next);
    bg.appendChild(prev);

    img.setAttribute('src', main.getAttribute('src'));
    img.setAttribute('alt', main.getAttribute('alt'));

    bg.appendChild(img);

    var items = [], obj = {}, curr;

    for (let i = 0; i < $.querySelectorAll('.cart__preview').length; i++) {
      obj = {};
      var item = $.querySelectorAll('.cart__preview')[i];
      obj.src = item.getAttribute('src');
      obj.alt = item.getAttribute('alt');
      items.push(obj);
      if ($.querySelector('.cart__photo').getAttribute('src') === item.getAttribute('src'))
        curr = i;
    }

    $.querySelectorAll('.modal__btn').forEach(item => {
      item.onclick = () => {
        if (item.classList.contains('-next')) {
          if (curr !== items.length - 1) {
            $.querySelector('.modal__img').setAttribute('src', items[++curr].src)
            $.querySelector('.modal__img').setAttribute('alt', items[curr].alt)
          }
        }
        if (item.classList.contains('-prev')) {
          if (curr !== 0)
            $.querySelector('.modal__img').setAttribute('src', items[--curr].src)
            $.querySelector('.modal__img').setAttribute('alt', items[curr].alt)
        }
      }
    });

    $.querySelector('.cart').querySelector('.modal__close').onclick = () => {
      $.querySelector('.cart').removeChild(bg);
    }
  }
},
filterShow = () => {
  $.querySelector('.listing-filter__control').onclick = () => {
    $.querySelector('.listing-filter').classList.toggle("-show");
  }
},
pagination = () => {
  var _hidden = () => {
    $.querySelector('.pagination').querySelectorAll("li").forEach(item => {
      if (!item.hasAttribute("class") && item.children[0].innerHTML != '...')
        item.style.display = "none";
    })
  };

  var _show = () => {
    $.querySelector('.pagination').querySelectorAll("li").forEach(item => {
      if (item.style.display == "none")
        item.removeAttribute("style");
    })
  };

  if (document.body.clientWidth < 540) _hidden();

  window.onresize = () => {
    if (document.body.clientWidth < 540) _hidden();
    else _show();
  }
},
goTop = () => {
  $.querySelector('.go-top').onclick = () => window.scrollTo(0, 0);

  var prodCont = $.querySelector('.listing__generated-container'),
    product = prodCont.querySelector('.product');

  var _inner = () => {
    if (prodCont.offsetHeight > product.offsetHeight * 4) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > product.offsetHeight * 4) {
          $.querySelector('.go-top').classList.add('-active');
        } else $.querySelector('.go-top').classList.remove('-active');
      });
    }
  };

  _inner();

  window.addEventListener('resize', () => {
    _inner();
  });
},
swiper = () => {
  if ($.querySelector('.news-slider')) {
    var indexSlider = new Swiper('.news-slider', {
      slideClass: "news-slider__image-box",
      slideActiveClass: "-active",
      wrapperClass: "news-slider__wrapper",
      pagination: {
        el: '.news-slider__nav',
        bulletElement: 'li',
        bulletClass: 'news-slider__nav-item',
        bulletActiveClass: '-active',
        clickable: true
      },
      loop: true,
      autoplay: {
        delay: 2200,
      },
    })
  }
  if ($.querySelector('.ticker')) {
    var tickerSlider = new Swiper('.ticker', {
      slideClass: "ticker__brand",
      wrapperClass: "ticker__wrapper",
      slidesPerView: 'auto',
      loop: true,
      autoplay: {
        delay: 2200,
      },
    })
  }
  if ($.querySelector('.models-slider')) {
    var popModelsSlider = new Swiper('.models-slider__wrapper', {
      slideClass: "product",
      wrapperClass: "models-slider__list",
      slidesPerView: 4,
      navigation: {
        nextEl: '.models-slider__btn.-next',
        prevEl: '.models-slider__btn.-prev',
      },
    })
  }
},
popup = (target) => {
  if (target == 'contacts') {
    if ($.querySelector('.popup.-product.-show'))
      $.querySelector('.popup.-product.-show').classList.remove('-show');
    $.querySelector('.popup.-contacts').classList.toggle('-show');
  }

  if (target == 'product') {
    if ($.querySelector('.popup.-contacts.-show'))
      $.querySelector('.popup.-product.-show').classList.remove('-show');
    $.querySelector('.popup.-product').classList.add('-show');
  }

  if ($.querySelector('.popup.-show')) {
    var popupShow = $.querySelector('.popup.-show');

    var _body = popupShow.querySelector('.popup__grid-body');

    var main = () => {
      var topH, bottomH, topH = _body.getBoundingClientRect().top - popupShow.getBoundingClientRect().top;
      if (popupShow.querySelector('.popup__grid-footer')) {
        bottomH = popupShow.querySelector('.popup__grid-footer').offsetHeight + 20;        
      }

      if (!popupShow.querySelector('.popup__grid-footer')) {
        _body.style.maxHeight = "calc(100vh - " + (topH + 10) + "px)";
      } else {
        _body.style.maxHeight = "calc(100vh - " + (topH + bottomH) + "px)";
      }
    }

    if ($.body.clientWidth <= 1024) main();
    window.addEventListener("resize", () => {
      if ($.body.clientWidth <= 1024) main();
      else _body.removeAttribute("style");
    })

    popupShow.querySelector('.popup__close-btn').onclick = () => {
      popupShow.classList.remove('-show');
    };
  }
};