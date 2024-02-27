import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

function ActorInfo({ baseUrl }) {
    let { actorId } = useParams();
    const [actor, setActor] = useState();
    const [films, setFilms] = useState([]);
    const [isFirstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
      if(isFirstLoad){
        fetchActorData(actorId);
        fetchFilms(actorId);
        setFirstLoad(false);
      }
    })

    async function fetchActorData(id){
      const res = await fetch(baseUrl + "/actor/get/" + id);
      const json = await res.json();
      setActor(json);
    }

    async function fetchFilms(id){
      const res = await fetch(baseUrl + "/film/getByActorId/" + id);
      const json = await res.json();
      setFilms(json);
    }

    return (
      <Container>
        <Row>
          <Col md={{offset: 1, size: 10}} sm="12">
            <div className="info-card">
            {!actor ? <p id="loading-text">Loading...</p> : 
            <>
            <h1 id="actor-name">{actor.firstName} {actor.lastName}</h1>
            <br />
            <ul id="actor-film-list">
              {!films ? <p>loading...</p> :
                films.map(film => 
                  <li className="actor-film">
                    <NavLink to={`/film/${film.filmId}`}>{film.title}, {film.releaseYear}</NavLink>
                  </li> )
              }  
            </ul> 
            <br />
            {/* <NavLink to={`/edit-film/${filmId}`}>Edit</NavLink> | <NavLink onClick={() => deleteFilm()}>Delete</NavLink> */}
            </>
            }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
  
  export default ActorInfo;