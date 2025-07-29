using Microsoft.EntityFrameworkCore;
using server_dot_net.Data;
using server_dot_net.Model;

namespace server_dot_net.Repositories
{
    public class MerchantRepository : IMerchantRepository
    {
        private readonly ApplicationDbContext _context;

        public MerchantRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Merchant>> GetAllAsync()
        {
            return await _context.Merchants.ToListAsync();
        }

        public async Task<Merchant> GetByIdAsync(long id)
        {
            return await _context.Merchants.FindAsync(id);
        }

        public async Task<Merchant> AddAsync(Merchant merchant)
        {
            _context.Merchants.Add(merchant);
            await _context.SaveChangesAsync();
            return merchant;
        }

        public async Task<Merchant> UpdateAsync(Merchant merchant)
        {
            _context.Merchants.Update(merchant);
            await _context.SaveChangesAsync();
            return merchant;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var merchant = await _context.Merchants.FindAsync(id);
            if (merchant == null) return false;

            _context.Merchants.Remove(merchant);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
