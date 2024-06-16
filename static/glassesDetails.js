
let currentcolor =''
document.addEventListener('DOMContentLoaded', async(event) => {
    glassJson = await getGlassDetails()
    console.log(glassJson)
    const descriptionContainer = document.getElementById('textInfo');
    const imageSection = document.getElementById("imageSection")
    let palette = document.getElementById("palette")
    const switchButton = document.getElementById('switch')
  

    function addDetails(glassClicked) {
      descriptionContainer.innerHTML=''
      imageSection.innerHTML=''
      palette.innerHTML= ''
      switchButton.innerHTML=''
      const img = document.createElement('img');
      const glassesName = glassClicked.textContent.trim();
      let glassNumber = extractNumber(glassesName) -1
      img.src = getStaticImageUrl(glassJson[glassNumber]["imageName"]); 
      img.alt = 'Glass Image'; 
      const switchText = document.createElement('p')
      switchText.className = 'label';
      switchText.textContent="Remove Eyeglass Branch"
      const h3 = document.createElement('h3');
      h3.textContent = 'Glass Details';
      
      buttonSwitch = makeswitchButton(glassNumber);
     

      imageSection.appendChild(img)
      descriptionContainer.appendChild(createParagraph('Eyeglass Name', glassJson[glassNumber]["Title"]));
      descriptionContainer.appendChild(createParagraph('Sizes', glassJson[glassNumber]["Sizes"]));
      descriptionContainer.appendChild(createParagraph('Description', glassJson[glassNumber]["Description"]));
      descriptionContainer.appendChild(createParagraph('Shop', glassJson[glassNumber]["Shop Name"]));
      descriptionContainer.appendChild(createParagraph('Colors', ''));
    
      createColorButtons(glassJson[glassNumber]["color"],palette,glassNumber)
      switchButton.appendChild(switchText)
      switchButton.appendChild(buttonSwitch)

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
      currentcolor =  clickedButton.style.backgroundColor;
      
      let glassId = `${number+1}-${currentcolor}.glb`; 
      turnOffSwitch()
      WebARRocksMirror.load(`static/assets/models3D/${glassId}`);
    });
  }
}
function removeBranch(switchButton,number){
  switchButton.addEventListener('change',(event)=>{
    let glassId = `${number+1}-${currentcolor}-less.glb`; 
    if (event.target.checked) {
     
    
      WebARRocksMirror.load(`static/assets/models3D/${glassId}`);
    } else {
      glassId =`${number+1}-${currentcolor}.glb`
      WebARRocksMirror.load(`static/assets/models3D/${glassId}`);
    }
  })
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
function makeswitchButton(number){
  const label = document.createElement('label');
  label.classList.add('switch');

  // Create input element
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = 'toggleSwitch';

 
  const span = document.createElement('span');
  span.classList.add('slider', 'round');


  label.appendChild(input);
  label.appendChild(span);

  removeBranch(input,number)
  return label
}
function turnOffSwitch(){
  const switchInput = document.getElementById('toggleSwitch');
  switchInput.checked = false; 
}



