document.addEventListener('DOMContentLoaded', async(event) => {
    glassJson = await getGlassDetails()
    console.log(glassJson)
    const descriptionContainer = document.getElementById('details');


    function addDetails(glassClicked) {
      descriptionContainer.innerHTML = '';
      const img = document.createElement('img');
      const glassesName = glassClicked.textContent.trim();
      let glassNumber = extractNumber(glassesName) -1
      img.src = getStaticImageUrl(glassJson[glassNumber]["imageName"]); 
      img.alt = 'Glass Image'; 

      console.log(glassJson)
      img.style.width = '200px';
      img.style.height = 'auto';

   
      

      const h3 = document.createElement('h3');
      h3.textContent = 'Glass Details';

      const name = document.createElement('p');
      const sizes = document.createElement('p');
      const description = document.createElement('p');
      const shopLink = document.createElement('p');
      let buttonColor = document.createElement('button');

      buttonColor.classList.add("button")
      buttonColor.classList.add("button1")



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
      createColorButtons(glassJson[glassNumber]["color"],descriptionContainer,glassNumber)
    }

    function getStaticImageUrl(filename) {
      return `static/images/${filename}`;
    }


    window.addDetails = addDetails;
  });



  async function getGlassDetails() {
    const response = await fetch("/glass_details");
    const glass = await response.json();
    return glass
  }

  function extractNumber(glassesName) {
    const match = glassesName.match(/Glass (\d+)/i);
    return match ? parseInt(match[1]) : null;
}


function createColorButtons(colors, container,number) {
  for (let i = 0; i < colors.length; i++) {
    const buttonColor = document.createElement('button');
    buttonColor.classList.add("button", "button1");
    buttonColor.style.backgroundColor = colors[i];
    container.appendChild(buttonColor);
    buttonColor.addEventListener('click', () => {
      const clickedButton = event.target;
      const color =  clickedButton.style.backgroundColor;
      const glassId = `${number+1}-${color}.glb`; 
      WebARRocksMirror.load(`static/assets/models3D/${glassId}`);
    });
  }
}


