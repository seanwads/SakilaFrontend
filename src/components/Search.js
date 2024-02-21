import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

function Search({ baseUrl }) {

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        const searchInput = document.getElementById("text-input").value;
        //get filter input data

        const res = await fetch(baseUrl+"/film/getByTitle/" + searchInput);
        const resJson = await res.json();
        try {
            const id = resJson[0].filmId;
            navigate("/film/" + id);
        }
        catch{
            navigate("*");
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
                            {/* this will be a filter button */}
                            <button type="button" id="search-button">Films...</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }

  
  export default Search;