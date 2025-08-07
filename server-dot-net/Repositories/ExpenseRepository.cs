using Microsoft.EntityFrameworkCore;
using server_dot_net.Data;
using server_dot_net.Model;
namespace server_dot_net.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
       private readonly ApplicationDbContext _context;

        public ExpenseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Expense>> GetAllAsync()
        {
            return await _context.Expenses.ToListAsync();
        }

        public async Task<Expense> GetByIdAsync(long id)
        {
            return await _context.Expenses.FindAsync(id);

      
        }

        public async Task<Expense> AddAsync(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return expense;
        }
        
        public async Task<Expense> UpdateAsync(Expense expense)
        {
            _context.Expenses.Update(expense);
            await _context.SaveChangesAsync();
            return expense;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null) return false;
            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
