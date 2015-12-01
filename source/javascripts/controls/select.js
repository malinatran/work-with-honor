/**
 * Select
 */
$(function() {

  // current select
  var currentSelect = null;

  // close current select
  function closeCurrentSelect() {
    if(currentSelect === null) {
      return;
    }
    $(document.body).removeClass('nooverflow');
    currentSelect.removeClass('active');
    document.removeEventListener('click', onDocumentClick, true);
  }

  // on document click
  function onDocumentClick(event) {
    var $dropdown = currentSelect.find('ul.dropdown');
    if(currentSelect.has(event.target).length === 0) {
      closeCurrentSelect();
    }
  }

  // on select click
  function onSelectClick(event) {
    var $this = $(this);
    var $target = $(event.target)

    // close current select box
    if(currentSelect !== null && currentSelect.attr('id') !== $this.attr('id')) {
      closeCurrentSelect();
    }

    currentSelect = $this;

    // on item click
    if($target.is('li')) {
      currentSelect.find('select').val($target.html());
      currentSelect.find('.value').html($target.html());
      currentSelect.find('label.error').remove();
      closeCurrentSelect();
    }
    else {
      currentSelect.toggleClass('active');
      if(currentSelect.hasClass('active')) {
        $(document.body).addClass('nooverflow');
        document.addEventListener('click', onDocumentClick, true);
      }
    }

  }

  /**
   * Select form control
   */
  $('.field .select').each(function(index, select) {
    var $dropdown = null;
    var $this = $(this);
    var $select = $this.find('select');
    $select.addClass('activated');
    $this.prop('id', 'select-' + index);

    // copy avaialable options
    var children = $select.find('option').map(function() {
      if($(this).prop('value') == '') {
        return null;
      }
      return '<li>' + $(this).html() + '</li>';
    });
    $this.append('<ul class="dropdown">' + children.get().join('') + '</ul>');
    $dropdown = $this.find('ul.dropdown');

    // bind click event
    $this.on('click', onSelectClick);

    // bind select change event
    $select.on('change', function(e) {
      $(document.body).removeClass('nooverflow');
      $this.find('.value').html($select.val());
    });

  });

});
