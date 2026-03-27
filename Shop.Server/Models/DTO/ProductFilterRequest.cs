using System.Collections.Generic;

namespace Shop.Server.Models.DTO
{
    public class ProductFilterRequest : PaginationDto
    {
        public List<PropertyFilterDto> Properties { get; set; } = new();

        public List<int> BrandIds { get; set; } = new();
        public List<int> TypeIds { get; set; } = new();
        public decimal? PriceFrom { get; set; }
        public decimal? PriceTo { get; set; }
    }
}
