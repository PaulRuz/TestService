using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test02_EventService.Services
{
    public class TimeService : ITimeService
    {
        public string GetTime()
        {
            return DateTime.Now.ToString("dd.MM.yy HH:mm:ss");
        }
    }
}
