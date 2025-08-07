using server_dot_net.DTOs;
using server_dot_net.Model;
using server_dot_net.Repositories;

namespace server_dot_net.Services
{
    public class ExpenseService :IExpenseService
    {
        private readonly IExpenseRepository _repository;

        public ExpenseService(IExpenseRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ExpenseResponseDto>> GetAllAsync()
        {
            var expenses = await _repository.GetAllAsync();
            return expenses.Select(MapToDto);

        }

        public async Task<ExpenseResponseDto> GetByIdAsync(long id)
        {
            var expense = await _repository.GetByIdAsync(id);
            return expense == null ? null : MapToDto(expense);
        }

        public async Task<ExpenseResponseDto> CreateAsync(ExpenseRequestDto dto)
        {
            var expense = new Expense
            {

                Category = dto.Category,
                Amount = dto.Amount,
                Date = dto.Date,
                CustomerId = dto.CustomerId,
                Description= dto.Description
            };

            var result = await _repository.AddAsync(expense);
            return MapToDto(result);
        }
        public async Task<ExpenseResponseDto> UpdateAsync(long id, ExpenseRequestDto dto)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return null;

            existing.Category = dto.Category;
            existing.Amount = dto.Amount;
            existing.Date = dto.Date;

            var updated = await _repository.UpdateAsync(existing);
            return MapToDto(updated);
        }

        public async Task<bool> DeleteAsync(long id)
        {
            return await _repository.DeleteAsync(id);
        }

        private ExpenseResponseDto MapToDto(Expense expense)
        {
            return new ExpenseResponseDto
            {
                Id = expense.Id,
                Category = expense.Category,
                Amount = expense.Amount,
                Date = expense.Date,
                Description = expense.Description
            };
        }


    }
}

