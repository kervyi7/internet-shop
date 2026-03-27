using System.Collections.Generic;
using System;

namespace Shop.Server.Models.DTO
{
    public class ProductDto : CodeNameDto
    {
        public CodeNameDto Type { get; set; }
        public CodeNameDto Brand { get; set; }
        public CategoryDto Category { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public decimal Count { get; set; }
        public string Description { get; set; }
        public IEnumerable<ImageDto> Images { get; set; }
        public IEnumerable<PropertyDto<string>> StringProperties { get; set; }
        public IEnumerable<PropertyDto<decimal>> DecimalProperties { get; set; }
        public IEnumerable<PropertyDto<bool>> BoolProperties { get; set; }
    }

    public class ShortProductDto : CodeNameDto
    {
        public string Category { get; set; }
        public decimal Price { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public decimal Count { get; set; }
        public IEnumerable<ImageDto> Images { get; set; }
    }
}
