using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Shop.Database.Identity
{
    public class ApplicationUser : IdentityUser
    {
        // Konstruktor inicjalizujący kolekcję tokenów odświeżania użytkownika
        public ApplicationUser()
        {
            UserRefreshTokens = new Collection<UserRefreshToken>();
        }

        [Required, MaxLength(50)]
        public string FirstName { get; set; } // Imię użytkownika, wymagane, maksymalnie 50 znaków

        [Required, MaxLength(50)]
        public string LastName { get; set; }  // Nazwisko użytkownika, wymagane, maksymalnie 50 znaków

        [MaxLength(50)]
        public string Patronymic { get; set; } // Drugie imię / patronimik, opcjonalne, maksymalnie 50 znaków

        [MaxLength(250)]
        public string Address { get; set; } // Adres użytkownika, opcjonalny, maksymalnie 250 znaków

        [MaxLength(20)]
        public string RegisterType { get; set; } // Typ rejestracji użytkownika, opcjonalny, maksymalnie 20 znaków

        public bool Confirmed { get; set; } // Czy użytkownik potwierdził konto

        public bool Active { get; set; }// Czy konto użytkownika jest aktywne

        public virtual ICollection<UserRefreshToken> UserRefreshTokens { get; set; } // Kolekcja tokenów odświeżania przypisanych do użytkownika
    }
}
