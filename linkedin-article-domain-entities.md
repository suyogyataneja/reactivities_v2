# Are Domain Entities Always Meant to Map to the Database?

**A question every .NET developer should answer before adding another layer.**

---

Early in my journey with .NET and Clean Architecture, I wrote a comment above my entity class:

*"This entity class is going to represent the database."*

It felt right at the time. The class had properties. EF Core picked them up. A table appeared. Job done.

But as I dug deeper into software architecture, I realized that one innocent comment revealed a fundamental misunderstanding — one I see repeated across codebases, tutorials, and even production systems.

**Domain entities are not database models.** They can behave like one. They often look like one. But conflating the two leads to design decisions you will regret at scale.

Let me explain.

---

## The Distinction That Changes How You Think About Code

A **domain entity** answers: *"What does this concept mean to my business?"*

A **database model** answers: *"How do I store this concept in SQL?"*

They sound similar. They are not.

A domain entity carries business meaning, rules, and behavior. A database model carries columns, foreign keys, and storage concerns.

Consider an `Activity` class in a social app:

```csharp
public class Activity
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string City { get; set; }
    public string Venue { get; set; }
}
```

Is this a domain entity or a database model? Right now, it is both — and in many projects, that is completely fine.

The trouble starts when you assume it must always be both.

---

## When the Two Start Pulling Apart

Here are real scenarios where domain concepts and storage concerns diverge:

**1. Computed properties that don't belong in the database**

```csharp
public bool IsUpcoming => Date > DateTime.UtcNow;
```

This is pure domain logic. It has no column. It has no migration. But it is a meaningful property of an Activity that your application layer cares about.

**2. Database columns that don't belong in the domain**

Fields like `CreatedAt`, `UpdatedAt`, `RowVersion`, and `IsDeleted` are infrastructure concerns. They exist for auditing, concurrency, and soft-delete strategies — not because your business rules demand them.

**3. Shape differences**

Your domain might model a location as a value object:

```csharp
public record Location(string City, string Venue, double Latitude, double Longitude);
```

But in the database, those are four flat columns on the same table. The domain shape and the storage shape are not the same — EF Core bridges the gap through Owned Types.

**4. Behavior**

A true domain entity can enforce rules:

```csharp
public void Cancel()
{
    if (IsCancelled)
        throw new InvalidOperationException("Activity is already cancelled.");
    
    IsCancelled = true;
}
```

A database model is a data bag. It has no opinions. If your entity has behavior, it is serving the domain — not the database.

---

## So Should You Always Separate Them?

**No.** And this is where I see the opposite mistake happen just as often.

I have seen teams create `Activity`, `ActivityEntity`, `ActivityDto`, `ActivityModel`, and `ActivityViewModel` — five classes representing the same concept, connected by mapping code that is longer than the actual business logic.

That is not Clean Architecture. That is ceremony.

Here is my rule of thumb after years of building .NET systems:

> **Start with one class. Split only when you feel real pain — not theoretical pain.**

EF Core is designed to work directly with domain entities. You can use Fluent API configurations and `[NotMapped]` attributes to handle 90% of the gaps without creating a second set of models.

---

## When Separation Earns Its Keep

There are legitimate scenarios where separating domain entities from persistence models pays off:

- **Rich domain behavior** that conflicts with EF Core's requirements (parameterless constructors, public setters)
- **Multiple storage backends** — your domain shouldn't know whether it's being saved to SQL, a document database, or an event store
- **Legacy database schemas** that are ugly or denormalized — you don't want that leaking into your domain
- **Complex bounded contexts** where the same real-world concept has different meanings in different parts of the system

If none of these apply to your project today, you probably don't need the separation today.

---

## The Mindset Shift

The real takeaway is not about architecture patterns or folder structures. It is about how you think about your code.

When you write an entity class, ask yourself:

*"Am I designing this for my business, or for my database?"*

If the answer is "for my database," you are letting your storage technology drive your domain. The domain should drive the storage — never the other way around.

Even if the two look identical right now, that mental distinction matters. It is the difference between a codebase that evolves gracefully and one that fights you at every turn.

---

## The Bottom Line

Domain entities are not database models. Sometimes they look the same. Sometimes they should be the same class. But they are never the same concern.

Start simple. One class. Let EF Core do the heavy lifting. But keep the mental model clear — your entity serves the domain first, and the database second.

When the two start pulling in different directions, you will know. And when that day comes, you will be ready — because you understood the difference from the start.

---

*What's your approach? Do you separate domain entities from persistence models, or keep them together? I'd love to hear what's worked (and what hasn't) in your projects.*

*Drop your thoughts in the comments.*