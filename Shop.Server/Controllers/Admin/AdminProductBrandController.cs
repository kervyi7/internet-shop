using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Identity;
using Shop.Database.Models;
using Shop.Server.Controllers.Abstract;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Admin
{
    [Route("api/[controller]")]
    [Authorize(Roles = nameof(ApplicationUserRole.Administrator))]
    public class AdminProductBrandController : BaseCodeNameController<ProductBrand>
    {
        public AdminProductBrandController(DataContext dataContext) : base(dataContext)
        {
        }

        protected async override Task<bool> IsCanDelete(int id)
        {
            var canDelete = await DataContext.Products.AnyAsync(x => x.BrandId == id);
            return canDelete;
        }
    }
}
