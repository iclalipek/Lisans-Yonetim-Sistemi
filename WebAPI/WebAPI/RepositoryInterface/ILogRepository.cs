using Domain;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.RepositoryInterface;
using Abstractions.DTOS;

namespace WebAPI.RepositoryInterface
{
    public interface ILogRepository
    {
        Task AddLogAsync(Log log);
    }
}
