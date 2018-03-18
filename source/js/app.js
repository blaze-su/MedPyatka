;
var $ = document;

window.onload = () => {
  if ($.getElementsByClassName('control-sort')) listingSort($.getElementsByClassName('listing__generated-container')[0]);
  if ($.getElementsByClassName('listing-filter')) listingFilter();
  if ($.getElementsByClassName('search')) search($.getElementsByClassName('listing')[0]);
};

var listingSort = block => {
  var option = Array.from($.getElementsByClassName('control-sort__option'));
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
      console.log(height);
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
  var option = Array.from($.getElementsByClassName('listing-filter__item-header'));
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
  var option = Array.from($.getElementsByClassName('search-form__option'));
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