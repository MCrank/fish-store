// Filter fish that are "on sale"

// Add fish to "Basket"

$.get('../db/fishes.json')
  .done(data => {
    console.log(data);
    writeFishes(data.fishes);
  })
  .fail(error => {
    console.error({ error });
  });

const writeFishes = arrayOfFishes => {
  let newString = '';
  arrayOfFishes.forEach(fish => {
    newString += `
    <div class="${fish.onSale ? 'on-sale' : ''}fish card col-md-6 col-md-offset-3">
      <div class="thumbnail">
        <img src="${fish.imageSoure}" alt="" width="40%">
        <div class="caption">
          <h3 id="thumbnail-label">${fish.name}</h3>
          <p>$<span class="price">${fish.basePrice}</span></p>
        </div>
        <div class="caption card-footer">
          <button class="add btn btn-danger">Add To Basket</button>
        </div>
      </div>
    </div>`;
  });
  $('#available').append(newString);
  bindEvents();
};

const bindEvents = () => {
  $('.add').on('click', e => {
    // What is the div that has the fish
    // Take that fish and move it to the 'snagged' div
    const fishToMove = $(e.target).closest('.fish');
    $('#snagged').append(fishToMove);
    // Button text => remove from basket | change class - 'add' to 'remove'
    $(e.target)
      .text('Remove from Basket')
      .addClass('remove')
      .removeClass('add');
    removeButtonEvents();
  });
};

const removeButtonEvents = () => {
  $('.remove').on('click', e => {
    const fishToRemove = $(e.target).closest('.fish');
    $('#available').append(fishToRemove);
    $(e.target)
      .text('Add To Basket')
      .addClass('add')
      .removeClass('remove');
    bindEvents();
  });
};

$('#show-sale').click(() => {
  // Grab all of the divs with class 'fish', give me just the ones without the class 'on-sale'
  $('.fish')
    .not('.on-sale')
    .toggle();
  $('#show-sale').text((i, text) => {
    if (text === 'Show Sale Fish') {
      return 'Show All Fish';
    } else {
      return 'Show Sale Fish';
    }
  });
});
