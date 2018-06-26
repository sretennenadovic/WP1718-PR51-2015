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
    public class VoznjaController : ApiController
    {
        public List<Voznja> Get()
        {
            List<Voznja> ret1 = new List<Voznja>();

            foreach (Voznja item in Voznje.list.Values)
            {
                ret1.Add(item);
            }

            return ret1;
        }

        public Voznja GetId(int Id)
        {
            Voznja v = new Voznja();

            v = Voznje.list[Id];

            return v;
        }

        public bool Post([FromBody]Voznja voznja)
        {

            voznja.IdVoznje = Voznje.list.Count + 1;
            voznja.DatumVreme = DateTime.Now;

            Voznje.list.Add(voznja.IdVoznje, voznja);
            string path = HostingEnvironment.MapPath("~/App_Data/Voznje.txt");

            StringBuilder sb = new StringBuilder();

            sb.Append(voznja.IdVoznje + ";" + voznja.DatumVreme + ";" + voznja.Lokacija.X + ";" + voznja.Lokacija.Y + ";" + voznja.Lokacija.Adresa.UlicaBroj + ";" + voznja.Lokacija.Adresa.NaseljenoMesto + ";" + voznja.Lokacija.Adresa.PozivniBroj + ";" + voznja.Automobil + ";" + voznja.Musterija + ";" + voznja.Odrediste.X + ";" + voznja.Odrediste.Y + ";" + voznja.Odrediste.Adresa.UlicaBroj + ";" + voznja.Odrediste.Adresa.NaseljenoMesto + ";" + voznja.Odrediste.Adresa.PozivniBroj + ";" + voznja.Dispecer + ";" + voznja.Vozac + ";" + voznja.Iznos + ";" + voznja.Komentar.Opis + ";" + voznja.Komentar.DatumObjave + ";" + voznja.Komentar.KorisnickoIme + ";" + voznja.Komentar.IdVoznje + ";" + voznja.Komentar.Ocena + ";" + voznja.StatusVoznje + "\n");

            if (!File.Exists(path))
                File.WriteAllText(path, sb.ToString());
            else
                File.AppendAllText(path, sb.ToString());

            return true;
        }

        [HttpPut]
        public void AzuriranjeVoznje(int Id,[FromBody]Voznja vo)
        {
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            Voznja v = Voznje.list[Id];

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
            }else if(vo.StatusVoznje == StatusVoznje.Formirana)
            {
                v.Komentar.DatumObjave = "";
            }else if((vo.StatusVoznje == StatusVoznje.Uspesna && vo.Komentar.Opis != "")||vo.StatusVoznje == StatusVoznje.Neuspesna)
            {
                v.Komentar.DatumObjave = DateTime.Now.ToString();
            }
            else
            {
                v.Komentar.DatumObjave = "";
            }
            v.Komentar.Ocena = vo.Komentar.Ocena;
            v.StatusVoznje = vo.StatusVoznje;

            Voznje.list[vo.IdVoznje] = v;

            bool prviPut = true;

            string path = HostingEnvironment.MapPath("~/App_Data/Voznje.txt");
            StringBuilder sb = new StringBuilder();

            foreach (Voznja voznja in Voznje.list.Values)
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
