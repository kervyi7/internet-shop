using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Shop.Database.Models
{
    [Index(nameof(Key), IsUnique = true)]
    public class InfoPage
    {
        public int Id { get; set; }

        [Required]
        public string Key { get; set; }

        [Required]
        public string Header { get; set; }

        [Required]
        public string HtmlContent { get; set; }
    }
}
