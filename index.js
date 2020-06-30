let imageData = [];
let currentPage = 1;
let imagesPerPage = 10;

//there are 2 calls being made because each call returns 30 photos
let call1 = fetch(`https://api.unsplash.com/search/photos?client_id=4SWIpzz-ZrDk8XREmTZZAmYYb-819DU3txSfFnVBxMQ&query=puppies&per_page=50/&page=1`
).then(res => res.json())
  .then((data) => {
    imageData.push(...data.results)
  })

let call2 = fetch(`https://api.unsplash.com/search/photos?client_id=4SWIpzz-ZrDk8XREmTZZAmYYb-819DU3txSfFnVBxMQ&query=puppies&per_page=50/&page=2`
).then(res => res.json())
  .then((data) => {
    imageData.push(...data.results)
  })

const createPage = (page) => {
  console.log(imageData)
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const root = document.getElementById('root');
  const pageNumber = document.getElementById('page-number');
  const modal = document.getElementById('modal')
  const modalImg = document.getElementById('modal-img')

  if (page < 1) page = 1;
  if (page > numPages()) page = numPages();

  root.innerHTML = '';

  for (let i = (page - 1) * imagesPerPage; i < (page * imagesPerPage) && i < imageData.length; i++) {
    const createImg = document.createElement('img')
    createImg.src = imageData[i].urls.full
    createImg.setAttribute('class', 'image-thumbnail')
    createImg.setAttribute('id', imageData[i].id)
    createImg.setAttribute('alt', imageData[i].alt_description)
    root.appendChild(createImg)
    const getImage = document.getElementById(imageData[i].id)
    getImage.addEventListener('click', () => {
      modal.style.display = 'block'
      modalImg.src = imageData[i].urls.full
      if(imageData[i].height>3000){
      modalImg.setAttribute('class', 'image-modal-tall')}
      else{
      modalImg.setAttribute('class', 'image-modal')}
    })
    const closeBtn = document.getElementById('close-btn')
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none'
    })
  }

  pageNumber.innerHTML = page + '/' + numPages();

  if (page == 1) {
    prevBtn.style.visibility = 'hidden';
  } else {
    prevBtn.style.visibility = 'visible';
  }

  if (page == numPages()) {
    nextBtn.style.visibility = 'hidden';
  } else {
    nextBtn.style.visibility = 'visible';
  }
}

const numPages = () => {
  return Math.ceil(imageData.length / imagesPerPage);
}

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    createPage(currentPage);
  }
}

const nextPage = () => {
  if (currentPage < numPages()) {
    currentPage++;
    createPage(currentPage);
  }
}

Promise.all([call1, call2]).then(() => createPage(1));
