using Abstractions.DTOS;
using Domain;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace WebAPI.RepositoryInterface
{
    public interface IRepository
    {
        Task<List<LisansDTO>> GetAllAsync();
        Task<LisansDTO> GetByIdAsync(int id);
        Task AddAsync(LisansCreateDTO lisansDto);
        Task UpdateAsync(int id, LisansUpdateDTO lisansDto);
        Task DeleteAsync(int id);
    }
}
