Introduction

- JWT is a remarkable JSON web token that you can use to have the user securely make several requests without validating repeatedly. 
- It usually has an expiration time, and a new token is recreated every few minutes to keep the communication secure.
- It provides a stateless solution for authentication and stateless applications are easy to scale.

What is the JSON Web Token structure?

In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:
- Header
- Payload
- Signature

Therefore, a JWT typically looks like the following.
xxxxx.yyyyy.zzzzz

Advantages of JWT:

-As JSON is less verbose than XML, when it is encoded its size is also smaller, making JWT more compact than SAML. This makes JWT a good choice to be passed in HTML and HTTP environments.
-JSON parsers are common in most programming languages because they map directly to objects.
-The payload contains all the required information about the user, to avoid querying the database more than once.

Bcrypt: To hash the plain password and store it in the database.