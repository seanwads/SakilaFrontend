import { render, fireEvent, screen } from "@testing-library/react";
import Search from "../components/Search";

beforeEach(() => {
    fetch.resetMocks();
})

test("full search", () => {
    fetch.mockResponseOnce(JSON.stringify({filmId:1, title:"ABSOLUTE DINOSAUR"}));
    render(<Search />)
    const searchBar = screen.getByTestId("search-bar");

    fireEvent.input(searchBar, {target: {value: "Absolute Dinosaur"}});
    fireEvent.keyPress(searchBar, {key: 'Enter', charCode: 13});

    const searchResult = screen.getByDisplayValue("ABSOLUTE DINOSAUR");
    expect(searchResult).toBeVisible();
})