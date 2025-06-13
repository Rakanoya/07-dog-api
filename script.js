// Get a reference to the select menu in the HTML
const breedSelect = document.querySelector('#breed-select');
// Get a reference to the gallery div
const gallery = document.getElementById('gallery');

// Fetch the list of dog breeds from the Dog API
fetch('https://dog.ceo/api/breeds/list/all')
  .then(function(response) {
    // Convert the response to JSON
    return response.json();
  })
  .then(function(data) {
    // Get the breeds object from the API response
    const breeds = data.message;

    // Loop through each breed in the breeds object
    for (const breed in breeds) {
      // Create a new option element for each breed
      const option = document.createElement('option');
      // Set the value and text of the option to the breed name
      option.value = breed;
      option.textContent = breed;
      // Add the option to the select menu
      breedSelect.appendChild(option);
    }
  });

// Listen for changes on the select menu
breedSelect.addEventListener('change', function() {
  // Get the selected breed
  const selectedBreed = breedSelect.value;

  // Clear the gallery
  gallery.innerHTML = '';

  // Only fetch if a breed is selected
  if (selectedBreed) {
    // Fetch 9 random images for the selected breed
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/9`)
      .then(function(response) {
        // Convert the response to JSON
        return response.json();
      })
      .then(function(data) {
        // data.message is an array of image URLs
        data.message.forEach(function(imageUrl) {
          // Create a div for each image
          const item = document.createElement('div');
          item.className = 'gallery-item';
          // Create an image element
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = `${selectedBreed} dog`;
          // Add the image to the div
          item.appendChild(img);
          // Add the div to the gallery
          gallery.appendChild(item);
        });
      });
  }
});

// Now the select menu will be filled with dog breeds!
