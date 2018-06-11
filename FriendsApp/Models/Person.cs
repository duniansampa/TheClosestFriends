using System;
using System.ComponentModel.DataAnnotations;

namespace FriendsApp.Models
{
    public class Person
    {


        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

    }
}
