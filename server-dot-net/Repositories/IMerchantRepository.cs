using server_dot_net.Model;

namespace server_dot_net.Repositories
{
    public interface IMerchantRepository
    {
        Task<IEnumerable<Merchant>> GetAllAsync();
        Task<Merchant> GetByIdAsync(long id);
        Task<Merchant> AddAsync(Merchant merchant);
        Task<Merchant> UpdateAsync(Merchant merchant);
        Task<bool> DeleteAsync(long id);
    }

}
