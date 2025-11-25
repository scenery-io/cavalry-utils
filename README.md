# cavalry-utils

Utility functions for [Cavalry scripts](https://docs.cavalry.scenegroup.co/tech-info/scripting/scripting-getting-started/)

## Installation

Install from the Github repo

```
npm install scenery-io/cavalry-utils --save-dev
```

## Usage

It's recommended that you use these utils with [@scenery/create-script](https://github.com/scenery-io/create-script) or an equivalent Typescript bundler.

Simply import any of the available utils.

```js
// import everything
import * as utils from '@scenery/cavalry-utils'
// or a single util
import { isMac } from '@scenery/cavalry-utils'
// and use as desired
utils.timeout(() => {
	console.log(isMac)
}, 1000)
```
