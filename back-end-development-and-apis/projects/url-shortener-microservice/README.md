# URL Shortener Microservice

This is the boilerplate code for the URL Shortener Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice.

- [x] You should provide your own project, not the example URL.
- [x] You can POST a URL to `/api/shorturl` and get a JSON response with `original_url` and `short_url` properties. Here's an example: `{ original_url : 'https://freeCodeCamp.org', short_url : 1}`
- [x] When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL.
- [x] If you pass an invalid URL that doesn't follow the valid `http://www.example.com format`, the JSON response will contain `{ error: 'invalid url' }`
