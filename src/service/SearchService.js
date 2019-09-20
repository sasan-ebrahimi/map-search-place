import {GET} from "./request";
import {BASE_URL, API_KEY, SEARCH_PLACE_METHOD} from "../Constants/NetworkConfig";

/**
 * A middleware function between action and axios,
 * It adds API KEY to the request params
 * @param callBackSuccess : A callback function to be fired if the request is successful
 * @type {function}
 * @param callbackError: A callback function to be fired if the request is unsuccessful
 * @type {function}
 * @param params : Params of GET request
 * @type {object}
 */
export function requestSearchPlace(callBackSuccess, callbackError, params) {
    if (params === undefined)
        params = {key: API_KEY}
    else
        params = {...params, key: API_KEY}
    GET(BASE_URL + SEARCH_PLACE_METHOD, callBackSuccess, callbackError , params)
}