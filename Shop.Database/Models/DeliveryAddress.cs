using Shop.Database.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    public class DeliveryAddress
    {
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }

        [Required, MaxLength(250)]
        public string FirstName { get; set; }

        [Required, MaxLength(250)]
        public string LastName { get; set; }

        [Required, MaxLength(250)]
        public string Country { get; set; }

        [Required, MaxLength(250)]
        public string City { get; set; }

        [Required, MaxLength(250)]
        public string Street { get; set; }

        [Required, MaxLength(50)]
        public string HouseNumber { get; set; }

        [MaxLength(50)]
        public string Apartment { get; set; }

        [Required, MaxLength(20)]
        public string Postcode { get; set; }

        [Required, MaxLength(50)]
        public string Phone { get; set; }

        [Required, EmailAddress]
        [MaxLength(250)]
        public string Email { get; set; }

        public string Notes { get; set; }

        public bool IsDefault { get; set; } = false;

        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }

}
