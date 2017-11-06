using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace App.Models.ViewModel
{
  // we don't return data models back to the client - this serves as the model the view is concerned with
  public class ContactViewModel : IContact
  {
    public ContactViewModel() { }

    // this constructor serves as a cheap way to DTO
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
