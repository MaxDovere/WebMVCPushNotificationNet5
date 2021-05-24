using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using WebPush;
using WebMVCPushNotificationNet5.Models;
using System.Diagnostics;

namespace WebMVCPushNotificationNet5.Controllers
{
    public class WebPushController : Controller
    {
        private readonly IConfiguration _configuration;

        private readonly PushNotificationDBContext _context;

        public WebPushController(PushNotificationDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public IActionResult Send(int? id)
        {
            return View();
        }

        [HttpPost, ActionName("Send")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Send(int id)
        {
            var payload = Request.Form["payload"];
            var subscription = await _context.Subscriptions.SingleOrDefaultAsync(m => m.SubscriptionId == id);

            string vapidPublicKey = _configuration.GetSection("VapidKeys")["PublicKey"];
            string vapidPrivateKey = _configuration.GetSection("VapidKeys")["PrivateKey"];

            var pushSubscription = new PushSubscription(subscription.Endpoint, subscription.P256DH, subscription.Auth);
            var vapidDetails = new VapidDetails("mailto:massimo.dovere@gmail.com", vapidPublicKey, vapidPrivateKey);

            try 
            {
                var webPushClient = new WebPushClient();
                webPushClient.SendNotification(pushSubscription, payload, vapidDetails);
            }
            catch(WebPushException wex)
            {
                return View(wex.Message);
            }

            return View();
        }

        public IActionResult SendWebPush(int? id)
        {
            return View();
        }

        [HttpPost, ActionName("SendWebPush")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SendWebPush(int id)
        {
            var payload = Request.Form["payload"];
            var subscription = await _context.Subscriptions.SingleOrDefaultAsync(m => m.SubscriptionId == id);

            string vapidSubject = _configuration.GetSection("VapidKeys")["Subject"];
            string vapidPublicKey = _configuration.GetSection("VapidKeys")["PublicKey"];
            string vapidPrivateKey = _configuration.GetSection("VapidKeys")["PrivateKey"];

            var pushSubscription = new PushSubscription(subscription.Endpoint, subscription.P256DH, subscription.Auth);
            var vapidDetails = new VapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

            try
            {
                var webPushClient = new WebPushClient();
                webPushClient.SendNotification(pushSubscription, payload, vapidDetails);
            }
            catch (WebPushException wex)
            {
                return View(wex.Message);
            }

            return View();
        }

        public IActionResult GenerateKeys()
        {
            VapidHelper.ValidateSubject("mailto:massimo.dovere@gmail.com");
            var keys = VapidHelper.GenerateVapidKeys();
            VapidHelper.ValidatePublicKey(keys.PublicKey);
            VapidHelper.ValidatePrivateKey(keys.PrivateKey);

            ViewBag.PublicKey = keys.PublicKey;
            ViewBag.PrivateKey = keys.PrivateKey;
            return View();
        }
        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}