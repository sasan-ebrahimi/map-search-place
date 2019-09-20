import {SEARCH_PLACE} from "../actions/types";

/**
 * Search place reducer
 */

/**
 * Initial state of reducer
 * @type {{loading: boolean, suggestionList: Array, error: undefined}}
 */
const INITIAL_STATE = {
    /**
     * Represents state of request, whether request is on process or not
     */
    loading:false,
    /**
     * The list of places received from server
     */
    suggestionList:[],
    /**
     * Error details of http request
     */
    error:undefined
};

export default (state = INITIAL_STATE, action) => {
    const{payload} = action
    switch (action.type) {

        case SEARCH_PLACE.success:
            return {
                ...state,
                loading:false,
                suggestionList:payload.results,
                error:undefined

            };
        case SEARCH_PLACE.error:
            return {
                ...state,
                loading:false,
                error:payload
            };
        case SEARCH_PLACE.loading:
            return {
                ...state,
                loading:true,
                suggestionList:[],
                error:undefined
            };

        default:
            return state;
    }
};

