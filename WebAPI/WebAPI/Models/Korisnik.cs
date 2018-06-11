using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static WebAPI.Models.Enumi;

namespace WebAPI.Models
{ 
    public class Korisnik
    {
        public Korisnik()
        {

        }
        public Korisnik(int Id,string KorisnickoIme,string Lozinka,string Ime,string Prezime,string Pol, string JMBG,string KontaktTelefon,string Email,string Uloga,string Voznje)
        {
            this.Id = Id;
            this.KorisnickoIme = KorisnickoIme;
            this.Lozinka = Lozinka;
            this.Ime = Ime;
            this.Prezime = Prezime;
            if (Pol.Equals("Muski"))
            {
                this.Pol = Enumi.Pol.Musko;
            }
            else
            {
                this.Pol = Enumi.Pol.Zensko;
            }
            this.JMBG = JMBG;
            this.KontaktTelefon = KontaktTelefon;
            this.Email = Email;
            if (Uloga.Equals("Musterija"))
            {
                this.Uloga = Enumi.Uloga.Musterija;
            }else if (Uloga.Equals("Vozac"))
            {
                this.Uloga = Enumi.Uloga.Vozac;
            }
            else
            {
                this.Uloga = Enumi.Uloga.Dispecer;
            }
            this.Voznje = Voznje;            
        }
        public int Id { get; set; }
        public string KorisnickoIme { get; set; }
        public string Lozinka { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public Pol Pol { get; set; }
        public string JMBG { get; set; }
        public string KontaktTelefon { get; set; }
        public string Email { get; set; }
        public Uloga  Uloga { get; set; }
        public string Voznje { get; set; }
    }
}