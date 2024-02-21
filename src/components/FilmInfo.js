import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FilmInfo({ baseUrl }) {
    let { filmId } = useParams();
    const [currentFilm, setCurrentFilm] = useState();
    const [isFirstLoad, setFirstLoad] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      if(isFirstLoad){
        console.log("loading")
        fetchFilmData(filmId);
        setFirstLoad(false);
      }
    }, [isFirstLoad, filmId])


    async function fetchFilmData(id) {
      try {
        const res = await fetch(baseUrl + "/film/get/" + id);
        const resJson = await res.json();
        setCurrentFilm(resJson);
      }
      catch {
        navigate("*")
      }
      
    }
    
    return (
      <>
      {!currentFilm ? <p id="loading-text">Loading...</p> : 
      <>
      <h1 id="film-title">{currentFilm.title}, {currentFilm.releaseYear}</h1>
      <p id="film-cat">{currentFilm.categorySet[0].name}</p>
      <ul id="actors-list">
        Actors:
        {currentFilm.actors.map(actor => 
          <li key={actor.actorId} id="actor-name">{actor.firstName} {actor.lastName}</li>
          )}
      </ul>
      <br />
      <p id="film-desc">{currentFilm.description}</p>
      </>
      }
      </>
    )
  }
  
  export default FilmInfo;