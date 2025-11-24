using System;

namespace Shop.Database.Models
{
    public abstract class BaseCreateUpdate : BaseModel
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
