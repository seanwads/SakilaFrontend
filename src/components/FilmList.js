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
  
  async function deleteFilm(film){
    const deleteConfirm = window.confirm(`Are you sure you want to delete ${film.title}?`);
    if(deleteConfirm){
      await fetch(baseUrl + "/film/delete/" + film.filmId, {
        method: 'DELETE'
      });

      setFirstLoad(true);
    }
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
              <NavLink to={`/edit-film/${film.filmId}`}>Edit</NavLink>| 
              <NavLink onClick={() => deleteFilm(film)}>Delete</NavLink>
            </li>
          </ul>)}
      </>
      }
      </>
    )
  }
  
  export default FilmList;