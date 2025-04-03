module.exports = {
  apps: [{
    name: 'aeo-saas-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000,
      MONGO_URI: 'your_production_mongodb_uri',
      FRONTEND_URL: 'https://frontieraeo.com',
      STRIPE_WEBHOOK_SECRET: 'your_webhook_secret',
      // Other environment variables
    }
  }],
  deploy: {
    production: {
      user: 'your_server_user',
      host: 'frontieraeo.com',
      ref: 'origin/main',
      repo: 'git@github.com:the1carver/aeo-saas.git',
      path: '/var/www/aeo-saas/backend',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}; 