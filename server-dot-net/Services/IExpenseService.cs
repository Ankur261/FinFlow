using server_dot_net.DTOs;

namespace server_dot_net.Services
{
    public interface IExpenseService
    {
        Task<IEnumerable<ExpenseResponseDto>> GetAllAsync();
        Task<ExpenseResponseDto> GetByIdAsync(long id);

        Task<ExpenseResponseDto> CreateAsync(ExpenseRequestDto dto);
        Task<ExpenseResponseDto> UpdateAsync(long id, ExpenseRequestDto dto);
        Task<bool> DeleteAsync(long id);
    }
}