using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebMVCPushNotificationNet5.Models
{
    public class PushNotificationDBContext : DbContext
    {
        public PushNotificationDBContext (DbContextOptions<PushNotificationDBContext> options)
            : base(options)
        {
        }

        public DbSet<Subscriptions> Subscriptions { get; set; }
    }
}
