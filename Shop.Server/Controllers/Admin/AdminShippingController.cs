using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Models.DTO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Shop.Server.Controllers.Admin
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminShippingController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public AdminShippingController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShippingOptionDto>>> GetAll()
        {
            var options = await _dataContext.ShippingOptions
                .Select(x => new ShippingOptionDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Cost = x.Cost,
                    Description = x.Description,
                    IsActive = x.IsActive
                })
                .ToListAsync();

            return Ok(options);
        }

        [HttpPost]
        public async Task<ActionResult<ShippingOptionDto>> Create([FromBody] ShippingOptionDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var option = new ShippingOption
            {
                Name = dto.Name,
                Cost = dto.Cost,
                Description = dto.Description,
                IsActive = dto.IsActive
            };

            _dataContext.ShippingOptions.Add(option);
            await _dataContext.SaveChangesAsync();

            dto.Id = option.Id;
            return CreatedAtAction(nameof(GetAll), new { id = option.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ShippingOptionDto>> Update(int id, [FromBody] ShippingOptionDto dto)
        {
            var option = await _dataContext.ShippingOptions.FindAsync(id);
            if (option == null) return NotFound();

            option.Name = dto.Name;
            option.Cost = dto.Cost;
            option.Description = dto.Description;
            option.IsActive = dto.IsActive;

            await _dataContext.SaveChangesAsync();
            return Ok(dto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var option = await _dataContext.ShippingOptions.FindAsync(id);
            if (option == null) return NotFound();

            _dataContext.ShippingOptions.Remove(option);
            await _dataContext.SaveChangesAsync();
            return NoContent();
        }
    }
}