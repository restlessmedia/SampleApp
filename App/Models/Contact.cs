namespace App.Models
{
  public class Contact : IContact
  {
    public Contact() { }

    // this constructor serves as a cheap way to DTO
    public Contact(IContact contact)
      : this()
    {
      ContactId = contact.ContactId;
      FullName = contact.FullName;
      HomeNumber = contact.HomeNumber;
      MobileNumber = contact.MobileNumber;
    }

    public int? ContactId { get; set; }

    public string FullName { get; set; }

    public string HomeNumber { get; set; }

    public string MobileNumber { get; set; }
  }
}
