# RxJS

A library used to compose Async and event-based code using observables

## Pull vs Push system

- A pull system
     - E.g. a function
     - The consumer decides when they get the result via calling the producer
          - E.g. when running a function

- A push system
     - E.g. a promise
     - The producer determines when the data is pushed to the consumer

## Observable

- Subscription to a observable produces synchronous code

### Advantages

- Observables can _return_ multiple values
- E.g. In a function

```
function foo() {
  console.log('Hello');
  return 42;
  return 100; // dead code. will never happen
}
```

- E.g. in an observable (returns the output synchronously)

```
import { Observable } from 'rxjs';

const foo = new Observable((subscriber) => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100); // "return" another value
  subscriber.next(200); // "return" yet another
});

foo.subscribe((x) => {
  console.log(x);
});
```

## Observer

- A consumer of the values delivered by the observable
     - next (what to do with the output)
     - err (what to do with the error)
     - complete (what to do after the observable has emitted the final value)
- Used via providing it into the call back function
- It is not necessary to provide all of the arguements in the observer

```
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

observable.subscribe(observer);
```

## Subscription

- Is a disposable resource
     - Representing the execution of an observable
- Has an important function (unsubscribe).
     - Takes no arguements and disposes of the subscription

## Subject

- A special type of Observable that can be multicasted to multiple observers
    - Unlike Observable which can only be single cast
- Every subject can behave like an observable
    - and accept an observer 

```
const subject = new Subject<number>();
 
 //can register multiple observers to the subject
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(1);
subject.next(2);
// this provides values 1 & 2 into the observable, which are ran by the observers
// produing the output: 
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

- Every subject can also behave like an observer
    - Can subscribe it onto an observable
```
const subject = new Subject<number>();
 
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});
// creating an observable via from() 
const observable = from([1, 2, 3]);
 
observable.subscribe(subject); // You can subscribe providing a Subject
 
// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```
