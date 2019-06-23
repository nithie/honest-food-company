const data =  require('../public/data.json');

function getArea(coordinates) {
    const feature = data.features;
    let res = 'Not Found';
    feature.forEach(element => {
        if (element.type === 'Feature') {
            if (element.geometry.type === 'Polygon') {
                if (checkInsidePolygon(coordinates, element.geometry.coordinates[0])) {
                    res = element.properties.Name;
                }
            }
        }
    });
    return res;
}

function checkInsidePolygon(coordinates, polygonPath) {
    
    let { lat, lng } = coordinates;
    let x = lat, y = lng;
    let inside = false;
    for (var i = 0, j = polygonPath.length - 1; i < polygonPath.length; j = i++) {
        let xi = polygonPath[i][1], yi = polygonPath[i][0];
        let xj = polygonPath[j][1], yj = polygonPath[j][0];
        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) { 
                inside = !inside;
            }
        }
    return inside;
}

module.exports = { getArea };