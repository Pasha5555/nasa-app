const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
const API_KEY = 'api_key=0b9RxYiObMhFROg07RyXM1JJ0e9PQDU0GVsxQx2e';

export const getPhotos = async (sol, camera) => {
  const res = await fetch(`${BASE_URL}/curiosity/photos?sol=${sol}&camera=${camera}&${API_KEY}`)
  
  return await res.json();
}