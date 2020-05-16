
## Notes Application

Application is created with React and Typescript, used Faker JSON server for Database.

### Users information

Application have functionalities for Login, Register, Logout, Edit own profile information.

Users can see only own profile and own tasks(have authorization for this).

Admins can see/edit/delete every user in website. Admins role can be given only by admin.

Registered users have status online/offline( when login account is online and when logout account is offline)

### Tasks information

Users can see only own tasks. Every task have title, description, estimate(number in hours), created date, status(waiting or ready).

In Home page, users see own task separetly by status in two tables. Users can edit and delete own tasks.

Admins can see tasks of all users, when enter in user profile. When click task name also can edit or delete task.

### Setup project
 To start JSON server write in terminal: npm run server
 To start React project write in terminal: npm start
