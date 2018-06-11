using System;

namespace WebAPI.Models
{
    public class Komentar
    {
        public string Opis { get; set; }
        public DateTime DatumObjave { get; set; }
        public Korisnik Korisnik { get; set; }
        public Voznja Voznja { get; set; }
        public int Ocena { get; set; } 
    }
}