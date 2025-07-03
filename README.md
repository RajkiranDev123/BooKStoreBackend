A.SETUP INSTRUCTIONS

 1. Open your folder or create a new folder in any drive.
 2. open cmd and type or copy/paste : git clone https://github.com/RajkiranDev123/BooKStoreBackend.git
 3. open it in vs code and run command : npm install and make sure node js is installed earlier and internet connection is must.
 4. navigate to server directory and run the server : using npm run dev

    
B. Testing endpoints 
Go to post man and click import and copy/paste the curls below :
 1. login curl :
    
curl --location 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanVtYW1hQGdtYWlsLmNvbSIsInVzZXJJZCI6IjQ1ZDEyMzU1LWRhMjItNDYxYi1iOWNjLWJmOTJlNzUxYjZlOSIsImlhdCI6MTc1MTUxMDg1NSwiZXhwIjoxNzUxNjgzNjU1fQ.x8Dlaxu5gd_AoxUhkDZ7Vq2NkX8_9rNykIHj5SCAjYQ' \
--data-raw '{
 "email":"rajumama@gmail.com",
 "password":"12345678"
}'

or create a new req and paste http://localhost:3000/api/v1/auth/login

2. register
   curl --location 'http://localhost:3000/api/v1/auth/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanVtYW1hQGdtYWlsLmNvbSIsInVzZXJJZCI6IjQ1ZDEyMzU1LWRhMjItNDYxYi1iOWNjLWJmOTJlNzUxYjZlOSIsImlhdCI6MTc1MTUxMDg1NSwiZXhwIjoxNzUxNjgzNjU1fQ.x8Dlaxu5gd_AoxUhkDZ7Vq2NkX8_9rNykIHj5SCAjYQ' \
--data-raw '{
    "email":"rajumama@gmail.com",
    "password":"12345678"
 }'

or http://localhost:3000/api/v1/auth/register


3.add book
curl --location 'http://localhost:3000/api/v1/book/add-book' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanVtYW1hQGdtYWlsLmNvbSIsInVzZXJJZCI6IjQ1ZDEyMzU1LWRhMjItNDYxYi1iOWNjLWJmOTJlNzUxYjZlOSIsImlhdCI6MTc1MTUxMDg1NSwiZXhwIjoxNzUxNjgzNjU1fQ.x8Dlaxu5gd_AoxUhkDZ7Vq2NkX8_9rNykIHj5SCAjYQ' \
--data '{
    "title":"history 6",
    "author":"Raj6",
    "description":"Great book 6!",
    "price":98,
    "quantity":4,
    "genre":"ancient",
    "publishedYear":2006
}'

or  http://localhost:3000/api/v1/book/add-book

4. get all books
   curl --location --request GET 'http://localhost:3000/api/v1/book/get-all-books?genre=&page=2&limit=10' \
--header 'Content-Type: text/plain' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanVtYW1hQGdtYWlsLmNvbSIsInVzZXJJZCI6IjQ1ZDEyMzU1LWRhMjItNDYxYi1iOWNjLWJmOTJlNzUxYjZlOSIsImlhdCI6MTc1MTUxMDg1NSwiZXhwIjoxNzUxNjgzNjU1fQ.x8Dlaxu5gd_AoxUhkDZ7Vq2NkX8_9rNykIHj5SCAjYQ' \
--data '{
    "title":"Math 99",
    "author":"Raj4",
    "description":"Great book to practice4!",
    "price":"104",
    "quantity":4,
    "genre":"fiction",
    "publishedYear":"2003"
}'

or http://localhost:3000/api/v1/book/get-all-books?genre=&page=2&limit=10

 5. delete book
    curl --location --request DELETE 'http://localhost:3000/api/v1/book/delete-book/de95f8c4-e40d-45eb-84a7-24f1c520ea38' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanVtYW1hQGdtYWlsLmNvbSIsInVzZXJJZCI6IjQ1ZDEyMzU1LWRhMjItNDYxYi1iOWNjLWJmOTJlNzUxYjZlOSIsImlhdCI6MTc1MTUxMDg1NSwiZXhwIjoxNzUxNjgzNjU1fQ.x8Dlaxu5gd_AoxUhkDZ7Vq2NkX8_9rNykIHj5SCAjYQ'

or http://localhost:3000/api/v1/book/delete-book/de95f8c4-e40d-45eb-84a7-24f1c520ea38


6. curl --location --request PUT 'http://localhost:3000/api/v1/book/update-book/597c2890-e7ff-4cb8-ac25-fd593724b802' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanVtYW1hQGdtYWlsLmNvbSIsInVzZXJJZCI6IjQ1ZDEyMzU1LWRhMjItNDYxYi1iOWNjLWJmOTJlNzUxYjZlOSIsImlhdCI6MTc1MTUxMDg1NSwiZXhwIjoxNzUxNjgzNjU1fQ.x8Dlaxu5gd_AoxUhkDZ7Vq2NkX8_9rNykIHj5SCAjYQ' \
--data '{
    "title":"history 6 updated",
    "author":"Raj6",
    "description":"Great book 6!",
    "price":98,
    "quantity":4,
    "genre":"ancient",
    "publishedYear":2006
}'
or http://localhost:3000/api/v1/book/update-book/597c2890-e7ff-4cb8-ac25-fd593724b802




                             
