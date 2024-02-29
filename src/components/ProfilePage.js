import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

function ProfilePage({ baseUrl }) {

  const [isFirstLoad, setFirstLoad] = useState(true);
  const [user, setUser] = useState();
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    if(isFirstLoad){
      fetchUser();
      setFirstLoad(false);
    }
  })

  async function fetchUser(){
    const userRes = await fetch(baseUrl + "/user/get/1");
    const userJson = await userRes.json();
    setUser(userJson);

    const filmRes = await fetch(baseUrl + "/user/getAllFilms/1");
    const filmJson = await filmRes.json();
    setFilmList(filmJson);
  }

  async function removeFilm(filmId){
    const film = document.getElementById(filmId);
    film.style.display = 'none';
  }

    return(
      <>
      <Container>
        <Row>
          <Col md={{offset: 1, size: 10}} sm="12">
            <div className="info-card">
              {!user ? <p>loading...</p> :(
                  <h2 id="user-name">{user.firstName} {user.lastName}</h2>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
      <Row>
        <Col md={{offset: 1, size: 10}} sm="12">
        <div id="film-list-user">
          {filmList.map(film => 
            <div className='film-card' id={film.filmId}>
              <ul key={film.filmId} className="filmList-info">
                <li className="filmList-title">
                  <NavLink to={`/film/${film.filmId}`}><h2 className="filmList-title">{film.title}</h2></NavLink>
                </li>
                <li className="filmList-item">
                  <p className="filmList-year">{film.releaseYear}</p>
                </li>
                <li className="filmList-item">
                  <p className="filmList-cat">{film.categorySet[0].name}</p>
                </li>
                <li className="filmList-item">
                  <p className="filmList-rating">{film.rating}</p>
                </li>
                <li className="filmList-item">
                  <Button color="danger" onClick={() => removeFilm(film.filmId)}>-</Button>
                </li>
              </ul>
            </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
    </>
    )
  }
  
  export default ProfilePage;