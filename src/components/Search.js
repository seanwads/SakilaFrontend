import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap";

function Search({ baseUrl }) {

    const navigate = useNavigate();

    const[dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const[dropdownVal, setDropdownVal] = useState();

    async function handleSubmit(event){
        event.preventDefault();
        const searchInput = document.getElementById("text-input").value;
        
        switch (dropdownVal) {
            case "Film":
                const filmRes = await fetch(baseUrl+"/film/getByTitle/" + searchInput);
                const filmJson = await filmRes.json();
                try {
                    const id = filmJson[0].filmId;
                    navigate("/film/" + id);
                }
                catch{
                    navigate("*");
                }
                break;
            case "Actor":
                const actorRes = await fetch(baseUrl + "/actor/getByNameContains/" + searchInput);
                const actorJson = await actorRes.json();
                try{
                    const id = actorJson[0].actorId;
                    navigate("/actor/" + id);
                }
                catch {
                    navigate("*");
                }
                break;
            default:
                const res = await fetch(baseUrl+"/film/getByTitle/" + searchInput);
                const resJson = await res.json();
                try {
                    const id = resJson[0].filmId;
                    navigate("/film/" + id);
                }
                catch{
                    navigate("*");
                }
                break;

        }

        
    }

    return (
        <div id="search-body">
            <Container>
                <Row>
                    <Col md={{offset: 3, size: 6}} sm="12">
                        <h1 id="search-title">widescreend</h1>
                        <form id="search-bar" onSubmit={(event) => handleSubmit(event)}>
                            <input type="text" id="text-input" placeholder="Search..." />
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
            </Container>
        </div>
    )
  }

  
  export default Search;