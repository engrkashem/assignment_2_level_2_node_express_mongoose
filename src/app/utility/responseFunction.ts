// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSuccessResponse = (success: boolean, message: string, data: any) => {
  return {
    success,
    message,
    data,
  };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorResponse = (success: boolean, message: string, error: any) => {
  return {
    success,
    message: message,
    error: {
      code: 404,
      description: error.message || message,
    },
  };
};

export { getSuccessResponse, getErrorResponse };
