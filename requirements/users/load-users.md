# Load Users

> ## Success ✅

1. Receive a GET request on /api/users route
2. Validate if the request was made by an authenticated user
5. Returns 200 with a list of users

> ## Exception ❌

1. Returns 404 if route not found
2. Returns 403 if user not authenticated
3. Returns 500 if error when loading users