using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Automobil
    {
        public Automobil()
        {

        }
        public Automobil(int IdVozaca,string GodisteAutomobila,string BrojRegistarskeOznake,string BrojTaksiVozila,string TipAutomobila)
        {
            this.IdVozaca = IdVozaca;
            this.GodisteAutomobila = GodisteAutomobila;
            this.BrojRegistarskeOznake = BrojRegistarskeOznake;
            this.BrojTaksiVozila = BrojTaksiVozila;
            if (TipAutomobila.Equals("Putnicki"))
            {
                this.TipAutomobila = Enumi.Automobil.Putnicki;
            }
            else
            {
                this.TipAutomobila = Enumi.Automobil.Kombi;
            }
        }
        //public Vozac Vozac { get; set; }
        public int IdVozaca { get; set; }
        public string GodisteAutomobila { get; set; }
        public string BrojRegistarskeOznake { get; set; }
        public string BrojTaksiVozila { get; set; }
        public Enumi.Automobil TipAutomobila { get; set; }
    }
}