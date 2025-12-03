import { Observable } from 'rxjs';

const testObservable = new Observable((subscriber) => {
      try {
            // good practice to wrap code within the observable in a try catch block
            (subscriber.next(1), //Synchronous
                  subscriber.next(2), //Synchronous
                  subscriber.next(3), //Synchronous
                  setTimeout(() => {
                        subscriber.next(4);
                        subscriber.complete();
                  }, 8000)); //Async return
      } catch (e) {
            console.error(e);
      }
});

console.log('Subscribing');
//Observable is called via subscribing to it
const subcription = testObservable.subscribe({
      next(x) {
            console.log(x);
      },
      error(err) {
            console.log(err);
      },
      complete() {
            console.log('complete');
      },
});
console.log('After subscribe');

//subcription.unsubscribe()

/**
 * Console logs this:
 * Subscribing
 *  1
 *  2
 *  3
 *  After subscribe
 *  4
 *  complete
 */
