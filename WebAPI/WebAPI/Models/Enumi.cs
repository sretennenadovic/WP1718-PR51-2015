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
        public enum Automobil { Putnicki, Kombi, Svejedno };
        public enum StatusVoznje { Kreirana=0,Formirana,Obradjena,Prihvacena,Otkazana=4,Neuspesna,Uspesna, Utoku };
    }
}