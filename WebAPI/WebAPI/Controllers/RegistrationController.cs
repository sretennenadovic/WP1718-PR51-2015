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
    public class RegistrationController : ApiController
    {
        //vraca mi listu voznji koje su od odredjenog korisnika
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

  /*      [HttpGet]
        [Route("api/Registration/GetVoznju/{id}")]
        public Voznja GetVoznju(int id)
        {
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];
            Voznja v = voznje.list[id];

            return v;
        }
        */


        //pri kreiranju nove voznje od strane korisnika
        [Route("api/Registration/Post")]
        public bool Post([FromBody]Voznja voznja)
        {
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            voznja.IdVoznje = voznje.list.Count + 1;
            voznja.DatumVreme = DateTime.Now;

            voznja.StatusVoznje = StatusVoznje.Kreirana;

            voznja.Odrediste = new Lokacija("", "", "", "", "");
            voznja.Komentar = new Komentar("", "", "", voznja.IdVoznje.ToString(), "");

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
                string path = @"C:\Users\PC\Desktop\WEBproject\WP1718-PR51-2015\WebAPI\WebAPI\App_Data\Korisnici.txt";
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

                string path = @"C:\Users\PC\Desktop\WEBproject\WP1718-PR51-2015\WebAPI\WebAPI\App_Data\Korisnici.txt";
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

/*
        //za izmenu statusa voznje pri otkazu iste
        [Route("api/Registration/PutOdustani")]
        public void PutOdustani([FromBody]int Id)
        {
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            Voznja v = voznje.list[Id];

            v.StatusVoznje = StatusVoznje.Otkazana;

            voznje.list[Id] = v;

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
*/

        //za otkazivanje voznje update komentara, ali i izmenu voznje (korisnik sto ima pravo)
        [HttpPut]
        [Route("api/Registration/AzuriranjeVoznje")]
        public void AzuriranjeVoznje([FromBody]Voznja vo)
        {
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            Voznja v = voznje.list[vo.IdVoznje];

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
            if (vo.StatusVoznje == 0)
            {
                v.Komentar.DatumObjave = "";
            }
            else
            {
                v.Komentar.DatumObjave = DateTime.Now.ToString();
            }
            v.Komentar.Ocena = vo.Komentar.Ocena;
            if(vo.StatusVoznje == 0)
            {
                v.StatusVoznje = StatusVoznje.Kreirana;
            }else 
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
