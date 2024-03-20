
fetch('json/main.json')
  .then(response => response.json())
  .then(data => {
    const communities = document.getElementById('communities');
    const itemElement = communities.querySelector('.item-content');  
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
                <span class="${community.verified ? 'verified' : ''}">
                    <span class="verified-img">
                        <img src="images/verified-logo.png" alt="Logo">
                    </span>
                    <h5>${community.verified ? 'Verified' : 'Not Verified'}</h5>
                </span>
            </div>
        `;
        itemElement.appendChild(communityDiv);
    });
})
.catch(error => console.error('Error fetching JSON:',error));


