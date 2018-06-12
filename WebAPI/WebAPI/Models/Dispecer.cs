using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Dispecer : Korisnik
    {
        public Dispecer()
        {

        }

        public Dispecer(int Id, string KorisnickoIme, string Lozinka, string Ime, string Prezime, string Pol, string JMBG, string KontaktTelefon, string Email, string Uloga, string Voznje) : base(Id,KorisnickoIme,Lozinka,Ime,Prezime,Pol,JMBG,KontaktTelefon,Email,Uloga,Voznje)
        {
            
        }
    }
}