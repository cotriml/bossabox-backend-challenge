# Add Tool

> ## Success ✅

1. Receive a POST request on /api/tools route
2. Validate if the request was made by an authenticated user
3. Validate required fields **title** | **link** | **description** | **tags**
4. Create a tool on database
5. Returns 201 with created tool

> ## Exception ❌

1. Returns 404 if route not found
2. Returns 403 if user not authenticated
3. Returns 400 if missing any required field
4. Returns 500 if error when creating tool