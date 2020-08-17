// API URL //
const apiURL = 'https://api.lyrics.ovh';

const form = document.getElementById('form');
const search = document.getElementById('search');

// adding event  listener //

form.addEventListener('submit', e=> {
    e.preventDefault();
    searchValue = search.value.trim();
    console.log(searchValue);
    
    if (!searchValue){
       alert("Please type any song")

    }
    else{
        searchSongs(searchValue);
    }
    
});


// Search by song or artist
  async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    showData(data);
  }


//Display result

function showData(data){
    result.innerHTML =`
    <ul class="songs">
    ${data.data
      .map(song =>`
      <li>
        <span><strong>${song.artist.name}</strong> - 
        ${song.title}</span>
        <button class="btn1" data-artist="${song.artist.name}"
        data-songtitle="${song.title}">Get Lyrics</button>
      </li>`
      )
        .join('')}
    </ul>`;

}
// Get lyrics btn
result.addEventListener('click', e =>{
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON'){
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle)
  }
});

// Get lyrics song
async function getLyrics( artist, songTitle){
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `<h2><strong>${artist}</strong> - 
  ${songTitle}</h2>
  <p>${lyrics}</p>`;
}


    