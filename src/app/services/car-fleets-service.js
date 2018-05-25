import ApiHelper from 'utils/helpers/api-helper';

class VesselFleetService {
    constructor() {
        this.resourceUrl = 'CarGroups';
    }
    getAll() {
        return ApiHelper.get(this.resourceUrl)
            .then(response => response.data, () => null);
    }
    getById(carFleetId, params = {}) {
        return ApiHelper.get(`${this.resourceUrl}/${carFleetId}`, params)
            .then(response => response.data, () => null);
    }
    add(params = {}) {
        return ApiHelper.post(this.resourceUrl, params)
            .then(response => response, () => null);
    }
    remove(carFleetId) {
        return ApiHelper.remove(`${this.resourceUrl}/${carFleetId}`)
            .then(() => true, () => false);
    }
    update(carFleetId, carFleet) {
        return ApiHelper.put(`${this.resourceUrl}/${carFleetId}`, carFleet)
            .then(response => response, () => null);
    }
    getPublicFleets() {
        return ApiHelper.get(`${this.resourceUrl}/User/Public`)
            .then(response => response.data, () => null);
    }
    getPrivateFleets() {
        return ApiHelper.get(`${this.resourceUrl}/User/Private`)
            .then(response => response.data, () => null);
    }
}

export default new VesselFleetService();
