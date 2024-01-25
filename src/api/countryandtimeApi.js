import axios from 'axios';

export const fetchCountries = async () => {
  try {
    const response = await axios.get('http://worldtimeapi.org/api/timezone');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error; // Re-throw for error handling in Redux
  }
};


export const fetchCurrentTime = async (timezone) => {
  try {
    const response = await axios.get(`http://worldtimeapi.org/api/timezone/${timezone}`);
    console.log("response.data.datetime",response.data.datetime)
    return response.data.datetime;

  } catch (error) {
    console.error('Error fetching current time:', error);
    throw error; // Re-throw for error handling in Redux
  }
};
