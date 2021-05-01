using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebMVCPushNotificationNet5.Models
{
    public class Subscriptions
    {
        [Key] public int SubscriptionId { get; set; }
        public string SubscriptionName { get; set; }
        public string Endpoint { get; set; }
        public string P256DH { get; set; }
        public string Auth { get; set; }
    }
}
