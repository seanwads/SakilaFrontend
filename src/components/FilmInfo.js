import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

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

    async function deleteFilm(){
      const deleteConfirm = window.confirm(`Are you sure you want to delete ${currentFilm.title}?`);
      if(deleteConfirm){
        await fetch(baseUrl + "/film/delete/" + currentFilm.filmId, {
          method: 'DELETE'
        });
        
        navigate("/film-list");
      }
    }
    
    return (
      <Container>
        <Row>
          <Col md={{offset: 1, size: 10}} sm="12">
            <div className="info-card">
            {!currentFilm ? <p id="loading-text">Loading...</p> : 
            <>
            <h1 id="film-title">{currentFilm.title}, {currentFilm.releaseYear}</h1>
            <p id="film-cat">{currentFilm.categorySet[0] ? currentFilm.categorySet[0].name : "cat"} | {currentFilm.rating}</p>
            <ul id="actors-list">
              Actors:
              {currentFilm.actors.map(actor => 
                <li key={actor.actorId} id="actor-name">{actor.firstName} {actor.lastName}</li>
                )}
            </ul>
            <br />
            <p id="film-desc">{currentFilm.description}</p>
            <br />
            <NavLink to={`/edit-film/${filmId}`}>Edit</NavLink> | <NavLink onClick={() => deleteFilm()}>Delete</NavLink>
            </>
            }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
  
  export default FilmInfo;