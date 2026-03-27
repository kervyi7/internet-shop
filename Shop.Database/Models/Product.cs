using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Shop.Database.Models
{
    // Indeksy unikalne dla nazwy i kodu produktu
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(Code), IsUnique = true)]
    public class Product : BaseCodeName
    {
        public int TypeId { get; set; } // Id typu produktu (np. elektronika, odzież itp.)
        public int BrandId { get; set; } // Id marki produktu
        public int CategoryId { get; set; } // Id kategorii produktu
        [MaxLength(5000)]
        public string Description { get; set; } // Opis produktu, maksymalna długość 5000 znaków
        [ForeignKey(nameof(TypeId))]
        public ProductType Type { get; set; } // Relacja do typu produktu (klucz obcy)
        [ForeignKey(nameof(BrandId))]
        public ProductBrand Brand { get; set; } // Relacja do marki produktu (klucz obcy)
        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; } // Relacja do kategorii produktu (klucz obcy)
        [Required, Range(0, double.MaxValue)]
        public decimal Price { get; set; } // Cena produktu, wymagana, musi być >= 0
        [Range(0, double.MaxValue)]
        public decimal? DiscountedPrice { get; set; }  // Cena po rabacie, opcjonalna, musi być >= 0
        [Required, Range(0, double.MaxValue)]
        public decimal Count { get; set; } // Ilość produktu w magazynie, wymagana, musi być >= 0
        public ICollection<Property<string>> StringProperties { get; set; } = new List<Property<string>>();  // Właściwości tekstowe produktu (np. kolor, rozmiar)
        public ICollection<Property<decimal>> DecimalProperties { get; set; } = new List<Property<decimal>>();  // Właściwości numeryczne produktu (np. waga, pojemność)
        public ICollection<Property<bool>> BoolProperties { get; set; } = new List<Property<bool>>(); 
        public ICollection<ProductImage> ProductImages { get; private set; } = new List<ProductImage>();
    }
}
