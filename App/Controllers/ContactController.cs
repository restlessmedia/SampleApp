using App.Models;
using App.Models.ViewModel;
using App.Repository;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using System.Net;
using System.Net.Http;

namespace App.Controllers
{
  [RoutePrefix("api/contact")]
  public class ContactController : ApiController
  {
    public ContactController(IContactRepository repository)
    {
      _repository = repository;
    }

    [Route("")]
    [HttpGet]
    public IEnumerable<ContactViewModel> List()
    {
      return _repository.List().Select(x => new ContactViewModel(x));
    }

    [Route("{contactId?}")]
    [HttpPost]
    public ContactViewModel Save([FromBody] ContactViewModel model, [FromUri] int? contactId = null)
    {
      if (!ModelState.IsValid)
      {
        HttpResponseMessage message = new HttpResponseMessage(HttpStatusCode.BadRequest);
        message.Content = new StringContent(string.Join(", ", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage)));
        throw new HttpResponseException(message);
      }

      return new ContactViewModel(_repository.Save(model, contactId));
    }

    [Route("{contactId}")]
    [HttpGet]
    public ContactViewModel Read(int contactId)
    {
      IContact contact = _repository.Read(contactId);

      if (contact != null)
        return new ContactViewModel(contact);

      throw new HttpResponseException(HttpStatusCode.NotFound);
    }

    private readonly IContactRepository _repository;
  }
}