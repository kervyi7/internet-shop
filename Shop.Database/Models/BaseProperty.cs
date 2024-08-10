using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Shop.Database.Models
{
    [Index(nameof(Name), nameof(ProductId), IsUnique = true)]
    [Index(nameof(Code), nameof(ProductId), IsUnique = true)]
    public class BaseProperty : BaseCodeName
    {
        public bool IsPrimary { get; set; }

        public bool IsTitle { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [MaxLength(200)]
        public string Suffix { get; set; }

        public int? ProductId { get; set; }

        public int? PropertyTemplateId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }

        [ForeignKey(nameof(PropertyTemplateId))]
        public PropertyTemplate PropertyTemplate { get; set; }
    }
}
