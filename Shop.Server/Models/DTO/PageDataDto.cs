namespace Shop.Server.Models.DTO
{
    public class PageDataDto<T>
    {
        public T Data { get; set; }
        public int Count { get; set; }

    }
}
