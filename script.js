let button = document.querySelector("#search-box button")
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

function searchGiphy(query) {
  let url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=h6uQ9JXfOEaYNUQtCfy2oiAhnsfZFQPK`

  return fetch(url)
    .then(response => response.json())
    .then(json =>
      json.data.map(function(image) {
        return image.images.downsized.url
      })
    )
}

button.addEventListener("click", () => {
  const query = input.value
  searchGiphy(query).then(urls => {
    console.log(urls)
    showImages(urls)
  })
  input.value = null
})
