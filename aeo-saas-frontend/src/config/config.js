const config = {
  production: {
    API_URL: 'https://api.frontieraeo.com',
    WEBSITE_URL: 'https://frontieraeo.com',
    APP_URL: 'https://app.frontieraeo.com'
  },
  development: {
    API_URL: 'http://localhost:4000',
    WEBSITE_URL: 'http://localhost:3000',
    APP_URL: 'http://localhost:3000'
  }
};

export default config[process.env.NODE_ENV || 'development']; 