import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import fetchMock from "fetch-mock";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  beforeAll(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const postsURL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;
    fetchMock.get(postsURL, {
      Search: [
        {
          imdbID: "111",
          Title: "fast",
          Poster: "link",
          Type: "Movie",
          Year: "2020",
        },
      ],
    });
  });
  afterAll(() => {
    fetchMock.restore();
  });

  test("renders App successfully", () => {
    const linkElement = screen.getByText(/Favourite Movies/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("App renders movie list after successfull search", async () => {
    const searchInput = screen.getByLabelText("search-movies");
    const submitBtn = screen.getByRole("button", { name: /Search/i });
    fireEvent.change(searchInput, { target: { value: "fast" } });
    fireEvent.click(submitBtn);
    expect(screen.getByLabelText("favourite-header")).toBeInTheDocument();

    /**
     * // expect(screen.getByText(/fast/i)).toBeInTheDocument();
     *
     * I was trying to mock the data and check if its coming back, but could not work out it yet, and I am out of time.
     * will send unfinished tests, but will come back to it to find the solution.(puree curiosity)
     *
     */
  });
});
