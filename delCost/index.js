module.exports = function (context, req) {
    context.log('delCost trigger function processed a request.');
    if (req.query.destination) {
        var httpRequest = require('request');
        var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=23 Water Street, Edinburgh, UK|40 Carmichael Street Glasgow, UK&destinations=' + req.query.destination + ', UK&key=AIzaSyCThzS8GAwOA0MtBlJVc3GXrL_TGrPhWZc';
        httpRequest.get({
            url: url,
        }, function (err, response, body) {
            if (err) {
                context.res = {
                    status: 400,
                    body: "Error in Google maps."
                };
                context.done();
            } else {
                var parts = JSON.parse(response.body);
                var edDist = Math.round(parts.rows[0].elements[0].distance.value * 0.000621371);
                var glDist = Math.round(parts.rows[1].elements[0].distance.value * 0.000621371);
                context.res = {
                    // status: 200, /* Defaults to 200 */

                    body: {
                        destination: parts.destination_addresses[0],
                        edDistOneWay: edDist.toString() + " miles",
                        edDistRoundTrip: (edDist * 2).toString() + " miles",
                        edTime: parts.rows[0].elements[0].duration.text,
                        edVanCost: "£ " + Math.round(edDist * 2 * 0.8).toString(),
                        edTruckCost: "£ " + Math.round(edDist * 2 * 1.35).toString(),
                        glDistOneWay: glDist.toString() + " miles",
                        glDistRoundTrip: (glDist * 2).toString() + " miles",
                        glTime: parts.rows[1].elements[0].duration.text,
                        glVanCost: "£ " + Math.round(glDist * 2 * 0.8).toString(),
                        glTruckCost: "£ " + Math.round(glDist * 2 * 1.35).toString()
                    }
                };
                context.log(context.res.body);
                context.done();
            }
        });
    }
    else {
        context.res = {
            status: 400,
            body: "No destination provided. Please provide a destination."
        };
    }

};
