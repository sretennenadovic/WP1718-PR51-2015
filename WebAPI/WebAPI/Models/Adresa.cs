using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Adresa
    {
        public Adresa()
        {

        }
        public Adresa(string UlicaBroj, string NaseljenoMesto, string PozivniBroj)
        {
            this.UlicaBroj = UlicaBroj;
            this.NaseljenoMesto = NaseljenoMesto;
            this.PozivniBroj = PozivniBroj;
        }
        public string UlicaBroj { get; set; }
        public string NaseljenoMesto { get; set; }
        public string PozivniBroj { get; set; }
    }
}