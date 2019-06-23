const service = require('../services/getArea');

function getSector(req, res) {
    res.status(200).json({ data: service.getArea(req.body), status: 200})
}

module.exports = {getSector};