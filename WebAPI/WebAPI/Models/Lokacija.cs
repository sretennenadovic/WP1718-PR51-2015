using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Lokacija
    {
        public Lokacija()
        {

        }
        public Lokacija(string X,string Y, string UlicaBroj, string NaseljenoMesto, string PozivniBroj)
        {
            this.X = X;
            this.Y = Y;
            this.Adresa = new Adresa(UlicaBroj,NaseljenoMesto,PozivniBroj);
        }
        public string X { get; set; }
        public string Y { get; set; }
        public Adresa Adresa { get; set; }
    }
}