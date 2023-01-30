import { expect, test } from 'vitest';

import { writable } from './store';

test('subscribing to the store provides initial value', () => {
  const store = writable(2);
  let $store;
  store.subscribe((value) => $store = value);
  expect($store).toBe(2);
});

test('we can get the value of the store', () => {
  const store = writable('hello');
  const value = store.get();
  expect(value).toBe('hello');
});

test('setting the store value notifies subscribers', () => {
  const store = writable(5);
  let $store;
  store.subscribe((value) => $store = value);
  store.set(10);
  expect($store).toBe(10);
});

test('we can get the correct store value after a store has been set', () => {
  const store = writable('testing');
  store.set('another test');
  const value = store.get();
  expect(value).toBe('another test');
});

test('we can unsubscribe from the store', () => {
  const store = writable(5);
  let $store;
  const unsubscribe = store.subscribe((value) => $store = value);
  unsubscribe();
  store.set(10);
  expect($store).toBe(5);
});

test('two subscribers are both updated correctly', () => {
  const store = writable(5);
  let $first;
  let $second;
  store.subscribe((value) => $first = value);
  store.subscribe((value) => $second = value);
  store.set(9);
  expect($first).toBe(9);
  expect($second).toBe(9);
});

test('unsubscribing with two subscribers works', () => {
  const store = writable(5);
  let $first;
  let $second;
  const unsubscribeFirst = store.subscribe((value) => $first = value);
  store.subscribe((value) => $second = value);
  unsubscribeFirst();
  store.set(8);
  expect($first).toBe(5);
  expect($second).toBe(8);
});

test('we can update the state', () => {
  const store = writable(2);
  store.update((value) => value + 1);
  const value = store.get();
  expect(value).toBe(3);
});