using server_dot_net.DTOs;
using server_dot_net.Model;
using server_dot_net.Repositories;

namespace server_dot_net.Services
{
    public class MerchantService : IMerchantService
    {
        private readonly IMerchantRepository _repository;

        public MerchantService(IMerchantRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MerchantResponseDto>> GetAllAsync()
        {
            var merchants = await _repository.GetAllAsync();
            return merchants.Select(MapToDto);
        }

        public async Task<MerchantResponseDto> GetByIdAsync(long id)
        {
            var merchant = await _repository.GetByIdAsync(id);
            return merchant == null ? null : MapToDto(merchant);
        }

        public async Task<MerchantResponseDto> CreateAsync(MerchantRequestDto dto)
        {
            var merchant = new Merchant
            {
                BusinessName = dto.BusinessName,
                Email = dto.Email,
                Phone = dto.Phone,
                Password = dto.Password, // consider hashing in real case
                BusinessType = dto.BusinessType,
                Status = "Active"
            };

            var created = await _repository.AddAsync(merchant);
            return MapToDto(created);
        }

        public async Task<MerchantResponseDto> UpdateAsync(long id, MerchantRequestDto dto)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return null;

            existing.BusinessName = dto.BusinessName;
            existing.Email = dto.Email;
            existing.Phone = dto.Phone;
            existing.Password = dto.Password;
            existing.BusinessType = dto.BusinessType;

            var updated = await _repository.UpdateAsync(existing);
            return MapToDto(updated);
        }

        public async Task<bool> DeleteAsync(long id)
        {
            return await _repository.DeleteAsync(id);
        }

        private MerchantResponseDto MapToDto(Merchant merchant)
        {
            return new MerchantResponseDto
            {
                Id = merchant.Id,
                BusinessName = merchant.BusinessName,
                Email = merchant.Email,
                Phone = merchant.Phone,
                BusinessType = merchant.BusinessType,
                Status = merchant.Status
            };
        }
    }

}
