using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace Shop.Database.Models
{
    [Index(nameof(Name), IsUnique = true)]
    [Index(nameof(Code), IsUnique = true)]
    public abstract class BaseCodeName : BaseCreateUpdate
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }
    }
}
