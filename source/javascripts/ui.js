/**
 * Sliders
 */
$(function() {

  /**
   * Adapt each slider to defined styles
   */
  function onSliderBefore(e) {
    var $el = $(e.in.el);
    var $parent = $el.parents('.section');
    var color = $el.data('color');
    var fontColor = $el.data('font-color');
    if($parent) {
      $parent.css({
        background: color || '',
        color: fontColor || ''
      });
    }
  }

  /**
   * Initialize page sliders
   */
  $('.slider').each(function(index, slider) {
    var id = 'slider-' + index;
    var $slider = $(slider);
    $slider.attr('id', id);
    var slidesCycle = [];
    $slider.find('.slide').each(function(slideIndex) {
      slidesCycle.push(slideIndex + 1 + '');
    });
    slidesCycle.push(slidesCycle[0]);
    slidr.create(id, {
      before: onSliderBefore,
      controls: 'none',
      breadcrumbs: true,
      direction: 'horizontal',
      fade: false,
      keyboard: true,
      overflow: true,
      pause: false,
      theme: '#222',
      timing: { 'cube': '0.5s ease-in' },
      touch: true,
      transition: 'fade'
    }).add('h', slidesCycle).auto($slider.data('timer') || 5000);
  });

  /**
   * Modals
   */
  $('a[data-modal]').on('click', function() {
    var $target = $('#modal-' + $(this).data('modal'));
    if($target) {
      $(document.body).addClass('noscroll');
      $target.addClass('visible');
    }
  });

  $('.modal a.close').on('click', function() {
    $(this).parents('.modal').removeClass('visible');
    $(document.body).removeClass('noscroll');
  });

});
