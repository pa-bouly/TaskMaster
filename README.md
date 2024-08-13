# TaskMaster

TaskMaster is a task management application that allows users to create, update, and delete tasks.
The app is fully responsive.

![Taskmaster screenshot](./doc/taskmaster.png 'Taskmaster screenshot')

## Project Setup

Install dependencies of the project:

```sh
npm install
```

If you don't have Playwright (for the tests) installed globally on your computer yet:

```sh
npx playwright install
```

## Start the project

It will be available on [http://localhost:5173](http://localhost:5173)

```sh
npm run dev
```

## Start Storybook

It will be available on [http://localhost:6006/](http://localhost:6006/)

```sh
npm run storybook
```

## Tests

**Visual tests** and **interaction tests** are directly available in storybook.
You can see them on the side panel of a story. For example, here the `FilterButton -> Active` story.

![Alt text](./doc/storybook_tests.png 'Storybook screenshot')

It is possible to directly launch the interaction tests with the coverage. **Be carefull storybook needs to run.**

```sh
npm run test-storybook-coverage
```

The coverage file will be available here: `./coverage/storybook/lcov-report/index.html`

_(open it with you default browser)_

**Accessibility** tests are available via a tab:

![Alt text](./doc/accessibility.png 'Accessibility screenshot')

VIsual tests on chromatic : https://www.chromatic.com/builds?appId=66bb844302affa080423a6d9

## Design choices

I used `Pinia` to handle the state management of the app, the state is persisted across page reloads.`vue-router` was used with lazy loading of components to be efficient.

I used a component library, `element-plus`, to have some key components already coded and have some accessibility features.

The project is configured with TypeScript to ensure type safety and enhance code quality.

### Bonus

- Search functionality to find tasks.
- Authentication with Firebase Auth

You will have to create an account, once created you will be directly logged in.

_Firebase keys are stored directly in the project. For a production project, it will be given in environment variables_

### More options

To test if there is no Typescript errors

```sh
npm run type-check
```

For the main colors, I've been inspired by mangopay.com :art:
