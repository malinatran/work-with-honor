/**
 * Sharebar
 */
$(function() {

  function openWindow(url, title, width, height) {
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
    var windowWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((windowWidth / 2) - (width / 2)) + dualScreenLeft;
    var top = ((windowHeight / 2) - (height / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if(window.focus) {
      newWindow.focus();
    }
  }

  // share links
  $('.sharebar').on('click', 'a', function() {
    if($(this).hasClass('mail')) {
      return true;
    }
    openWindow(this.href, '', $(this).data('width'), $(this).data('height'));
    return false;
  });

});
