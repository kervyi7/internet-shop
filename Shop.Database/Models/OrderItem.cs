using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    // Reprezentuje pojedynczą pozycję w zamówieniu
    public class OrderItem : BaseModel // Klasa OrderItem dziedziczy po BaseModel, która zawiera unikalny identyfikator pozycji (id)
    {
        public int OrderId { get; set; } // Id zamówienia, do którego należy pozycja
        public int ProductId { get; set; } // Id produktu w zamówieniu

        [ForeignKey(nameof(OrderId))]
        public Order Order { get; set; } // Relacja do zamówienia

        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; } // Relacja do produktu

        [Required, Range(1, int.MaxValue)]
        public int Quantity { get; set; }  // Ilość zamawianego produktu, wymagana, musi być >= 0

        [Required, Range(1, double.MaxValue)]
        public decimal PriceAtPurchase { get; set; } // Cena produktu w momencie zakupu, wymagana, musi być >= 0
    }
}
