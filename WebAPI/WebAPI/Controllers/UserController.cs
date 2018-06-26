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
    public class UserController : ApiController
    {
        public Korisnik Post([FromBody]Korisnik korisnik)
        {
            Korisnik k = null;

            foreach (Korisnik item in Korisnici.list.Values)
            {
                if (korisnik.KorisnickoIme.Equals(item.KorisnickoIme))
                {
                    k = item;
                }
            }

            foreach (Dispecer item in Dispeceri.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    k = item;
                }
            }
            return k;
        }
    }
}
