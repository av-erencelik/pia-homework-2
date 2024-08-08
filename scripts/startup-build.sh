#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432

npm run migrate

npm run start:prod