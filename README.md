# Module 3 Homework

While having lunch, your CTO and your Tech Leader met and discussed about a technology that most big companies are using which improves code maintenance and reusability by using components. They ended up agreeing that React could indeed help BigCorp deliver the best lottery website.

### Homework management 🏠

The final result of all homework is the React Native Application full of features implemented iteratively in the end phase of each module in the course. In order to keep consistency and track all of your changes we highly recommend you to create your own GitHub repository where your work as a participant will be stored. Your GitHub repository should be shared with all trainers, which will enable us to verify your work and communicate:

- Wiktor Szlegier: https://github.com/Wiiktor22
- Adam Trzciński: https://github.com/adamTrz
- Mariusz Pasiński: https://github.com/mani3xis

Each module in the course will end up with homework consisting of a few tasks to fulfil. We would like to suggest a comfortable system for you to submit each task of the homework as a separate PR to the main branch in your repository. This will create a space for us to communicate with you, by doing code reviews - thanks to that we will be able to check your homework, discuss some uncertainties, or respond to questions you will leave in the PR. In case you have any trouble with homework you can always book a 1 to 1 session with the trainer, and also don't hesitate to ask your questions in the dedicated communication channel. Keep in mind that you don't have to worry about being blocked for the next homework, every homework will have a starting point, so you always will be able to override the content of your repository with the prepared starting point.

### The goal of this module’s homework

The goal of this homework is to migrate the web application that was developed in previous modules to React, improve it and add some new features.

### Checkpoints 💡

The homework repository contains periodic checkpoints for your convenience. You will see callouts denoting the current checkpoint throughout this instruction. They will look something like this:

> 💡 You are now here → `checkpoint-xyz`

Feel free to check out the corresponding branch of any given checkpoint if you’re struggling or simply want to compare your solution with ours.

With that out of the way, let’s start!

## Part 1: Project setup

Since our project became a monorepo with two applications - backend and web - we need to put some work into restructuring the repository so that tools like TypeScript, ESLint and others work correctly. It is hard to set up a monorepo with nested package.json files and it usually requires installing additional tooling and a lot of scripts (and it’s out of scope of this homework exercise) - that’s why we won’t be doing that and we will be splitting our repo without nesting package.json and all the other configuration files.

<details>
  <summary><b>Step 1: Move backend project</b></summary><br>

First step would be to move the backend project into it’s own directory. Additionally, we won’t be needing the client project as we will be creating a new web project with React and Typescript already set up - you can save some code from there if you’d like to re-use it later.

```bash
  # Remove unnecessary project
  rm -rf client

  # Create a directory for our backend project
  mkdir backend

  # Move all the files to the new directory
  mv scripts package-lock.json package.json server.ts tsconfig.json types.ts .babelrc .env.template .eslintrc.js .gitignore .prettierrc.js backend
```

<b>Some of the scripts included in backend/package.json will also need to be updated!</b>

</details>

<details>
  <summary><b>Step 2: Create a new React project</b></summary><br>

Run the following command in the root of the repository to create a new vite project with React and TypeScript already set-up.

```bash
  npm create vite web -- --template react-ts
```

</details>

<details>
  <summary><b>Step 3: Code formatting for web project</b></summary><br>

Vite template comes with ESLint pre-configured, but it is missing a vital component - code formatter. Luckily, it is really simple to add it:

1.Install necessary dependencies

```bash
  npm install prettier@2 eslint-plugin-prettier eslint-config-prettier -D
```

2.Adjust .eslintrc.cjs configuration

```js
/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react-hooks/recommended",
    // Include prettier here
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: true,
    tsconfigRootDir: __dirname,
  },
  // Include prettier here
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    // Add a rule for prettier errors
    "prettier/prettier": "error",
  },
};
```

3.Add .prettierrc.cjs to our web project

```js
module.exports = {
  singleQuote: true,
  trailingComma: "all",
};
```

At this point, we should have fully working web and backend projects in the root of our repository.

</details>

<details>
  <summary><b>Step 4: Add MaterialUI</b></summary><br>

To make things simples for feature implementation and focus on React, we will be using MaterialUI library for our frontend components. You can fine installation instructions here -https://mui.com/material-ui/getting-started/installation/.

</details>

<details>
  <summary><b>Step 5: Template cleanup (Optional)</b></summary><br>

The web project template includes starting code that we don’t want - you can remove some unnecessary code, files and assets in this step. This is an optional step because you’re going to change it anyway while working on various features.

</details>

