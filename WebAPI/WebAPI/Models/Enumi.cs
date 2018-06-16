using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Enumi
    {
        public enum Uloga { Musterija, Dispecer, Vozac };
        public enum Pol { Muski, Zenski };
        public enum Automobil { Putnicki, Kombi };
        public enum StatusVoznje { Kreirana,Formirana,Obradjena,Prihvacena,Otkazana,Neuspesna,Uspesna, Utoku };
    }
}