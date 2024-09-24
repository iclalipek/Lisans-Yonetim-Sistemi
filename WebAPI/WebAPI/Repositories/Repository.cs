using Abstractions.DTOS;
using AutoMapper;
using Domain;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using WebAPI.RepositoryInterface;
using WebAPI.Repositories;


namespace WebAPI.Repositories
{
    public class Repository : IRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogRepository _logRepository;

        public Repository(ApplicationDbContext context, IMapper mapper, ILogRepository logRepository) { _context = context; _mapper = mapper; _logRepository = logRepository; }


        public async Task<List<LisansDTO>> GetAllAsync()
        {
            var lisanslar = await _context.Lisanslar.Where(l => l.Aktif).ToListAsync(); 
            return _mapper.Map<List<LisansDTO>>(lisanslar);
        }

        public async Task<LisansDTO> GetByIdAsync(int id) 
        {
            var lisans = await _context.Lisanslar.FindAsync(id);
            return _mapper.Map<LisansDTO>(lisans);
        }


        public async Task AddAsync(LisansCreateDTO lisansDto)
        {
            var lisansEntity = _mapper.Map<Lisans>(lisansDto);
            await _context.Lisanslar.AddAsync(lisansEntity);
            await _context.SaveChangesAsync();

            var log = new Log
            {
                Islem = $"Id numarası '{lisansEntity.Id}' olan lisans eklendi.",
                Tarih = DateTime.Now,
                Kullanici = "admin"
            };
            await _logRepository.AddLogAsync(log);
        }

        public async Task UpdateAsync(int id, LisansUpdateDTO lisansDto) 
        {
            var lisansEntity = await _context.Lisanslar.FirstOrDefaultAsync(x => x.Id == id);
            if (lisansEntity == null)
            {
                throw new KeyNotFoundException("Lisans Bulunamadı.");
            }
            _mapper.Map(lisansDto, lisansEntity);  
            _context.Lisanslar.Update(lisansEntity);
            await _context.SaveChangesAsync();
            var log = new Log
            {
                Islem = $"Id numarası '{id}' olan lisans güncellendi.",
                Tarih = DateTime.Now,
                Kullanici = "admin"
            };
            await _logRepository.AddLogAsync(log);
        }

        public async Task DeleteAsync(int id)
        {
            var lisans = await _context.Lisanslar.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (lisans != null)
            {
                // Aktiflik durumunu değiştir
                lisans.Aktif = false;
                await _context.SaveChangesAsync();
                // Log kaydı
                var log = new Log
                {
                    Islem = $"Id numarası '{id}' olan lisans 'silindi'.",
                    Tarih = DateTime.Now,
                    Kullanici = "admin"
                };
                await _logRepository.AddLogAsync(log);
            }

        }
        public async Task AddLogAsync(Log log)
        {
            await _context.Logs.AddAsync(log);
            await _context.SaveChangesAsync();
        }

    }
}
