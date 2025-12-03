import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
      next: (x) => console.log(`Observer 1: ${x}`),
      error: (x) => console.log(x),
      complete: () => console.log('complete'),
});

subject.subscribe({
      next: (x) => console.log(`Observer 2: ${x}`),
      error: (x) => console.log(x),
      complete: () => console.log('complete'),
});

subject.next(1);
subject.next(2);
