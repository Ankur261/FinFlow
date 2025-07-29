using Microsoft.AspNetCore.Mvc;
using server_dot_net.DTOs;
using server_dot_net.Services;

namespace server_dot_net.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MerchantController : ControllerBase
    {
        private readonly IMerchantService _service;

        public MerchantController(IMerchantService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var merchants = await _service.GetAllAsync();
            return Ok(merchants);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var merchant = await _service.GetByIdAsync(id);
            if (merchant == null) return NotFound();
            return Ok(merchant);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MerchantRequestDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] MerchantRequestDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }

}
