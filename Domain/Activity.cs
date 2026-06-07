namespace Domain;

public class Activity
{
    // this entity class is going to represent the database
    // if we want to explicitly use a primary key we would need to use
    // [Key] data annotation, but since we are using the convention of naming the property Id,
    // EF will automatically recognize it as the primary key
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    public required string Title { get; set; } 
    public required string Description { get; set; } 
    public required string Category { get; set; } 
    public DateTime Date { get; set; }
  
    public bool IsCancelled { get; set; }       
    
    //location props
    public required string City { get; set; } 
    public required string Venue { get; set; } 
    public required double Latitude { get; set; }
    public required double Longitude { get; set; } 

}