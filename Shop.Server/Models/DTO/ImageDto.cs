namespace Shop.Server.Models.DTO
{
    public class ImageDto : BaseDto
    {
        public string Body { get; set; }

        public string SmallBody { get; set; }

        public int FileSize { get; set; }

        public string FileName { get; set; }

        public string Name { get; set; }

        public string MimeType { get; set; }

        public int ReferenceKey { get; set; }

        public bool IsBinding { get; set; }

        public bool IsTitle { get; set; }
    }
}
