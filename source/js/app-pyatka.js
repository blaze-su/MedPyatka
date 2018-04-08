;
var $ = document;

window.onload = () => {
  if ($.querySelector('.control-sort')) listingSort($.querySelector('.listing__generated-container'));
  if ($.querySelector('.listing-filter')) listingFilter();
  if ($.querySelector('.search')) search($.querySelector('.listing'));
  if ($.querySelector('.cart__grid-overview')) cartGalery();
  if ($.querySelector('.go-top')) goTop();
  if ($.querySelector('.header-contacts'))
    $.querySelector('.header-contacts').onclick = () => popup('contacts');
  if ($.querySelector('.cart-info__presence'))
    $.querySelector('.cart-info__presence').onclick = () => popup('contacts');
  if ($.querySelector('.pagination')) pagination();
  if ($.querySelector('.listing-filter__control')) filterShow();
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
  $.querySelector('.go-top').onclick = () => {
    window.scrollTo(0, 0)
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
    $.querySelector('.popup.-show').querySelector('.popup__close-btn').onclick = () => {
      $.querySelector('.popup.-show').classList.remove('-show');
    };
  }
};