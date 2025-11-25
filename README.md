# script-utils

Utilities for [Cavalry scripts](https://docs.cavalry.scenegroup.co/tech-info/scripting/scripting-getting-started/)

> [!WARNING]
> This library is in active development. Expect breaking changes.

## Installation

Install from this Github repo

```
npm install scenery-io/script-utils --save-dev
```

## Usage

It's recommended that you use these utils with [@scenery/create-script](https://github.com/scenery-io/create-script) or an equivalent Typescript bundler.

Simply import any of the available utils.

```js
// import everything
import * as utils from '@scenery/script-utils'
// or a single util
import { isMac } from '@scenery/script-utils'
// and use as desired
utils.timeout(() => {
	console.log(isMac)
}, 1000)
```
