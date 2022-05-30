const res = require("express/lib/response");

const defaultStartIdx = parseInt(process.env.DB_SEARCH_START);
const defaultCount = parseInt(process.env.DB_SEARCH_COUNT);
const defaultMaxCount = parseInt(process.env.DB_SEARCH_MAX_COUNT);


const getStart = (userStartStr) => {
    let startIdx = parseInt(userStartStr) || defaultStartIdx;
    if(startIdx < 1 ) {
        startIdx = defaultStartIdx;
    }
    return startIdx - 1;
}

const getCount = (userCountStr) => {
    let count = parseInt(userCountStr) || defaultCount;
    
    if(count < 0 ) {
        count = defaultCount;
    }
    
    return Math.min(count, defaultMaxCount);
}

const undefinedOrNullOrEmpty = (source) => {
    return source === undefined || sourceStr === null || (isString(source) && source.trim() === "");
}

const isString = (source) => {
    return typeof source === string
}

const getNubmer = (source) => {
    if(isString(sourceStr) && typeof source === "number") {
        return Number(source);
    } else {
        return Number("NaN");
    }
}

const serverErrorDefaultMsg = "Internal server error occurred, please contact developers";
const successDefaultMsg = "Success";
const notFoundDefaultMsg = "Document by the given id is not found";
const validationErrorDefaultMsg =  "Input validation error(s) occured.";
const serverErrorDefaultCode = 500;
const successDefaultCode = 200;
const notFoundStatusCode = 404;
const forbiddenRequestCode = 400;

const serverErrorMsg = ({res, statusCode=serverErrorDefaultCode, msg=serverErrorDefaultMsg}) => {
    res.status(statusCode).send(msg);
}

const successMsg = ({res, statusCode=successDefaultCode,  msg=successDefaultMsg}) => {
    res.status(statusCode).send(msg);
}

const notFoundMsg = ({res, statusCode=notFoundStatusCode,  msg=notFoundDefaultMsg}) => {
    res.status(statusCode).send(msg);
}

const validationErrorMsg = ({res, statusCode=forbiddenRequestCode,  msg=validationErrorDefaultMsg}) => {
    res.status(statusCode).send(msg);
}

module.exports = {
    getCount,
    isString,
    getNubmer,
    getStart,
    undefinedOrNullOrEmpty,
    serverErrorMsg,
    successMsg,
    notFoundMsg,
    validationErrorMsg
}