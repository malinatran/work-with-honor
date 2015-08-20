/**
 * Sliders
 */
$(function() {

  $('.slider').each(function(index, slider) {
    var id = 'slider-' + index;
    $(slider).attr('id', id);
    slidr.create(id, {
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
    }).start();
  });

});
