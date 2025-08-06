using server_dot_net.DTOs;
using server_dot_net.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace server_dot_net.Services
{
    public interface IInvoiceService
    {


        Task<List<Invoice>> GetAllAsync();

        Task<InvoiceResponseDto> CreateAsync(InvoiceRequestDto dto);
        Task<List<InvoiceResponseDto>> GetByMerchantIdAsync(long merchantId);
        Task<List<InvoiceResponseDto>> GetByCustomerIdAsync(long customerId);
        Task<InvoiceResponseDto> UpdateStatusAsync(long id, string status);
    }
}

