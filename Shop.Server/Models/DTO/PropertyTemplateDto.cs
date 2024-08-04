using Shop.Database.Models;
using Shop.Server.Models.DTO;
using System.Collections.Generic;
using System;
using Shop.Database.Models.Jsons;

namespace Shop.Server.Models
{
    public class PropertyTemplateDto : CodeNameDto
    {
        public TemplateExtension Extension { get; set; }

        public IEnumerable<PropertyDto<string>> StringProperties { get; set; }

        public IEnumerable<PropertyDto<decimal>> DecimalProperties { get; set; }

        public IEnumerable<PropertyDto<bool>> BoolProperties { get; set; }

        public IEnumerable<PropertyDto<DateTime>> DateProperties { get; set; }

        public int CategoryId { get; set; }
    }
}
