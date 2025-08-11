using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_dot_net.Data;
using System.Security.Claims;

namespace server_dot_net.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        // CUSTOMER DASHBOARD
        [HttpGet("customer")]
        [Authorize(Roles = "customer")]
        public IActionResult GetCustomerDashboard()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var customer = _context.Customers.FirstOrDefault(c => c.Email == email);

            if (customer == null)
                return NotFound("Customer not found");

            var data = new
            {
                Name = customer.Name,
                Email = customer.Email,
                Balance = customer.Balance,
                MonthlySalary = customer.MonthlySalary,
                MonthlyBudget = customer.MonthlyBudget
            };

            return Ok(data);
        }

        // MERCHANT DASHBOARD
        [HttpGet("merchant")]
        [Authorize(Roles = "merchant")]
        public IActionResult GetMerchantDashboard()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var merchant = _context.Merchants.FirstOrDefault(m => m.Email == email);

            if (merchant == null)
                return NotFound("Merchant not found");

            var data = new
            {
                BusinessName = merchant.BusinessName,
                Email = merchant.Email,
                BusinessType = merchant.BusinessType,
                TotalInvoices = _context.Invoices.Count(i => i.MerchantId == merchant.Id)
            };

            return Ok(data);
        }

        // ADMIN DASHBOARD
        [HttpGet("admin")]
        [Authorize(Roles = "admin")]
        public IActionResult GetAdminDashboard()
        {
            var totalCustomers = _context.Customers.Count();
            var totalMerchants = _context.Merchants.Count();
            var totalInvoices = _context.Invoices.Count();

            var data = new
            {
                TotalCustomers = totalCustomers,
                TotalMerchants = totalMerchants,
                TotalInvoices = totalInvoices
            };

            return Ok(data);
        }
    }
}
