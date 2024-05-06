namespace Shop.Database.Models
{
    public class Property<T> : BaseProperty
    {
        public T Value { get; set; }
    }
}
