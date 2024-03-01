using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Database.Models
{
    public class Property<T> : BaseCodeName
    {
        public bool IsPrimary { get; set; }

        public bool IsTitle { get; set; }

        public string Description { get; set; }

        public string Suffix { get; set; }

        public T Value { get; set; }

        public int ProductId { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }
    }
}
