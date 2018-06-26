using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using WebAPI.Models;
using static WebAPI.Models.Enumi;

namespace WebAPI.Controllers
{
    public class VozacController : ApiController
    {
        public List<Vozac> Get()
        {
            List<Vozac> ret = new List<Vozac>();

            foreach (Vozac item in Vozaci.list.Values)
            {
                ret.Add(item);
            }

            return ret;
        }

        [HttpGet]
        public Vozac Get (string KorisnickoIme)
        {
            Vozac v = null;

            foreach (Vozac item in Vozaci.list.Values)
            {
                if (item.KorisnickoIme.Equals(KorisnickoIme))
                {
                    v = item;
                    break;
                }
            }

            return v;
        }
        public bool Post([FromBody]Vozac vozac)
        {

            bool nadjen = false;

            //provera postojanja usernamea u korisnicima
            foreach (Korisnik item in Korisnici.list.Values)
            {
                if (item.KorisnickoIme.Equals(vozac.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            //provera postojanja usernamea u dispecerima
            foreach (Dispecer item in Dispeceri.list.Values)
            {
                if (item.KorisnickoIme.Equals(vozac.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            foreach (Vozac item in Vozaci.list.Values)
            {
                if (item.KorisnickoIme.Equals(vozac.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            if (!nadjen)
            {
                Vozaci.list.Add(vozac.Id, vozac);
                string path = HostingEnvironment.MapPath("~/App_Data/Vozaci.txt");
                StringBuilder sb = new StringBuilder();
                vozac.Id = Vozaci.list.Count;
                sb.Append(vozac.Id + ";" + vozac.KorisnickoIme + ";" + vozac.Lozinka + ";" + vozac.Ime + ";" + vozac.Prezime + ";" + vozac.Pol + ";" + vozac.JMBG + ";" + vozac.KontaktTelefon + ";" + vozac.Email + ";" + vozac.Uloga + ";" + vozac.Voznje + ";"+ vozac.Lokacija.X+";"+ vozac.Lokacija.Y+";"+ vozac.Lokacija.Adresa.UlicaBroj + ";" + vozac.Lokacija.Adresa.NaseljenoMesto + ";" + vozac.Lokacija.Adresa.PozivniBroj + ";" + vozac.Id + ";" + vozac.Automobil.GodisteAutomobila + ";" + vozac.Automobil.BrojRegistarskeOznake + ";" + vozac.Automobil.BrojTaksiVozila + ";" + vozac.Automobil.TipAutomobila+";"+"NE"+";"+"NE"+"\n");

                if (!File.Exists(path))
                    File.WriteAllText(path, sb.ToString());
                else
                    File.AppendAllText(path, sb.ToString());


                return true;
            }
            return false;

        }

        //pri update (izmeni) vozaca
        public bool Put(int Id, [FromBody]Vozac korisnik)
        {

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


            //provera postojanja usernamea u korisnicima
            foreach (Korisnik item in Korisnici.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            //provera postojanja usernamea u dispecerima
            foreach (Dispecer item in Dispeceri.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            foreach (Vozac item in Vozaci.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme) && item.Id != korisnik.Id)
                {
                    nadjen = true;
                    break;
                }
            }


            Vozac izmenjen = new Vozac(idKorisnika, korisnik.KorisnickoIme, korisnik.Lozinka, korisnik.Ime, korisnik.Prezime, pol, korisnik.JMBG, korisnik.KontaktTelefon, korisnik.Email, uloga, korisnik.Voznje,korisnik.Lokacija.X,korisnik.Lokacija.Y,korisnik.Lokacija.Adresa.UlicaBroj,korisnik.Lokacija.Adresa.NaseljenoMesto,korisnik.Lokacija.Adresa.PozivniBroj,korisnik.Automobil.IdVozaca.ToString(),korisnik.Automobil.GodisteAutomobila,korisnik.Automobil.BrojRegistarskeOznake,korisnik.Automobil.BrojTaksiVozila,tipAutomobila,korisnik.Zauzet,korisnik.Banovan);


            if (!nadjen)
            {
                bool prviPut = true;
                Vozaci.list[idKorisnika] = izmenjen;

                string path = HostingEnvironment.MapPath("~/App_Data/Vozaci.txt");
                StringBuilder sb = new StringBuilder();

                foreach (Vozac item in Vozaci.list.Values)
                {
                    if (prviPut)
                    {
                        sb.Append(item.Id + ";" + item.KorisnickoIme + ";" + item.Lozinka + ";" + item.Ime + ";" + item.Prezime + ";" + item.Pol + ";" + item.JMBG + ";" + item.KontaktTelefon + ";" + item.Email + ";" + item.Uloga + ";" + item.Voznje + ";"+item.Lokacija.X+";"+item.Lokacija.Y+";"+item.Lokacija.Adresa.UlicaBroj+";"+item.Lokacija.Adresa.NaseljenoMesto+";"+item.Lokacija.Adresa.PozivniBroj+";"+item.Automobil.IdVozaca+";"+item.Automobil.GodisteAutomobila+";"+item.Automobil.BrojRegistarskeOznake+";"+item.Automobil.BrojTaksiVozila+";"+item.Automobil.TipAutomobila+";"+item.Zauzet + ";" + item.Banovan + "\n");
                        File.WriteAllText(path, sb.ToString());
                        prviPut = false;
                        sb.Length = 0;
                    }
                    else
                    {
                        sb.Append(item.Id + ";" + item.KorisnickoIme + ";" + item.Lozinka + ";" + item.Ime + ";" + item.Prezime + ";" + item.Pol + ";" + item.JMBG + ";" + item.KontaktTelefon + ";" + item.Email + ";" + item.Uloga + ";" + item.Voznje + ";" + item.Lokacija.X + ";" + item.Lokacija.Y + ";" + item.Lokacija.Adresa.UlicaBroj + ";" + item.Lokacija.Adresa.NaseljenoMesto + ";" + item.Lokacija.Adresa.PozivniBroj + ";" + item.Automobil.IdVozaca + ";" + item.Automobil.GodisteAutomobila + ";" + item.Automobil.BrojRegistarskeOznake + ";" + item.Automobil.BrojTaksiVozila + ";" + item.Automobil.TipAutomobila + ";" + item.Zauzet + ";" + item.Banovan + "\n");
                        File.AppendAllText(path, sb.ToString());
                        sb.Length = 0;
                    }
                }

                return true;
            }

            return false;
        }
    }
}
