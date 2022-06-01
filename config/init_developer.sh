#!/bin/bash
### BEGIN INIT INFO
# Provides:          Bsale Chile
# Required-Start:    $syslog
# Required-Stop:     $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: ApiGateway
# Description:
#
### END INIT INFO

cd /home/ubuntu/apps/internal_gateway;
echo 'Iniciando Servidor'
pm2 start ecosystem.config.js --env development

