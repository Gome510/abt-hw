# abbott-module-1-homework

Welcome to BigCorp, the wildly successful company you've just joined. Fortunately, BigCorp achieved all of its goals for this quarter - projects are going great, money is flowing in, and there are plenty of opportunities to create solid benefit programs for all employees around the world.

You are tasked with helping to facilitate one of such benefits: there will be an ongoing program of lotteries, where every employee will have an opportunity to win great prizes. All-inclusive trips, expensive cars, as well as funds for personal and charity projects.

Participation in lotteries will be made available in two ways: via a mobile app, and via a dedicated website, with a shared backend service. The users will be able to view the list of the ongoing lotteries, as well as see the results of past ones.

### Homework management 🏠

The final result of all homework is the React Native Application full of features implemented iteratively in the end phase of each module in the course. In order to keep consistency and track all of your changes we highly recommend you to create your own GitHub repository where your work as a participant will be stored. Your GitHub repository should be shared with all trainers, which will enable us to verify your work and communicate:
- Wiktor Szlegier: https://github.com/Wiiktor22
- Adam Trzciński: https://github.com/adamTrz
- Olimpia Żurek: https://github.com/OlimpiaZurek
- Igor Bejnarowicz: https://github.com/igorbej

Each module in the course will end up with homework consisting of a few tasks to fulfil. We would like to suggest a comfortable system for you to submit each task of the homework as a separate PR to the main branch in your repository. This will create a space for us to communicate with you, by doing code reviews - thanks to that we will be able to check your homework, discuss some uncertainties, or respond to questions you will leave in the PR. In case you have any trouble with homework you can always book a 1 to 1 session with the trainer, and also don't hesitate to ask your questions in the dedicated communication channel. Keep in mind that you don't have to worry about being blocked for the next homework, every homework will have a starting point, so you always will be able to override the content of your repository with the prepared starting point.

### The goal of this module’s homework

A project manager asked you to create a solid foundation to ensure that the lotteries are going to be conducted fairly. To achieve that, you have been tasked with the creation of the backend service responsible for the lottery registration process and selecting the lucky winners.

On top of that, your job is also to create a rudimental landing page so that everyone can view the ongoing lotteries and sign up for them, and check the results of the finished lotteries.

You'll need to use your skills in Node.js, JavaScript bundling, and JavaScript in general - there is a requirement that this service will be built in JavaScript because that's the stack BigCorp is using for their internal projects.

### Checkpoints 💡

The homework repository contains periodic checkpoints for your convenience. You will see callouts denoting the current checkpoint throughout this instruction. They will look something like this:


> 💡 You are now here → `checkpoint-xyz`

Feel free to check out the corresponding branch of any given checkpoint if you’re struggling or simply want to compare your solution with ours.

With that out of the way, let’s start!

# Part 1: The backend

<details>
  <summary><b>Create a new project using `npm`</b></summary><br>

  Use the `npm init` command to create a new project. Name it `bigcorp-lotteries-api` and leave all other fields blank.

  ```bash
  mkdir bigcorp-lotteries-api
  cd bigcorp-lotteries-api
  npm init
  ```
</details>

<details>
  <summary><b>Create a Git repository in the created project</b></summary><br>
  
  Create a new Git repository in the project's working directory. The easiest way to do it is to issue the `git init` command in the created project's directory:

  ```bash
  cd bigcorp-lotteries-api
  git init
  ```

  It's a good idea to commit your work now:
  
  ```bash
  git add .
  git commit -m 'Initial commit'
  ```

</details>

<details>
  <summary><b>Add a `.gitignore` file</b></summary><br>
  
It's a good idea to check only your source code into your Git repository, avoiding storing dependencies and local files in Git. You can go into Github `gitignore` repository and copy the Node.js starter contents to the `.gitignore` file in the root directory of your project. You can find it [here](https://github.com/github/gitignore/blob/main/Node.gitignore).
  
  Remember to commit this change:
  
  ```bash
  git add .gitignore
  git commit -m 'Add .gitignore file'

```

</details>

