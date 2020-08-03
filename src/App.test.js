import React from "react";
import { configure, mount } from "enzyme";
import { BrowserRouter } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import App from "./App";

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/
configure({ adapter: new Adapter() });
const wrapper = () =>
  mount(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
describe("<App/>", () => {
  // it("renders without crashing", () => {
  //   const div = document.createElement("div");
  //   ReactDOM.render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>,
  //     div
  //   );
  // });
  it("should match snapshort", () => {
    const snapshort = renderer.create(wrapper).toJSON();
    expect(snapshort).toMatchSnapshot();
  });
});
