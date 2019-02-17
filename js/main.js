$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();
    let searchText = $('#searchText').val();
    getMovies(searchText);

  });
});

function getMovies(searchText){
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" + searchText)
    .then(function(response) {
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output+= `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);

    })
    .catch(function(error) {
      console.log(error);
    });
}


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}


function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=98325a9d3ed3ec225e41ccc4d360c817")
    .then(function(response) {
      console.log(response);
      let movie = response.data;

      let output =
      `
      <div class="row">
        <div class="col-md-4">
           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
        </div>
        <div class"col-md-8">
          <h2>${movie.title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}, ${movie.genres[2].name}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
            <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime}</li>
            <li class="list-group-item"><strong>Production:</strong> ${movie.production_companies[0].name} min.</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.overview}
          <hr>
          <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
          <a href="index.html" class="btn btn-default">Go back to search</a>
        </div>
        </div>
      `;
      $('#movie').html(output);
    })
    .catch(function(error) {
      console.log(error);
    });
}
