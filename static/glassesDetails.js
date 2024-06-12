document.addEventListener('DOMContentLoaded', async(event) => {
    glassJson = await getGlassDetails()
    const descriptionContainer = document.getElementById('details');
    function addDetails(glassClicked) {
      descriptionContainer.innerHTML = '';
      const img = document.createElement('img');
      const glassesName = glassClicked.textContent.trim();
      let glassNumber = extractNumber(glassesName) -1
      img.src = getStaticImageUrl(glassJson[glassNumber]["imageName"]); 
      img.alt = 'Glass Image'; 

    
      img.style.width = '200px';
      img.style.height = 'auto';

   
      

      const h3 = document.createElement('h3');
      h3.textContent = 'Glass Details';

      const name = document.createElement('p');
      const sizes = document.createElement('p');
      const description = document.createElement('p');
      const shopLink = document.createElement('p');
      
      


      shopLink.textContent = glassJson[glassNumber]["Shop Name"];
      name.textContent = glassJson[glassNumber]["Title"]
      sizes.textContent = glassJson[glassNumber]["Sizes"]
      description.textContent =  glassJson[glassNumber]["Description"]
    

      descriptionContainer.appendChild(img);
      descriptionContainer.appendChild(h3);
      descriptionContainer.appendChild(name);
      descriptionContainer.appendChild(sizes);
      descriptionContainer.appendChild(description);
      descriptionContainer.appendChild(shopLink);
    }

    function getStaticImageUrl(filename) {
      return `static/images/${filename}`;
    }

    // Attach the addDetails function to the window so it can be called inline in the HTML
    window.addDetails = addDetails;
  });

function getStaticImageUrl(filename) {
    return `static/images/${filename}`;
  }

  async function getGlassDetails() {
    const response = await fetch("/glass_details");
    const glass = await response.json();
    return glass
  }

  function extractNumber(glassesName) {
    // Match any sequence of digits (\d+) preceded by "glass " (case insensitive)
    const match = glassesName.match(/Glass (\d+)/i);
    // If there's a match, return the number, otherwise return null
    return match ? parseInt(match[1]) : null;
}


