using System.Collections.Generic;

namespace Shop.Server.Models.DTO
{
    public class CategoryFiltersDto
    {
        public List<PropertyFilterDto> Properties { get; set; } = new();
        public List<CodeNameDto> Brands { get; set; } = new();
        public List<CodeNameDto> Types { get; set; } = new();
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
    }
}
