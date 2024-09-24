using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Lisans
    {
        public int Id { get; set; }
        public string ProgramAdi { get; set; }
        public string SonKullanici { get; set; }
        public string Departman { get; set; }
        public string CihazReferans { get; set; }
        public string LisansAnahtari { get; set; }
        public string IletisimNo { get; set; }
        public DateTime SatinAlmaTarihi { get; set; }
        public string FirmaAdi { get; set; }
        public string LisansSuresi { get; set; }
        public bool Aktif { get; set; } = true;
        

    }
}
