using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Vozac : Korisnik
    {
        public Vozac()
        {

        }

        public Vozac(int Id, string KorisnickoIme, string Lozinka, string Ime, string Prezime, string Pol, string JMBG, string KontaktTelefon, string Email, string Uloga, string Voznje,string lokacijaX,string lokacijaY,string UlicaBroj,string NaseljenoMesto,string PozivniBroj, string idVozaca,string GodisteAutomobila, string BrojRegistarskeOznake, string BrojTaksiVozila,string TipAutomobila,string Zauzet) : base(Id, KorisnickoIme, Lozinka, Ime, Prezime, Pol, JMBG, KontaktTelefon, Email, Uloga, Voznje)
        {
            Lokacija = new Lokacija(lokacijaX,lokacijaY,UlicaBroj,NaseljenoMesto,PozivniBroj);
            Automobil = new Automobil(Id,GodisteAutomobila,BrojRegistarskeOznake,BrojTaksiVozila,TipAutomobila);
            this.Zauzet = Zauzet;
        }
        public Lokacija Lokacija { get; set; }
        public Automobil Automobil { get; set; }
        public string Zauzet { get; set; }
    }
}