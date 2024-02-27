using Shop.Database.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Shop.Server.Models.DTO
{
    public class ImageDto
    {
        [Required]
        public string Body { get; set; }

        public string SmallBody { get; set; }

        [Required]
        public int FileSize { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public string MimeType { get; set; }
    }
}
