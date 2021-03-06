'use stict'

const imageData = []
let currentPage = 1
const imagesPerPage = 10

// there are 2 calls being made because each call returns 30 photos
const call1 = fetch('https://api.unsplash.com/search/photos?client_id=4SWIpzz-ZrDk8XREmTZZAmYYb-819DU3txSfFnVBxMQ&query=puppies&per_page=50/&page=1').then((res) => res.json())
  .then((data) => {
    imageData.push(...data.results)
  })

const call2 = fetch('https://api.unsplash.com/search/photos?client_id=4SWIpzz-ZrDk8XREmTZZAmYYb-819DU3txSfFnVBxMQ&query=puppies&per_page=50/&page=2').then((res) => res.json())
  .then((data) => {
    imageData.push(...data.results)
  })

const createPage = (page) => {
  const nextBtn = document.getElementById('next-btn')
  const prevBtn = document.getElementById('prev-btn')
  const root = document.getElementById('root')
  const pageNumber = document.getElementById('page-number')
  const modal = document.getElementById('modal')
  const modalImg = document.getElementById('modal-img')
  const closeBtn = document.getElementById('close-btn')

  if (page < 1) page = 1
  if (page > numPages()) page = numPages()

  root.innerHTML = ''

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
      if (imageData[i].height > 3000) {
        modalImg.setAttribute('class', 'image-modal-tall')
      } else {
        modalImg.setAttribute('class', 'image-modal')
      }
    })
  }
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })

  pageNumber.innerHTML = `${page} of ${numPages()} pages`

  if (page === 1) {
    prevBtn.style.visibility = 'hidden'
  } else {
    prevBtn.style.visibility = 'visible'
  }

  if (page === numPages()) {
    nextBtn.style.visibility = 'hidden'
  } else {
    nextBtn.style.visibility = 'visible'
  }
}

const numPages = () => Math.ceil(imageData.length / imagesPerPage)

const prevPage = () => {
  if (currentPage > 1) {
    currentPage--
    createPage(currentPage)
  }
}

const nextPage = () => {
  if (currentPage < numPages()) {
    currentPage++
    createPage(currentPage)
  }
}

Promise.all([call1, call2]).then(() => createPage(1))

