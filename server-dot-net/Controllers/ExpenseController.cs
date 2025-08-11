using Microsoft.AspNetCore.Mvc;
using server_dot_net.DTOs;
using server_dot_net.Service;

namespace server_dot_net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _expenseService.GetAllAsync());
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetExpensesByCustomer(long customerId)
        {
            var result = await _expenseService.GetExpensesByCustomerIdAsync(customerId);

            return Ok(new
            {
                success = result.Success,
                message = result.Message,
                data = result.Data
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            return Ok(await _expenseService.GetByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ExpenseDto dto)
        {
            return Ok(await _expenseService.CreateAsync(dto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] ExpenseDto dto)
        {
            return Ok(await _expenseService.UpdateAsync(id, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            return Ok(await _expenseService.DeleteAsync(id));
        }
    }
}
