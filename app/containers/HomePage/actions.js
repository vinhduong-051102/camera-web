import {
  GET_DATA_TABLE_1,
  GET_DATA_TABLE_1_SUCCESS,
  GET_DATA_TABLE_2,
  GET_DATA_TABLE_2_SUCCESS,
  RESET_REDUX,
  TABLE_1_REQUEST_BEGIN,
  TABLE_1_REQUEST_FALSE,
  TABLE_2_REQUEST_BEGIN,
  TABLE_2_REQUEST_FALSE,
} from './constants';

export function resetRedux() {
  return {
    type: RESET_REDUX,
  };
}

export function requestTable1Begin() {
  return {
    type: TABLE_1_REQUEST_BEGIN,
  };
}

export function requestTable2Begin() {
  return {
    type: TABLE_2_REQUEST_BEGIN,
  };
}

export function requestTable1False(error) {
  return {
    type: TABLE_1_REQUEST_FALSE,
    error,
  };
}

export function requestTable2False(error) {
  return {
    type: TABLE_2_REQUEST_FALSE,
    error,
  };
}

export function getDataTable1(body) {
  return {
    type: GET_DATA_TABLE_1,
    body,
  };
}

export function getDataTable1Success(data) {
  return {
    type: GET_DATA_TABLE_1_SUCCESS,
    data,
  };
}

export function getDataTable2(body) {
  return {
    type: GET_DATA_TABLE_2,
    body,
  };
}

export function getDataTable2Success(data) {
  return {
    type: GET_DATA_TABLE_2_SUCCESS,
    data,
  };
}
