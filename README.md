# Fastify with Prisma - POC

## Overview
REST API that handles 2 types of resources: Users and Trackers. When a User is created, an access token is provided, so every request in the API aside from the sign up, needs to send the JWT token to get any data.

## Tech Stack
- Fastify
- Prisma ORM
- MongoDB
- Typescript
- Zod
- Swagger

## Swagger docs - /docs
![Screen Shot 2022-07-31 at 21 30 29](https://user-images.githubusercontent.com/10744642/182072538-6444cb73-b16d-4fe5-84c6-aabad13bac16.png)
