# MobX State Management Notes

## How `useStore` Hook Works with Context

The store is wired into React in 3 steps:

### Step 1 — Create the store and context (`store.ts`)

```typescript
export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UiStore()
}
export const StoreContext = createContext(store);
```

- Creates singleton instances of each store
- Wraps them in a React Context (like a DI container in .NET)

### Step 2 — Provide it to the app (`main.tsx`)

```tsx
<StoreContext.Provider value={store}>
    {/* everything inside can access the store */}
</StoreContext.Provider>
```

- Like registering services in `Program.cs` — makes stores available to all components below

### Step 3 — Access it in any component (`useStore.ts`)

```typescript
export function useStore() {
    return useContext(StoreContext);
}
```

- A shortcut so you don't write `useContext(StoreContext)` every time
- `useContext` reaches up the component tree, finds the nearest Provider, and returns its value

### Step 4 — Use in components

```typescript
const { counterStore, uiStore } = useStore();
```

Think of it like a pipe running through your component tree. `Provider` puts data in at the top, `useContext` pulls it out anywhere below.

---

## .NET vs React Comparison

| .NET | React (MobX) |
|------|--------------|
| `Program.cs` registers services | `store.ts` creates instances + context |
| DI Container | `React.createContext` |
| Constructor injection | `useContext` / `useStore()` hook |
| `AddSingleton` | `new CounterStore()` (one instance, shared) |

---

## QueryClient vs MobX — Two Different Things

They are NOT related. They sit side by side in `main.tsx` because they do completely different jobs.

| | TanStack Query (QueryClient) | MobX (Store) |
|--|--|--|
| **Purpose** | Server state — fetching, caching, syncing API data | Client state — UI state, local app logic |
| **Used for** | Activities (fetched from .NET API) | Counter, loading spinner, modals |
| **Refetches?** | Yes — auto-refetch, stale time, cache invalidation | No — manual updates only |
| **Provider** | `<QueryClientProvider>` | `<StoreContext.Provider>` |

---

## How `agent.ts` Accesses the Store (Without React)

The Axios agent imports the store **directly** (not through the `useStore` hook — that's only for React components):

```typescript
import { store } from "../stores/store";  // direct import — same singleton
```

It uses **Axios interceptors** (like .NET middleware):

- **Request interceptor** — runs before every API call → `store.uiStore.isBusy()`
- **Response interceptor** — runs after every API call → `store.uiStore.isIdle()`

This works because `store.ts` exports the same singleton instance. Whether accessed via `useStore()` in a component or via direct import in `agent.ts`, it's the same object in memory.

### What needs React Provider vs what doesn't

| What | How it's shared | Why |
|------|----------------|-----|
| **Store (MobX)** | React Context Provider in `main.tsx` | Components need to react to state changes |
| **Agent (Axios)** | Direct import | Just a utility for HTTP calls — no React awareness needed |

---

## Arrow Functions in Store Classes

```typescript
class CounterStore {
  count = 0;

  // Arrow function — `this` is always the class instance
  decrement = () => {
    this.count--;  // `this` = the CounterStore instance, always
  };
}
```

Why arrow functions? They capture `this` at creation time. Regular methods lose `this` when passed as callbacks (to `onClick`, `useEffect`, etc.). Arrow functions guarantee `this` always points to the store instance, no matter how the function gets called.
