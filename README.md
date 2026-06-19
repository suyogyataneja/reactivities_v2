# reactivities
reactivities
The repo has following projects:
1. API
2. Application
3. Domain
4. Persistence

React front end code.

 Why TanStack Query (React Query) — What It Replaces and What It Doesn't

  The Two Types of State in Our App

  Our App.tsx has two categories of state:
  
  1. Server State — data that lives on the API/database
  const [activities, setActivities] = useState<Activity[]>([]);
  This holds data fetched from the API. It's a local copy of what's on the server. We also have a useEffect to fetch
  it and manual functions (handleSubmitForm, handleDeleteActivity) to keep it in sync.
  
  2. Client/UI State — data that only exists in the browser
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  These track UI behavior — which activity is selected and whether the form is open. This data doesn't exist on the
  server. It's purely local.

  ---
  What TanStack Query REPLACES (Server State)

  Before (manual approach):

  ┌─────────────────┬──────────────────────────────────────────┬───────────────────────────────────────────────┐
  │      What       │                   Code                   │                    Problem                    │
  ├─────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────┤
  │ Storing fetched │ useState<Activity[]>([])                 │ We manually manage the data array             │
  │  data           │                                          │                                               │
  ├─────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────┤
  │ Fetching data   │ useEffect + axios.get                    │ No caching, no loading state, no error        │
  │                 │                                          │ handling, runs once on mount                  │
  ├─────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────┤
  │ Updating after  │ setActivities(activities.map(...))       │ Manual array manipulation, no API call, easy  │
  │ edit            │                                          │ to get out of sync                            │
  ├─────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────┤
  │ Updating after  │ setActivities([...activities,            │ Manual append with fake id, no API call       │
  │ create          │ newActivity])                            │                                               │
  ├─────────────────┼──────────────────────────────────────────┼───────────────────────────────────────────────┤
  │ Updating after  │ setActivities(activities.filter(...))    │ Manual filter, no API call                    │
  │ delete          │                                          │                                               │
  └─────────────────┴──────────────────────────────────────────┴───────────────────────────────────────────────┘

  After (TanStack Query):

  ┌──────────────────┬───────────────────────────────────────────┬──────────────────────────────────────────────┐
  │       What       │              TanStack Query               │                   Benefit                    │
  ├──────────────────┼───────────────────────────────────────────┼──────────────────────────────────────────────┤
  │ Fetch + store    │ useQuery({ queryKey: ['activities'],      │ Auto caching, loading/error states, refetch  │
  │ data             │ queryFn })                                │ on focus                                     │
  ├──────────────────┼───────────────────────────────────────────┼──────────────────────────────────────────────┤
  │ Edit activity    │ useMutation + invalidateQueries           │ Calls API, then auto-refetches the list      │
  ├──────────────────┼───────────────────────────────────────────┼──────────────────────────────────────────────┤
  │ Create activity  │ useMutation + invalidateQueries           │ Calls API, then auto-refetches the list      │
  ├──────────────────┼───────────────────────────────────────────┼──────────────────────────────────────────────┤
  │ Delete activity  │ useMutation + invalidateQueries           │ Calls API, then auto-refetches the list      │
  └──────────────────┴───────────────────────────────────────────┴──────────────────────────────────────────────┘

  Specifically from our App.tsx, these get removed:
  
  // REMOVED — TanStack Query handles fetching + storing
  const [activities, setActivities] = useState<Activity[]>([]);

  // REMOVED — TanStack Query handles fetching on mount
  useEffect(() => {
      axios.get('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
      return () => {}
  }, [])    

  // REMOVED — replaced by useMutation
  function handleSubmitForm(activity: Activity) {
      if (activity.id) {
          setActivities(activities.map(a => a.id === activity.id ? activity : a));
      } else {
          setActivities([...activities, {...activity, id: activities.length.toString()}])
      }
      setEditMode(false);
  }

  // REMOVED — replaced by useMutation
  function handleDeleteActivity(id: string) {
      setActivities(activities.filter(x => x.id !== id))
  }

  ---
  What TanStack Query DOES NOT Replace (Client/UI State)
 
  These stay as useState because they're UI concerns, not server data:

  // STAYS — "which activity is the user looking at?" is a UI concern
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  
  // STAYS — "is the form open?" is a UI concern
  const [editMode, setEditMode] = useState(false);

  // STAYS — these control UI behavior, not server data
  function handleOpenForm(id?: string) { ... }
  function handleCloseForm() { ... }
  function selectActivity(id: string) { ... }
  function handleCancelSelectActivity() { ... }

  ---
  The Prop Drilling Problem TanStack Query Solves

  Currently, activities is fetched in App.tsx and drilled down through 4 levels:

  App (fetches + holds activities)
    → ActivityDashboard (receives as prop, forwards down)
      → ActivityList (receives as prop, forwards down)
        → ActivityCard (finally uses it)

  Every component in the chain needs to declare the prop in its Props type, destructure it, and pass it along — even
  if it doesn't use the data itself (ActivityDashboard and ActivityList are just middlemen).

  With TanStack Query, any component can call useQuery({ queryKey: ['activities'] }) and get the cached data
  directly. No drilling. The middleman components don't need to know about activities at all.

  ---
  Summary
  
  ┌──────────────────────────────────────┬─────────────────────────────┬────────────────────────────────────────┐
  │               Category               │           Before            │          After TanStack Query          │
  ├──────────────────────────────────────┼─────────────────────────────┼────────────────────────────────────────┤
  │ Fetching data                        │ useState + useEffect +      │ useQuery                               │
  │                                      │ axios                       │                                        │
  ├──────────────────────────────────────┼─────────────────────────────┼────────────────────────────────────────┤
  │ Loading state                        │ Manual useState<boolean>    │ Built-in isLoading                     │
  ├──────────────────────────────────────┼─────────────────────────────┼────────────────────────────────────────┤
  │ Error state                          │ Manual useState             │ Built-in isError                       │
  ├──────────────────────────────────────┼─────────────────────────────┼────────────────────────────────────────┤
  │ Create/Update/Delete                 │ Manual state manipulation   │ useMutation + invalidateQueries        │
  ├──────────────────────────────────────┼─────────────────────────────┼────────────────────────────────────────┤
  │ Caching                              │ None                        │ Automatic                              │
  ├──────────────────────────────────────┼─────────────────────────────┼────────────────────────────────────────┤
  │ Refetching                           │ None                        │ On window focus, reconnect,            │
  │                                      │                             │ configurable                           │
  ├──────────────────────────────────────┼─────────────────────────────┼────────────────────────────────────────┤
  │ Prop drilling for data               │ Required                    │ Eliminated                             │
  ├──────────────────────────────────────┼─────────────────────────────┼────────────────────────────────────────┤
  │ UI state (editMode,                  │ useState                    │ Still useState (unchanged)             │
  │ selectedActivity)                    │                             │                                        │
  └──────────────────────────────────────┴─────────────────────────────┴────────────────────────────────────────┘
