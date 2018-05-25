import ol from 'openlayers/dist/ol';

export function formatCoordinates(x, y) {
    let coordinates = Math.abs(y).toFixed(2);
    if (y >= 0) {
        coordinates += ' N / ';
    } else {
        coordinates += ' S / ';
    }
    if (Math.abs(x) >= 100) {
        coordinates += Math.abs(x).toFixed(1);
    } else {
        coordinates += Math.abs(x).toFixed(2);
    }
    if (x >= 0) {
        coordinates += ' E';
    } else {
        coordinates += ' W';
    }

    return coordinates;
}

export function wktMaker(type, coordinates) {
    switch (type) {
    case 'polygon': {
        const wkt = [];
        coordinates.forEach(coordinate => wkt.push(coordinate.join(' ')));
        return `POLYGON((${wkt.join(',')}))`;
    }
    case 'multipolygon': {
        const polygons = [];
        let points;

        coordinates.forEach((coords) => {
            points = coords.map(coord => coord.join(' '));
            polygons.push(`(${points.join(',')})`);
        });

        return `MULTIPOLYGON((${polygons.join(', ')}))`;
    }
    default:
        return `POINT(${coordinates.join(' ')})`;
    }
}

export function wktParsePoint(wktPoint) {
    const coordinates = wktPoint.substring(6, wktPoint.length - 1).split(' ');
    return coordinates.map(value => parseFloat(value));
}

export function wktParseLine(routeWkt) {
    const format = new ol.format.WKT();
    try {
        return format.readFeature(routeWkt).getGeometry().getCoordinates();
    } catch (error) {
        return [];
    }
}

export function formatNumber(value, decimals = 1, showPlus = false, commaSeparator = '.', thousandsSeparator = ' ') {
    if (typeof value !== 'number') {
        return 'invalid number';
    }
    const plusSign = value > 0 && showPlus ? '+' : '';
    const fixedValue = value.toFixed(decimals);
    const commaValues = fixedValue.split('.');
    commaValues[0] = parseFloat(commaValues[0]).toLocaleString('en').replace(/,/g, thousandsSeparator);
    return `${plusSign}${commaValues.join(commaSeparator)}`;
}

export function isBetween(x, min, max, minIncluded = true, maxIncluded = false) {
    const minCondition = minIncluded ? x >= min : x > min;
    const maxCondition = maxIncluded ? x <= max : x < max;
    return minCondition && maxCondition;
}

export function sortItemsByPropertyName(property, ascending = true) {
    return (aItem, bItem) => {
        const aValue = getObjectProp(aItem, property);
        const bValue = getObjectProp(bItem, property);
        if (aValue !== undefined && bValue !== undefined) {
            const aName = aValue.toUpperCase();
            const bName = bValue.toUpperCase();
            if (aName < bName) {
                return ascending ? -1 : 1;
            }
            if (aName > bName) {
                return ascending ? 1 : -1;
            }
        }
        return 0;
    };
}

export default formatCoordinates;
