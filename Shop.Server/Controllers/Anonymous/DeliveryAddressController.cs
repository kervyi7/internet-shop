using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Database;
using Shop.Database.Models;
using Shop.Server.Models.DTO;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Server.Controllers.Anonymous
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryAddressController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public DeliveryAddressController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<DeliveryAddress[]>> GetAll(string userId)
        {
            var addresses = await _dataContext.DeliveryAddresses
                .Where(a => a.UserId == userId)
                .ToArrayAsync();
            return Ok(addresses);
        }

        [HttpPost]
        public async Task<ActionResult> Add(DeliveryAddress address)
        {
            _dataContext.DeliveryAddresses.Add(address);
            await _dataContext.SaveChangesAsync();
            return Ok(address);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] DeliveryAddressDto dto)
        {
            var address = await _dataContext.DeliveryAddresses
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == dto.UserId);

            if (address == null)
                return NotFound("Address not found");

            if (dto.IsDefault)
            {
                var userAddresses = await _dataContext.DeliveryAddresses
                    .Where(a => a.UserId == dto.UserId && a.Id != id)
                    .ToListAsync();

                foreach (var addr in userAddresses)
                    addr.IsDefault = false;
            }

            address.FirstName = dto.FirstName;
            address.LastName = dto.LastName;
            address.Country = dto.Country;
            address.City = dto.City;
            address.Street = dto.Street;
            address.HouseNumber = dto.HouseNumber;
            address.Apartment = dto.Apartment;
            address.Postcode = dto.Postcode;
            address.Phone = dto.Phone;
            address.Email = dto.Email;
            address.Notes = dto.Notes;
            address.IsDefault = dto.IsDefault;

            await _dataContext.SaveChangesAsync();
            return Ok(address);
        }

        [HttpDelete("{id}/{userId}")]
        public async Task<ActionResult> Delete(int id, string userId)
        {
            var address = await _dataContext.DeliveryAddresses
                .FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (address == null) return NotFound();

            _dataContext.DeliveryAddresses.Remove(address);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }
    }
}

