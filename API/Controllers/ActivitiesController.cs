using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;


// In modern C# you can use a primary constructor which is the cleanest way:
public class ActivitiesController(AppDbContext context): BaseApiController // this is reffered to as primary constructor
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();  
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityById(string id)
    {
        var activity = await context.Activities.FindAsync(id);
        if(activity == null) return NotFound();
        return activity;
    }
}