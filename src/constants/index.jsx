export const BASE_URL = 'https://66eb2ace55ad32cda47be148.mockapi.io';

export const API_URLS = {
    PRODUCTS: {
        url: `${BASE_URL}/products`,
        config: {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}