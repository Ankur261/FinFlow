using server_dot_net.DTOs;

namespace server_dot_net.Service
{
    public interface IExpenseService
    {
        Task<object> GetAllAsync();
        Task<object> GetByIdAsync(long id);
        Task<(bool Success, string Message, IEnumerable<ExpenseDto> Data)> GetExpensesByCustomerIdAsync(long customerId);

        Task<object> CreateAsync(ExpenseDto dto);
        Task<object> UpdateAsync(long id, ExpenseDto dto);
        Task<object> DeleteAsync(long id);
    }
}
