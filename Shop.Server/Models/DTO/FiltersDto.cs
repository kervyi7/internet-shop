using System.Collections.Generic;
using System;

namespace Shop.Server.Models.DTO
{
    public class FiltersDto
    {
        public IEnumerable<PropertyDto<string>> StringProperties { get; set; }

        public IEnumerable<PropertyDto<decimal>> DecimalProperties { get; set; }

        public IEnumerable<PropertyDto<bool>> BoolProperties { get; set; }

        public IEnumerable<PropertyDto<DateTime>> DateProperties { get; set; }
    }
}
