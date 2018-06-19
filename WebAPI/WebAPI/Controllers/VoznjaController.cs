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
    public class VoznjaController : ApiController
    {
        public List<Voznja> Get()
        {
            List<Voznja> ret = new List<Voznja>();
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            foreach (Voznja item in voznje.list.Values)
            {
                ret.Add(item);
            }

            return ret;
        }

        public bool Post([FromBody]Voznja voznja)
        {
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            voznja.IdVoznje = voznje.list.Count + 1;
            voznja.DatumVreme = DateTime.Now;

           /* voznja.StatusVoznje = StatusVoznje.Kreirana;

            voznja.Odrediste = new Lokacija("", "", "", "", "");
            voznja.Komentar = new Komentar("", "", "", voznja.IdVoznje.ToString(), "");*/

            voznje.list.Add(voznja.IdVoznje, voznja);
            string path = @"C:\Users\PC\Desktop\WEBproject\WP1718-PR51-2015\WebAPI\WebAPI\App_Data\Voznje.txt";
            StringBuilder sb = new StringBuilder();

            sb.Append(voznja.IdVoznje + ";" + voznja.DatumVreme + ";" + voznja.Lokacija.X + ";" + voznja.Lokacija.Y + ";" + voznja.Lokacija.Adresa.UlicaBroj + ";" + voznja.Lokacija.Adresa.NaseljenoMesto + ";" + voznja.Lokacija.Adresa.PozivniBroj + ";" + voznja.Automobil + ";" + voznja.Musterija + ";" + voznja.Odrediste.X + ";" + voznja.Odrediste.Y + ";" + voznja.Odrediste.Adresa.UlicaBroj + ";" + voznja.Odrediste.Adresa.NaseljenoMesto + ";" + voznja.Odrediste.Adresa.PozivniBroj + ";" + voznja.Dispecer + ";" + voznja.Vozac + ";" + voznja.Iznos + ";" + voznja.Komentar.Opis + ";" + voznja.Komentar.DatumObjave + ";" + voznja.Komentar.KorisnickoIme + ";" + voznja.Komentar.IdVoznje + ";" + voznja.Komentar.Ocena + ";" + voznja.StatusVoznje + "\n");

            if (!File.Exists(path))
                File.WriteAllText(path, sb.ToString());
            else
                File.AppendAllText(path, sb.ToString());

            voznje = new Voznje("~/App_Data/Voznje.txt");
            HttpContext.Current.Application["voznje"] = voznje;

            return true;
        }

        [HttpPut]
        public void AzuriranjeVoznje(int Id,[FromBody]Voznja vo)
        {
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            Voznja v = voznje.list[Id];

            v.DatumVreme = vo.DatumVreme;
            v.Lokacija.X = vo.Lokacija.X;
            v.Lokacija.Y = vo.Lokacija.Y;
            v.Lokacija.Adresa.UlicaBroj = vo.Lokacija.Adresa.UlicaBroj;
            v.Lokacija.Adresa.NaseljenoMesto = vo.Lokacija.Adresa.NaseljenoMesto;
            v.Lokacija.Adresa.PozivniBroj = vo.Lokacija.Adresa.PozivniBroj;
            v.Automobil = vo.Automobil;
            v.Musterija = vo.Musterija;
            v.Odrediste.X = vo.Odrediste.X;
            v.Odrediste.Y = vo.Odrediste.Y;
            v.Odrediste.Adresa.UlicaBroj = vo.Odrediste.Adresa.UlicaBroj;
            v.Odrediste.Adresa.NaseljenoMesto = vo.Odrediste.Adresa.NaseljenoMesto;
            v.Odrediste.Adresa.PozivniBroj = vo.Odrediste.Adresa.PozivniBroj;
            v.Dispecer = vo.Dispecer;
            v.Vozac = vo.Vozac;
            v.Iznos = vo.Iznos;
            v.Komentar.Opis = vo.Komentar.Opis;
            v.Komentar.IdVoznje = vo.Komentar.IdVoznje;
            v.Komentar.KorisnickoIme = vo.Komentar.KorisnickoIme;
            if (vo.StatusVoznje == StatusVoznje.Kreirana)
            {
                v.Komentar.DatumObjave = "";
            }
            else if(vo.StatusVoznje == StatusVoznje.Otkazana)
            {
                v.Komentar.DatumObjave = DateTime.Now.ToString();
            }
            v.Komentar.Ocena = vo.Komentar.Ocena;
            if (vo.StatusVoznje == 0)
            {
                v.StatusVoznje = StatusVoznje.Kreirana;
            }
            else
            {
                v.StatusVoznje = StatusVoznje.Otkazana;
            }

            voznje.list[vo.IdVoznje] = v;

            bool prviPut = true;

            string path = @"C:\Users\PC\Desktop\WEBproject\WP1718-PR51-2015\WebAPI\WebAPI\App_Data\Voznje.txt";
            StringBuilder sb = new StringBuilder();

            foreach (Voznja voznja in voznje.list.Values)
            {
                if (prviPut)
                {
                    sb.Append(voznja.IdVoznje + ";" + voznja.DatumVreme + ";" + voznja.Lokacija.X + ";" + voznja.Lokacija.Y + ";" + voznja.Lokacija.Adresa.UlicaBroj + ";" + voznja.Lokacija.Adresa.NaseljenoMesto + ";" + voznja.Lokacija.Adresa.PozivniBroj + ";" + voznja.Automobil + ";" + voznja.Musterija + ";" + voznja.Odrediste.X + ";" + voznja.Odrediste.Y + ";" + voznja.Odrediste.Adresa.UlicaBroj + ";" + voznja.Odrediste.Adresa.NaseljenoMesto + ";" + voznja.Odrediste.Adresa.PozivniBroj + ";" + voznja.Dispecer + ";" + voznja.Vozac + ";" + voznja.Iznos + ";" + voznja.Komentar.Opis + ";" + voznja.Komentar.DatumObjave + ";" + voznja.Komentar.KorisnickoIme + ";" + voznja.Komentar.IdVoznje + ";" + voznja.Komentar.Ocena + ";" + voznja.StatusVoznje + "\n");
                    File.WriteAllText(path, sb.ToString());
                    prviPut = false;
                    sb.Length = 0;
                }
                else
                {
                    sb.Append(voznja.IdVoznje + ";" + voznja.DatumVreme + ";" + voznja.Lokacija.X + ";" + voznja.Lokacija.Y + ";" + voznja.Lokacija.Adresa.UlicaBroj + ";" + voznja.Lokacija.Adresa.NaseljenoMesto + ";" + voznja.Lokacija.Adresa.PozivniBroj + ";" + voznja.Automobil + ";" + voznja.Musterija + ";" + voznja.Odrediste.X + ";" + voznja.Odrediste.Y + ";" + voznja.Odrediste.Adresa.UlicaBroj + ";" + voznja.Odrediste.Adresa.NaseljenoMesto + ";" + voznja.Odrediste.Adresa.PozivniBroj + ";" + voznja.Dispecer + ";" + voznja.Vozac + ";" + voznja.Iznos + ";" + voznja.Komentar.Opis + ";" + voznja.Komentar.DatumObjave + ";" + voznja.Komentar.KorisnickoIme + ";" + voznja.Komentar.IdVoznje + ";" + voznja.Komentar.Ocena + ";" + voznja.StatusVoznje + "\n");
                    File.AppendAllText(path, sb.ToString());
                    sb.Length = 0;
                }
            }

            voznje = new Voznje("~/App_Data/Voznje.txt");
            HttpContext.Current.Application["voznje"] = voznje;
        }
    }
}
