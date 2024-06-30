interface IError extends Error {
  statusCode?: number;
}
let throwError = (message: string, statusCode: number = 400) => {
  let error: IError = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

export default throwError;
