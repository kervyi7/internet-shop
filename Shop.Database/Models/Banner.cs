using Microsoft.EntityFrameworkCore;
using Shop.Common.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Shop.Database.Models
{
    [Index(nameof(Type), IsUnique = true)]
    public class Banner
    {
        public int Id { get; set; }

        [Required]
        public BannerType Type { get; set; }

        [Required]
        public string Header { get; set; }

        public string Text { get; set; }

        public bool IsActive { get; set; }

        public ICollection<Image> Images { get; set; } = new List<Image>();
    }
}
