import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditFilm({ baseUrl }) {
    let { filmId } = useParams();
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [currentFilm, setCurrentFilm] = useState();

    useEffect(() => {
      if(isFirstLoad){
        fetchFilm();
        setFirstLoad(false);
      }
    })

    async function fetchFilm(){
      const response = await fetch(baseUrl + "/film/get/" + filmId);
      const resJson = await response.json();
      setCurrentFilm(resJson);
    }

    return (
      <>
      {!currentFilm ? <p id="loading-text">loading...</p> :
      
      <form id="edit-film-form">
        <input type="text" id="filmId" name="filmId" value={currentFilm.filmId}/>
        <br />
        <input type="text" id="title" name="title" placeholder={currentFilm.title} />
        <br />
        <input type="text" id="description" name="description" placeholder={currentFilm.description} />
        <br />
        <input type="text" id="releaseYear" name="releaseYear" placeholder={currentFilm.releaseYear} />
        <br />
        <input type="text" id="description" name="description" placeholder={currentFilm.description} />
        <br />
        {/* TODO change to dropdown */}
        <input type="text" id="rating" name="rating" placeholder={currentFilm.rating} />
      </form>
      }
      </>
    )
  }
  
  export default EditFilm;