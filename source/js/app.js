;
var $ = document;

window.onload = () => {
  if ($.querySelector('.nav__list')) navMenu();
  if ($.querySelector('.control-sort')) listingSort($.querySelector('.listing__generated-container'));
  if ($.querySelector('.listing-filter')) listingFilter();
  if ($.querySelector('.search')) search($.querySelector('.listing'));
  if ($.querySelector('.cart__grid-overview')) cartGalery();
  if ($.querySelector('.go-top')) goTop();
  if ($.getElementById('form-phone')) phoneMask();
  if ($.querySelector('.pagination')) pagination();
  if ($.querySelector('.listing-filter__control')) filterShow();
  if ($.querySelector('.cart__preview-btn')) productPreview();
  swiper();
};

var navMenu = () => {
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
};

var productPreview = () => {
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
          if (item.classList.contains('-next')) $.querySelector('.cart__preview-list').scrollBy(100, 0);
          if (item.classList.contains('-prev')) $.querySelector('.cart__preview-list').scrollBy(-100, 0);
        }
      })
    }
  }
  main();
  window.addEventListener('resize', () => main());
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
};

var listingFilter = () => {
  var option = $.querySelectorAll('.listing-filter__item-header');
  option.forEach(item => {
    item.onclick = e => {
      var item = e.target;
      while (item.parentElement.classList.contains('listing-filter__item') == false) item = item.parentElement;
      item = item.parentElement;
      item.classList.toggle('-open');
    }
  })
};

var search = block => {
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
};

var cartGalery = () => {
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
};

var filterShow = () => {
  $.querySelector('.listing-filter__control').onclick = () => {
    $.querySelector('.listing-filter').classList.toggle("-show");
  }
};

var pagination = () => {
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

  if ($.body.clientWidth < 540) _hidden();

  window.onresize = () => {
    if ($.body.clientWidth < 540) _hidden();
    else _show();
  }
};

var goTop = () => {
  $.querySelector('.go-top').onclick = () => {
    window.scrollTo(0, 0)
  }
};

var swiper = () => {
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
};

var phoneMask = () => {
  if ($.getElementById('form-phone')) {
    var _phone = $.getElementById('form-phone');
    var _format = '+7(___)___-__-__';
    _phone.value = _format;
    MaskedInput({
      elm: _phone,
      format: _format,
      separator: '+7()-'
    });
  }
};

(function(a){a.MaskedInput=function(f){if(!f||!f.elm||!f.format){return null}if(!(this instanceof a.MaskedInput)){return new a.MaskedInput(f)}var o=this,d=f.elm,s=f.format,i=f.allowed||"0123456789",h=f.allowedfx||function(){return true},p=f.separator||"/:-",n=f.typeon||"_YMDhms",c=f.onbadkey||function(){},q=f.onfilled||function(){},w=f.badkeywait||0,A=f.hasOwnProperty("preserve")?!!f.preserve:true,l=true,y=false,t=s,j=(function(){if(window.addEventListener){return function(E,C,D,B){E.addEventListener(C,D,(B===undefined)?false:B)}}if(window.attachEvent){return function(D,B,C){D.attachEvent("on"+B,C)}}return function(D,B,C){D["on"+B]=C}}()),u=function(){for(var B=d.value.length-1;B>=0;B--){for(var D=0,C=n.length;D<C;D++){if(d.value[B]===n[D]){return false}}}return true},x=function(C){try{C.focus();if(C.selectionStart>=0){return C.selectionStart}if(document.selection){var B=document.selection.createRange();return -B.moveStart("character",-C.value.length)}return -1}catch(D){return -1}},b=function(C,E){try{if(C.selectionStart){C.focus();C.setSelectionRange(E,E)}else{if(C.createTextRange){var B=C.createTextRange();B.move("character",E);B.select()}}}catch(D){return false}return true},m=function(D){D=D||window.event;var C="",E=D.which,B=D.type;if(E===undefined||E===null){E=D.keyCode}if(E===undefined||E===null){return""}switch(E){case 8:C="bksp";break;case 46:C=(B==="keydown")?"del":".";break;case 16:C="shift";break;case 0:case 9:case 13:C="etc";break;case 37:case 38:case 39:case 40:C=(!D.shiftKey&&(D.charCode!==39&&D.charCode!==undefined))?"etc":String.fromCharCode(E);break;default:C=String.fromCharCode(E);break}return C},v=function(B,C){if(B.preventDefault){B.preventDefault()}B.returnValue=C||false},k=function(B){var D=x(d),F=d.value,E="",C=true;switch(C){case (i.indexOf(B)!==-1):D=D+1;if(D>s.length){return false}while(p.indexOf(F.charAt(D-1))!==-1&&D<=s.length){D=D+1}if(!h(B,D)){c(B);return false}E=F.substr(0,D-1)+B+F.substr(D);if(i.indexOf(F.charAt(D))===-1&&n.indexOf(F.charAt(D))===-1){D=D+1}break;case (B==="bksp"):D=D-1;if(D<0){return false}while(i.indexOf(F.charAt(D))===-1&&n.indexOf(F.charAt(D))===-1&&D>1){D=D-1}E=F.substr(0,D)+s.substr(D,1)+F.substr(D+1);break;case (B==="del"):if(D>=F.length){return false}while(p.indexOf(F.charAt(D))!==-1&&F.charAt(D)!==""){D=D+1}E=F.substr(0,D)+s.substr(D,1)+F.substr(D+1);D=D+1;break;case (B==="etc"):return true;default:return false}d.value="";d.value=E;b(d,D);return false},g=function(B){if(i.indexOf(B)===-1&&B!=="bksp"&&B!=="del"&&B!=="etc"){var C=x(d);y=true;c(B);setTimeout(function(){y=false;b(d,C)},w);return false}return true},z=function(C){if(!l){return true}C=C||event;if(y){v(C);return false}var B=m(C);if((C.metaKey||C.ctrlKey)&&(B==="X"||B==="V")){v(C);return false}if(C.metaKey||C.ctrlKey){return true}if(d.value===""){d.value=s;b(d,0)}if(B==="bksp"||B==="del"){k(B);v(C);return false}return true},e=function(C){if(!l){return true}C=C||event;if(y){v(C);return false}var B=m(C);if(B==="etc"||C.metaKey||C.ctrlKey||C.altKey){return true}if(B!=="bksp"&&B!=="del"&&B!=="shift"){if(!g(B)){v(C);return false}if(k(B)){if(u()){q()}v(C,true);return true}if(u()){q()}v(C);return false}return false},r=function(){if(!d.tagName||(d.tagName.toUpperCase()!=="INPUT"&&d.tagName.toUpperCase()!=="TEXTAREA")){return null}if(!A||d.value===""){d.value=s}j(d,"keydown",function(B){z(B)});j(d,"keypress",function(B){e(B)});j(d,"focus",function(){t=d.value});j(d,"blur",function(){if(d.value!==t&&d.onchange){d.onchange()}});return o};o.resetField=function(){d.value=s};o.setAllowed=function(B){i=B;o.resetField()};o.setFormat=function(B){s=B;o.resetField()};o.setSeparator=function(B){p=B;o.resetField()};o.setTypeon=function(B){n=B;o.resetField()};o.setEnabled=function(B){l=B};return r()}}(window));