import axios from 'axios';
export const fetchPost = async () => {
   try {
      return axios.get('https://jsonplaceholder.typicode.com/users')
   } catch (error) {
      console.error('Error fetching countries:', error);
      throw error; // Re-throw for error handling in Redux
   }
}
