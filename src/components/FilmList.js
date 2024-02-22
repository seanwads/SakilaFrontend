import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function FilmList({ baseUrl }) {

  let { category, actor } = useParams();
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    if(isFirstLoad){
      fetchFilmList(category, actor);
      setFirstLoad(false);
    }
  }, [isFirstLoad])

  async function fetchFilmList(catId, actId){
    let response = "";

    if(catId){
      response = await fetch(baseUrl + "/film/getByCatId/" + catId);
    }
    else if(actId){
      response = await fetch(baseUrl + "/film/getByActorId" + actId);
    } 
    else {
      response = await fetch(baseUrl + "/film/getAll");
    }

    const responseJson = await response.json();
    setFilmList(responseJson);
  }

    return (
      <>
      {!filmList ? <p id="loading">loading...</p> :
      <>
        {filmList.map(film => 
          <ul key={film.filmId} id="filmList-info">
            <li>
              <h2 id="filmList-title">{film.title}</h2>
            </li>
            <li>
              <p id="filmList-year">{film.releaseYear}</p>
            </li>
            <li>
              <p id="filmList-cat">{film.categorySet[0].name}</p>
            </li>
            <li>
              <p id="filmList-desc">{film.description}</p>
            </li>
            <li>
              <NavLink to={`/edit-film/${film.filmId}`}>Edit</NavLink>
            </li>
          </ul>)}
      </>
      }
      </>
    )
  }
  
  export default FilmList;