import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

function AddFilm({ baseUrl }){
    const [isFirstLoad, setFirstLoad] = useState(true);
    const[categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const [catDropdownOpen, setCatDropdownOpen] = useState(false);
    const catToggle = () => setCatDropdownOpen((prevState) => !prevState);
    const [catDropdownVal, setCatDropdownVal] = useState();

    const [ratDropdownOpen, setRatDropdownOpen] = useState(false);
    const ratToggle = () => setRatDropdownOpen((prevState) => !prevState);
    const [ratDropdownVal, setRatDropdownVal] = useState("G");

    useEffect(() => {
        if(isFirstLoad){
            fetchCategories();
            setFirstLoad(false);
        }
    })

    async function fetchCategories(){
        const response = await fetch(baseUrl + "/cat/getAll");
        const resJson = await response.json();
        setCategories(resJson);
      }

    async function handleSubmit(event){
        event.preventDefault();

        let categoryJson = "";

        if(catDropdownVal){
            const categoryRes = await fetch(baseUrl + "/cat/getByName/" + catDropdownVal);
            categoryJson = await categoryRes.json();
        }
        else {
            categoryJson = categories[0];
        }

        const response = await fetch(baseUrl + "/film/create",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            "title": event.target.title.value,
            "description": event.target.description.value,
            "releaseYear": event.target.releaseYear.value,
            "languageId": 1,
            "rating": ratDropdownVal,
            "categorySet": [categoryJson]
        })});

        const resJson = await response.json();
        navigate('/film/' + resJson.filmId);
    }

    return(
        <form id="edit-film-form" onSubmit={(event) => handleSubmit(event)}>
            <input type="text" id="title" name="title" placeholder="title" required/>
            <br />
            <input type="text" id="description" name="description" placeholder="description" />
            <br />
            <input type="text" id="releaseYear" name="releaseYear" placeholder="release year" />
            <br />
            <Dropdown isOpen={ratDropdownOpen} toggle={ratToggle}>
                <DropdownToggle caret>
                    { ratDropdownVal }
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => setRatDropdownVal("G")}>G</DropdownItem>
                    <DropdownItem onClick={() => setRatDropdownVal("PG")}>PG</DropdownItem>
                    <DropdownItem onClick={() => setRatDropdownVal("PG-13")}>PG-13</DropdownItem>
                    <DropdownItem onClick={() => setRatDropdownVal("R")}>R</DropdownItem>
                    <DropdownItem onClick={() => setRatDropdownVal("NC-17")}>NC-17</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <br />

            {!categories[0] ? <p id="loading-text">loading...</p> :
                <Dropdown isOpen={catDropdownOpen} toggle={catToggle}>
                <DropdownToggle caret>
                    { catDropdownVal ? catDropdownVal : categories[0].name }
                </DropdownToggle>
                <DropdownMenu>
                {categories.map(cat => 
                    <DropdownItem onClick={() => setCatDropdownVal(cat.name)}>
                    { cat.name }
                    </DropdownItem>)}
                </DropdownMenu>
                </Dropdown>
            }

            <button type="submit">Submit</button>
        </form>
    )
}

export default AddFilm;