> 💡 You are now here → https://github.com/callstack-workshops/abbott-module-3-homework/tree/part-2

## Part 2: Add a lottery

Given the UI design implement Add a lottery feature.

<details>
  <summary><b>Add lottery FAB button</b></summary><br>

![Screenshot 2023-07-10 at 15 06 34](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/6044cdf1-07b9-421b-a6b0-98dc005f2324)

</details>

<details>
  <summary><b>Add lottery modal</b></summary><br>

![Screenshot 2023-07-10 at 15 06 46](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/e56f250d-251d-43eb-94e5-ee06fece7ece)

</details>

<details>
  <summary><b>Add lottery modal form validation</b></summary><br>

![Screenshot 2023-07-10 at 15 08 48](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/783f4ca1-9c3c-411c-8cc7-86736152f283)

</details>

<details>
  <summary><b>Add lottery loading state</b></summary><br>

![Screenshot 2023-07-10 at 15 08 48](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/cb7ec061-c586-4466-b8ff-f3eccc5519d1)

</details>

<details>
  <summary><b>Notification after successful action</b></summary><br>

![Screenshot 2023-07-10 at 15 21 53](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/bf80c280-46a6-4aff-ac45-98aa3a4dfdd8)

</details>

Add lottery feature should have following things implemented:

- FAB button to open a modal
- Modal with a form to add a new lottery
- Forms should be validated
- Loading state should be present when form is submitted
- After successful form submission modal should close automatically and Notification with a message should open

Helpful resources:

- https://formik.org/ and https://github.com/jquense/yup can be used to implement form validation
- Modal component - https://mui.com/material-ui/react-modal/
- Notification component - https://mui.com/material-ui/react-snackbar/
- LoadingButton component from MaterialUI is a part of a complimentary library -https://www.npmjs.com/package/@mui/lab

> 💡 You are now here → https://github.com/callstack-workshops/abbott-module-3-homework/tree/part-3

## Part 3: List lotteries

Given the UI design implement List lotteries feature.

<details>
  <summary><b>Fetch and display lottery data</b></summary><br>

![Screenshot 2023-07-11 at 10 37 55](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/3c1eac8e-072a-44e9-8f65-f2a41588fe8e)
![Screenshot 2023-07-11 at 10 44 59](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/e306725f-128d-4219-9426-6e09c04c093e)
![Screenshot 2023-07-11 at 10 52 45](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/a700006a-ab52-4ba8-9021-d01e68ca8270)

</details>

<details>
  <summary><b>Make lotteries selectable and add register FAB button</b></summary><br>

![Screenshot 2023-07-11 at 10 38 36](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/ac5fd39a-14be-4b09-8077-136ea66f8ebf)

</details>

<details>
  <summary><b>Add Register modal with name input and validation</b></summary><br>

![Screenshot 2023-07-11 at 10 39 26](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/50988024-0da9-46cf-af93-3b5dc5ebe090)

</details>

<details>
  <summary><b>Register to selected lotteries and notification message</b></summary><br>

![Screenshot 2023-07-11 at 10 40 41](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/95b60ead-576e-49cb-8510-b0df33b226dc)

</details>

List lotteries feature:

- Should display list of lotteries
- Adding a new lottery should re-fetch the lotteries
- Lotteries should be selectable by clicking on them
- Finished lotteries should be grayed-out and not be selectable as we are not able to register for them
- Register FAB button should open a modal to register for selected lotteries
- Register FAB button should be disabled when no lotteries are selected
- Register modal should close after successful submission and notification with a message should be shown

> 💡 You are now here → https://github.com/callstack-workshops/abbott-module-3-homework/tree/part-4

## Part 4: Filter lotteries

Given the UI design implement Filter lotteries feature.

<details>
  <summary><b>Add text input to filter fetched lotteries</b></summary><br>

![Screenshot 2023-07-11 at 11 02 52](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/fd7a79fb-bd43-4031-99d7-d8f1ed507095)

</details>

<details>
  <summary><b>Handle no search result case</b></summary><br>

![Screenshot 2023-07-11 at 11 08 29](https://github.com/callstack-workshops/abbott-module-3-homework/assets/50460088/46e6c84b-76f1-4e36-9e79-0963b2f802d9)

</details>

Filter lotteries:

- Should have text input to with a search icon
- Typing in the input should filter the results
- When there are no search results for a given filter, no search result information should be displayed

> 💡 You are now here → https://github.com/callstack-workshops/abbott-module-3-homework/tree/part-4-done
