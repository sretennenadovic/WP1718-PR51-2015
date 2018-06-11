using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Lokacija
    {
        public double X { get; set; }
        public double Y { get; set; }
        public Adresa Adresa { get; set; }
    }
}