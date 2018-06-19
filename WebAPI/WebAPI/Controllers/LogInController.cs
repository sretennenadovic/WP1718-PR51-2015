using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class LogInController : ApiController
    {
        //odmah na pocetku zovem ovaj get da dobijem info ko je trenutno ulogovan (tip korisnika me interesuje)

            [HttpGet]
        public Korisnik Get(string KorisnickoIme)
        {
            Korisnik ret = null;
            Korisnici korisnici = (Korisnici)HttpContext.Current.Application["korisnici"];
            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];

            foreach (Korisnik item in korisnici.list.Values)
            {
                if (item.KorisnickoIme.Equals(KorisnickoIme))
                {
                    ret = item;
                    break;
                }
            }

            foreach (Korisnik item in dispeceri.list.Values)
            {

                if (item.KorisnickoIme.Equals(KorisnickoIme))
                {
                    ret = item;
                    break;
                }
            }

            foreach (Korisnik item in vozaci.list.Values)
            {

                if (item.KorisnickoIme.Equals(KorisnickoIme))
                {
                    ret = item;
                    break;
                }
            }

            return ret;

        }

        public bool Post([FromBody]Korisnik korisnik)
        {
            bool logovan = false;
            Korisnici korisnici = (Korisnici)HttpContext.Current.Application["korisnici"];
            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];

            foreach (Korisnik item in korisnici.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme) && item.Lozinka.Equals(korisnik.Lozinka))
                {
                    logovan = true;
                    break;
                }
            }

            if (logovan)
            {
                return true;
            }
            else
            {

                foreach (Dispecer item in dispeceri.list.Values)
                {
                    if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme) && item.Lozinka.Equals(korisnik.Lozinka))
                    {
                        logovan = true;
                        break;
                    }
                }

                if (logovan)
                {
                    return true;
                }
                else
                {
                    foreach (Vozac item in vozaci.list.Values)
                    {
                        if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme) && item.Lozinka.Equals(korisnik.Lozinka))
                        {
                            logovan = true;
                            break;
                        }
                    }
                    if (logovan)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }
    }
}
