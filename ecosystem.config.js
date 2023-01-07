module.exports = {
  apps: [
    {
      name: "claimflux",
      script: "npm start",
      watch: true,
      // Delay between restart
      watch_delay: 1000,
      ignore_watch: [
        "node_modules",
        "public/docs",
        "public",
        "uploads",
        "error-logs",
        "pm2-logs",
        "src/views/js/session.js",
      ],
      watch_options: {
        followSymlinks: false,
      },
      env: {
        NODE_ENV: "development",
        TZ: "Africa/Nairobi",
      },
      env_production: {
        NODE_ENV: "production",
        TZ: "Africa/Nairobi",
      },
      error_file: "pm2-logs/err.log",
      out_file: "pm2-logs/out.log",
      log_file: "pm2-logs/combined.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};
