let form = document.querySelector("#search-box")
let input = document.querySelector("#search-box input")

function showImage(url) {
  let div = document.createElement("div")
  let resultDiv = document.querySelector("#search-result")
  let image = new Image()
  image.src = url
  div.appendChild(image)
  div.classList.add("image")
  resultDiv.appendChild(div)
}

function showImages(urls) {
  document.querySelector("#search-result").innerHTML = ""
  urls.forEach(url => showImage(url))
}

function showError(err) {
  document.querySelector("#search-result").innerHTML = err
}

function searchGiphy(query) {
  let url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=h6uQ9JXfOEaYNUQtCfy2oiAhnsfZFQPK`

  return fetch(url)
    .then(response => response.json())
    .then(json => json.data)
    .then(data => {
      if (data.length === 0) {
        return Promise.reject("No Images")
      } else {
        return data.map(function(image) {
          return image.images.downsized.url
        })
      }
    })
}

form.addEventListener("submit", event => {
  event.preventDefault()
  const query = input.value
  searchGiphy(query).then(urls => showImages(urls), err => showError(err))
  form.reset()
})
