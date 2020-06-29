
let imageData = [];

//there are 2 calls being made because each call returns 30 photos
let call1 = fetch(`https://api.unsplash.com/search/photos?client_id=4SWIpzz-ZrDk8XREmTZZAmYb-819DU3txSfFnVBxMQ&query=puppies&per_page=50/&page=1`
).then(res => res.json())
  .then((data) => {
    imageData.push(...data.results)
  })
let call2 = fetch(`https://api.unsplash.com/search/photos?client_id=4SWIpzz-ZrDk8XREZZAmYYb-819DU3txSfFnVBxMQ&query=puppies&per_page=50/&page=2`
).then(res => res.json())
  .then((data) => {
    imageData.push(...data.results)
  })

let currentPage = 1;
let imagesPerPage = 10;

const createPage = (page)=> {
  let nextBttn = document.getElementById("nextBttn");
  let prevBttn = document.getElementById("prevBttn");
  let root = document.getElementById("root");
  let pageCount = document.getElementById("page");
  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();
  root.innerHTML = "";
  for (let i = (page - 1) * imagesPerPage; i < (page * imagesPerPage) && i < imageData.length; i++) {
    console.log(imageData[i].id)
    const createImage = document.createElement('img')
    createImage.src = imageData[i].urls.thumb
    createImage.setAttribute('id',imageData[i].id)
     root.appendChild(createImage)
    const getImage = document.getElementById(imageData[i].id)
    getImage.addEventListener('click', ()=>{
      console.log(imageData[i].id)
    })
  }
  
  pageCount.innerHTML = page + "/" + numPages();
//button visibility
  if (page == 1) {
    prevBttn.style.visibility = "hidden";
  } else {
    prevBttn.style.visibility = "visible";
  }

  if (page == numPages()) {
    nextBttn.style.visibility = "hidden";
  } else {
    nextBttn.style.visibility = "visible";
  }
}
//pagination helpers
const prevPage = ()=> {
  if (currentPage > 1) {
    currentPage--;
    createPage(currentPage);
  }
}
const nextPage = () =>{
  if (currentPage < numPages()) {
    currentPage++;
    createPage(currentPage);
  }
}
const numPages = () => {
  return Math.ceil(imageData.length / imagesPerPage);
}

Promise.all([call1, call2]).then(() => createPage(1));
