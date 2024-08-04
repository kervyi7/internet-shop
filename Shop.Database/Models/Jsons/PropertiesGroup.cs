using System.Collections.Generic;

namespace Shop.Database.Models.Jsons
{
    public class PropertiesGroup
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public List<string> PropertyCodes { get; set; }
    }
}
