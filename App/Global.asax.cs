using App.Controllers;
using App.Repository;
using Autofac;
using Autofac.Integration.WebApi;
using System.Reflection;
using System.Web.Http;

namespace App
{
  public class WebApiApplication : System.Web.HttpApplication
  {
    protected void Application_Start()
    {
      ContainerBuilder builder = new ContainerBuilder();
      GlobalConfiguration.Configure(WebApiConfig.Register);
      RegisterTypes(builder);
      builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
      IContainer container = builder.Build();
      GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
      GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.JsonFormatter);
      GlobalConfiguration.Configuration.Formatters.Insert(0, new JsonNetFormatter());
    }

    private void RegisterTypes(ContainerBuilder builder)
    {
      builder.RegisterType<InMemoryContactRepository>().As<IContactRepository>().SingleInstance();
    }
  }
}
