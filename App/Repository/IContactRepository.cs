using App.Models;
using System.Collections.Generic;

namespace App.Repository
{
  public interface IContactRepository
  {
    IEnumerable<IContact> List();

    IContact Read(int contactId);

    IContact Save(IContact contact, int? contactId = null);
  }
}