using server_dot_net.DTOs;
using server_dot_net.Model;
using server_dot_net.Repositories;

namespace server_dot_net.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repo;

        public CustomerService(ICustomerRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CustomerResponseDto>> GetAllAsync()
        {
            var customers = await _repo.GetAllAsync();
            return customers.Select(c => MapToResponseDto(c)).ToList();
        }

        public async Task<CustomerResponseDto?> GetByIdAsync(long id)
        {
            var customer = await _repo.GetByIdAsync(id);
            return customer == null ? null : MapToResponseDto(customer);
        }

        public async Task<CustomerResponseDto> CreateAsync(CustomerRequestDto dto)
        {
            var customer = new Customer
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                Balance = dto.Balance,
                MonthlySalary = dto.MonthlySalary,
                MonthlyBudget = dto.MonthlyBudget
            };

            var created = await _repo.CreateAsync(customer);
            return MapToResponseDto(created);
        }

        public async Task<CustomerResponseDto?> UpdateAsync(long id, CustomerRequestDto dto)
        {
            var customer = new Customer
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                Balance = dto.Balance,
                MonthlySalary = dto.MonthlySalary,
                MonthlyBudget = dto.MonthlyBudget
            };

            var updated = await _repo.UpdateAsync(id, customer);
            return updated == null ? null : MapToResponseDto(updated);
        }

        public async Task<bool> DeleteAsync(long id)
        {
            return await _repo.DeleteAsync(id);
        }

        private CustomerResponseDto MapToResponseDto(Customer c) => new CustomerResponseDto
        {
            Id = c.Id,
            Name = c.Name,
            Email = c.Email,
            Balance = c.Balance,
            MonthlySalary = c.MonthlySalary,
            MonthlyBudget = c.MonthlyBudget
        };
    }
}
