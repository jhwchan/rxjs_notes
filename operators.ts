import { concatAll, concatMap, map, Observable, of, interval } from 'rxjs';

const observable: Observable<number> = new Observable((subscriber) => {
      try {
            (subscriber.next(1), subscriber.next(2), subscriber.next(3));
      } catch (e) {
            console.log(e);
      }
});

/**
 * Basic pipe operator
 * modifies each value emitted from the observable
 */

const pipeObervable = observable.pipe(map((x) => x + x));

console.log('Pipeable operator');
pipeObervable.subscribe({
      next: (value) => console.log(value),
});

/**
 * Basic creation operator
 */

console.log('Creation opertor');
of(3, 4, 5).subscribe((x) => console.log(x + 1)); //creates a new observable easily

/**
 * Higher order observables
 *
 * mapping each output emitted (1,2,3) into a fetch request
 * concatAll() flattens these observables therefore only returning the response from the fetch request
 * Another map of the responses to get the json returning another promise
 * concatAll() flattening it to wait for the response
 */

const apiObservable = observable.pipe(
      map((x) => fetch(`https://swapi.dev/api/people/${x}`)),
      concatAll(),
      map((x) => x.json()),
      concatAll()
);

// apiObservable.subscribe((value) => console.log(value));

//another way to flatten without using concatAll()
const apiObservable2 = observable.pipe(
      concatMap((x) => fetch(`https://swapi.dev/api/people/${x}`)),
      concatMap((x) => x.json())
);

// apiObservable2.subscribe((x)=>console.log(x))

/**
 * Using Interval
 * Returns an observable that continues for an infinte amount of time
 * emitting an incremental value ever x milliseconds
 * as determined by the input
 */

const intervalObserver = interval(4000);
const intervalObserver2 = interval(3000);

const intervalSubscription = intervalObserver.subscribe((x) => console.log(x));
const intervalSubscription2 = intervalObserver2.subscribe((x) =>
      console.log(x)
);

//can add two subscriptions together
intervalSubscription.add(intervalSubscription2);

intervalSubscription.unsubscribe(); // unsubscribes from both observers the observer
