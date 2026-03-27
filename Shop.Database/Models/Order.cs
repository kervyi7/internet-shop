using Shop.Common.Enums;
using Shop.Database.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    // Reprezentuje zamówienie złożone przez użytkownika w sklepie
    public class Order : BaseCreateUpdate // Klasa Order dziedziczy po BaseCreateUpdate, co pozwala automatycznie śledzić daty utworzenia i ostatniej modyfikacji rekordu.
    {
        public string UserId { get; set; } // Id użytkownika składającego zamówienie
        public int DeliveryAddressId { get; set; } // Adres dostawy
        public int ShippingOptionId { get; set; } // Wybrana opcja wysyłki

        public DateTime? PaidAt { get; set; } // Data opłacenia zamówienia (nullable)
        public DateTime? ShippedAt { get; set; } // Data wysyłki zamówienia (nullable)
        public OrderStatus Status { get; set; } = OrderStatus.Pending; // Status zamówienia, domyślnie Pending

        [MaxLength(200)]
        public string Notes { get; set; } // Dodatkowe uwagi do zamówienia, maksymalna długość 5000 znaków

        [Required, Range(0, double.MaxValue)]
        public decimal TotalPrice { get; set; } // Łączna cena zamówienia w chwili zakupu, wymagana

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; } // Relacja do użytkownika

        [ForeignKey(nameof(ShippingOptionId))]
        public ShippingOption ShippingOption { get; set; } // Relacja do opcji wysyłki

        [Required]
        [MaxLength(20)]
        public string Currency { get; set; }

        [ForeignKey(nameof(DeliveryAddressId))]
        public DeliveryAddress DeliveryAddress { get; set; } // Relacja do adresu dostawy (klucz obcy)

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();  // Kolekcja pozycji w zamówieniu
    }
}
