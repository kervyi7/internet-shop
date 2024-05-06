using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace Shop.Database.Models
{
    public abstract class BaseCodeName : BaseCreateUpdate
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        [MaxLength(200)]
        public string Code { get; set; }
    }
}
