using FriendsApp.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FriendsApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Person")]
    public class PersonController : Controller
    {
        // GET: api/Person
        [HttpGet]
        public IEnumerable<Person> GetAll()
        {
            MongoDbContext dbContext = new MongoDbContext();
            IEnumerable<Person> listPersons = dbContext.Persons.Find(m => true).ToList();

            return listPersons;
        }

        // GET: api/Person/Friends/5
        [HttpGet("Friends/{id}")]
        public IEnumerable<Person> GetClosetFriends(Guid id)
        {
            List<Person> persons = GetAll().ToList();

            MongoDbContext dbContext = new MongoDbContext();
            var person = persons.Find(m => m.Id == id);
            var friends = persons.OrderBy(p =>
                    Math.Sqrt(Math.Pow(person.Latitude - p.Latitude, 2) + Math.Pow(person.Longitude - p.Longitude, 2)))
                .Skip(1).Take(3);

            return friends;
        }

        // GET: api/Person/5
        [HttpGet("{id}")]
        public Person Get(Guid id)
        {
            MongoDbContext dbContext = new MongoDbContext();
            var person = dbContext.Persons.Find(m => m.Id == id).FirstOrDefault();

            return person;
        }

        // POST: api/Person
        [HttpPost]
        public void Add([FromBody]Person person)
        {
            MongoDbContext dbContext = new MongoDbContext();
            person.Id = Guid.NewGuid();
            dbContext.Persons.InsertOne(person);
        }


        // DELETE: api/Person/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            MongoDbContext dbContext = new MongoDbContext();
            dbContext.Persons.DeleteOne(m => m.Id == id);
        }
    }
}
