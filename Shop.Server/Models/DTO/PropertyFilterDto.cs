using Shop.Common.Enums;
using System.Collections.Generic;

namespace Shop.Server.Models.DTO
{
    public class PropertyFilterDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public List<string> Values { get; set; }
    }
}
