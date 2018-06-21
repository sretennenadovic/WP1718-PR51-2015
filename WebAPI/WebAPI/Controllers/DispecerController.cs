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
    public class DispecerController : ApiController
    {

        public Korisnik Get(string KorisnickoIme)
        {
            Dispecer k = null;
            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];

            foreach (Dispecer item in dispeceri.list.Values)
            {
                if (KorisnickoIme.Equals(item.KorisnickoIme))
                {
                    k = item;
                    break;
                }
            }
            return k;
        }

        //pri update (izmeni) dispecera
        public bool Put(int Id,[FromBody]Korisnik korisnik)
        {
            Korisnici korisnici = (Korisnici)HttpContext.Current.Application["korisnici"];
            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];

            int idKorisnika = Id;
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

                Dispecer izmenjen = new Dispecer(idKorisnika, korisnik.KorisnickoIme, korisnik.Lozinka, korisnik.Ime, korisnik.Prezime, pol, korisnik.JMBG, korisnik.KontaktTelefon, korisnik.Email, uloga, korisnik.Voznje);

            //provera postojanja usernamea u korisnicima
            foreach (Korisnik item in korisnici.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            //provera postojanja usernamea u dispecerima
            foreach (Dispecer item in dispeceri.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme) && item.Id != korisnik.Id)
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

            if (!nadjen)
                {
                    bool prviPut = true;
                    dispeceri.list[idKorisnika] = izmenjen;

                    string path = HostingEnvironment.MapPath("~/App_Data/Dispeceri.txt");
                    StringBuilder sb = new StringBuilder();

                    foreach (Dispecer item in dispeceri.list.Values)
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

                    dispeceri = new Dispeceri("~/App_Data/Dispeceri.txt");
                    HttpContext.Current.Application["dispeceri"] = dispeceri;

                    return true;
                }

                return false;
        }
    }
}
