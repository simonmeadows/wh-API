module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');


    if (true) {
        var httpRequest = require('request');
        var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=23 Water Street, Edinburgh, UK|40 Carmichael Street Glasgow, UK&destinations=Leith, UK&key=AIzaSyCThzS8GAwOA0MtBlJVc3GXrL_TGrPhWZc';
        httpRequest.get({
            url: url,
        }, function (err, response, body) {
            console.log(response);
            if (err) {
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: "err"
                };
                context.done();
            } else {
                var parts = JSON.parse(response.body);
                context.res = {
                    // status: 200, /* Defaults to 200 */

                    body: parts
                    
                };
                context.done();
            }
        });

    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }

};
