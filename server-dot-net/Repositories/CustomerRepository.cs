using Microsoft.EntityFrameworkCore;
using server_dot_net.Data;
using server_dot_net.DTOs;
using server_dot_net.Model;

namespace server_dot_net.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext _context;

        public CustomerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Customer>> GetAllAsync() =>
            await _context.Customers.ToListAsync();

        public async Task<IEnumerable<ExpenseDto>> GetExpensesByCustomerIdAsync(long customerId)
        {
            return await _context.Expenses
                .Where(e => e.CustomerId == customerId)
                .Include(e => e.Customer)
                .Select(e => new ExpenseDto
                {
                    Id = e.Id,
                    Category = e.Category,
                    Amount = e.Amount,
                    Description = e.Description,
                    Date = e.Date,
                    CustomerId = e.CustomerId,
                    CustomerName = e.Customer.Name
                })
                .ToListAsync();
        }

        public async Task<Customer?> GetByIdAsync(long id) =>
            await _context.Customers.FindAsync(id);

        public async Task<Customer> CreateAsync(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<Customer?> UpdateAsync(long id, Customer updated)
        {
            var existing = await _context.Customers.FindAsync(id);
            if (existing == null) return null;

            existing.Name = updated.Name;
            existing.Email = updated.Email;
            existing.Password = updated.Password;
            existing.Balance = updated.Balance;
            existing.MonthlySalary = updated.MonthlySalary;
            existing.MonthlyBudget = updated.MonthlyBudget;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var existing = await _context.Customers.FindAsync(id);
            if (existing == null) return false;

            _context.Customers.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
