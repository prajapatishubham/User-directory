import axios from 'axios';

// export const fetchUser = async () => {
//     try {
//         return axios.get('https://jsonplaceholder.typicode.com/users')
//     } catch (error) {
//         console.error('Error fetching countries:', error);
//         throw error; // Re-throw for error handling in Redux
//     }
// }

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Adjust base URL as needed

export const  makeRequest = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data,
    });
    return response;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error; // Re-throw for error handling in Redux or components
  }
};