<details>
  <summary><b>Add Express dependency to your project</b></summary><br>
  
  Your lotteries API should use HTTP protocol to communicate with clients. To achieve that, you need to install a library that can create an HTTP server for you. One   of the most popular ones is `express` - [https://expressjs.com/](https://expressjs.com/).
  
  Follow the instructions to install `express` as a dependency in your project:
  
  ```bash
  npm install --save express
  
  ```
  
  - `-save` file asks `npm` to modify your `package.json` file and add it to `dependencies`.
  
  > Remember to commit your work to Git!

</details>

<details>
  <summary><b>Create an Express instance to listen for user requests</b></summary><br>
  
  Create a `server.js` file and create an express instance:
  
  ```jsx
  const express = require("express");
  const app = express();
  const port = 3000;
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  
  ```
  
  You can test if it starts listening by issuing the following command:
  
  ```bash
  node server.js
  ```
  
  You should see:
  
  ```
  Server listening on port 3000
  ```
  
  In your terminal. Use `ctrl + c` to stop it for now.
  
  Commit your changes and proceed with the next step 🚀.

</details>

<details>
  <summary><b>Add an `npm` command to start your server easily</b></summary><br>
  
  Modify your `package.json` to include a command to easily start your server. In order to do so, adjust the `scripts` section in `package.json`. It should look like this:

```json
"scripts": {
  "dev": "node server.js",
  "test": "echo \\"Error: no test specified\\" && exit 1"
},
```

You can now start the server with the following command:

```bash
npm run dev
```

You should see the same "Server listening" output you've seen before.

</details>

<details>
  <summary><b>Create a root route listing existing lotteries</b></summary><br>
  
  In order to actually access API by a browser or mobile app, a route needs to be created. You register a route by calling an appropriate method on the express object you've instantiated. These methods follow HTTP methods (GET / POST / PATCH / DELETE / PUT).

For now, create a root route ("/") which will return an empty object. In the future, you are going to list running lotteries there.

In `server.js`, before listening, register the `GET /` route using the following code:

```jsx
app.get("/", (req, res) => {
  // Send an empty object as the response.
  res.json({});
});
```

Full `server.js` should now look as follows:

```jsx
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // Send an empty object as the response.
  res.json({});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

Start your server using `npm run dev` and visit `http://localhost:3000/` in your browser. You should see an empty object as a response.

Commit your changes and proceed.

> 💡 You are now here → `checkpoint-1`

</details>

<details>
  <summary><b>Add JSON middleware to accept JSON as the request body</b></summary><br>
  
  In the previous section, you've created your first route which returns an empty JSON object.

The JSON format is commonly used by APIs to return data; it can, however, also be used for sending data to an API, apart from just being received. In order to handle it by Express, though, you’ll need to set up a middleware.

Middlewares are the Express’ way of putting logic "in-between" your request and your routes. You may think of them as "plugins" to your Express application. They can handle many cross-cutting concerns like authentication, sanitizing user inputs and more. You are going to use the built-in `json` middleware for Express.

In `server.js` write the following line before registering a route:

```jsx
app.use(express.json({ limit: '10kb' }));

```

`limit` is set to avoid users putting extremely large payloads for malicious intents.

Your `server.js` should look like this:

```jsx
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  // Send an empty object as the response.
  res.json({});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

```

Run your server. If everything is done correctly, there should still be just the `Server listening on port 3000` message.

</details>

<details>
  <summary><b>Add Redis as a client dependency & create a free Upstash account to store the database</b></summary><br>
  
  In order to store data about lotteries you need a database. For this homework, you'll use Redis provided by Upstash. It has a generous free plan which should be just enough to cover everything you need. Go to [https://upstash.com](https://upstash.com/) and create a free account. Create a new database - you can use any name you'd like. You'll get redirected to a page where all required secrets are shown.

You are also going to need a client to connect to this database from your API. Add `redis` package as a dependency to your project:

```bash
npm install redis
```

Commit your changes and move on.

</details>

<details>
  <summary><b>Add `dotenv` as a dependency to manage secrets</b></summary><br>
  
  You'd like to connect to your database, but it'd be unwise to hard-code secrets to your app. One way to get secrets into your app without exposing them in the source code is to use environment variables.

One of the ways to pass environment variables to your application on UNIX systems like macOS or Linux is to prepend them to the command, like this:

```bash
# REDIS_URL is an environment variable which is going to be visible
# to `node server.js` process you are starting.
REDIS_URL=topsecretstuff node server.js

```

To access environment variables in Node.js applications, you can access them using a built-in global `process` object which exposes an `env` property. To try it out, modify `server.js` to print the environment variable `REDIS_URL` at the start of the app:

```jsx
const { REDIS_URL } = process.env;
console.log(REDIS_URL);

```

You can put these statements before setting up the middleware, for example.

If you then run:

```bash
REDIS_URL=topsecretstuff node server.js

```

You should see `topsecretstuff` printed before the usual `Server listening on port...` message.

There are multiple ways to avoid passing env variables that way - you can put them in your shell profile script to set it up using `export` commands and many others. To make your life easier, let's install the `dotenv` package which is used to automatically set env variables for you by reading an `.env` file at the top level of your project.

Add `dotenv` as a *development* dependency of your project:

```bash
npm install --save-dev dotenvf
```

Then create a `.env` file and put your Upstash database credentials there:

```bash
REDIS_URL=<your credentials to Upstash>
```

**Important note:** This file should be added to `.gitignore` file, otherwise you are going to expose your secrets to anyone that has access to the Git repository of the project. Many templates of `.gitignore` files have `.env` already added - it is the case with the Node.js template you've copied before.

You can verify this by calling the `git status` command:

```
$ git status
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   server.js
        modified:   package-lock.json
        modified:   package.json

no changes added to commit (use "git add" and/or "git commit -a")
```

As you can see, there is no `.env` listed here. **Always verify this before committing your secrets to the repo!**

In order to run `dotenv` and load environment variables from the newly created `.env` file, you need to modify the `dev` script in `package.json`:

```json
"dev": "node -r dotenv/config server.js",
```

Notice `-r dotenv/config` command option added.

If you now start your server:

```bash
npm run dev
```

You should see the Upstash secret printed in your console.

It's a good idea to create `.env.template` file which you are going to stage into Git, with empty values as a 'template' developer needs to fill in order to run the project. Create the `.env.template` and put the following content there:

```bash
REDIS_URL=
```

Remove the `console.log` code and commit your changes.


</details>

<details>
  <summary><b>Create a POST endpoint for creating a lottery</b></summary><br>

  You got your database, you got secrets properly passed to your application. Now it's time to write some data to it!

First of all, create a redis client which will be used to issue commands to Redis. To do so, `require` a dependency from `server.js` and issue a `createClient` call:

```jsx
const { REDIS_URL } = process.env;
const redis = require("redis");
const client = redis.createClient({ url: REDIS_URL });
// This is going to write any Redis error to console.
client.on("error", (error) => {
  console.error(error);
});

```

You can do it at the top of your `server.js`.

The `client` instance you've just created will be used to read & write from/to the Upstash Redis instance you've created before - it will retrieve all required credentials from the `REDIS_URL` environment variable.

Redis is a *key-value store* - it is capable of storing a set of data types like lists, hashes or primitives like strings or numbers under a *key* you can then refer to in order to read data back. Usually, it is used as a caching database to speed up your services - since your data needs are very simple and so is the Redis setup, it is a great fit for this project.

Your data structure will look like this:

- There will be a list of IDs under the `lotteries` key which is used to keep a list of all lotteries. It will only store unique identifiers on this list.
- There will be a `lottery.<id>` key for storing each lottery object.

Before you go in and start tinkering with the database, however, there’s the requirement to create such *unique ids* that needs addressing first. There are multiple approaches to solving this problem, like using a counter (so the first lottery gets ID 1, the second gets ID 2, and so on), but in this project, an external dependency will be used to get the unique IDs - you are going to use a system called ULID: [https://github.com/ulid/spec](https://github.com/ulid/spec).

Add the `ulid` dependency to your project:

```bash
npm install ulid
```

Open your `node` in the REPL mode by issuing the `node` command without any parameters. This is a great way to test things interactively!

```jsx
node
Welcome to Node.js v18.12.1.
Type ".help" for more information.
>
```

You can write JavaScript code here and it'll be evaluated after a newline. It has access to your dependencies, so let's take advantage of that by testing the `ulid` dependency. First, require the package and save the result into a variable:

```jsx
> const ulid = require("ulid")
undefined
>
```

And then, call the `ulid` method to generate a new ID:

```jsx
> ulid.ulid()
'01H1JA81NDQP46EXG0J3Q3ND6N'
>
```

Of course, your output will be different. But you know how to generate ULIDs now! Quit REPL by using the `ctrl + d` combination.

Alright, you have everything to actually create your first lottery. You are going to use the following data format to represent lotteries:

```json
{
  "id": "unique ID",
  "name": "lottery name",
  "type": "type of the lottery, there will be multiple types",
  "prize": "Description of a prize, e.g. iPhone 13 Pro Max or $10000",
  "status": "running or completed"
  // depending on type there can be additional fields.
}
```

The `id` is going to be generated by the server, and the server will set the `status` to `running` automatically. The rest of the parameters will be sent as part of the request to create a given lottery.

As a first step, only one type of lottery - a "simple" lottery - will be supported. It will require no additional fields at all. To support this use case, let's register a new `/lotteries` route which will respond to `POST` requests:

```jsx
app.post("/lotteries", (req, res) => {
  /* ... */
});
```

There is a question though - how to retrieve the data sent by the user?

You might have noticed that when you register a route, there are two parameters that the handler function receives - `req` and `res`. These names are of course arbitrary and set by you (it’s a convention to name them `req` and `res`, though), but the first parameter (`req`) always represents the received request. And the second parameter (`res`) is an object responsible for crafting a response to that request. So, by that logic, the data sent to you must live somewhere inside of the `req` parameter.

In one of the previous steps, you’ve set up the `express.json()` middleware, which handles receiving JSON-based data in the requests. It puts the parsed request body in the `body` parameter of the `req` object.

So, putting it all together, in order to obtain the data from the request, you can use the following code:

```jsx
app.post("/lotteries", (req, res) => {
	const { type, name, prize } = req.body;
	// Do something with the data...
});
```

Let's add some rudimentary validations there:

```jsx
app.post("/lotteries", (req, res) => {
  const { type, name, prize } = req.body;
  if (type !== "simple") {
    res.status(422).json({ error: "Invalid lottery type" });
    return;
  }

  if (typeof name !== "string" || name.length < 3) {
    res.status(422).json({ error: "Invalid lottery name" });
    return;
  }

  if (typeof prize !== "string" || prize.length < 3) {
    res.status(422).json({ error: "Invalid lottery prize" });
    return;
  }

  // ...
});
```

**Note:** In real-life scenarios, such validation done manually does not scale well. There are better alternatives like using `joi` or `zod` validation libraries, together with middlewares like the one you've seen before.

As you can see, validation works by checking parameters sent by the user - in case there are invalid, Express is instructed to set HTTP status to 422 (Unprocessable Entity) and send a JSON with an error message.

Now that you know the data is correct, let's generate an ID for it using `ulid`. First of all, add `ulid` dependency at the top of `server.js`:

```java
const ulid = require("ulid");
```

And then construct the new lottery object (in `/lotteries` route after validations):

```jsx
const id = ulid.ulid();

const newLottery = {
  id,
  name,
  prize,
  type,
  status: "running",
};
```

**Note:** `newLottery` uses short-hand object syntax to populate fields. Such object:

```jsx
const id = "foo";
const obj = { id };
```

Is the same as saying:

```jsx
const id = "foo";
const obj = { id: id };
```

Your lotteries object is ready to be written to the database. There is one problem though - operations with Redis are *asynchronous*. That means right now you'd be forced to write code that’s rather ugly:

```jsx
client
  .multi()
  .hSet(`lottery.${id}`, newLottery)
  .lPush("lotteries", id)
  .exec()
  .then(
    () => {
      res.json(newLottery);
    },
    (error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to create lottery" });
    });
```

In order to clean it up a little, you may turn the route handler into an `async` function:

```jsx
app.post("/lotteries", async (req, res) => {
  // ...
});
```

And use the `await` syntax with `try`:

```jsx
try {
  await client
    .multi()
    .hSet(`lottery.${id}`, newLottery)
    .lPush("lotteries", id)
	.exec();

  res.json(newLottery);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Failed to create lottery" });
}
```

Which is equivalent, but admittedly a bit easier to read and reason about.

**Let's unwrap what is happening here, line by line:**

- `client.multi()` starts a *transaction*. In order to properly create a lottery, we need to perform two steps: one is to create a new `lottery.{id}` key, and the second is to add this `id` to the `lotteries` list of IDs. The transaction allows us to either complete both steps or atomically fail without changing any data in the database, which is desired.
- `hSet` sets up a key with an object value - in this case, the key is the `lottery.{id}`, and the value is the newly created lottery object.
- `lPush` adds an element to a list. You add the ID of the created lottery to the `lotteries` key which stores the IDs of all created lotteries.
- `exec` commits the transaction. This indicates to Redis that you already scheduled all commands to be sent as part of this transaction, so at this point, Redis will actually start working on executing these commands. Again, this will be achieved in an atomic way or it will fail, committing nothing, so that you are not left with a partial result.

The next and final line of the `try` block - `res.json(newLottery);` - is responsible for sending the response back to the client - in this case, it's sending the newly created lottery object as a response to the user's request.

The full route should now look as follows:

```jsx
app.post("/lotteries", async (req, res) => {
  const { type, name, prize } = req.body;

  if (type !== "simple") {
    res.status(422).json({ error: "Invalid lottery type" });
    return;
  }

  if (typeof name !== "string" || name.length < 3) {
    res.status(422).json({ error: "Invalid lottery name" });
    return;
  }

  if (typeof prize !== "string" || prize.length < 3) {
    res.status(422).json({ error: "Invalid lottery prize" });
    return;
  }

  const id = ulid.ulid();
  const newLottery = {
    id,
    name,
    prize,
    type,
    status: "running",
  };

  try {
    await client.connect();

    await client
      .multi()
      .hSet(`lottery.${id}`, newLottery)
      .lPush("lotteries", id)
      .exec();

   await client.disconnect();
   res.json(newLottery);
 } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Failed to create lottery" });
  }
});

```

You can test this by using the `curl` command line utility. First of all, start your server using `npm run dev`. Then, in a separate terminal, issue the following command:

```bash
curl --json '{"type": "simple", "name": "Cool lottery", "prize": "$1000"}' http://localhost:3000/lotteries

```

Try changing the data to make the endpoint error out to test whether your validations work.

Commit your changes and continue.

> 💡 You are now here → `checkpoint-2`
</details>

<details>
  <summary><b>Create a GET endpoint for getting information about the lottery and update the root route to list lotteries</b></summary><br>

  You got an endpoint to create new lotteries, but your root endpoint is missing the required information. What's more, there is no way of checking the status of a single lottery.

As an exercise, do the following:

- Register a new GET route `/lottery/:id` which should return data of a single lottery. You can access the passed `id` using the `params` property of the `req` object. So for `/lottery/123456` `req.params.id` should return `123456`. Use the `hGet` method from the `client` to get the result. Test your endpoint for non-existent lotteries - they should respond with a `404` status code and you need to implement the check yourself. Be sure to close the Redis connection in all cases - you can add a `finally` block after the `try...catch` to achieve this.
- Rename the GET route `/` to `/lotteries` to be more descriptive, and use it to return a list of all lotteries. The list should be in format `[{ lottery1 }, { lottery2 }, ..., { lotteryN }]`. Fetch the list of ids using the `client.lRange("lotteries", 0, -1)` query, then create a transaction for getting all lotteries like this:
    
    ```jsx
    // assume you've fetched IDs to lotteryIds
    try {
      // ...
      const transaction = client.multi();
      lotteryIds.forEach((id) => lotteries.hGetAll(`lottery.${id}`));
      const lotteries = await transaction.exec();
      // ...
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get lotteries" });
    }
    
    ```
    

Test your implementation using `curl` or any other tool for HTTP requests - even your web browser will work since those are GET requests.

> 💡 You are now here → `checkpoint-3`
</details>

<details>
  <summary><b>POST endpoint for lottery registration</b></summary><br>

  The missing piece now is the ability for the users to register for the lotteries.

Add a new POST route named `/register`. Use the `req.body` again to access the `lotteryId` and the participant’s `name` in the handler function. Add checks for cases when either one of the fields is missing.

Obtain the lottery data using the `client.hGet()` or `client.hGetAll()` command. Check if the lottery exists and is not finished.

Use the `client.lPush()` function to add the participant’s name to the participant’s list of the corresponding lottery. (Don’t worry if the list for this lottery doesn’t exist yet - `lPush()` will create it in that case.)

> Remember about `async`/`await`!

> 💡 You are now here → `checkpoint-4`
</details>

<details>
  <summary><b>Create a smart script for finalizing lotteries and drawing winners</b></summary><br>

  Sometimes, codebases come with utility scripts for all sorts of miscellaneous functionalities and JavaScript codebases are no exceptions. Actually, right now we could use one such script - one which would allow us to finish a lottery via a CLI, given its `lotteryId`.

To keep things nice and tidy, first create, in the project’s root folder, a `scripts` directory to store the new script:

```bash
mkdir scripts
```

And then, open the new directory and create a new file: `finalizeLottery.mjs`.

A couple of things to note here:

1. The `.mjs` extension denotes a JavaScript module. Modules are a JavaScript-native way of dealing with code from different files. (Yup, that also means: packages!)
2. JavaScript used not to have the capability to import code from different files natively, and over the years tools like Node.js came up with their own ways (e.g. `require`, which we used earlier) of doing that.
3. Nowadays (some) packages are in the process of dropping support for non-native ways of importing code - supporting both approaches is a chore for the package maintainers and takes up precious time better spent somewhere else.
4. We’re going to use the `random` package for selecting the lucky winners, which is one of the libraries that no longer support non-native imports like `require`.
5. Because of that, we need this file to be a module, and hence the new `.mjs` extension.

---

With that out of the way, you can proceed to setting up your script.

Start by adding `random` as a development dependency:

```bash
npm install -D random
```

And continue by adding content to the `finalizeLottery.mjs` file. We’ll leave you with a stub to implement yourself:

```jsx
import { createClient } from "redis";
import random from "random";

const { REDIS_URL } = process.env;
const client = createClient({ url: REDIS_URL });
client.on("error", (error) => {
  console.error(error);
});

async function finalizeLottery() {
  if (process.argv.length !== 3) {
		console.log(
      "Incorrect usage. Usage: npm run finalize-lottery <LOTTERY_ID>"
    );
    return;
  }

  const lotteryId = process.argv[2];

  try {
		await client.connect();
		// TODO: Implement me

  } catch (e) {
    console.log("Error finalizing the lottery:", e.message);
  } finally {
    await client.disconnect();
  }
}

finalizeLottery();
```

Remember about checking for cases where the lottery doesn’t exist, has already finished, or doesn’t have participants. If in doubt, consult the `checkpoint-5` branch.

After that’s done, add a new script in your `package.json`:

```json
"scripts": {
	 (...)
	"finalize-lottery": "node -r dotenv/config scripts/finalizeLottery.mjs",
},
```

This will allow you to run the new script as follows:

```bash
npm run finalize-lottery <LOTTERY_ID>
```

Which will finalize the lottery with the given ID.

> 💡 You are now here → `checkpoint-5`
</details>

# Part 2: The landing page

<details>
  <summary><b>Bootstrap the project using Vite</b></summary><br>

  With the API ready, let’s move to creating the frontend. For that, you’re going to use [Vite](https://vitejs.dev/).

Since the project is relatively small, it’s a sound idea to store the frontend files alongside the backend and have them be a part of the existing Git repository.

Open a terminal at the project’s root folder and run the `npm create vite@latest` command. Install the required package if prompted. Choose `bigcorp-lotteries-client` as the project name, and choose `Vanilla` and `JavaScript` when asked about the framework and variant, respectively.

```bash
npm create vite@latest
✔ Project name: … bigcorp-lotteries-client
✔ Select a framework: › Vanilla
✔ Select a variant: › JavaScript
```

You should now see a new `bigcorp-lotteries-client` folder in the project’s directory structure. Optionally, you can rename the folder to something more concise, like simply `client` (and that’s what we did in the homework repo). This doesn’t affect the name of the frontend package itself, which you want to keep unchanged (i.e. `bigcorp-lotteries-client`) as it should be descriptive, but it allows you to keep (just) the path less verbose.

As you can see, the new directory contains a totally separate package, complete with its own `package.json`, `.gitignore`, scripts, dependencies, and everything else. This is by design, as we want to develop the frontend codebase independently of the backend.

You can now run the generated project to see the default Vite’s output. Similarly, as with the backend, you run the frontend with the `npm run dev` command.

**Note that you need to run the command in the `client` folder, not in the project’s root folder!**

```bash
cd client
npm run dev
```

Running the command at the project’s root level would end up starting the backend instead.

At this point you might be wondering whether from now on you’ll have to run two things separately, i.e. the backend and the frontend, for the app to function properly, and the answer is: sometimes, yes, but it depends 🤠 Different scenarios call for different approaches! We’ll cover that in more detail in the next sections, though. For now, assume they’re two separate things that start separately.
</details>

<details>
  <summary><b>Frontend HTML & stylesheets scaffolding</b></summary><br>

  The generated Vite project contains some default HTML and CSS styling, but obviously, it’s not very relevant for your project out-of-the-box. So, for your convenience, we’ve prepared some HTML and CSS for the lottery application based on that default template. You can find it on the `checkpoint-6` branch, or copy over the relevant files from below.

Here’s the `client/index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lottery App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <h1>BigCorp Lotteries</h1>

      <div>1. Input your name</div>
      <div>2. Select the lotteries you'd like to sign up for</div>
      <div>3. Press the "Register" button</div>
      <br />

      <input id="name" />
      <button id="register">Register</button>

      <div id="lotteries"></div>
    </div>

    <script type="module" src="index.js"></script>
  </body>
</html>
```

And here’s the `client/styles.css` file:

```css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

.container {
  background-color: #585858;
  border-radius: 8px;
  text-align: center;
  padding: 30px;
  margin: 30px;
}

.lottery {
  margin: 20px 0;
}

button, input {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
```

If you’re feeling adventurous, you can come up with your own styling of course, and we encourage you to do that. You can find information about CSS in general [here](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics), and you’ll find a reference of the available CSS properties [here](https://www.w3schools.com/cssref/index.php).

As you might have noticed, though, the last file, `client/index.js`, is practically empty:

```jsx
console.log("It works!");
```

And there’s no sign of data from our lottery API anywhere to be found on the client right now. And that’s what we’ll tackle next.

>💡 You are now here → `checkpoint-6`
</details>

<details>
  <summary><b>Enable CORS in development</b></summary><br>

  Well *actually*, before you proceed to fetching the lottery data from the backend, there’s one more thing you’ll need to address 🤠

As you might remember, we said that you’ll use two separate commands to start the backend and the frontend, and they’ll run on two different ports. This poses a problem: due to something called **SOP**, or **Same-origin policy** ([link](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)), it is impossible to make certain requests (including our lottery data fetch) & share certain resources across origins. And since the backend and frontend ports are different (`3000` and `5173`, respectively, if you use the defaults), so are the frontend and backend origins under this policy. And since it’s *impossible* to share the resources, this concludes our efforts, and by extension this module’s homework.

Just kidding.

Over the years, as the web evolved, it became necessary to share resources across origins, so a number of workarounds for the SOP policy (see [JSONP](https://stackoverflow.com/a/60258838), for example), and subsequently an official way to relax it, were introduced.

Indeed, **CORS** or **Cross-Origin Resource Sharing** ([link](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) is the official mechanism that exists to relax said SOP restriction. It has multiple configuration options, and a few gotchas, but for now it suffices for you to know that:

**You need to enable CORS on the backend** **in order for your frontend JavaScript to have access to the backend response’s body** (which contains the lottery data).

Why?

1. Put another way, since SOP is a security measure, you cannot just simply disable it on the frontend, because if that were possible, that’s exactly what the bad guys would do 🦹
2. Correspondingly, CORS isn’t something you can just simply enable on the frontend, because that would amount to an SOP kill switch. Which brings us back to Point 1 🤠

*“Okay Mr Smarty-Pants, so how do I enable CORS on the backend?”* you might be asking now.

Happy to help there: well, for that, **you need to put a special HTTP header on your server response.**

---

We needed the lengthy description above because it’s important for you to understand what you’re doing, but with that out of the way, the setup itself should be a breeze, as the procedure itself is rather quick.

First, install the `cors` package:

```bash
npm install cors
```

And then add the following snippet to the `server.js` file. Don’t forget about the import!

```jsx
const express = require("express");
const cors = require("cors"); // Remember to import the package!
const redis = require("redis");
const ulid = require("ulid");

(...)

if (process.env.NODE_ENV === "development") {
  // Enabling Cross-Origin Resource Sharing in development, as we run
  // the frontend and the backend code on different ports while developing.
  app.use(cors());
}
```

You might pass an object with different configuration options to the `cors()` function as a parameter (docs [here](https://expressjs.com/en/resources/middleware/cors.html)), but for our use case, the default config will be sufficient.

Also, we hide the CORS configuration behind a `development` flag because in production we’ll run the frontend and backend together on one port, so SOP won’t be violated, and enabling CORS won’t be necessary. More on that in further sections.

> 💡 You are now here → `checkpoint-7`
</details>

<details>
  <summary><b>Frontend JS code scaffolding</b></summary><br>

  With that out of the way, you are now finally ready to write some frontend JavaScript!

Similarly as with HTML & CSS, we’ve prepared some JS code scaffolding for you upfront, so feel free to use that. This time around, we’ve left places for you to fill out yourself, though!

You can find the code on the `checkpoint-8` branch, or copy the files from here.

---

Start by updating the `client/index.js` file:

```jsx
import { onRegisterClick } from "./src/onRegisterClick";
import { updateLotteries } from "./src/updateLotteries";

const registerButton = document.getElementById("register");
registerButton.onclick = onRegisterClick;

updateLotteries();
```

This is the main entry point of your JS code. It registers a handler for the `onclick` event of the registration button and fires an `updateLotteries` function once. Both functions come from new files in an `src` folder.

Go ahead and create that `src` folder in the `client` directory. There, create 3 new files listed below.

- `client/src/appState.js`:

```jsx
export const appState = {
  lotteries: new Map(),
};
```

- `client/src/onRegisterClick.js`:

```jsx
export async function onRegisterClick() {
  const nameInput = document.getElementById("name");
  const checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );

  // TODO: Register the user for each selected lottery using the POST /register endpoint.
  // 1. Use the `fetch` API to make the request.
  // 2. Obtain the user's name from the `nameInput` element.
  // 3. Check status of the lottery checkboxes using the `checked` property.
}
```

- `client/src/updateLotteries.js`:

```jsx
import { appState } from "./appState";

function createRow(name, value) {
  const div = document.createElement("div");
  div.textContent = `${name}: ${value}`;
  return div;
}

function getLotteryHtml(lottery) {
  const lotteryContainer = document.createElement("div");
  lotteryContainer.id = `container-${lottery.id}`;
  lotteryContainer.className = "lottery";

  const rows = Object.entries(lottery)
    .sort()
    .map(([key, val]) => createRow(key, val));

  lotteryContainer.append(...rows);

  if (lottery.status === "running") {
    const checkbox = document.createElement("input");
    checkbox.id = lottery.id;
    checkbox.type = "checkbox";
    lotteryContainer.appendChild(checkbox);
  }

  return lotteryContainer;
}

function addNewLottery(lottery) {
  appState.lotteries.set(lottery.id, lottery);

  const lotteriesContainer = document.getElementById("lotteries");
  const lotteryHtml = getLotteryHtml(lottery);
  lotteriesContainer.appendChild(lotteryHtml);
}

function updateExistingLottery(lottery) {
  const current = appState.lotteries.get(lottery.id);

  const currentData = JSON.stringify(Object.entries(current).sort());
  const newData = JSON.stringify(Object.entries(lottery).sort());

  // Rudimental lottery object data equality check
  if (currentData !== newData) {
    appState.lotteries.set(lottery.id, lottery);

    const lotteryContainer = document.getElementById(`container-${lottery.id}`);
    lotteryContainer.innerHTML = "";
    const lotteryHtml = getLotteryHtml(lottery);
    lotteryContainer.appendChild(lotteryHtml);
  }
}

function updateLottery(lottery) {
  if (!appState.lotteries.has(lottery.id)) {
    addNewLottery(lottery);
  } else {
    updateExistingLottery(lottery);
  }
}

export async function updateLotteries() {
  // TODO: Obtain the lottery data from the GET /lotteries endpoint.
  // 1. Use the `fetch` API to make the request.
  // 2. Update each lottery using the `updateLottery` function above.
}
```

As mentioned earlier, we’ve left some TODOs for you to implement yourself, and that’s what we’ll tackle next.

> 💡 You are now here → `checkpoint-8`
</details>

<details>
  <summary><b>Use `fetch` to get data from `bigcorp-lotteries-api`</b></summary><br>

  With the scaffolding code in place, you can now proceed to implementing the `onRegisterClick` and `updateLotteries` functions. The contents of both will be relatively similar.

Use the `fetch` API in both cases to make the request. You can read the documentation and view usage examples [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

Since `fetch` returns a Promise, we’ve marked both functions with `async` upfront, so that you’re free to use `await`. Feel free to handle the Promises any way you want, though.

In the case of `onRegisterClick`:

- Consider letting the user know that the registration has been successful. For that, you might use `alert()` ([docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)).
- Note how you’ll have to send a separate request for every checked lottery. This will result in multiple Promises, which you can handle with the `Promise.all()` static method - read more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
- Send the `lotteryId` and `name` data in the request body as JSON. Remember to convert the JS object into JSON and to set the `"Content-Type"` header.

If in doubt, check the `checkpoint-9` branch for the solution.

> 💡 You are now here → `checkpoint-9`
</details>

<details>
  <summary><b>Implement automatic updates of lotteries status</b></summary><br>

  The next step is to take advantage of the capability to compare existing lottery data with fresh data fetched from the server that’s baked into the `updateLottery` function, which we mentioned earlier. Leveraging that capability, you will implement a mechanism to update the lotteries’ data periodically.

There are different ways about this problem, but for the sake of simplicity and brevity, we’ll go with data polling. To implement polling, you can utilise the `setInterval` function  ([link](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)) that’s available to your frontend JavaScript code, which allows you to schedule repeated function calls. (`setInterval` has a twin sibling, by the way, that you could also use, albeit with some more work - `setTimeout`. You can read about it [here](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)).

To do that, in `client/index.js`, simply call the `updateLotteries` function again, but this time wrap it in a `setInterval`:

```jsx
import { onRegisterClick } from "./src/onRegisterClick";
import { updateLotteries } from "./src/updateLotteries";

const POLLING_INVERVAL_IN_MS = 10_000;

const registerButton = document.getElementById("register");
registerButton.onclick = onRegisterClick;

updateLotteries(); // Initial lottery data fetch

setInterval(() => updateLotteries(), POLLING_INVERVAL_IN_MS); // Setting up data polling
```

The first argument to `setInterval` is a callback that you want to be executed repeatedly. The second argument is the (minimal, **non-exact**, and approximate) amount of time between each call, in **milliseconds**.

****************************************************We recommend going with relatively infrequent polling calls (5, 10, 30 seconds) in order to not accidentally top out your quota on Redis requests associated with the free tier Upstash account.****************************************************

> 💡 You are now here → `checkpoint-10`

</details>

<details>
  <summary><b>Use an environment variable to store the API URL</b></summary><br>

  Lottery data is now getting fetched and updated automatically, but there’s one last issue with the current configuration: the API URLs are hardcoded. You can deal with that similarly to how you’ve dealt with the Redis URL in Part 1, and use an environment variable.

Conveniently, Vite comes with support for env variables, so the only thing you need to do is to create another `.env` file and put the following snippet there:

```bash
VITE_API_URL=http://localhost:3000
```

A few things to note here:

- You create this `.env` file in the `<your_project_root>/client/` directory, ******not****** in the root folder, where there’s already the `.env` file dedicated for the backend we created earlier!
- Remember to replace the port number with one of your choice, if for any reason you changed the backend port in the `server.js` file.
- For security reasons, by default Vite is configured in such a way that only `VITE_`-prefixed values are made available to your frontend code - hence the prefix.

After that’s done, all that’s left to do is to replace the hardcoded URLs with ones that feature the newly created environmental variable.

Here’s what that looks like:

```jsx
export async function updateLotteries() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/lotteries`);
    const lotteries = await response.json();
    console.log("New lottery data:", lotteries);

    lotteries.forEach((lottery) => updateLottery(lottery));
  } catch (e) {
    console.error("Error updating lotteries:", e.message);
  }
}
```

```jsx
await Promise.all(
        checkboxes
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) =>
            fetch(`${import.meta.env.VITE_API_URL}/register`, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                lotteryId: checkbox.id,
                name: currName,
              }),
            })
          )
      );
```

After that’s done, restart the frontend server and open the console/network tab to confirm everything still works as expected.

If in doubt, consult the Vite docs [here](https://vitejs.dev/guide/env-and-mode.html).

> 💡 You are now here → `checkpoint-11`
</details>

<details>
  <summary><b>Serve backend and frontend simultaneously in prod</b></summary><br>

  You might remember that in one of the prior sections we mentioned that, depending on the scenario, you might run the project in different ways, or with different configurations.

One such scenario is: **production**. It is common (although not exclusive) for projects consisting of a separate frontend and backend to have the two parts run together in prod, even though they’re run separately in development (usually for better developer experience, e.g. HMR).

To achieve that, you’re first going to create two new scripts in the root `package.json`:

```json
"scripts": {
		(...)
    "build-client": "cd client && npm run build",
    "prod": "npm run build-client && NODE_ENV=production node -r dotenv/config server.js",
  },
```

`build-client` opens the client folder and runs Vite’s built-in `build` command (which creates a frontend production bundle in a new `dist` directory) and is used as an intermediate step for the following `prod` command.

Running `npm run prod` runs the above-mentioned `build-client` command, and then starts the backend with the `production` flag.

After that’s done, open `server.js` and put the following snippet at the end of the file, right before the server startup handle:

```jsx
if (process.env.NODE_ENV === "production") {
  // Serving the bundled frontend code together with the backend on the same port in production.
  app.use(express.static("<your_frontend_folder>/dist"));
}
```

Note the `"<your_frontend_folder>/dist"` string passed to the `express.static()` function - **this is a path to your frontend production bundle,** and should be adjusted accordingly, depending on whether you’ve renamed your frontend folder in one of the previous steps or not. For us, it’s `client`, so the path ends up `"client/dist"`.

(As mentioned earlier, `dist` is Vite’s default production bundle output folder, so if you haven’t explicitly reconfigured Vite - this part should most likely stay as-is.)

The last and, in a way, an optional piece of the puzzle is to create a new env file: `.env.production`, again in the frontend folder, with the `VITE_API_URL` left intentionally blank, like so:

```jsx
VITE_API_URL=
```

Why? Well, Vite’s env variables are statically substituted, and leaving the field up, but blank, is equivalent to an empty string: `""`. In turn, this has the effect of replacing your `fetch` URLs (**in production**) like this:

```jsx
fetch(`${import.meta.env.VITE_API_URL}/register`, ...);
```

Turns into:

```jsx
fetch(`/register`, ...);
```

And `fetch`ing using a relative path, like above, has the effect of sending the HTTP requests to the same origin that the frontend is located at. In other words, **it assumes that whatever resource you're trying to `fetch`** (in our case: the backend), **is hosted at the same address and on the same port**, which is exactly what we do in production.

This step is optional in the sense that running prod locally on your machine should still work, even without the `client/.env.production` file - the requests will simply use the `http://localhost:3000` URL from the regular `client/.env`: 

```jsx
fetch(`http://localhost:3000/register`, ...);
```

This is fine for local tests but bakes the backend development URL into the production bundle. Which is first of all unnecessary and inflexible, and second of all, if you were to actually host this website on a real server, could go wrong in multiple ways (for starters, HTTP and HTTPS traffic have their designated ports, to name one example). In other words, while not strictly necessary now, the solution above is more accurate, complete, and future-proof.

>💡 You are now here → `checkpoint-12`

>💡 Congrats! This was the last checkpoint we prepared for you, which means that you’re now done with the homework for this module. Go grab a cookie or something - you deserve it! 😇
</details>
