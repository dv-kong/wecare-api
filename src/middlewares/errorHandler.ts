
const handleError = (err, req, res, next) => {
    const { message } = err;
    const statusCode = err.statusCode ? err.statusCode : 500;
  
    console.log(`MESSAGE : ${message} STATUS : ${statusCode}`);
    res.status(statusCode).json({
      statusCode,
      message,
    });
  };

  export default handleError;


  