## SmartPRICE SDK

# Dev

0. yarn to install dependencies
1. "yarn link" the sdk module
2. Go to modal-demo and "yarn link 'smartprice'"

# Usage

Add an element (div) to your markup with the smartprice-button class

```html
<div class="smartprice-button"></div>
```

you have three button options, you need to add 'dark' or 'blue' class for
different styles

```html
<div class="smartprice-button dark"></div>
<div class="smartprice-button blue"></div>
```

import init to your code

```js
import { init } from 'smartprice';
```

register a listener to receive messages from the ifram modal

```js
window.addEventListener('message', receiveMessage, false);
```

and wait for confirmation message

```js
const receiveMessage = (event) => {
  if (event.data.message === 'confirmation') {
    console.log(event.data.value.smartPriceMemberId);
  }
};
```
