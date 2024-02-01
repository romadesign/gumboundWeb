# Clone website dragonbound project full stack
example: https://dragonbound.net/

## stack
- Node J
- Express
- Prism ORM
- React Js (Next Js) Typescript
- DDBB Mysql
- Test - Jest, Testing-lirary, Cypress.io
- Socket io

### Run project
Install mysql or xampp 
name ddbb : dragonbound

```
  //Frontend
    //Create file .env
      NEXTAUTH_URL= "http://localhost:3000"
      NEXT_PUBLIC_BACKAPI_URL= "http://localhost:4000"
  
  npm install ( dependency node_modules )
  
  //Run project
  npm run dev (Start project) http://localhost:3000
  
```

```
 //Server
    // Create file .env
      PORT = 4000
      DATABASE_URL="mysql://root:@localhost:3310/dragonbound"

    npm install

    //Prisma ORM create table
      npx prisma migrate dev  (creating tables in MySQL database)
      // Other options prisma 
      npx prisma studio ( Create data )
      npx prisma db push
      npx prisma migrate force
      npx prisma migrate reset
```

```
  //Test
  npm test
```
