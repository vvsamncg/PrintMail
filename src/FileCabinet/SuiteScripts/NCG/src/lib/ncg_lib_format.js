/**
 * @NApiVersion 2.1
 */
define([],
    
    () => {

        const toCSV = (results) => {
             let csv = [];
             results.forEach(function(result){
                  var columns = result.columns;
                  var row = [];
                  if(csv.length == 0){

                       columns.forEach(function(c){
                             row.push(c.label);
                       })
                       csv.push(row);
                  }

                  row = [];
                  columns.forEach(function(c){
                      row.push(result.getValue(c));
                  })
                  csv.push(row.join(','));
             });

             return csv.join('\r\n');
        }

        const toJSON = (results) => {
            let data = [];
            results.forEach(function(result){
                let columns = result.columns;
                let line = {};

                columns.forEach(function(col, i){
                    let key = col.label.toLowerCase().replace(/ /g, '_');
                    line[key] = result.getText({
                            name: col.name,
                            join: col.join,
                        }) ||
                        result.getValue({
                            name: col.name,
                            join: col.join,
                        });
                })

                data.push(line);
            })

            return data;

        }

        return {toCSV, toJSON}

    });
