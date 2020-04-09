Run example Kettle application:

> npm install
> node index.js

Exceptions in synchronous handlers are caught by Kettle and returned to the user in the request response:

http://localhost:8081/in-handler

Exceptions in async callbacks created with kettle.wrapCallback() are not caught and will terminate the application:

http://localhost:8081/in-callback
