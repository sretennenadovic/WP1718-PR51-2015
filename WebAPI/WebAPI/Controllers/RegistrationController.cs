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

namespace WebAPI.Controllers
{
    public class RegistrationController : ApiController
    {
        public bool Post([FromBody]Korisnik korisnik)
        {
            bool nasao = false;
            Korisnici korisnici = (Korisnici)HttpContext.Current.Application["korisnici"];

           foreach (Korisnik item in korisnici.list)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nasao = true;
                    break;
                }
            }

            if (!nasao)
            {
                korisnici.list.Add(korisnik);
                string path = @"C:\Users\PC\Desktop\WEBproject\WP1718-PR51-2015\WebAPI\WebAPI\App_Data\Korisnici.txt";
                StringBuilder sb = new StringBuilder();
                korisnik.Id = korisnici.list.Count;
                sb.Append(korisnik.Id + ";"+korisnik.KorisnickoIme+";"+korisnik.Lozinka+";" + korisnik.Ime + ";" + korisnik.Prezime + ";" + korisnik.Pol + ";" + korisnik.JMBG + ";" + korisnik.KontaktTelefon + ";" + korisnik.Email + ";" + korisnik.Uloga + ";"+korisnik.Voznje+"\n");

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
    }
}
