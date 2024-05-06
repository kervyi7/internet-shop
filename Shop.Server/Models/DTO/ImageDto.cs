using System.ComponentModel.DataAnnotations;

namespace Shop.Server.Models.DTO
{
    public class ImageDto : BaseDto
    {
        [Required]
        public string Body { get; set; }

        [Required]
        public string SmallBody { get; set; }

        [Required]
        public int FileSize { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string MimeType { get; set; }

        [Required]
        public int ReferenceKey { get; set; }

        public bool IsBinding { get; set; }
    }
}
