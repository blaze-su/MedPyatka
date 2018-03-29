;
var $ = document;

window.onload = () => {
  if ($.querySelector('.control-sort')) listingSort($.querySelector('.listing__generated-container'));
  if ($.querySelector('.listing-filter')) listingFilter();
  if ($.querySelector('.search')) search($.querySelector('.listing'));
  if ($.querySelector('.cart__grid-overview')) cartGalery();
  if  ($.querySelector('.go-top')) goTop();
  if ($.querySelector('.header-contacts')) popup();
  if ($.querySelector('.cart-info__presence')) popup();
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
goTop = () => {
  $.querySelector('.go-top').onclick = () => {
    window.scrollTo(0, 0)
  }
},
popup = () => {
  $.querySelector('.header-contacts').onclick = () => {
    if ($.querySelector('.popup.-product.-show'))
      $.querySelector('.popup.-product.-show').classList.remove('-show');
    $.querySelector('.popup.-index').classList.toggle('-show');
  };

  // $.querySelector('.cart-info__presence').onclick = () => {
  //   if ($.querySelectorAll('.popup.-show').length > 0)
  //     $.querySelectorAll('.popup.-show').classList.toggle('-show');
  //   $.querySelector('.popup.-product').classList.toggle('-show');
  // };

  $.querySelectorAll('.popup').onclick = (e) => {
    if (e.target.classList.contains("popup__close-btn"))
      e.target.parentElement.parentElement.classList.remove('-show');
  };
};