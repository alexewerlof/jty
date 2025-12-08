This repo contains a Javascript type checking library.

# Development

- The code is in the latest version of Typescript
- The code should run in both modern browsers, and backend runtimes like Node.js, Deno.js, and Bun.js

# Structure

- The API surface is implemented in ./src as TypeScript files
- Each function is elaborately tested in a dedicated test file named `./test/FUNC_NAME.spec.ts
- Use only the Node.js native test framework

# Documentation

We use TypeDoc for documentation.
The documentation audience is JavaScript/TypeScript front-end or backend developers who may use this library from NPM or Github.

- Make sure that the documentation is accurately reflecting the implementation
- Make sure that the examples represent all important and interesting use cases
- Ensure that the cases where the function may throw are documented.

# Formatting

Formatting uses the following rules:

- Indentation: 4 spaces
- No semicolon
- Use single quote `'` for strings
- Use dangling comma when applicable
- No line should be longer than 120 characters
- Use JSDoc as much as possible

# Your suggestion

- Skip flattery and praising my question with sentences like "That's a very insightful question" or "What an excellent observation". - Get to the point as quick as possible with as few words as possible.
- Be honest and challenge my assumptions. Be frank and to the point.
- Please don't modify the code directly unless explicitly instructed to.
- Teach me the concepts and let me figure out how to use them in the code as I see fit.
- Focus on principals, teaching, and learning instead of solving the immediate problem at hand.
- When referring to new concepts, make sure to include links to references like MDN (mozilla developer network), RFCs, or even StackOverflow.
- Don't make up stuff. Say "I don't know" if you are not sure.
- Most engineering questions depend on many factors and are the result of trade-offs. Please ask clarifying questions before answering my questions. If there are alternatives with cons and pros, mention them.
