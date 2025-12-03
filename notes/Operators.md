# Operators

## Pipable operators

- Piped into the observable to alter the values
- Returns a new observable( **IMPORTANT**)
     - Therefore is a pure function
- Need to subscribe to this new observable

## Creation operators

- Can be called standalone to create a new observable
- E.g.

```
of([1,2,3]) // creates a new observable that emits 1, 2, 3 sequentially
```
