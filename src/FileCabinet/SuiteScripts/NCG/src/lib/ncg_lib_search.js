/** 
 *@NApiVersion 2.1
 */
 
define (['N/search'],

function(search) {
    function getRecordId({
        type = '',
        filters = null
    } = {}) {
        let id = 0;
        
        if (type && filters) {
            log.debug({
                title: 'getRecordId',
                details: JSON.stringify(filters)
            });
            let searchObj = search.create({
                type: type,
                filters: filters
            });            
            
            let result = searchObj.run().getRange(0, 1)[0];
            
            id = result && result.id;
        }
        
        return id;        
    }

    function getSavedSearchResults({
        searchId = '',
        columns = [],
        filters = []
    } = {}) {
        const RESULT_LIMIT = 1000;
        let results = [];
                
        if (searchId) {
            try {
                let startIndex = 0;
                let endIndex = RESULT_LIMIT;
                let searchObj = search.load({id: searchId});
                 
                searchObj.columns = searchObj.columns.concat(columns);    
                searchObj.filters = searchObj.filters.concat(filters);

                let resultSet = searchObj.run();
                let currentResults = [];

                do {
                    currentResults = resultSet.getRange(startIndex, endIndex);
                    
                    results = results.concat(currentResults);
                    startIndex += RESULT_LIMIT;
                    endIndex += RESULT_LIMIT;
                } while (currentResults.length == RESULT_LIMIT)
            }
            catch(e) {
                log.error({
                    title: 'getSavedSearchResults: INVALID SEARCH',
                    details: JSON.stringify(e)
                });
            }
        }        
        
        log.debug({
            title: 'getSavedSearchResults',
            details: `Sample result: ${JSON.stringify(results[0])}`
        });

        return results;
    }

    function getSearchResults(options) {
        const RESULT_LIMIT = 1000;
        let results = [];
                
        if (options && options.type) {
            try {
                let startIndex = 0;
                let endIndex = RESULT_LIMIT;
                let searchObj = search.create(options);
                let resultSet = searchObj.run();
                let currentResults = [];

                do {
                    currentResults = resultSet.getRange(startIndex, endIndex);
                    
                    results = results.concat(currentResults);
                    startIndex += RESULT_LIMIT;
                    endIndex += RESULT_LIMIT;
                } while (currentResults.length == RESULT_LIMIT)
            }
            catch(e) {
                log.error({
                    title: 'getSearchResults: INVALID SEARCH',
                    details: JSON.stringify(e)
                });
            }
        }        
        
        log.debug({
            title: 'getSearchResults',
            details: `Sample result: ${JSON.stringify(results[0])}`
        });

        return results;
    }
    
    return {
        getRecordId: getRecordId,
        getSavedSearchResults: getSavedSearchResults,
        getSearchResults: getSearchResults
    }; 
});