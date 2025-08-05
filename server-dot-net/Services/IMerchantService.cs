using server_dot_net.DTOs;

namespace server_dot_net.Services
{
    public interface IMerchantService
    {
        Task<IEnumerable<MerchantResponseDto>> GetAllAsync();
        Task<MerchantResponseDto> GetByIdAsync(long id);
        Task<MerchantResponseDto> CreateAsync(MerchantRequestDto dto);
        Task<MerchantResponseDto> UpdateAsync(long id, MerchantRequestDto dto);
        Task<bool> DeleteAsync(long id);
    }

}
