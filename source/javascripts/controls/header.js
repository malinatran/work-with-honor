/**
 * Header
 */
$(function() {

  /**
   * Sticky header
   */
  var $header = $('header');
  var $document = $(document);
  var $floatHeader = $('#floatmenu');
  var headerHeight = $header.outerHeight();
  var floatHeaderHeight = $floatHeader.height();
  var isScrollBelowHeader = false;
  var scrollTop = 0;

  function onScroll() {
    if(isScrollBelowHeader && $document.scrollTop() - scrollTop < 0) {
      $header.addClass('sticky');
    }
    else {
      $header.removeClass('sticky');
    }
    scrollTop = $document.scrollTop();
    if(scrollTop > headerHeight) {
      isScrollBelowHeader = true;
    }
    else {
      isScrollBelowHeader = false;
      $header.removeClass('sticky');
    }
  }

  $(document).on('scroll', onScroll);

});
