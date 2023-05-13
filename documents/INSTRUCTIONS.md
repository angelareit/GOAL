## Database

### To create database run the following commands:
```
psql -U development;
Password: development

CREATE DATABASE goal_keeper;
```

### To create the tables:
```
npx prisma migrate dev --name init
```

### To update the tables:
```
npx prisma migrate dev --name
```

### To reset the database and apply all migrations:
```
npx prisma migrate reset
```

### To seed the database:
```
npx prisma db seed
```