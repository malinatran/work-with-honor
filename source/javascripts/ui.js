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
   * Start slider
   */
  function startSlider(id, $slider, cycle) {
    slidr.create(id, {
      before: onSliderBefore,
      controls: $slider.data('controls') || 'none',
      breadcrumbs: true,
      direction: 'horizontal',
      fade: false,
      keyboard: true,
      overflow: true,
      pause: false,
      theme: '#222',
      timing: { 'cube': '0.5s ease-in' },
      touch: false,
      transition: 'fade'
    }).add('h', cycle).auto($slider.data('timer') || 5000);
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
    startSlider(id, $slider, slidesCycle);
  });

  /**
   * Initialize sliders slices
   */
  $('.slice[data-slicetype=slides]').each(function(index, slider) {
    var id = 'slides-' + index;
    var $slider = $(slider);
    $slider.addClass('slider');
    $slider.attr('id', id);
    var slidesCycle = [];
    $slider.find('section').each(function(slideIndex, slide) {
      $(slide).addClass('slide');
      $(slide).attr('data-slidr', slideIndex + 1);
      slidesCycle.push(slideIndex + 1 + '');
    });
    // slice controls
    if($slider.hasClass('controls')) {
      $slider.data('controls', 'border');
    }
    slidesCycle.push(slidesCycle[0]);
    startSlider(id, $slider, slidesCycle);
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

  // modal close
  $('.modal a.close').on('click', function() {
    $(this).parents('.modal').removeClass('visible');
    $(document.body).removeClass('noscroll');
  });

  // form controls
  $('form').each(function(index, form) {
    var $form = $(form);
    $form.attr('id', 'form-' + index);
    $form.find('input').addClass('empty');
    $form.on('input', 'input', function() {
      if($(this).val()) {
        $(this).removeClass('empty').addClass('filled');
      }
      else {
        $(this).addClass('empty');
      }
    })
    $form.validate({
      submitHandler: function(form, event) {
        event.preventDefault();
        var $form = $(form);
        var action = $form.attr('action');
        var buttonMessage = $form.data('buttonMessage') || null;
        if($form.data('submitting')) {
          return;
        }
        $form.data('submitting', true);
        $.post(action, $form.serialize(), function() {
          $form.data('submitting', false);
          if(buttonMessage) {
            $form.find('button[type=submit]').addClass('aqua').html(buttonMessage);
            $form.find('.success').removeClass('hidden');
          }
        });
      }
    });
  });

  // options form control
  $('.options').on('click', '.option', function() {
    var $this = $(this);
    var $parent = $(this).parents('.options');
    $parent.find('.option').removeClass('active');
    $this.addClass('active');
    $parent.find('input').val($this.data('value'));
    $parent.find('label.error').remove();
  });

  // categories slidedown
  $('.categories .value').on('click', function() {
    var $parent = $(this).parents('.categories');
    $parent.toggleClass('active');
    if($parent.hasClass('active')) {
      $parent.find('.values').slideDown('fast');
    }
    else {
      $parent.find('.values').slideUp('fast');
    }
  });

});

$(window).load(function() {
  if($('body').hasClass('work')) {
    $('.section.work').addClass('loaded');
    return;
  }
  $('.section.work').addClass('loaded');
  $('.section.work:not(.featured) .grid').isotope({
    itemSelector: '.entry',
    layoutMode: 'packery',
    percentPosition: true,
    isResizeBound: false
  });
});
