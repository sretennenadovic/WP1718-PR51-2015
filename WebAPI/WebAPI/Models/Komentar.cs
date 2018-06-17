using System;

namespace WebAPI.Models
{
    public class Komentar
    {
        public Komentar()
        {

        }
        public Komentar(string Opis,string DatumObjave, string KorisnickoIme, string IdVoznje, string Ocena)
        {
            this.Opis = Opis;
            this.DatumObjave = DatumObjave;
            this.KorisnickoIme = KorisnickoIme;
            this.IdVoznje = IdVoznje;
            this.Ocena = Ocena;
        }
        public string Opis { get; set; }
        public string DatumObjave { get; set; }
        public string KorisnickoIme { get; set; }
        public string IdVoznje { get; set; }
        public string Ocena { get; set; } 
    }
}