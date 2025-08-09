using Microsoft.EntityFrameworkCore;
using server_dot_net.Data;
using server_dot_net.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server_dot_net.Repositories
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly ApplicationDbContext _context;


        public InvoiceRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Invoice>> GetAllAsync()
        {
            return await _context.Invoices.ToListAsync();
        }

        public async Task<Invoice> CreateAsync(Invoice invoice)
        {
            invoice.IssueDate = DateTime.Now;
            await _context.Invoices.AddAsync(invoice);
            await _context.SaveChangesAsync();
            return invoice;
        }

        public async Task<List<Invoice>> GetByMerchantIdAsync(long merchantId)
        {
            return await _context.Invoices
                .Where(i => i.MerchantId == merchantId)
                .ToListAsync();
        }

        public async Task<List<Invoice>> GetByCustomerIdAsync(long customerId)
        {
            return await _context.Invoices
                .Where(i => i.CustomerId == customerId)
                .ToListAsync();
        }

        public async Task<Invoice> UpdateStatusAsync(long id, string status)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null) return null;

            invoice.Status = status;
            await _context.SaveChangesAsync();
            return invoice;
        }

    }
}
