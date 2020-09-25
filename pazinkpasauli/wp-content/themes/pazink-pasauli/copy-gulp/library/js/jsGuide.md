# Soak Javascript Guide

Here at SOAK we use a namespaced approach to Javascript, with a modular approach where each file should
be responsible for one component, with public and private methods as required. These are then concatenated
and uglified using gulp.

## File structure


## Closures
Closures are very useful for scoping variables, so that they are available when you need them,
but also for ensuring you don't have clashes with other variables of the same. Consider the follwing example:
```
function foo() {

}

```
