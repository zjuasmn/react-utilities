# Debounce

`Debounce` is a react component with `UI = f(debounce(state))`


## Props

- **timeout**
  - type: `number` | `Infinity`
  - default: 0

Delays `props` to children component until after `timeout` milliseconds have elapsed since the last time `props` changed(shallow compare).

- **leading**
  - type: `bool`
  - default: `true`

If leading if `true`, it will pass initial `...props` to children. Changing `leading` after first render has no effect.

- **...props**
  - type: `number` | `Infinity`

Rest properties would be debounced to children component.  