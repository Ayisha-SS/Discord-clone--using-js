
fetch('json/main.json')
  .then(response => response.json())
  .then(data => {
    const communities = document.getElementById('communities');
    const itemElement = communities.querySelector('.item-content');  

    function renderCommunities(data) {
      itemElement.innerHTML = ''; 
      data.forEach(community => {
        const communityDiv = document.createElement('div');
        communityDiv.classList.add('item-element');
        communityDiv.innerHTML = `
          <div class="image">
            <img src="${community.image}" alt="Community Image"> 
          </div>
          <div class="details">
            <div class="heading">
              <h3>${community.name}</h3>
            </div>
            <p class="description">${community.description}</p>
            <div class="count">
              <p>${community.online_users} Online</p>
              <span class="dot"></span>
              <p>${community.members} Members</p>
            </div>
            <span class="verified">
              <span class="verified-img">
                <img src="${community.verification}" alt="Logo">
              </span>
              <h5>Verified</h5>
            </span>
          </div>
        `;
        itemElement.appendChild(communityDiv);
      });
    }
    renderCommunities(data); // Initial render

    // Event listeners for filter buttons
    const filterButtons = document.querySelectorAll('.list-content');
    filterButtons[0].classList.add('active')
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const type = button.querySelector('h4').textContent.toLowerCase();
        if (type === 'all') {
          renderCommunities(data); 
        } else {
          const filtered = data.filter(community => community.type.toLowerCase() === type);
          renderCommunities(filtered); 
        }

        updateResultsCount();
      });
    });
    

    // Render number of items for each category
    filterButtons.forEach(button => {
      const type = button.querySelector('h4').textContent.toLowerCase();
      if (type === 'all') {
        button.querySelector('h4:last-child').textContent = data.length; // Total number of items
      } else {
        const count = data.filter(community => community.type.toLowerCase() === type).length;
        button.querySelector('h4:last-child').textContent = count;
      }
    });

    // Function to update total number of results
    function updateResultsCount() {
      const totalResults = itemElement.querySelectorAll('.item-element').length;
      const resultsSpan = document.querySelector('.results');
      resultsSpan.textContent = `${totalResults} Results Found `;
    }

    updateResultsCount();

    //search item...
    const searchButton = document.querySelector('.explore-btn');
    searchButton.addEventListener('click',() => {
      const inputValue = document.querySelector('.explore-input').value.trim().toLowerCase();
      const filtered = data.filter(community => community.name.toLowerCase().includes(inputValue));
      renderCommunities(filtered);
    });

      // Get the input field and clear button
      const exploreInput = document.querySelector('.explore-input');
      const clearButton = document.querySelector('.clear-input');
  
      clearButton.style.display = 'none';

      // Add event listener to toggle the visibility of the clear button
      exploreInput.addEventListener('input', () => {
        clearButton.style.display = exploreInput.value ? 'inline-block' : 'none';
      });
  
      // Add event listener to clear the input when the clear button is clicked
      clearButton.addEventListener('click', () => {
        exploreInput.value = ''; // Clear the input field
        clearButton.style.display = 'none'; // Hide the clear button
  
        // Update communities based on cleared input
        renderCommunities(data);
  
        // Update the total number of results
        updateResultsCount();
      });

  })
  .catch(error => console.error('Error fetching JSON:', error));
