using Shop.Database.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Identity
{
    public class UserRefreshToken : BaseModel
    {
        public UserRefreshToken()
        {
            CreateOn = DateTime.UtcNow;
        }

        [Required]
        public string UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string RefreshToken { get; set; }

        [Required]
        [MaxLength(100)]
        public string SecurityTokenCode { get; set; }

        [Required]
        public DateTime CreateOn { get; set; }

        [Required]
        public DateTime Expires { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; }
    }
}