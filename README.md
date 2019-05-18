# App using MERN

## Server Api

## Run server

```
npm run dev
```

### User

1. Data post:

```
  {
    name: req.body.name,
    email: req.body.email,
    pwd: req.body.pwd,
  }
```

- @route POST api/user/register
- @dect Register username and pwd
- @access Public

2. Data post:

```
  const email = req.body.email;
  const pwd = req.body.pwd;
```

- @route POST api/user/login
- @dect Login and return JWT - token
- @access Public

3.

- @route GET api/user/current
- @dect Return current user
- @access Private

### Profile

1.

- @route GET api/prolife
- @desc Prolife user
- @access Public

2. DATA post

```
  {
    handle,
    company,
    website,
    location,
    status,
    bio,
    githubUsername,
    skills: 'string1, string2, ...',
    youtube: Link,
    twitter,
    facebook,
    instagram
  }
```

- @route POST api/prolife
- @desc Create or Edit prolife user
- @access Private

3.

- @route GET api/prolife/handle/:handle
- @desc Get profile by handle
- @access Public

4.

- @route GET api/prolife/user/:user_id
- @desc Get profile by handle
- @access Public

5.

- @route GET api/prolife/all
- @desc Get all profile
- @access Public

6. DATA post

```
  {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }
```

- @route POST api/profile/experience
- @desc Post experience
- @access Private

7. DATA post

```
  school,
  degree,
  feildOfStudy,
  from,
  to,
  current,
  description
```

- @route POST api/profile/education
- @desc Post education
- @access Private

8. DATA DELETE

- @route DELETE api/profile/experience/:exp_id
- @desc Delete exprience from id
- @access Private

9.

- @route DELETE api/profile/education/:edu_id
- @desc Delete education from id
- @access Private

10.

- @route DELETE api/profile
- @desc Delete user and profile
- @access Private

### POST status

1. DATA post

```
  {
    text,
    name,
    avatar,
  }
```

- route POST @api/posts
- desc post
- access Private

2.

- route GET @api/posts
- desc get data
- access Public

3.

- route GET @api/posts/:id_user
- desc post by id
- access Public

4.

- route DELETE @api/posts/:id_user
- desc delete by id
- access Private

5.

- route POST like @api/posts/like/:id
- desc like post
- access Private

6.

- route POST unlike @api/posts/like/:id
- desc like post
- access Private

7. DATA post

```
  {
    text
  }
```

- route POST comment @api/posts/comment/:id
- desc comment post
- access Private

8.

- route DELETE comment @api/posts/comment/:id
- desc comment post
- access Private

### Created 29/04/2019
