using Microsoft.AspNetCore.Mvc;
using server_dot_net.DTOs;
using server_dot_net.Model;
using server_dot_net.Services;
using System.Threading.Tasks;
namespace server_dot_net.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController

         : ControllerBase
    {
        private readonly IInvoiceService _service;

        public InvoiceController(IInvoiceService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InvoiceRequestDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetAllInvoices()
        {
            var invoices = await _service.GetAllAsync();
            return Ok(invoices);
        }


        [HttpGet("merchant/{merchantId}")]
        public async Task<IActionResult> GetByMerchant(long merchantId)
        {
            var result = await _service.GetByMerchantIdAsync(merchantId);
            return Ok(result);
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetByCustomer(long customerId)
        {
            var result = await _service.GetByCustomerIdAsync(customerId);
            return Ok(result);
        }

        [HttpPut("{invoiceId}/status")]
        public async Task<IActionResult> UpdateStatus(long invoiceId, [FromQuery] string status)
        {
            var result = await _service.UpdateStatusAsync(invoiceId, status);
            return result != null ? Ok(result) : NotFound("Invoice not found.");
        }
    }
}
