namespace App.Models
{
  public interface IContact
  {
    int? ContactId { get; set; }

    string FullName { get; set; }

    string HomeNumber { get; set; }

    string MobileNumber { get; set; }
  }
}