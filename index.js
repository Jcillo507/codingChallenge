let imageData = [];
//there are 2 calls being made because each call returns 30 photos
let call1 = fetch('https://api.unsplash.com/search/photos?client_id=4SWIpzz-ZrDk8XREmTZZAmYYb-819DU3txSfFnVBxMQ&query=puppies&per_page=50/&page=1'
).then(res => res.json())
  .then((data) => {
    imageData.push(...data.results)
    console.log(imageData)
  })
let call2 = fetch('https://api.unsplash.com/search/photos?client_id=4SWIpzz-ZrDk8XREmTZZAmYYb-819DU3txSfFnVBxMQ&query=puppies&per_page=50/&page=2'
).then(res => res.json())
  .then((data) => {
    imageData.push(...data.results)
    console.log(imageData)
  })
const getImages = async () => {
  try {
    let a = []
    await call1
    await call2
    imageData.forEach((image) => {
      const createImage = document.createElement('img')
      createImage.src = image.urls.thumb 
      
      createImage.addEventListener('click',()=>{
        a.push(image.id)
        console.log(a)
      })
      document.getElementById('root').appendChild(createImage)

    })

    console.log(imageData)

  } catch (error) {
    throw error
  }
}

getImages()
