import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate} from 'react-router-dom';

function App() {
  const [myData, setMyData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/?s=man&apikey=4a3b711b")
      .then((res) => setMyData(res.data.Search || []))
      .catch((error) =>
        console.log("~ file:App.js ~line 15 ~useEffect ~error", error)
      );
  }, [buttonClicked]);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  return (
    <Router>
      <div className='heading'>
        <h1>MovieList</h1>
        <Routes>
          <Route path="/" element={<Home myData={myData} />} />
          {myData.map((post) => {
            const { imdbID } = post;
            return (
              <Route
                key={imdbID}
                path={`/movie/${imdbID}`}
                element={<MovieDetails imdbID={imdbID} myData={myData} />}
                
              />
              
            );
            
          })}
        </Routes>
      </div>
    </Router>
  );
}

function Home({ myData }) {
  return (
    <div className="grid">
      {myData.map((post) => {
        const { Title, imdbID, Poster } = post;
        return (
          <div className="movie" key={imdbID}>
            <div className="m">
              <Link to={`/movie/${imdbID}`}>
                <img
                  src={Poster}
                  alt="Movie Poster"
                  className="movie-poster"
                />
               
              </Link>
              <p>{Title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MovieDetails({ imdbID, myData }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

  useEffect(() => {
    const movie = myData.find((movie) => movie.imdbID === imdbID);
    setSelectedMovie(movie);
  }, [imdbID, myData]);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="selected-movie">
      
      <h2>Selected Movie: {selectedMovie.Title}</h2>
      
      <p>Type: {selectedMovie.Type}</p>
      <p>Year: {selectedMovie.Year}</p>
      <p>Id: {selectedMovie.imdbID}</p>
      <div className='button'>
      <button onClick={goBack}>Back</button>	
      </div>
      <img src={selectedMovie.Poster} alt="Movie Poster" />
    </div>
  );
  
}

export default App;