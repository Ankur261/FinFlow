using server_dot_net.Model;

namespace server_dot_net.Repositories
{
    public interface IExpenseRepository
    {
        Task<IEnumerable<Expense>> GetAllAsync();
        Task<Expense> GetByIdAsync(long id);
        Task<Expense> AddAsync(Expense expense);
        Task<Expense> UpdateAsync(Expense expense);
        Task<bool> DeleteAsync(long id);
    }
}
