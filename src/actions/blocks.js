import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const loadBlocksStart = (node) => {
  return {
    type: types.LOAD_BLOCKS_START,
    node,
  };
};

const loadBlocksSuccess = (node, blocks) => {
  return {
    type: types.LOAD_BLOCKS_SUCCESS,
    node,
    blocks,
  };
};

const loadBlocksFailure = (node) => {
  return {
    type: types.LOAD_BLOCKS_FAILURE,
    node,
  };
};

export function loadBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(loadBlocksStart(node));

      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(loadBlocksFailure(node));
      }

      const json = await res.json();

      dispatch(loadBlocksSuccess(node, json.data));
    } catch (err) {
      dispatch(loadBlocksFailure(node));
    }
  };
}
