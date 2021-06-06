import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  getByLabelText,
} from "@testing-library/react";
import App from "./App";
import fetchMock from "fetch-mock";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  beforeAll(() => {
    const postsURL = `https://www.omdbapi.com/?apikey=89285fbf&s=fast`;
    fetchMock.get(postsURL, {
      Search: [
        {
          imdbID: "1",
          Title: "Fast",
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
  });
});
