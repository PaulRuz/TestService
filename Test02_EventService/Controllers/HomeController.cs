using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Test02_EventService.Models;
using Test02_EventService.Services;

namespace Test02_EventService.Controllers
{
    public class HomeController : Controller
    {
        private static List<Event> Events = new List<Event>();
        private static int result = 0;

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetResult([FromServices]ITimeService timeService)
        {
            string currentTime = timeService.GetTime();
            Result newResult = new Result() { Time = currentTime, Value = result };
            result = 0;
            return Json(newResult);
        }

        [HttpPost]
        public void AddEvent([FromForm]Event currentEvent)
        {
            result += currentEvent.Value;
            Events.Add(currentEvent);
        }
    }
}