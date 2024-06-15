document.addEventListener('DOMContentLoaded', async(event) => {
    glassJson = await getGlassDetails()
    console.log(glassJson)
    const descriptionContainer = document.getElementById('textInfo');
    const imageSection = document.getElementById("imageSection")
    let palette = document.getElementById("palette")
    function addDetails(glassClicked) {
      descriptionContainer.innerHTML=''
      imageSection.innerHTML=''
      palette.innerHTML= ''
      
      const img = document.createElement('img');
      const glassesName = glassClicked.textContent.trim();
      let glassNumber = extractNumber(glassesName) -1
      img.src = getStaticImageUrl(glassJson[glassNumber]["imageName"]); 
      img.alt = 'Glass Image'; 

      
    
      const h3 = document.createElement('h3');
      h3.textContent = 'Glass Details';

    
     
     



  

      imageSection.appendChild(img)
      descriptionContainer.appendChild(createParagraph('Eyeglass Name', glassJson[glassNumber]["Title"]));
      descriptionContainer.appendChild(createParagraph('Sizes', glassJson[glassNumber]["Sizes"]));
      descriptionContainer.appendChild(createParagraph('Description', glassJson[glassNumber]["Description"]));
      descriptionContainer.appendChild(createParagraph('Shop', glassJson[glassNumber]["Shop Name"]));
      descriptionContainer.appendChild(createParagraph('Colors', ''));
    
      createColorButtons(glassJson[glassNumber]["color"],palette,glassNumber)
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
    buttonColor.classList.add("button-color");
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
function remove(){
  const descriptionContainer = document.getElementById('textInfo');
  const imageSection = document.getElementById("imageSection")
  let palette = document.getElementById("palette")
  descriptionContainer.innerHTML=''
  imageSection.innerHTML=''
  palette.innerHTML=''
}

const createParagraph = (labelText, valueText) => {
  const p = document.createElement('p');
  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = labelText;
  p.appendChild(label);
  p.append(valueText);
  return p;
};



