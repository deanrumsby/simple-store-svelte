# simple-store-svelte

A super simple, writable store for the Svelte frontend framework.
It allows quick and easy readable access to the current state, without having to subscribe and unsubscribe to retrieve the value.

## How to use

```javascript
import { writable } from '@deanrumsby/simple-store-svelte';

const store = writable(5);

const value = store.get(); // this uses a simpler implementation than svelte/store

console.log(value); // 5
```

The methods `set`, `update` and `subscribe` all work the same as the svelte/store package.

As this package implements the store contract correctly, you can use the syntactic sugar `$store` within your components as usual.
