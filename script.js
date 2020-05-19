// VARIABLES
let pictureList = Object.values(picturesObject[0]);
let show = "inline";
let hide = "none";
let left = 37;
let right = 39;
let imageElements;
let imageIndex = 0;
let activeIndex = 0;
let maxIndex = pictureList.length - 1;
let arrayOfPages = document.getElementsByClassName('page-button');
let pageLinks = document.getElementsByClassName("page-item");

for(let page of arrayOfPages){
  page.style.display = "none";
}
// GENERATORS
function generateSlides(){
  // Generates an image element and then adds it to the imagebox for each picture in the picture folder
  let parent = document.getElementById('imagebox');
  for(let picture of pictureList){
    let pictureElement = document.createElement('img');
    pictureElement.src = `SlideShowPictures/${picture}`;
    pictureElement.style.display = "none";
    parent.appendChild(pictureElement);
  }
  return
}

function generatePages(pages){
  const pageParent = document.getElementById('pagination');
  if(pages == 0){
    return
  } else if(pages <= 5){
    document.getElementById("notFound").style.display = "none";
    for(let page = 0;page < pages; page++){
      let pageWrapper = document.createElement("li");
      pageWrapper.className = "page-item";
      let pageButton = document.createElement("a");
      pageButton.className = "page-link";
      pageButton.innerHTML = page + 1;
      pageButton.setAttribute("onclick",`showHide(${page})`);
      pageWrapper.appendChild(pageButton);
      pageParent.appendChild(pageWrapper);
    }
  } else if(pages > 5){
    // min
    document.getElementById("notFound").style.display = "none";
    let pageWrapper = document.createElement("li");
    pageWrapper.className = "page-item ";
    pageWrapper.className += "disabled";
    pageWrapper.setAttribute("id", "minButton");
    let minButton = document.createElement("a");
    minButton.className = "page-link";
    minButton.innerHTML = "&laquo;";
    minButton.setAttribute("onclick", "minmax('min')");
    pageWrapper.appendChild(minButton);
    pageParent.appendChild(pageWrapper);
    // previous
    pageWrapper = document.createElement("li");
    pageWrapper.className = "page-item ";
    pageWrapper.className += "disabled";
    pageWrapper.setAttribute("id", "previousButton");
    let previousButton = document.createElement("a");
    previousButton.className = "page-link";
    previousButton.innerHTML = "&lt;";
    previousButton.setAttribute("onclick", "changePage('back')");
    pageWrapper.appendChild(previousButton);
    pageParent.appendChild(pageWrapper);
    //indexs
    for(let page = 0;page < pages; page++){
      pageWrapper = document.createElement("li");
      pageWrapper.className = "page-item";
      let pageButton = document.createElement("a");
      pageButton.className = "page-link ";
      pageButton.className += "page-button";
      pageButton.style.display = "block";
      pageButton.innerHTML = page + 1;
      pageButton.setAttribute("onclick", `selectPage(${page})`);
      pageWrapper.appendChild(pageButton);
      pageParent.appendChild(pageWrapper);
    }

    // next
    pageWrapper = document.createElement("li");
    pageWrapper.className = "page-item";
    pageWrapper.setAttribute("id", "nextButton");
    let nextButton = document.createElement("a");
    nextButton.className = "page-link";
    nextButton.innerHTML = "&gt;";
    nextButton.setAttribute("onclick", "changePage('next')");
    pageWrapper.appendChild(nextButton);
    pageParent.appendChild(pageWrapper);
    // max
    pageWrapper = document.createElement("li");
    pageWrapper.className = "page-item";
    pageWrapper.setAttribute("id", "maxButton");
    let maxButton = document.createElement("a");
    maxButton.className = "page-link";
    maxButton.innerHTML = "&raquo;";
    maxButton.setAttribute("onclick", "minmax('max')");
    pageWrapper.appendChild(maxButton);
    pageParent.appendChild(pageWrapper);
  } else { /*error*/ }
  return
}

// FUNCTIONS
function showHide(index){
  if (imageElements[index].style.display == hide){
    imageElements[imageIndex].style.display = hide;
    imageElements[index].style.display = show;
    imageIndex = index;
  }
}

