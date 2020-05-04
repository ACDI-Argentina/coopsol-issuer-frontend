#!/usr/bin/env bash

export ENVIRONMENT="$1"

# Load env vars
ENV_FILE="../$ENVIRONMENT/docker/.env"

echo "> Loading environment configs from $ENV_FILE"

source "$ENV_FILE"

# Refresh Docker Images
docker-compose -p "$PROJECT" -f docker-compose-base.yml pull

# Start the container
docker-compose -p "$PROJECT" -f docker-compose-base.yml up -d $2
