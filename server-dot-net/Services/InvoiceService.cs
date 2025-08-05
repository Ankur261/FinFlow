using server_dot_net.DTOs;
using server_dot_net.Model;
using server_dot_net.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace server_dot_net.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _repo;

        public InvoiceService(IInvoiceRepository repo)
        {
            _repo = repo;
        }

        public async Task<InvoiceResponseDto> CreateAsync(InvoiceRequestDto dto)
        {
            var invoice = new Invoice
            {
                InvoiceNumber = dto.InvoiceNumber,
                Amount = dto.Amount,
                DueDate = dto.DueDate,
                Status = dto.Status,
                MerchantId = dto.MerchantId,
                CustomerId = dto.CustomerId
            };

            var created = await _repo.CreateAsync(invoice);

            return MapToDto(created);
        }

        public async Task<List<InvoiceResponseDto>> GetByMerchantIdAsync(long merchantId)
        {
            var invoices = await _repo.GetByMerchantIdAsync(merchantId);
            return invoices.Select(MapToDto).ToList();
        }

        public async Task<List<InvoiceResponseDto>> GetByCustomerIdAsync(long customerId)
        {
            var invoices = await _repo.GetByCustomerIdAsync(customerId);
            return invoices.Select(MapToDto).ToList();
        }

        public async Task<InvoiceResponseDto> UpdateStatusAsync(long id, string status)
        {
            var updated = await _repo.UpdateStatusAsync(id, status);
            return updated != null ? MapToDto(updated) : null;
        }

        private InvoiceResponseDto MapToDto(Invoice invoice)
        {
            return new InvoiceResponseDto
            {
                Id = invoice.Id,
                InvoiceNumber = invoice.InvoiceNumber,
                Amount = invoice.Amount,
                DueDate = invoice.DueDate,
                IssueDate = invoice.IssueDate,
                Status = invoice.Status,
                MerchantId = invoice.MerchantId,
                CustomerId = invoice.CustomerId
            };
        }
    }
}
