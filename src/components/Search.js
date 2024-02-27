import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, ListGroup, ListGroupItem } from "reactstrap";

function Search({ baseUrl }) {

    const navigate = useNavigate();

    const[dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const[dropdownVal, setDropdownVal] = useState();
    const[searchResults, setSearchResults] = useState([]);


    async function handleSubmit(event){
        event.preventDefault();
        const searchInput = document.getElementById("text-input").value;
        
        switch (dropdownVal) {
            case "Film":
                const filmRes = await fetch(baseUrl+"/film/getByTitle/" + searchInput);
                const filmJson = await filmRes.json();
                setSearchResults(filmJson);
                break;
            case "Actor":
                const actorRes = await fetch(baseUrl + "/actor/getByNameContains/" + searchInput);
                const actorJson = await actorRes.json();
                setSearchResults(actorJson);
                break;
            default:
                const res = await fetch(baseUrl+"/film/getByTitle/" + searchInput);
                const resJson = await res.json();
                setSearchResults(resJson);
                break;
        }

        console.log(searchResults);
    }

    return (
        <div id="search-body">
            <Container>
                <Row>
                    <Col md={{offset: 3, size: 6}} sm="12">
                        <h1 id="search-title">widescreend</h1>
                        <form id="search-bar" onSubmit={(event) => handleSubmit(event)}>
                            <input type="text" id="text-input" placeholder="Search..."/>
                            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                <DropdownToggle caret>
                                    {dropdownVal ? dropdownVal : "Search For..."}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => setDropdownVal("Film")}>Film</DropdownItem>
                                    <DropdownItem onClick={() => setDropdownVal("Actor")}>Actor</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col md={{offset: 4, size: 4}} sm="12">
                        {!searchResults ? <p>loading...</p> : (
                            <div id="search-results">
                                <ListGroup>
                                    {dropdownVal === "Actor" ? (
                                        searchResults.map((actor) => 
                                        <ListGroupItem><Link to={`/actor/${actor.actorId}`}>{actor.firstName} {actor.lastName}</Link></ListGroupItem>
                                        )
                                    ) : (
                                        searchResults.map((film) => 
                                        <ListGroupItem><Link to={`/film/${film.filmId}`}>{film.title}</Link></ListGroupItem>
                                        )
                                    )}
                                </ListGroup>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }

  
  export default Search;