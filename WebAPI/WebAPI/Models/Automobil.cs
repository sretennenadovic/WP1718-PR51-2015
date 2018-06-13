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
        public Vozac Vozac { get; set; }
        public string GodisteAutomobila { get; set; }
        public string BrojRegistarskeOznake { get; set; }
        public string BrojTaksiVozila { get; set; }
        public Enumi.Automobil TipAutomobila { get; set; }
    }
}