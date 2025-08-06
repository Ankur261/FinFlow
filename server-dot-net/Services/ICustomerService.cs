using server_dot_net.DTOs;

namespace server_dot_net.Services
{
    public interface ICustomerService
    {
        Task<List<CustomerResponseDto>> GetAllAsync();
        Task<CustomerResponseDto?> GetByIdAsync(long id);
        Task<CustomerResponseDto> CreateAsync(CustomerRequestDto dto);
        Task<CustomerResponseDto?> UpdateAsync(long id, CustomerRequestDto dto);
        Task<bool> DeleteAsync(long id);
    }
}
