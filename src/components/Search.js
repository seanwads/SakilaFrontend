import { Container, Row, Col } from "reactstrap";

function Search({ read }) {

    function handleSubmit(){
        //get search input data
        //get filter input data
        //send to MainContent
    }

    return (
        <body id="search-body">
            <Container>
                <Row>
                    <Col md={{offset: 3, size: 6}} sm="12">
                        <h1 id="search-title">widescreend</h1>
                        <form id="search-bar" onSubmit={handleSubmit}>
                            <input type="text" id="text-input" placeholder="Search..." />
                            {/* this will be a filter button */}
                            <button type="button" id="search-button">Films...</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </body>
    )
  }

  
  export default Search;