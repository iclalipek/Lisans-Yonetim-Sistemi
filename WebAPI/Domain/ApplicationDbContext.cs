using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ApplicationDbContext : DbContext 
    {
       public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
       {
            
       }
    public DbSet<Lisans> Lisanslar { get; set; }  //DbSet<T> entity ile veritabanı arası bağlantıyı sağlar.
    public DbSet<Log> Logs { get; set; }
    }
}
