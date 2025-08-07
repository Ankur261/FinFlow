using Microsoft.AspNetCore.Mvc;
using server_dot_net.DTOs;
using server_dot_net.Services;
using System.Runtime.CompilerServices;

namespace server_dot_net.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : Controller
    {
        private readonly IExpenseService _service;

        public ExpenseController(IExpenseService service)
        {
            _service = service;
        }
        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            var expenses = await _service.GetAllAsync();
            return Ok(expenses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var expenses = await _service.GetByIdAsync(id);
            if(expenses == null) return NotFound();
            return Ok(expenses);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ExpenseRequestDto dto)
        {
            var created = await _service.CreateAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Upadate(long id, [FromBody] ExpenseRequestDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            if(updated == null) return NotFound();  
            return Ok(updated);
        
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete(long id) { 
                var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();

        }

    }
}
