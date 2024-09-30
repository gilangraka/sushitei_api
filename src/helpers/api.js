const { HttpStatusCode } = require("axios");
const { type } = require("express/lib/response");
require("dotenv").config({});

/**
 * This function is to format the response from the API.
 *
 * @param {object} res - the response from the query
 * @param {number} code - the http status code
 * @param {object} err - the error object
 * @param {object} meta - the pagination metadata
 *
 * @returns {object} - the formatted response
 */
function results(res, code, { err = null, req = null } = {}) { 
    let error = null 
    let metadata = {} 

    if(err !== null && code !== HttpStatusCode.Ok) {
        let message = null 

        if(typeof err === 'AxiosError') {
            err.message = err
        }
        
        if(typeof err.message !== 'undefined') {
            message = err.message 
        }

        if(typeof err.response !== 'undefined') {
            if(code === HttpStatusCode.ExpectationFailed) {
                message = `${err.response.data.exc_type} - ${err.response.data.exception}`
            }

            if(code === HttpStatusCode.Conflict) {
                message = `${err.response.data.exception}`
            }
        }

        if(typeof err.name !== 'undefined') {
            if(err.name === 'SequelizeDatabaseError') {
                const debugMode = ['local', 'development', 'staging']
                message = (debugMode.includes(process.env.NODE_ENV)) ? err.parent : "INTERNAL ERROR"
            }

            if(err.name === 'schema-validator') {
                message = err.array()[0].msg 
            }
        }

        error = {
            code: code,
            message: message 
        } 
    } else {
        if(res !== null) {
            if(typeof res.rows !== 'undefined' && typeof res.count !== 'undefined') {
                const meta = {
                    per_page: parseInt(req.query.per_page) || 10,
                    page: parseInt(req.query.page) || 1
                }

                metadata.per_page = meta.per_page 
                metadata.current_page = meta.page 
                metadata.total_row = res.count
                metadata.total_page = Math.ceil(res.count / meta.per_page) 
        
                res = res.rows 
            }
        }
    }

    return {
        success: code == HttpStatusCode.Ok ? true : false,
        message: code == HttpStatusCode.Ok ? "Success" : "Failed",
        errors: error, 
        metadata: metadata, 
        data: res
    }
}

function paginateArray(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

module.exports = { results, paginateArray }