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
    public class RegistrationController : ApiController
    {
        public Korisnik Get(string KorisnickoIme)
        {
            Korisnik k = null;
            Korisnici korisnici = (Korisnici)HttpContext.Current.Application["korisnici"];

            foreach (Korisnik item in korisnici.list.Values)
            {
                if (KorisnickoIme.Equals(item.KorisnickoIme))
                {
                    k = item;
                    break;
                }
            }
            return k;
        }


        public bool Post([FromBody]Korisnik korisnik)
        {
            bool nasao = false;
            Korisnici korisnici = (Korisnici)HttpContext.Current.Application["korisnici"];
            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];

            //provera postojanja usernamea u korisnicima
            foreach (Korisnik item in korisnici.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nasao = true;
                    break;
                }
            }

            //provera postojanja usernamea u dispecerima
            foreach (Dispecer item in dispeceri.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nasao = true;
                    break;
                }
            }

            foreach (Vozac item in vozaci.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nasao = true;
                    break;
                }
            }

            if (!nasao)
            {
                korisnici.list.Add(korisnik.Id, korisnik);

                string path = HostingEnvironment.MapPath("~/App_Data/Korisnici.txt");
                
                StringBuilder sb = new StringBuilder();
                korisnik.Id = korisnici.list.Count;
                sb.Append(korisnik.Id + ";" + korisnik.KorisnickoIme + ";" + korisnik.Lozinka + ";" + korisnik.Ime + ";" + korisnik.Prezime + ";" + korisnik.Pol + ";" + korisnik.JMBG + ";" + korisnik.KontaktTelefon + ";" + korisnik.Email + ";" + korisnik.Uloga + ";" + korisnik.Voznje + "\n");

                if (!File.Exists(path))
                    File.WriteAllText(path, sb.ToString());
                else
                    File.AppendAllText(path, sb.ToString());

                korisnici = new Korisnici("~/App_Data/Korisnici.txt");
                HttpContext.Current.Application["korisnici"] = korisnici;

                return true;
            }
            else
            {
                return false;
            }

        }


        //prilikom izmene korisnika
        public bool Put(int Id, [FromBody]Korisnik korisnik)
        {
            Korisnici korisnici = (Korisnici)HttpContext.Current.Application["korisnici"];
            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];

            int idKorisnika = Id;
            string pol;
            string uloga;
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
            //provera postojanja usernamea u korisnicima
            foreach (Korisnik item in korisnici.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme) && item.Id != korisnik.Id)
                {
                    nadjen = true;
                    break;
                }
            }

            //provera postojanja usernamea u dispecerima
            foreach (Dispecer item in dispeceri.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            foreach (Vozac item in vozaci.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            Korisnik izmenjen = new Korisnik(idKorisnika, korisnik.KorisnickoIme, korisnik.Lozinka, korisnik.Ime, korisnik.Prezime, pol, korisnik.JMBG, korisnik.KontaktTelefon, korisnik.Email, uloga, korisnik.Voznje);



            //ako nisam pronasao nekog sa istim usernameom, a ako se username nije menjao i to sam pokrio znaci ostaje isti 
            if (!nadjen)
            {
                bool prviPut = true;
                korisnici.list[idKorisnika] = izmenjen;

                string path = HostingEnvironment.MapPath("~/App_Data/Korisnici.txt");

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
