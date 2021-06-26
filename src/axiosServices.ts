import axios from 'axios';

axios.defaults.baseURL = 'https://safe-dawn-48400.herokuapp.com/';
axios.defaults.headers.common = { Accept: 'application/json' };

export default axios;
