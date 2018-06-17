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
        public Voznja(string Id,string DatumVreme,string X, string Y, string UlicaBroj, string NaseljenoMesto, string PozivniBroj, string TipAutomobila, string IdMusterije, string XOdrediste, string YOdrediste, string UlicaBrojOdrediste,string NaseljenoMestoOdrediste, string PozivniBrojOdrediste, string IdDispecera, string IdVozaca, string Iznos, string OpsiKomentara, string DatumKomentara, string KorisnickoImeOnogKoPraviKomentar, string IdVoznje, string Ocena, string StatusVoznje)
        {
            this.IdVoznje = Int32.Parse(Id);
            this.DatumVreme = DateTime.Parse(DatumVreme);
            Lokacija = new Lokacija(X, Y, UlicaBroj, NaseljenoMesto, PozivniBroj);
            if (TipAutomobila.Equals("Putnicki"))
            {
                Automobil = Enumi.Automobil.Putnicki;
            }else if (TipAutomobila.Equals("Kombi"))
            {
                Automobil = Enumi.Automobil.Kombi;
            }
            else
            {
                Automobil = Enumi.Automobil.Svejedno;
            }
            Musterija = Int32.Parse(IdMusterije);
            Odrediste = new Lokacija(XOdrediste, YOdrediste, UlicaBrojOdrediste, NaseljenoMestoOdrediste, PozivniBrojOdrediste);
            Dispecer = Int32.Parse(IdDispecera);
            Vozac = Int32.Parse(IdVozaca);
            this.Iznos = double.Parse(Iznos);
            Komentar = new Komentar(OpsiKomentara,DatumKomentara,KorisnickoImeOnogKoPraviKomentar,IdVoznje,Ocena);
            if (StatusVoznje.Equals("Kreirana"))
            {
                this.StatusVoznje = Enumi.StatusVoznje.Kreirana;
            }else if (StatusVoznje.Equals("Formirana"))
            {
                this.StatusVoznje = Enumi.StatusVoznje.Formirana;
            }else if (StatusVoznje.Equals("Obradjena"))
            {
                this.StatusVoznje = Enumi.StatusVoznje.Obradjena;
            }else if (StatusVoznje.Equals("Prihvacena"))
            {
                this.StatusVoznje = Enumi.StatusVoznje.Prihvacena;
            }else if (StatusVoznje.Equals("Otkazana"))
            {
                this.StatusVoznje = Enumi.StatusVoznje.Otkazana;
            }else if (StatusVoznje.Equals("Neuspesna"))
            {
                this.StatusVoznje = Enumi.StatusVoznje.Neuspesna;
            }else if (StatusVoznje.Equals("Uspesna"))
            {
                this.StatusVoznje = Enumi.StatusVoznje.Uspesna;
            }else if (StatusVoznje.Equals("Utoku"))
            {
                this.StatusVoznje = Enumi.StatusVoznje.Utoku;
            }

        }
        public int IdVoznje { get; set; }
        public DateTime DatumVreme { get; set; }
        public Lokacija Lokacija { get; set; }
        public Enumi.Automobil Automobil { get; set; }
        public int Musterija { get; set; }
        public Lokacija Odrediste { get; set; }
        public int Dispecer { get; set; }
        public int Vozac { get; set; }
        public double Iznos { get; set; }
        public Komentar Komentar { get; set; }
        public StatusVoznje StatusVoznje { get; set; }
    }
}