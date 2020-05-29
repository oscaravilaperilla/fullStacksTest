import React from "react";
import { mount } from "enzyme";
import Block from "./Block";
import { Typography } from "@material-ui/core";

describe("Should render component", () => {
  const item = {
    id: "5",
    type: "blocks",
    attributes: {
      data: "data",
    },
  };
  test("render", () => {
    const wrapper = mount(<Block key={item.id} item={item} />);
    expect(wrapper.exists()).toBe(true);
  });
  test("should render 2 Typography", () => {
    const wrapper = mount(<Block item={item} />);
    expect(wrapper.find(Typography)).toHaveLength(2);
  });
});
