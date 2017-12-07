# ReSTful Exercise

While there are a plethora of ReSTful best practices...

- https://www.gitbook.com/book/geemus/http-api-design
- https://cloud.google.com/apis/design
- https://github.com/WhiteHouse/api-standards
- https://apiguide.readthedocs.io/en/latest

This simple blog app was an academic exercise to implement a mostly-functional, persistent web service following this simple pattern:

| Name    | Endpoint         | HTTP Verb | Description                       |
|---------|------------------|-----------|-----------------------------------|
| Index   | /things          | GET       | List all things                   |
| New     | /things/new      | GET       | Form to make new thing            |
| Create  | /things          | POST      | Add new thing to DB, redirect     |
| Show    | /things/:id      | GET       | Show detail about specific thing  |
| Edit    | /things/:id/edit | GET       | Show edit form for specific thing |
| Update  | /things/:id      | PUT       | Update specificthing, redirect    |
| Destroy | /things/:id      | DELETE    | Delete specific thing, redirect   |

Unfortunately, using HTTP methods like PUT and DELETE requires hacks like Node.js' [method-override](https://github.com/expressjs/method-override), but such trickery is a worthwhile sacrifice to maintain consistent APIs. Seemingly obvious alternatives like resorting to associating methods readily supported in HTML forms with less consistent endpoints should be avoided for the sake of user sanity.
