# JS Utils Toolkit

A collection of JavaScript utility functions for state management and general operations.

## Installation

### Local Installation
```bash
npm install js-utils-toolkit
```

### Global Installation
```bash
npm install -g js-utils-toolkit
```

## Features

### Global State Management

- Create and manage multiple instances of state
- Store and update state
- Event handling (subscribe to state changes)
- Configuration and validation

### General Utilities

- Object utilities: mapping, filtering, transformation
- Array utilities: conditional operations, searching
- String utilities: capitalization, formatting
- Function utilities: safe function calls, switch-like operations

## Usage

### In Node.js or bundled applications
```javascript
import { GlobalState, objIf, safeParse } from 'js-utils-toolkit';

// Create a global state instance
GlobalState.create({
  myApp: {
    user: { name: 'John', role: 'admin' },
    settings: { theme: 'dark' }
  }
});

// Get state instance
const state = GlobalState.get('myApp');

// Subscribe to state changes
state.on('user', (prev, next) => {
  console.log('User changed from', prev, 'to', next);
});

// Use utility functions
const additionalFields = objIf(user.role === 'admin', { adminTools: true });
```

### In Browser (via CDN)
```html
<script src="https://unpkg.com/js-utils-toolkit"></script>
<script>
  // Utilities are available under the global JSUtils object
  const { GlobalState, objIf } = JSUtils;
  
  // Use utilities
  const result = objIf(condition, { key: 'value' });
</script>
```

### Via Command Line
```bash
# List all available utilities
js-utils list

# Get information about a specific utility
js-utils util objIf

# Show help
js-utils help
```

## API Documentation

### GlobalState

The `GlobalState` class is a powerful state manager that allows you to create, manage, and subscribe to state changes across your application.

#### Static Methods

**`GlobalState.create(instances)`**
Creates instances of GlobalState with the provided states.

```javascript
GlobalState.create({
  appName: {
    user: { id: 1, name: 'John' },
    theme: 'dark'
  }
});
```

**`GlobalState.get(name)`**
Gets an instance of GlobalState by name.

```javascript
const appState = GlobalState.get('appName');
```

**`GlobalState.statesList`**
Returns a list of all available state instance names.

```javascript
const availableStates = GlobalState.statesList;
// ['appName', 'anotherState', ...]
```

#### Instance Properties

**`stored`**
Gets all stored states in the instance.

```javascript
const allStates = appState.stored;
// { user: { id: 1, name: 'John' }, theme: 'dark' }
```

**`events`**
Gets all registered event listeners.

```javascript
const registeredEvents = appState.events;
```

#### Instance Methods

**`store(entry, emit = true)`**
Store a new state or update an existing state.

```javascript
// Store a simple state
appState.store({ counter: 1 });

// Store a state using a function
appState.store((instance) => ({
  lastUpdated: new Date()
}));
```

**`define(entry)`**
Define a state with custom getters and setters.

```javascript
appState.define({
  counter: {
    state: 0,
    get: (instance, key, value) => value * 2,
    set: (key, newValue, oldValue) => ({ 
      state: Math.max(0, newValue), 
      safe: true 
    })
  }
});
```

**`read(key)`**
Read a state value by key.

```javascript
const theme = appState.read('theme');
// 'dark'

// Read all states
const allStates = appState.read();
```

**`update(states)`**
Update multiple states at once.

```javascript
appState.update({
  theme: 'light',
  'user.name': 'Jane'
});
```

**`setConfig(config, update)`**
Configure the behavior of the GlobalState instance.

```javascript
appState.setConfig({
  emitOnStateSet: true,
  validators: {
    theme: (value) => ['dark', 'light'].includes(value)
  }
});
```

**`validate(validators)`**
Add validators to the GlobalState instance.

```javascript
appState.validate({
  'user.age': (age) => age >= 18,
  'settings.language': (lang) => ['en', 'fr', 'es'].includes(lang)
});
```

**Event Methods**

**`on(eventName, listener, options)`**
Register an event listener.

```javascript
// Listen for changes to a specific state
appState.on('theme', (prevTheme, newTheme) => {
  console.log(`Theme changed from ${prevTheme} to ${newTheme}`);
});

// Overwrite existing listeners
appState.on('user', listener, { overwrite: true });
```

**`emit(eventName, ...args)`**
Emit an event.

```javascript
appState.emit('custom-event', { data: 'value' });
```

**`off(eventName, listener)`**
Remove a specific event listener.

```javascript
appState.off('theme', themeChangeListener);
```

**`clear(eventName)`**
Clear all listeners for a specific event.

```javascript
appState.clear('user');
```

#### Advanced Usage Examples

**Validation and Configuration**

```javascript
// Configure the instance with validators
const userState = GlobalState.get('user');
userState.setConfig({
  emitOnStateSet: true,
  validators: {
    age: (age) => age >= 18,
    email: (email) => /\S+@\S+\.\S+/.test(email)
  }
});

// Try to update state (will only update if valid)
userState.store({ age: 16 }); // Won't update, age validation fails
userState.store({ email: 'valid@example.com' }); // Updates successfully
```

**Using with React**

```javascript
function ThemeToggle() {
  const appState = GlobalState.get('app');
  const [theme, setTheme] = useState(appState.read('theme'));
  
  useEffect(() => {
    // Subscribe to theme changes
    const handleThemeChange = (prev, next) => setTheme(next);
    appState.on('theme', handleThemeChange);
    
    return () => {
      // Clean up subscription
      appState.off('theme', handleThemeChange);
    };
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    appState.store({ theme: newTheme });
  };
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'dark' ? 'light' : 'dark'} theme
    </button>
  );
}
```javascript

  