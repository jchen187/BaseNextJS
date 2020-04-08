module.exports = {
  apps : [
    {
      name: 'server',
      script: 'npm run dev',
      instances: 1,
      autorestart: true,
      watch: false, //watch and restart app if file changes
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },

      log_date_format  : "YYYY-MM-DD HH:mm Z",
      watch            : false,
      ignore_watch     : [ "node_modules", "**/*.log" ],
      max_restarts     : 10,      // defaults to 15
    },
    {
      name: 'storybook',
      script: 'npm run storybook',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
    },
    {
      name: 'lint',
      script: 'npm run lint',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
    },
    {
      name: 'watch-lint',
      script: 'npm run watch:lint',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
    },
    {
      name: 'API',
      script: 'app.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
