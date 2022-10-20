# blaze-library

> 

[![NPM](https://img.shields.io/npm/v/blaze-library.svg)](https://www.npmjs.com/package/blaze-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save blaze-sdk-actions-beta3
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'blaze-sdk-actions-beta3'

class Example extends Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## Publish a new version in NPM with CircleCI

To publish a new version in NPM you need:

1. Increase the sdk version in the package.json file ("version" attribute) for example "1.6.7"
2. Add the tag to a specific commit with the prefix "v." for example: "v.1.6.7" (CircleCI will automatically publish a new version in NPM)

## License

MIT © [blaze](https://github.com/AdminGevsiop/blaze-sdk-actions-beta3.git)
