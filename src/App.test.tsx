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
    // const postsURL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=fast`;
    fetchMock.get(postsURL, {
      Search: [
        { imdbID: "1", Title: "fast", Poster: "pp", Type: "fff", Year: "2020" },
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

    // expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    // expect(screen.getByText(/nebe/i)).toBeInTheDocument();
  });

  // test("App renders Posts after succesfull fetch", async () => {
  //   await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

  //   expect(screen.getByTestId("posts-header")).toBeInTheDocument();
  //   expect(screen.getByText(/mock 1/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Mock title/i)).toBeInTheDocument();
  // });

  // test("Ability to search by post title", async () => {
  //   await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
  //   const searchInput = screen.getByTestId("search-post");

  //   expect(screen.getByText(/mock 1/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Mock title/i)).toBeInTheDocument();

  //   fireEvent.change(searchInput, { target: { value: "Mock 1" } });

  //   expect(screen.getByText(/mock 1/i)).toBeInTheDocument();
  //   expect(screen.queryByText(/Mock title/i)).toBeNull();
  // });

  // test("When searching for non existing post - 'no posts message' is displayed", async () => {
  //   await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
  //   const searchInput = screen.getByTestId("search-post");
  //   fireEvent.change(searchInput, { target: { value: "Eligible AIIIIII" } });

  //   expect(screen.getByTestId("no-posts-msg")).toBeInTheDocument();
  // });

  // test("Clicking on the post will redirect user to post details", async () => {
  //   fetchMock.get("https://jsonplaceholder.typicode.com/posts/1", {
  //     id: 1,
  //     userId: 1,
  //     title: "mock 1",
  //     body: "mock body",
  //   });

  //   await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

  //   await act(async () => {
  //     userEvent.click(screen.getByText(/mock 1/i));
  //     await waitForElementToBeRemoved(() => screen.getByTestId("posts-header"));
  //   });

  //   expect(screen.getByText(/mock 1/i)).toBeInTheDocument();
  //   expect(screen.getByText(/by: 1/i)).toBeInTheDocument();
  //   expect(screen.getByText(/mock body/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Back to posts/i)).toBeInTheDocument();
  // });

  // test("In Post details on 'back to posts' click - returns user to all posts", async () => {
  //   await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
  //   await act(async () => {
  //     userEvent.click(screen.getByTestId("back-to-posts"));
  //   });

  //   expect(screen.getByTestId("posts-header")).toBeInTheDocument();
  //   expect(screen.getByText(/mock 1/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Mock title/i)).toBeInTheDocument();
  // });
});
