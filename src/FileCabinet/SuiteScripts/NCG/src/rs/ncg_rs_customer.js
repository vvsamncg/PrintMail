/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/log', 'N/runtime',
        '../lib/ncg_lib_search',
        '../lib/ncg_lib_format'

    ],
    /**
 * @param{log} log
 * @param{search} search
 */
    (log, runtime, ncgSearch, ncgFormat) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            const search_id = runtime.getCurrentScript().getParameter({
                name: 'custscript_ncg_cust_results'
            });

            try {
                const results = ncgSearch.getSavedSearchResults({
                    searchId: search_id
                });
                const csv = ncgFormat.toJSON(results);

                return {
                    status: true,
                    data: csv
                }
            }catch (e){
                return {
                    status: false,
                    data: e.message
                }
            }
        }



        return {get}

    });
