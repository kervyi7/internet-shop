using System.Collections.Generic;
using System;

namespace Shop.Server.Models.DTO
{
    public class ProductDto : CodeNameDto
    {
        public CodeNameDto Type { get; set; }
        public CodeNameDto Brand { get; set; }
        public CodeNameDto Category { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
        public IEnumerable<ImageDto> Images { get; set; }
        public IEnumerable<PropertyDto<string>> StringProperties { get; set; }
        public IEnumerable<PropertyDto<int>> IntProperties { get; set; }
        public IEnumerable<PropertyDto<bool>> BoolProperties { get; set; }
        public IEnumerable<PropertyDto<DateTime>> DateProperties { get; set; }
    }
}
