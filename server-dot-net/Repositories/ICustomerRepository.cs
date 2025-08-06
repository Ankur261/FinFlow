using server_dot_net.Model;

namespace server_dot_net.Repositories
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> GetAllAsync();
        Task<Customer?> GetByIdAsync(long id);
        Task<Customer> CreateAsync(Customer customer);
        Task<Customer?> UpdateAsync(long id, Customer customer);
        Task<bool> DeleteAsync(long id);
    }
}
