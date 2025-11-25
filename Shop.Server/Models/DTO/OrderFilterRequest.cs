using Shop.Common.Enums;

namespace Shop.Server.Models.DTO
{
    public class OrderFilterRequest : PaginationDto
    {
        public OrderStatus? Status { get; set; }
    }
}
