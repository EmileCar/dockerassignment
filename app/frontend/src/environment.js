let API_URL;

if (typeof process.env.API_URL !== 'undefined') {
    // API_URL exists
    console.log('API_URL exists, using value: ' + process.env.API_URL);
    API_URL = process.env.API_URL;
} else {
    // API_URL does not exist
    console.log('API_URL does not exist, using default value: http://localhost:80');
    API_URL = 'http://localhost:80';
}

export default API_URL;

