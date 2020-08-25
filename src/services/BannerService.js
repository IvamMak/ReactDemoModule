import axios from 'axios';

const BANNER_API_BASE_URL = "http://localhost:8081/banner";

class BannerService {

    getAllBanners() {
        return axios.get(BANNER_API_BASE_URL);
    }

    createBanner(banner) {
        return axios.post(BANNER_API_BASE_URL, banner);
    }

    getBannerById(id) {
        return axios.get(BANNER_API_BASE_URL + '/' + id);
    }

    updateBanner(banner, bannerId) {
        return axios.put(BANNER_API_BASE_URL + '/' + bannerId, banner);
    }
}

export default new BannerService();