namespace Shop.Server.Models.DTO
{
    public class PaginationDto
    {
        public int Skip { get; set; }
        public int Count { get; set; }
        public string SearchValue { get; set; }
    }
}
