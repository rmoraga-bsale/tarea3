module.exports = {
  apps : [{
    name: "Bsale Base UI",
    script: "./bin/www",
    node_args: "--stack-size=16000 --max_old_space_size=100",
    exec_mode: "cluster",
    instances: 2,
    env : {
      NODE_ENV: "development",
      watch: true,
      port: 3000
    },
    env_production: {
      NODE_ENV: "production",
      port: 3002
    }
  }]
}