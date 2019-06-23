const service = require('../services/getArea');

function getSector(req, res) {
    if (!validateRequest(req.body)) { 
        res.status(400).json({data: 'Invalid req params'});
        return false;
    }
    res.status(200).json({ data: service.getArea(req.body), status: 200})
}

function validateRequest(req) {
    try {
        if (!req) {
            return false;
        } 
        if (!req.hasOwnProperty('lat') || !req.hasOwnProperty('lng')) {
            return false;
        }
        if (typeof req.lat !== 'number' || typeof req.lng !== 'number') {
            return false;
        }
        return true;
    } 
    catch {
        return false;
    }
}

module.exports = {getSector};