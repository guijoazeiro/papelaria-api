

## Description

E-commerce made with Nestjs, Postgres and AWS S3

## Installation

```bash
$ npm install
```

## Enviroment vaiables

Create an .env like this: 

```bash 
DATABASE_URL="YOUR DATABAASE URL"
JWT_SECRET='YOUR SECRET'
AWS_ACCESS_KEY_ID = 'YOUR ACCESS KEY ID'
AWS_SECRET_ACCESS_KEY = 'YOUR SECRET ACCESS KEY'
AWS_REGION = 'YOUR REGION'
AWS_BUCKET_NAME = 'YOUR BUCKET NAME'

```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License
MIT licensed.
