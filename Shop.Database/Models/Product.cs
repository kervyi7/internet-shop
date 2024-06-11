using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Shop.Database.Models
{
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(Code), IsUnique = true)]
    public class Product : BaseCodeName
    {
        public int TypeId { get; set; }

        public int BrandId { get; set; }

        public int CategoryId { get; set; }

        [Required]
        public decimal Price { get; set; }

        public decimal SalePrice { get; set; }

        [Required]
        public decimal Count { get; set; }

        [Required]
        [MaxLength(20)]
        public string Currency { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Description { get; set; }

        [ForeignKey(nameof(TypeId))]
        public ProductType Type { get; set; }

        [ForeignKey(nameof(BrandId))]
        public ProductBrand Brand { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; }

        public ICollection<Property<string>> StringProperties { get; set; } = new List<Property<string>>();

        public ICollection<Property<int>> IntProperties { get; set; } = new List<Property<int>>();

        public ICollection<Property<bool>> BoolProperties { get; set; } = new List<Property<bool>>();

        public ICollection<Property<DateTime>> DateProperties { get; set; } = new List<Property<DateTime>>();

        public ICollection<ProductImage> ProductImages { get; } = new List<ProductImage>();
    }
}
