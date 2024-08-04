using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    public class PropertyTemplate : BaseCodeName
    {
        public string Extension { get; set; }

        public ICollection<Property<string>> StringProperties { get; set; } = new List<Property<string>>();

        public ICollection<Property<decimal>> DecimalProperties { get; set; } = new List<Property<decimal>>();

        public ICollection<Property<bool>> BoolProperties { get; set; } = new List<Property<bool>>();

        public ICollection<Property<DateTime>> DateProperties { get; set; } = new List<Property<DateTime>>();

        public int CategoryId { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; }
    }
}
