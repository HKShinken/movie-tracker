//called when no route above intercepts requests
const notFound = (req, res, next) => { 

    const error = new Error("Not found - ", req.originalUrl);
    res.status(404)
    next(error)

};

//it has err as first parameter, called when an asyncHandler does next(err)
const errorHandler = (err, req, res, next) => {

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    //Check for Mongoose bad OID
    /* if(err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Resource not found';
        statusCode = 404;
    } */

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'NA' : err.stack
    });

};

export { notFound, errorHandler }