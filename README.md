# Password Generator

A simple password generator written in React using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).

## Features

- Generates a password of a certain leength from a given set of characters.

## TODO

- Add the ability to change the length of the password to be generated
- Add unit tests

## Design

- `PasswordGenerator` is an unopinionated component on how to generate a password
- `PasswordRules` is a component that manages the rules and notifies the parent of the chars from selected rules
    - It makes an opinionated recommendation on what rules are available and what they mean
- Parent components currently pass functions that are binded to itself to allow a child component to trigger a state change in the parent
    - A potentially better implementation is to use Redux to eliminate this complexity
