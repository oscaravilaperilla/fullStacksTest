jest.mock("cross-fetch");
import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./blocks";
import fetch from "cross-fetch";
describe("Actions", () => {
  beforeAll(() => {});
  afterAll(() => {});
  afterEach(() => {
    fetch.mockReset();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  // it('should create an action to start checking node status', () => {
  //   const actual = ActionCreators.checkNodeStatusStart(node);
  //   const expected = {
  //     type: ActionTypes.CHECK_NODE_STATUS_START,
  //     node
  //   };
  //
  //   expect(actual).toEqual(expected);
  // });

  it("should create an action START AND FINISH ", async () => {
    const dispatch = jest.fn();
    const res = {
      status: 200,
      data: [{}, {}],
    };
    fetch.mockReturnValue({ json: () => Promise.resolve(res) });

    const expected = {
      type: ActionTypes.LOAD_BLOCKS_START,
      node,
    };

    const expectedFinish = {
      type: ActionTypes.LOAD_BLOCKS_SUCCESS,
      node,
      blocks: [{}, {}],
    };

    // we expect this to return a function since it is a thunk
    expect(typeof ActionCreators.loadBlocks(node)).toEqual("function");
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.loadBlocks(node)(dispatch);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(fetch).toHaveBeenCalledTimes(1);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
    expect(dispatch).toBeCalledWith(expectedFinish);
  });

  it("should survive  an error ", async () => {
    const dispatch = jest.fn();
    const res = {
      status: 200,
    };
    fetch.mockReturnValue({ json: () => Promise.reject(res) });

    const expected = {
      type: ActionTypes.LOAD_BLOCKS_START,
      node,
    };

    const expectedFinish = {
      type: ActionTypes.LOAD_BLOCKS_FAILURE,
      node,
    };

    ActionCreators.loadBlocks(node)(dispatch);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(dispatch).toBeCalledWith(expected);
    expect(dispatch).toBeCalledWith(expectedFinish);
  });
});
