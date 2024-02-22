using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Shop.Database.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            UserRefreshTokens = new Collection<UserRefreshToken>();
        }

        [Required]
        [MaxLength(250)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(250)]
        public string LastName { get; set; }

        [MaxLength(250)]
        public string Patronymic { get; set; }

        [MaxLength(250)]
        public string Address { get; set; }

        public string Avatar { get; set; }

        [MaxLength(50)]
        public string Language { get; set; }

        [MaxLength(50)]
        public string RegisterType { get; set; }

        public bool Confirmed { get; set; }

        public bool Active { get; set; }

        public UserProperties Properties { get; set; }

        public virtual ICollection<UserRefreshToken> UserRefreshTokens { get; set; }
    }
}
