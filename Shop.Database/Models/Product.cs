using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Shop.Database.Models
{
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(Code), IsUnique = true)]
    public class Product : BaseCodeName
    {
        public int TypeId { get; set; }

        public int BrandId { get; set; }

        public int CategoryId { get; set; }

        public decimal Price { get; set; }

        public string Currency { get; set; }

        public bool IsExist { get; set; }

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
