#!/bin/bash
docker compose build
docker compose run --rm node npm run build
