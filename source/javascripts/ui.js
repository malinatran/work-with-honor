/**
 * Sliders
 */
$(function() {

  $.validator.addMethod('greaterThan', function(value, element, params) {
    var startYear = $(params.start_year).val();
    var endYear = $(params.end_year).val();
    var endMonth = element.selectedIndex;
    var startMonth = $(params.start_month).prop('selectedIndex');

    return (startYear < endYear)
        || (startYear === endYear && startMonth <= endMonth) 
        || (endYear === null && endMonth === null);
  });

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
      breadcrumbs: $slider.data('breadcrumbs') === false ? false : true,
      direction: 'horizontal',
      fade: false,
      keyboard: true,
      overflow: true,
      pause: false,
      theme: '#222',
      timing: { 'cube': '0.5s ease-in' },
      touch: false,
      transition: $slider.data('transition') || 'fade'
    }).add('h', cycle).auto($slider.data('timer') || 10000);
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

  /**
   * Form controls
   */
  $('form').each(function(index, form) {

    var $form = $(form);
    $form.attr('id', 'form-' + index);
    $form.find('input').addClass('empty');

    // listen to input change
    $form.on('input propertychange', 'input,textarea', function() {
      if($(this).val()) {
        $(this).removeClass('empty').addClass('filled');
        $(this).parent().removeClass('empty').addClass('filled');
      }
      else {
        $(this).removeClass('filled').addClass('empty');
        $(this).parent().removeClass('filled').addClass('empty');
      }
    });

    $form.validate({

      rules: {
        end_month: {
          greaterThan: {
            start_year: 'select[name=start_year]',
            start_month: 'select[name=start_month]',
            end_year: 'select[name=end_year]',
          }
        }
      },

      messages: {
        end_month: {
          greaterThan: 'End date must come after start date.'
        }
      },

      // error label placement
      errorPlacement: function(error, element) {
        if(element.prop('tagName') === 'SELECT') {
          error.insertAfter(element);
          return;
        }
        error.insertAfter(element.parents('.field').find('label:first-of-type'));
      },

      submitHandler: function(form) {
        form.submit();
        $('b.success').removeClass('hidden');

        // reset form
        // For some reason, without the timeout,
        // it submits an empty form. If it still
        // sends an empty form, an alternative may
        // just be to disable the submit button rather
        // than attempt to clear the form inputs.
        setTimeout(function() {
          form.reset();
          $('form .active').removeClass('active');
          $('form select').trigger('change');
        }, 1);

        return false;
     }

    });

  });

  // options form control
  $('.options').on('click', '.option', function() {
    var $this = $(this);
    var $parent = $(this).parents('.options');
    var value = $this.data('value');
    $parent.find('.option').removeClass('active');
    $this.addClass('active');
    $parent.find('select').val(value).trigger('change');
    $parent.find('input').val(value);
    $parent.find('label.error').remove();
  });

  $('.options').on('change', 'select', function() {
    var $this = $(this);
    var value = $this.val();
    var $parent = $(this).parents('.options');
    $parent.find('.option').removeClass('active');
    $parent.find('.option[data-value="' + value + '"]').addClass('active');
    $parent.find('input').val(value);
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
  $('.section.work').addClass('loaded');
  if($('body').hasClass('work')) {
    return;
  }
});
