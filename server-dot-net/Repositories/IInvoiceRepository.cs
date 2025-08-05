using System.Collections.Generic;
using System.Threading.Tasks;
using server_dot_net.Model;
namespace server_dot_net.Repositories
{
    public interface IInvoiceRepository
    {
        Task<Invoice> CreateAsync(Invoice invoice);
        Task<List<Invoice>> GetByMerchantIdAsync(long merchantId);
        Task<List<Invoice>> GetByCustomerIdAsync(long customerId);
        Task<Invoice> UpdateStatusAsync(long id, string status);
    }
}
