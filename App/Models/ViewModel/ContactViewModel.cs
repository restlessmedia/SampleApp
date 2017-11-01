using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace App.Models.ViewModel
{
  public class ContactViewModel : IContact
  {
    public ContactViewModel() { }

    public ContactViewModel(IContact contact)
    {
      ContactId = contact.ContactId;
      FullName = contact.FullName;
      HomeNumber = contact.HomeNumber;
      MobileNumber = contact.MobileNumber;
    }

    public int? ContactId { get; set; }

    [Required]
    public string FullName { get; set; }

    [Required]
    public string HomeNumber { get; set; }

    [Required]
    public string MobileNumber { get; set; }
  }
}