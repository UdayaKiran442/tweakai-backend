/**
 * Error Constants Module
 * This module defines constants for error messages and codes used throughout the application.
 * It exports objects containing error messages, error codes, and HTTP status codes.
 */

// auth route
export const REGISTER_USER_IN_DB_ERROR = {
  message: "Error registering user in database",
  errorCode: "AUTH_101",
  statusCode: 500,
};
export const FIND_USER_BY_EMAIL_IN_DB_ERROR = {
  message: "Error finding user by email in database or user do not exist",
  errorCode: "AUTH_102",
  statusCode: 500,
};
export const LOGIN_USER_ERROR = {
  message: "Error logging user in",
  errorCode: "AUTH_103",
  statusCode: 500,
};
export const FIND_USER_BY_ID_IN_DB_ERROR = {
  message: "Error finding user by id in database or user do not exist",
  errorCode: "AUTH_104",
  statusCode: 500,
};

// datasets route
export const CREATE_DATASET_IN_DB_ERROR = {
  message: "Error creating dataset in database",
  errorCode: "DATASET_101",
  statusCode: 500,
};
export const CREATE_DATASET_ERROR = {
  message: "Error creating dataset",
  errorCode: "DATASET_102",
  statusCode: 500,
};
export const FETCH_ALL_DATASETS_FROM_DB_ERROR = {
  message: "Error fetching all datasets from database",
  errorCode: "DATASET_103",
  statusCode: 500,
};
export const FETCH_ALL_DATASETS_ERROR = {
  message: "Error fetching all datasets",
  errorCode: "DATASET_104",
  statusCode: 500,
};
export const FETCH_DATASET_BY_ID_FROM_DB_ERROR = {
  message: "Error fetching dataset by id from database",
  errorCode: "DATASET_105",
  statusCode: 500,
};
export const FETCH_DATASET_BY_ID_ERROR = {
  message: "Error fetching dataset by id",
  errorCode: "DATASET_106",
  statusCode: 500,
};
export const UPDATE_ROW_COUNT_IN_DATASET_IN_DB_ERROR = {
  message: "Error updating row count in dataset in database",
  errorCode: "DATASET_107",
  statusCode: 500,
};
export const UPDATE_COLUMN_COUNT_IN_DATASET_IN_DB_ERROR = {
  message: "Error updating column count in dataset in database",
  errorCode: "DATASET_108",
  statusCode: 500,
};
export const DELETE_DATASET_FROM_DB_ERROR = {
  message: "Error deleting dataset in database",
  errorCode: "DATASET_109",
  statusCode: 500,
};
export const DELETE_DATASET_ERROR = {
  message: "Error deleting dataset",
  errorCode: "DATASET_110",
  statusCode: 500,
};

// columns route
export const ADD_COLUMN_TO_DATASET_IN_DB_ERROR = {
  message: "Error adding column to dataset in database",
  errorCode: "COLUMN_101",
  statusCode: 500,
};
export const ADD_COLUMN_TO_DATASET_ERROR = {
  message: "Error adding column to dataset",
  errorCode: "COLUMN_102",
  statusCode: 500,
};

// rows route
export const ADD_ROW_TO_DATASET_IN_DB_ERROR = {
  message: "Error adding row to dataset in database",
  errorCode: "ROW_101",
  statusCode: 500,
};
export const ADD_ROW_TO_DATASET_ERROR = {
  message: "Error adding row to dataset",
  errorCode: "ROW_102",
  statusCode: 500,
};
export const ADD_ROW_ITEM_TO_DATASET_IN_DB_ERROR = {
  message: "Error adding row item to dataset in database",
  errorCode: "ROW_103",
  statusCode: 500,
};
export const INSERT_BULK_ROW_ITEMS_IN_DB_ERROR = {
  message: "Error inserting bulk row items in database",
  errorCode: "ROW_104",
  statusCode: 500,
};
export const FETCH_EXISTING_ROWS_IN_DB_ERROR = {
  message: "Error fetching existing rows in database",
  errorCode: "ROW_105",
  statusCode: 500,
};
export const ADD_ROW_ITEM_TO_DATASET_ERROR = {
  message: "Error adding row item to dataset",
  errorCode: "ROW_106",
  statusCode: 500,
};
