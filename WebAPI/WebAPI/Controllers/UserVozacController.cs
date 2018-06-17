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
    public class UserVozacController : ApiController
    {

            public Vozac Post([FromBody]Korisnik korisnik)
            {
                Vozac k = null;
                Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];

                foreach (Vozac item in vozaci.list.Values)
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
