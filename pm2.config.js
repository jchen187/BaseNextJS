/*
 * CWD is the directly you will cd into from where you currently are.
 * After you change your directory, the script will run
 */

module.exports = {
  apps : [
    {
      name: 'server',
      cwd: './basenextjs',
      exec_mode: 'fork',
      script: 'npm run dev',
      // args: '',
      env: { NODE_ENV: 'development' },

      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
      max_restarts: 10, // defaults to 15
      watch: false, //watch and restart app if file changes
      ignore_watch: [ "node_modules", "**/*.log" ],

      merge_logs: true,
      // error_file: "",
      // out_file: "",
      // pid_file: "",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
    {
      name: 'storybook',
      cwd: './basenextjs',
      exec_mode: 'fork',
      script: 'npm run storybook',
      // args: '-- -p 6006',
      env: { NODE_ENV: 'development' },

      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    /*
    {
      name: 'lint',
      cwd: './basenextjs',
      exec_mode: 'fork',
      script: 'npm run lint',
      env: { NODE_ENV: 'development' },

      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'watch-lint',
      cwd: './basenextjs',
      exec_mode: 'fork',
      script: 'npm run watch:lint',
      env: { NODE_ENV: 'development' },

      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
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
      */
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
