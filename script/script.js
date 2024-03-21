
// fetch('json/main.json')
//   .then(response => response.json())
//   .then(data => {
//     const communities = document.getElementById('communities');
//     const itemElement = communities.querySelector('.item-content');  
//     data.forEach(community => {
//         const communityDiv = document.createElement('div');
//         communityDiv.classList.add('item-element');
//         communityDiv.innerHTML = `
//         <div class="image">
//                 <img src="${community.image}" alt="Community Image"> 
//             </div>
//             <div class="details">
//                 <div class="heading">
                  
//                     <h3>${community.name}</h3>
//                 </div>
//                 <p class="description">${community.description}</p>
//                 <div class="count">
//                     <p>${community.online_users} Online</p>
//                     <span class="dot"></span>
//                     <p>${community.members} Members</p>
//                 </div>
//                 <span class="${community.verified ? 'verified' : ''}">
//                     <span class="verified-img">
//                         <img src="images/verified-logo.png" alt="Logo">
//                     </span>
//                     <h5>${community.verified ? 'Verified' : 'Not Verified'}</h5>
//                 </span>
//             </div>
//         `;
//         itemElement.appendChild(communityDiv);
//     });
// })
// .catch(error => console.error('Error fetching JSON:',error));

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
                <img src="images/verified-logo.png" alt="Logo">
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
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const type = button.querySelector('h4').textContent.toLowerCase();
        if (type === 'all') {
          renderCommunities(data); 
        } else {
          const filtered = data.filter(community => community.type.toLowerCase() === type);
          renderCommunities(filtered); 
        }
      });
    });
    

    //search item...
    const searchButton = document.querySelector('.explore-btn');
    searchButton.addEventListener('click',() => {
      const inputValue = document.querySelector('.explore-input').value.trim().toLowerCase();
      const filtered = data.filter(community => community.name.toLowerCase().includes(inputValue));
      renderCommunities(filtered);
    });

  })
  .catch(error => console.error('Error fetching JSON:', error));
