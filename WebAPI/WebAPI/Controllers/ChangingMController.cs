using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using WebAPI.Models;
using static WebAPI.Models.Enumi;

namespace WebAPI.Controllers
{
    public class ChangingMController : ApiController
    {
        public bool Post([FromBody]Korisnik korisnik)
        {
            Korisnici korisnici = (Korisnici)HttpContext.Current.Application["korisnici"];

            int idKorisnika = korisnik.Id;
            string pol;
            string uloga;
            bool nadjen = false;

            if(korisnik.Pol == Pol.Muski)
            {
                pol = "Muski";
            }
            else
            {
                pol = "Zenski";
            }

            if(korisnik.Uloga == Uloga.Dispecer)
            {
                uloga = "Dispecer";
            }
            else if(korisnik.Uloga == Uloga.Musterija)
            {
                uloga = "Musterija";
            }
            else
            {
                uloga = "Vozac";
            }

            Korisnik izmenjen = new Korisnik(idKorisnika, korisnik.KorisnickoIme, korisnik.Lozinka, korisnik.Ime, korisnik.Prezime, pol, korisnik.JMBG, korisnik.KontaktTelefon, korisnik.Email, uloga, korisnik.Voznje);

            foreach (Korisnik item in korisnici.list.Values)
            {
                if(idKorisnika == item.Id)
                {
                    nadjen = true;
                    break;
                }
            }

            if (nadjen)
            {
                bool prviPut = true;
                korisnici.list[idKorisnika] = izmenjen;

                string path = @"C:\Users\PC\Desktop\WEBproject\WP1718-PR51-2015\WebAPI\WebAPI\App_Data\Korisnici.txt";
                StringBuilder sb = new StringBuilder();

                foreach (Korisnik item in korisnici.list.Values)
                {
                    if (prviPut)
                    {
                        sb.Append(item.Id + ";" + item.KorisnickoIme + ";" + item.Lozinka + ";" + item.Ime + ";" + item.Prezime + ";" + item.Pol + ";" + item.JMBG + ";" + item.KontaktTelefon + ";" + item.Email + ";" + item.Uloga + ";" + item.Voznje + "\n");
                        File.WriteAllText(path, sb.ToString());
                        prviPut = false;
                        sb.Length = 0;
                    }
                    else
                    {
                        sb.Append(item.Id + ";" + item.KorisnickoIme + ";" + item.Lozinka + ";" + item.Ime + ";" + item.Prezime + ";" + item.Pol + ";" + item.JMBG + ";" + item.KontaktTelefon + ";" + item.Email + ";" + item.Uloga + ";" + item.Voznje + "\n");
                        File.AppendAllText(path, sb.ToString());
                        sb.Length = 0;
                    }
                }

                korisnici = new Korisnici("~/App_Data/Korisnici.txt");
                HttpContext.Current.Application["korisnici"] = korisnici;

                return true;
            }

            return false;
        }
    }
}
