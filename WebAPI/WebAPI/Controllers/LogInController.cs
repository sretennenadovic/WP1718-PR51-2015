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
