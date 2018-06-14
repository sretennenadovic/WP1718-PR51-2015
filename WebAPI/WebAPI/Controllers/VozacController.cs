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
    public class VozacController : ApiController
    {
        public bool Put(int Id, [FromBody]Vozac korisnik)
        {
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];

            int idKorisnika = Id;
            string pol;
            string uloga;
            string tipAutomobila;
            bool nadjen = false;

            if (korisnik.Pol == Pol.Muski)
            {
                pol = "Muski";
            }
            else
            {
                pol = "Zenski";
            }

            if (korisnik.Uloga == Uloga.Dispecer)
            {
                uloga = "Dispecer";
            }
            else if (korisnik.Uloga == Uloga.Musterija)
            {
                uloga = "Musterija";
            }
            else
            {
                uloga = "Vozac";
            }

            if(korisnik.Automobil.TipAutomobila == Enumi.Automobil.Putnicki)
            {
                tipAutomobila = "Putnicki";
            }
            else
            {
                tipAutomobila = "Kombi";
            }

            Vozac izmenjen = new Vozac(idKorisnika, korisnik.KorisnickoIme, korisnik.Lozinka, korisnik.Ime, korisnik.Prezime, pol, korisnik.JMBG, korisnik.KontaktTelefon, korisnik.Email, uloga, korisnik.Voznje,korisnik.Lokacija.X,korisnik.Lokacija.Y,korisnik.Lokacija.Adresa.UlicaBroj,korisnik.Lokacija.Adresa.NaseljenoMesto,korisnik.Lokacija.Adresa.PozivniBroj,korisnik.Automobil.IdVozaca.ToString(),korisnik.Automobil.GodisteAutomobila,korisnik.Automobil.BrojRegistarskeOznake,korisnik.Automobil.BrojTaksiVozila,tipAutomobila);

            foreach (Vozac item in vozaci.list.Values)
            {
                if (idKorisnika == item.Id)
                {
                    nadjen = true;
                    break;
                }
            }

            if (nadjen)
            {
                bool prviPut = true;
                vozaci.list[idKorisnika] = izmenjen;

                string path = @"C:\Users\PC\Desktop\WEBproject\WP1718-PR51-2015\WebAPI\WebAPI\App_Data\Vozaci.txt";
                StringBuilder sb = new StringBuilder();

                foreach (Vozac item in vozaci.list.Values)
                {
                    if (prviPut)
                    {
                        sb.Append(item.Id + ";" + item.KorisnickoIme + ";" + item.Lozinka + ";" + item.Ime + ";" + item.Prezime + ";" + item.Pol + ";" + item.JMBG + ";" + item.KontaktTelefon + ";" + item.Email + ";" + item.Uloga + ";" + item.Voznje + ";"+item.Lokacija.X+";"+item.Lokacija.Y+";"+item.Lokacija.Adresa.UlicaBroj+";"+item.Lokacija.Adresa.NaseljenoMesto+";"+item.Lokacija.Adresa.PozivniBroj+";"+item.Automobil.IdVozaca+";"+item.Automobil.GodisteAutomobila+";"+item.Automobil.BrojRegistarskeOznake+";"+item.Automobil.BrojTaksiVozila+";"+item.Automobil.TipAutomobila+"\n");
                        File.WriteAllText(path, sb.ToString());
                        prviPut = false;
                        sb.Length = 0;
                    }
                    else
                    {
                        sb.Append(item.Id + ";" + item.KorisnickoIme + ";" + item.Lozinka + ";" + item.Ime + ";" + item.Prezime + ";" + item.Pol + ";" + item.JMBG + ";" + item.KontaktTelefon + ";" + item.Email + ";" + item.Uloga + ";" + item.Voznje + ";" + item.Lokacija.X + ";" + item.Lokacija.Y + ";" + item.Lokacija.Adresa.UlicaBroj + ";" + item.Lokacija.Adresa.NaseljenoMesto + ";" + item.Lokacija.Adresa.PozivniBroj + ";" + item.Automobil.IdVozaca + ";" + item.Automobil.GodisteAutomobila + ";" + item.Automobil.BrojRegistarskeOznake + ";" + item.Automobil.BrojTaksiVozila + ";" + item.Automobil.TipAutomobila + "\n");
                        File.AppendAllText(path, sb.ToString());
                        sb.Length = 0;
                    }
                }

                vozaci = new Vozaci("~/App_Data/Vozaci.txt");
                HttpContext.Current.Application["vozaci"] = vozaci;

                return true;
            }

            return false;
        }
    }
}
