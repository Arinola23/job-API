#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors (user friendly error handler)

- Validation Errors - validates if the password  or email is correct.
- Duplicate (Email) - responds to duplicated email properly.
- Cast Error - checks when the ID syntax doesn't match what the mongoose is looking for.

#### Security
-npm packages below  are used to protect our api added as middleware in our apps.
- helmet -most popular security package that sets various http headers to prevent numorous possible attacks.
- cors -ensures the api is accessible from different domains.
- xss-clean - sentizes the users input in req.body, req.params and query and protects from cross-site scripting attacks, where the attackers tries to inject some malicious codes.
- express-rate-limit - helps limits the number of request a user can make.

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
