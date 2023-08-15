#!/bin/bash

## This script is used to convert whole project to use npm instead of pnpm

# Find and replace "workspace:*" with "6.0.0" in package.json files (pnpm does not support workspace:*)
find . -type f -name 'package.json' -not -path './node_modules/*' -exec sed -i 's/"workspace:\*"/"6.0.0"/g' {} +

# Remove all node_modules folders (clean up)
find . -type d -name 'node_modules' -exec rm -rf {} +
