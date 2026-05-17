const createError = (status: any, message: any) => {
  const err: any = new Error();
  err.status = status;
  err.message = message;

  return err;
};

export default createError;
