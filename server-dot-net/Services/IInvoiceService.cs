using System.Collections.Generic;
using System.Threading.Tasks;
using server_dot_net.DTOs;
namespace server_dot_net.Services
{
    public interface IInvoiceService
    {
        Task<InvoiceResponseDto> CreateAsync(InvoiceRequestDto dto);
        Task<List<InvoiceResponseDto>> GetByMerchantIdAsync(long merchantId);
        Task<List<InvoiceResponseDto>> GetByCustomerIdAsync(long customerId);
        Task<InvoiceResponseDto> UpdateStatusAsync(long id, string status);
    }
}

