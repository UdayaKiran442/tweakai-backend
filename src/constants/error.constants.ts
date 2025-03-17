// auth route
export const REGISTER_USER_IN_DB_ERROR = { message: 'Error registering user in database', errorCode: 'AUTH_101', statusCode: 500 };
export const FIND_USER_BY_EMAIL_IN_DB_ERROR = { message: 'Error finding user by email in database or user do not exist', errorCode: 'AUTH_102', statusCode: 500 };
export const LOGIN_USER_ERROR = { message: 'Error logging user in', errorCode: 'AUTH_103', statusCode: 500 };

// datasets route
export const CREATE_DATASET_IN_DB_ERROR = { message: 'Error creating dataset in database', errorCode: 'DATASET_101', statusCode: 500 };
export const CREATE_DATASET_ERROR = { message: 'Error creating dataset', errorCode: 'DATASET_102', statusCode: 500 };
export const FETCH_ALL_DATASETS_FROM_DB_ERROR = { message: 'Error fetching all datasets from database', errorCode: 'DATASET_103', statusCode: 500 };
export const FETCH_ALL_DATASETS_ERROR = { message: 'Error fetching all datasets', errorCode: 'DATASET_104', statusCode: 500 };

// columns route
export const ADD_COLUMN_TO_DATASET_IN_DB_ERROR = { message: 'Error adding column to dataset in database', errorCode: 'COLUMN_101', statusCode: 500 };
export const ADD_COLUMN_TO_DATASET_ERROR = { message: 'Error adding column to dataset', errorCode: 'COLUMN_102', statusCode: 500 };