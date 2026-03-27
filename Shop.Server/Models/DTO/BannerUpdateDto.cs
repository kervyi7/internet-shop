using System.Collections.Generic;

namespace Shop.Server.Models.DTO
{
    public class BannerUpdateDto
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Text { get; set; }
        public bool IsActive { get; set; }
        public List<int> ImageIds { get; set; }
    }
}
