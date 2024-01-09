import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1/';

export default {
  async getCountries() {
    try {
      const response = await axios.get(`${API_BASE_URL}all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  },
};
