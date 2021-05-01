using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;
using System.Threading.Tasks;
using WebMVCPushNotificationNet5.Models;

namespace WebMVCPushNotificationNet5.Controllers
{
    public class SubscriptionsController : Controller
    {
        private readonly PushNotificationDBContext _context;

        private readonly IConfiguration _configuration;

        public SubscriptionsController(PushNotificationDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: Subscriptions
        public async Task<IActionResult> Index()
        {
            return View(await _context.Subscriptions.ToListAsync());
        }
        public async Task<IActionResult> GetAll()
        {
            return View(await _context.Subscriptions.ToListAsync());
        }
        // GET: Subscriptions/Create
        public IActionResult Create()
        {
            ViewBag.PublicKey = _configuration.GetSection("VapidKeys")["PublicKey"];

            return View();
        }

        // POST: Subscriptions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("SubscriptionId,SubscriptionName,Endpoint,P256DH,Auth")] Subscriptions subscriptions)
        {
            if (ModelState.IsValid)
            {
                _context.Add(subscriptions);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }

            return View(subscriptions);
        }

        // GET: Subscriptions/Delete/5
        public async Task<IActionResult> Delete(int? Id)
        {
            if (Id == null)
            {
                return NotFound();
            }

            var subscriptions = await _context.Subscriptions
                .SingleOrDefaultAsync(m => m.SubscriptionId == Id);
            if (subscriptions == null)
            {
                return NotFound();
            }

            return View(subscriptions);
        }

        // POST: Subscriptions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int subscriptionId)
        {
            var subscriptions = await _context.Subscriptions.SingleOrDefaultAsync(m => m.SubscriptionId == subscriptionId);
            _context.Subscriptions.Remove(subscriptions);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
