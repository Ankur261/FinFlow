using server_dot_net.DTOs;
using server_dot_net.Model;
using server_dot_net.Repository;

namespace server_dot_net.Service
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _expenseRepo;

        public ExpenseService(IExpenseRepository expenseRepo)
        {
            _expenseRepo = expenseRepo;
        }

        public async Task<object> GetAllAsync()
        {
            var expenses = await _expenseRepo.GetAllAsync();
            var result = expenses.Select(e => new ExpenseDto
            {
                Id = e.Id,
                Category = e.Category,
                Amount = e.Amount,
                Description = e.Description,
                Date = e.Date,
                CustomerId = e.CustomerId,
                CustomerName = e.Customer?.Name
            });

            return new { success = true, message = "Expenses fetched successfully", data = result };
        }

        public async Task<(bool Success, string Message, IEnumerable<ExpenseDto> Data)> GetExpensesByCustomerIdAsync(long customerId)
        {
            var expenses = await _expenseRepo.GetExpensesByCustomerIdAsync(customerId);

            if (expenses == null || !expenses.Any())
            {
                return (false, "No expenses found for this customer", null);
            }

            return (true, "Expenses retrieved successfully", expenses);
        }

        public async Task<object> GetByIdAsync(long id)
        {
            var e = await _expenseRepo.GetByIdAsync(id);
            if (e == null)
                return new { success = false, message = "Expense not found" };

            var dto = new ExpenseDto
            {
                Id = e.Id,
                Category = e.Category,
                Amount = e.Amount,
                Description = e.Description,
                Date = e.Date,
                CustomerId = e.CustomerId,
                CustomerName = e.Customer?.Name
            };

            return new { success = true, message = "Expense fetched successfully", data = dto };
        }

        public async Task<object> CreateAsync(ExpenseDto dto)
        {
            var expense = new Expense
            {
                Category = dto.Category,
                Amount = dto.Amount,
                Description = dto.Description,
                Date = dto.Date,
                CustomerId = dto.CustomerId
            };

            var created = await _expenseRepo.AddAsync(expense);

            return new
            {
                success = true,
                message = "Expense created successfully",
                data = new ExpenseDto
                {
                    Id = created.Id,
                    Category = created.Category,
                    Amount = created.Amount,
                    Description = created.Description,
                    Date = created.Date,
                    CustomerId = created.CustomerId,
                    CustomerName = created.Customer?.Name
                }
            };
        }

        public async Task<object> UpdateAsync(long id, ExpenseDto dto)
        {
            var existing = await _expenseRepo.GetByIdAsync(id);
            if (existing == null)
                return new { success = false, message = "Expense not found" };

            existing.Category = dto.Category;
            existing.Amount = dto.Amount;
            existing.Description = dto.Description;
            existing.Date = dto.Date;
            existing.CustomerId = dto.CustomerId;

            var updated = await _expenseRepo.UpdateAsync(existing);

            return new
            {
                success = true,
                message = "Expense updated successfully",
                data = new ExpenseDto
                {
                    Id = updated.Id,
                    Category = updated.Category,
                    Amount = updated.Amount,
                    Description = updated.Description,
                    Date = updated.Date,
                    CustomerId = updated.CustomerId,
                    CustomerName = updated.Customer?.Name
                }
            };
        }

        public async Task<object> DeleteAsync(long id)
        {
            var deleted = await _expenseRepo.DeleteAsync(id);
            if (!deleted)
                return new { success = false, message = "Expense not found" };

            return new { success = true, message = "Expense deleted successfully" };
        }
    }
}
