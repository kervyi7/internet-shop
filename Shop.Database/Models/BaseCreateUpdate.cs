using System;
using System.ComponentModel.DataAnnotations;

namespace Shop.Database.Models
{
    public abstract class BaseCreateUpdate : BaseModel
    {
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [MaxLength(50)]
        public string CreatedByUser { get; set; }

        [Required]
        [MaxLength(600)]
        public string UpdatedByUser { get; set; }
    }
}
