import axios from 'axios';

const CATEGORY_API_BASE_URL = "http://localhost:8081/category";

class CategoryService {
    getAllCategories() {
        return axios.get(CATEGORY_API_BASE_URL);
    }

    getCategoryById(id) {
        return axios.get(CATEGORY_API_BASE_URL + '/' + id);
    }

    createCategory(category) {
        return axios.post(CATEGORY_API_BASE_URL, category);
    }

    updateCategory(category, categoryId) {
        return axios.put(CATEGORY_API_BASE_URL + '/' + categoryId, category);
    }
}

export default new CategoryService();