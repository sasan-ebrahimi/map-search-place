import {SEARCH_PLACE} from "./types";
import {requestSearchPlace} from "../service/SearchService";

/**
 * Action creator for search place.
 * When it fires dispatches a loading action immediately,then requests to the api to get results
 * and based on fetched data dispatches either success action or error action
 * It also adds a field to request parameters which is required by api -> sort:"relevance"
 *
 * @param query
 * @type {query: string}
 * @returns {Function}
 */
export function searchPlace(query) {
    return (dispatch) => {
        dispatch({type: SEARCH_PLACE.loading});
        requestSearchPlace((data) => {
                dispatch({type:SEARCH_PLACE.success,payload:data})
            },
            (error) => {
                dispatch({type:SEARCH_PLACE.error,payload:error})
            },
            {q: query, sort: "relevance"})
    }
}