function changeImage(direction){
  if(maxIndex + 1 > 5){
    changePage(direction)
    return
  }
  if (direction == "back" && imageIndex > 0){
    showHide(imageIndex);
    showHide(imageIndex - 1);
  } else if (direction == "next" && imageIndex < pictureList.length - 1){
    showHide(imageIndex + 1);
  }
  return;
}

function enableDisable(element, action){
  if(action == "disable"){
    element.className = "page-item disabled"
  } else if(action == "enable"){
    element.className = "page-item"
  }
}

function activePages(minPage, maxPage){
  //cuts  activeIndex = activeIndex, , arrayOfPages = arrayOfPages
  // min and max will usually be selected index -2 & +2
  for(let page of arrayOfPages){
    page.style.display = "none";
    console.log(page)
  }

  for(let countIndex = 0; countIndex < 5; countIndex++){
    arrayOfPages[countIndex + minPage].style.display = "block";
    console.log(arrayOfPages[countIndex + minPage])
  }
}

function selectPage(selectPageIndex){
  showHide(selectPageIndex);
  // something like the show and hide maybe
  let selectMinButton = document.getElementById('minButton');
  let selectPreviousButton = document.getElementById('previousButton');
  let selectNextButton = document.getElementById('nextButton');
  let selectMaxButton = document.getElementById('maxButton');

  activeIndex = selectPageIndex;
  for(let link in pageLinks){
    if(link == selectPageIndex+2){
      pageLinks[selectPageIndex+2].className = "page-item active" ;
    } else {pageLinks[link].className = "page-item" ;}
  }


  switch(selectPageIndex){
    case 0:
      activePages(0,4);
      enableDisable(selectMinButton, "disable");
      enableDisable(selectPreviousButton, "disable");
      enableDisable(selectNextButton, "enable");
      enableDisable(selectMaxButton, "enable");
      break;
    case 1:
    case 2:
      activePages(0,4);
      enableDisable(selectMinButton, "enable");
      enableDisable(selectPreviousButton, "enable");
      enableDisable(selectNextButton, "enable");
      enableDisable(selectMaxButton, "enable");
      break;

    case pictureList.length - 1: //max
      activePages(maxIndex - 4, maxIndex);
      enableDisable(selectMinButton, "enable");
      enableDisable(selectPreviousButton, "enable");
      enableDisable(selectNextButton, "disable");
      enableDisable(selectMaxButton, "disable");
      break;
    case pictureList.length - 2:
    case pictureList.length - 3:
      activePages(maxIndex - 4, maxIndex);
      enableDisable(selectMinButton, "enable");
      enableDisable(selectPreviousButton, "enable");
      enableDisable(selectNextButton, "enable");
      enableDisable(selectMaxButton, "enable");
      break;

    default:
      activePages(selectPageIndex-2,selectPageIndex+2)
      enableDisable(selectMinButton, "enable");
      enableDisable(selectPreviousButton, "enable");
      enableDisable(selectNextButton, "enable");
      enableDisable(selectMaxButton, "enable");
      break;
    }
}

function changePage(direction){
  if (direction == "back" && imageIndex > 0){
    selectPage(activeIndex - 1)
  } else if (direction == "next" && imageIndex < pictureList.length - 1){
    selectPage(activeIndex + 1)
  }
  return;
}

function minmax(command){
  if(command == "max"){
    selectPage(pictureList.length - 1);
  } else if(command == "min"){
    selectPage(0);
  }
  return;
}

// INITIALISATION
function init(){
  generateSlides();
  imageElements = document.getElementsByTagName('img');
  showHide(0);
  generatePages(pictureList.length);
  if(maxIndex > 5){
    selectPage(0);
  }
  return
}

// KEYBOARD SHORTCUTS
document.onkeyup = function (key) {
  console.log("KEY:", key);
  console.log("KEYCODE:",key.keyCode);
  switch(key.which){
    case left :
      changeImage("back"); break;
    case right :
      changeImage("next"); break;
  };
};
