using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    
    public class Command : IRequest<string>
    {
        public required Activity Activity { get; set; }
        
    }
    
    public class Handler(AppDbContext context): IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            
            context.Activities.Add(request.Activity);
            await context.SaveChangesAsync(cancellationToken);
            // ideally we shouldn;t be returning the id of the created activity, but for the sake of simplicity we will do it here
            // in a real world application we would return a more complex object that contains the id and
            // other relevant information about the created activity
            return request.Activity.Id;
        }
    }
}