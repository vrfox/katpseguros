module.exports = {
  apps: [
    {
      name: 'katpseguros-frontend',
      script: 'npm',
      args: 'run start',
      cwd: './',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 5173,
      },
    },
  ],
}
