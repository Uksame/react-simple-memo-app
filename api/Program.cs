

using System.Data.Common;
using api.Data;
using api.Interfaces;
using api.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Memo Demo APi",
        Description = "API for documenting the MEMO APP CRUD Operations",
        Version = "v1"
    });
});

builder.Services.AddDbContext<MemoDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<INoteRepository, NoteRepository>();

//**************************************************************//

var app = builder.Build();

app.Urls.Add("http://localhost:5003");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Memo Demo API V1");
    });
}

app.MapControllers();
app.UseHttpsRedirection();

app.Run();

/*     "DefaultConnection": "Server=.;Database=memo-ssp-project;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True;"
 */