import axios from "axios/index";
import {NetInfo} from "react-native";
import {NETWORK_TIMOUT} from "../Constants/NetworkConfig";

export const ERROR_TYPE_CONNECTION = "connection_error"
export const ERROR_TYPE_API = "api_error"

/**
 * Makes a plain GET request using axios
 * @param url: The url of request
 * @type {string}
 * @param callBackSuccess : A callback function to be fired if the request is successful
 * @type {function}
 * @param callbackError: A callback function to be fired if the request is unsuccessful
 * @type {function}
 * @param params : Params of GET request
 * @type {object}
 */
export function GET(url, callBackSuccess, callbackError, params) {
    if (typeof params === 'undefined') {
        params = {};
    }
    axios.get(url, {
        params: params,
        timeout: NETWORK_TIMOUT
    })
        .then((response) => {
            const {status} = response;
            if(status == 200){
                const {data} = response;
                if(data != null){
                    callBackSuccess(data)
                }else{
                    callbackError(generateError(ERROR_TYPE_API , "Unknown error"))
                }
            }else{
                callbackError(generateError(ERROR_TYPE_API , response.data.error , status))
            }
        })
        .catch((e) => {
            callbackError(generateError(ERROR_TYPE_CONNECTION , e.message ))
        });
}

/**
 * Generates an object representing a request error
 * @param type : type of error
 * @param message : message of error
 * @param code : http response code
 * @return object
 */
function generateError(type, message , code) {
    return {
        errorType: type,
        errorMessage: message,
        errorCode: code
    }
}