using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static WebAPI.Models.Enumi;

namespace WebAPI.Models
{
    public class Voznja
    {
        public Voznja()
        {

        }
        public DateTime DatumVreme { get; set; }
        public Lokacija Lokacija { get; set; }
        public Automobil Automobil { get; set; }
        public Korisnik Musterija { get; set; }
        public Lokacija Odrediste { get; set; }
        public Dispecer Dispecer { get; set; }
        public Vozac Vozac { get; set; }
        public double Iznos { get; set; }
        public Komentar Komentar { get; set; }
        public StatusVoznje StatusVoznje { get; set; }
    }
}