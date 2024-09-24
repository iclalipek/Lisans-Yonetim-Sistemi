using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Abstractions.DTOS;
using Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.RepositoryInterface;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;

namespace WebAPI.Controllers //Uygulamanın kullanıcı isteklerini işleyen ve uygun yanıtları döndüren denetleyici sınıflarını içerir.
{
    [Route("api/[controller]")]
    [ApiController]
    public class LisansController : ControllerBase
    {
        private readonly IRepository _lisansRepository;
        private readonly IMapper _mapper; 

        public LisansController(IRepository lisansRepository, IMapper mapper) 
        {
            _lisansRepository = lisansRepository;
            _mapper = mapper; 
        }

        // GET: api/Lisans  Getir
        [HttpGet]
        public async Task<ActionResult<List<LisansDTO>>> GetLisanslar()
        {
            var lisanslar = await _lisansRepository.GetAllAsync();
            return Ok(lisanslar);
        }


        // GET: api/Lisans/5  Birini getir 
        [HttpGet("{id}")]
        public async Task<ActionResult<LisansDTO>> GetLisans(int id)
        {
            var lisans = await _lisansRepository.GetByIdAsync(id);
            if (lisans == null)
            {
                return NotFound();
            }

            return Ok(lisans);
        }

        // POST: api/Lisans  oluştur
        [HttpPost]
        public async Task<ActionResult<LisansDTO>> PostLisans(LisansCreateDTO lisansCreateDto)
        {
            await _lisansRepository.AddAsync(lisansCreateDto);
            return Ok();
        }

        //PUT: api/Lisans/5  Güncelle
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLisans(int id, LisansUpdateDTO lisansDto)
        {
            try
            {
                await _lisansRepository.UpdateAsync(id, lisansDto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }

            return Ok();
        }

        // DELETE: api/Lisans/5  sil
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLisans(int id)
        {
            await _lisansRepository.DeleteAsync(id);  
            return Ok();
        }
    }
}
