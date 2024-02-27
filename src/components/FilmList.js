import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";

function FilmList({ baseUrl }) {
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [filmList, setFilmList] = useState([]);
  const [categories, setCategories] = useState([]);

  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const catToggle = () => setCatDropdownOpen((prevState) => !prevState);
  const [catDropdownVal, setCatDropdownVal] = useState();
  const [catId, setCatId] = useState();

  const [ratDropdownOpen, setRatDropdownOpen] = useState(false);
  const ratToggle = () => setRatDropdownOpen((prevState) => !prevState);
  const [ratDropdownVal, setRatDropdownVal] = useState();

  useEffect(() => {
    if(isFirstLoad){
      fetchFullFilmList();
      fetchCategories();
      setFirstLoad(false);
    }
  }, [isFirstLoad])

  async function fetchFullFilmList(){
    const response = await fetch(baseUrl + "/film/getAll");
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

  async function fetchCategories(){
    const response = await fetch(baseUrl + "/cat/getAll");
    const resJson = await response.json();
    setCategories(resJson);
  }

  async function filter(){
    if(catId){
      const res = await fetch(baseUrl + "/film/getByCatId/" + catId);
      const json = await res.json();
      setFilmList(json);
    }
  }

  function handleCatDropdown(category){
    setCatDropdownVal(category.name);
    setCatId(category.categoryId);
  }

    return (
      <>
      {!filmList ? <p id="loading">loading...</p> :
      <>
      <Container>
        <Row>
          <Col md={{offset: 1, size: 10}} sm="12">
            <div className="film-card">
              <ul className="filmList-filter">
                <li className="filmList-filter">
                  <h2>Filter By:</h2>
                </li>
                <li className="filmList-filter">
                  {!categories[0] ? <p id="loading-text">loading...</p> :
                  <Dropdown isOpen={catDropdownOpen} toggle={catToggle}>
                  <DropdownToggle caret>
                      { catDropdownVal ? catDropdownVal : 'Category' }
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleCatDropdown(null)}>None</DropdownItem>
                  {categories.map(cat => 
                      <DropdownItem onClick={() => handleCatDropdown(cat)}>
                      { cat.name }
                      </DropdownItem>)}
                  </DropdownMenu>
                  </Dropdown>
                  }
                </li>
                <li className="filmList-filter">
                  <Dropdown isOpen={ratDropdownOpen} toggle={ratToggle}>
                    <DropdownToggle caret>
                        { ratDropdownVal ? ratDropdownVal : "Rating" }
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setRatDropdownVal(null)}>None</DropdownItem>
                        <DropdownItem onClick={() => setRatDropdownVal("G")}>G</DropdownItem>
                        <DropdownItem onClick={() => setRatDropdownVal("PG")}>PG</DropdownItem>
                        <DropdownItem onClick={() => setRatDropdownVal("PG-13")}>PG-13</DropdownItem>
                        <DropdownItem onClick={() => setRatDropdownVal("R")}>R</DropdownItem>
                        <DropdownItem onClick={() => setRatDropdownVal("NC-17")}>NC-17</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
                <li className="filmList-filter">
                  <Button onClick={() => filter()}>Filter</Button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
        {filmList.map(film => 
          <Container>
            <Row>
              <Col md={{offset: 1, size: 10}} sm="12">
                <div className='film-card'>
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
                      <NavLink to={`/edit-film/${film.filmId}`}>Edit</NavLink>| 
                      <NavLink onClick={() => deleteFilm(film)}>Delete</NavLink>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
          )}
      </>
      }
      </>
    )
  }
  
  export default FilmList;