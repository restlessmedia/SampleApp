using App.Models;
using System.Collections.Generic;
using System.Linq;

namespace App.Repository
{
  public class InMemoryContactRepository : IContactRepository
  {
    public IContact Save(IContact contact, int? contactId = null)
    {
      // if we have a contact id, attempt to find it and update the cache
      if (contactId.HasValue && Store._items.ContainsKey(contactId.Value))
      {
        Store._items[contactId.Value] = contact;
        return contact;
      }

      // get a new id for this contact and add it to the collection
      contactId = Store._items.Keys.DefaultIfEmpty().Max() + 1;
      contact.ContactId = contactId;
      Store._items.Add(contactId.Value, contact);

      return contact;
    }

    public IEnumerable<IContact> List()
    {
      return Store._items.Values;
    }

    public IContact Read(int contactId)
    {
      if (Store._items.ContainsKey(contactId))
        return Store._items[contactId];

      return null;
    }

    private static class Store
    {
      static Store()
      {
        _items = new Dictionary<int, IContact>();
        Populate();
      }

      public static void Populate(int numOf = 20)
      {
        for (int i = 0;  i < numOf; i++)
        {
          _items.Add(i, new Contact
          {
            ContactId = i,
            FullName = "Bob Smith" + i,
            HomeNumber = "01234 456 4" + i,
            MobileNumber = "4321 456 4" + i
          });
        }
      }

      public readonly static IDictionary<int, IContact> _items;
    }
  }
}