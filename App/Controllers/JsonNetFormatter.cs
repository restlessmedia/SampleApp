using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace App.Controllers
{
  public class JsonNetFormatter : MediaTypeFormatter
  {
    public JsonNetFormatter()
    {
      _settings = new JsonSerializerSettings
      {
        ContractResolver = new CamelCasePropertyNamesContractResolver(),
        Formatting = Formatting.None,
        ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
      };
      _encoding = Encoding.UTF8;

      SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/json"));
    }

    public override bool CanReadType(Type type)
    {
      return true;
    }

    public override bool CanWriteType(Type type)
    {
      return true;
    }

    public override Task<object> ReadFromStreamAsync(Type type, Stream readStream, HttpContent content, IFormatterLogger formatterLogger)
    {
      using (StreamReader reader = new StreamReader(readStream))
      {
        return Task.FromResult(JsonConvert.DeserializeObject(reader.ReadToEnd(), type, _settings));
      }
    }

    public override Task WriteToStreamAsync(Type type, object value, Stream writeStream, HttpContent content, TransportContext transportContext)
    {
      byte[] data = _encoding.GetBytes(JsonConvert.SerializeObject(value, _settings));
      writeStream.Write(data, 0, data.Length);
      return Task.FromResult(writeStream);
    }

    private JsonSerializer CreateSerialiser()
    {
      return JsonSerializer.Create(_settings);
    }

    private readonly JsonSerializerSettings _settings;

    private readonly Encoding _encoding;
  }
}