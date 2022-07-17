import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const fetchJson = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token')
    options.headers.set('Authorization', token);
    return fetchUtils.fetchJson(url, options)
};

const dataProvider = simpleRestProvider('http://localhost:8080/api/v1/admin', fetchJson);
export default dataProvider;