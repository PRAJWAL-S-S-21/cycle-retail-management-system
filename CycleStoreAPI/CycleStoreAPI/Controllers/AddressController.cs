using System.Net;
using CycleStoreAPI.Data;
using CycleStoreAPI.DTOs;
using CycleStoreAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CycleStoreAPI.Controllers
{
    [Route("api/address")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AddressController(ApplicationDbContext context)
        {
            _context = context;
        }

        //// Get all Addresses
        //[HttpGet]
        //public async Task<IActionResult> GetAddress()
        //{
        //    var addresses = await _context.Address.ToListAsync();
        //    if (addresses == null)
        //    {
        //        return BadRequest(new { message = "Address not found" });
        //    }
        //    return Ok(addresses);
        //}

        //// GetAddress By ID
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetAddressById(Guid id)
        //{
        //    var address = await _context.Address.FindAsync(id);

        //    if (address == null)
        //    {
        //        return BadRequest(new { message = "Address not found" });
        //    }

        //    return Ok(address);
        //}


        //[HttpPost]
        //public async Task<IActionResult> CreateAddress([FromBody] CreateAddressDTO addressDTO)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var address = new Address
        //    {
        //        AddressID = Guid.NewGuid(),
        //        StreetLine1 = addressDTO.StreetLine1,
        //        StreetLine2 = addressDTO.StreetLine2,
        //        City = addressDTO.City,
        //        State = addressDTO.State,
        //        PostalCode = addressDTO.PostalCode,
        //        Country = addressDTO.Country,
        //        CreatedAt = DateTime.UtcNow

        //    };

        //    _context.Address.Add(address);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetAddressById), new { id = address.AddressID }, address);
        //}


        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateAddress(Guid id, [FromBody] AddressDTO updatedCustomer)
        //{
        //    var address = await _context.Address.FindAsync(id);

        //    if (address == null)
        //    {
        //        return NotFound(new { message = "Address not found" });
        //    }

        //    address.StreetLine1 = !string.IsNullOrEmpty(updatedCustomer.StreetLine1) ? updatedCustomer.StreetLine1 : address.StreetLine1;
        //    address.StreetLine2 = !string.IsNullOrEmpty(updatedCustomer.StreetLine2) ? updatedCustomer.StreetLine2 : address.StreetLine2;
        //    address.City = !string.IsNullOrEmpty(updatedCustomer.City) ? updatedCustomer.City : address.City;
        //    address.State = !string.IsNullOrEmpty(updatedCustomer.State) ? updatedCustomer.State : address.State;
        //    address.PostalCode = !string.IsNullOrEmpty(updatedCustomer.PostalCode) ? updatedCustomer.PostalCode : address.PostalCode;
        //    address.Country = !string.IsNullOrEmpty(updatedCustomer.Country) ? updatedCustomer.Country : address.Country;

        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Address updated successfully" });

        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteAddress(Guid id)
        //{
        //    var address = await _context.Address.FindAsync(id);

        //    if (address == null )
        //    {
        //        return NotFound(new { message = "Address not found" });
        //    }

        //    _context.Address.Remove(address);
        //    await _context.SaveChangesAsync();

        //    return Ok(new { message = "Address deleted successfully" });
        //}

    }
}
