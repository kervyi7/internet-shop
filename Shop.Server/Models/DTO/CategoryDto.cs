namespace Shop.Server.Models.DTO
{
    public class CategoryDto : CodeNameDto
    {
        public ImageDto Image { get; set; }

        public int? Position { get; set; }
    }
}
