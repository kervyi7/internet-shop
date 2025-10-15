using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Shop.Database.Models
{
    public class ShippingOption
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required]
        public decimal Cost { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
