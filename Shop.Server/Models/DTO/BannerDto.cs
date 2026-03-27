using Shop.Common.Enums;
using System.Collections.Generic;

namespace Shop.Server.Models.DTO
{
    public class BannerDto
    {
        public int Id { get; set; }

        public BannerType Type { get; set; }

        public string Header { get; set; }

        public string Text { get; set; }

        public bool IsActive { get; set; }

        public IEnumerable<ImageDto> Images { get; set; }
    }
}
