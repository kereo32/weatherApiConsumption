import axios from 'axios';

// Function to fetch an image URL based on a weather condition
async function getImageByWeatherCondition(condition: string): Promise<string | undefined> {
  const DEFAULT_URL: string =
    'https://images.theconversation.com/files/232705/original/file-20180820-30593-1nxanpj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop';
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        query: condition,
        orientation: 'landscape',
        client_id: import.meta.env.VITE_REACT_APP_SECRET_ACCESS_KEY,
      },
    });

    if (response.data && response.data.urls) {
      return response.data.urls.regular;
    }

    return undefined;
  } catch (error) {
    console.error('Error fetching image:', error);
    return DEFAULT_URL;
  }
}

export default getImageByWeatherCondition;
