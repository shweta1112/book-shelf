import React from "react";
import { configure, mount } from "enzyme";
import { BrowserRouter } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import BookSearchResults from "./BookSearchResults.component";

configure({ adapter: new Adapter() });
const wrapper = () =>
  mount(
    <BrowserRouter>
      <BookSearchResults />
    </BrowserRouter>
  );

describe("<MyBookShelf/>", () => {
  it("should match snapshort", () => {
    const snapshort = renderer.create(wrapper).toJSON();
    expect(snapshort).toMatchSnapshot();
  });
});
