import * as RX from 'rxjs';

/**
 * The callback that switchMap takes has to return an observable
 * In this example:
 * Takes the emitted value from the source observable
 * - In this case 1 then 2 then 3
 * pipe modifies the emitted variables
 * - In this case returning another observable which is adding +0, +2 and +3
 */

const switchable = RX.of(1, 2, 3).pipe(
      RX.switchMap((x) => RX.of(x, x + 2, x + 3))
);

/**
 * Return value:
 * 1 (1 + 0)
 * 3 (1 + 2)
 * 4 (1 + 3)
 * 2 (2 + 0)
 * 4 (2 + 2)
 * 5 (2 + 3)
 * 3 (3 + 0)
 * 5 (3 + 2)
 * 6 (3 + 3)
 */

switchable.subscribe((x) => console.log(x));

/**
 * IMPORTANTLY:
 * - If the source observable emits a new value before the nested observable finishes running
 * - The nested observable will be cancelled and the emitted value from the source observable will be used in the map function
 * - E.g. in the frontend for autocomplete
 *   - If the User types in 'a' this triggers a fetch request for autocomplete for 'a'
 *   - Then if the user types in 'aut' this will discard the previously running fetch request (if incomplete)
 *   - Substituting it for a request inquiring about 'aut'
 */
