const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");

function requestApi(searchTerm) {
  const search = searchTerm.toLowerCase();
  const url = `http://localhost:3000/artists`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const searchResult = pesquisaTermo(data, search);
      displayResults(searchResult)      
    });
}

function pesquisaTermo(data, term) {
  return data.filter((item) => item.name.toLowerCase().includes(term))
}

function displayResults(result){
    resultPlaylist.classList.add('hidden');
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');
    result.forEach(element => {
        artistName.innerText = element.name 
        artistImage.src = element.urlImg   
    });

    resultArtist.classList.remove('hidden')
}

document.addEventListener("input", () => {
  const searchTerm = searchInput.value;
  if (searchTerm === "") {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});
