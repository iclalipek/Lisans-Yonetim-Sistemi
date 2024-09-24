using Domain.Entities;
using Domain;
using Microsoft.EntityFrameworkCore;
using WebAPI.RepositoryInterface;
using WebAPI.Repositories;
using Abstractions.DTOS;
using AutoMapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;


namespace WebAPI.Repositories
{
    public class LogRepository : ILogRepository
    {
        private readonly ApplicationDbContext _context;

        public LogRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddLogAsync(Log log)
        {
            await _context.Logs.AddAsync(log);
            await _context.SaveChangesAsync();
        }
    }
}
