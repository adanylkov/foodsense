namespace FoodSense.WebApi.Services;

public class ImageService : IImageService
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public ImageService(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    public async Task<string> SaveImage(IFormFile formFile)
    {
        if (formFile == null) throw new ArgumentNullException(nameof(formFile)
            , "Form file cannot be null.");
        if (formFile.ContentType.Contains("image") == false) throw new NotSupportedException("File type not supported.");

        var filename = $"{Guid.NewGuid()}{Path.GetExtension(formFile.FileName)}";
        var path = Path.Combine(_webHostEnvironment.WebRootPath, "images", filename);
        await using var stream = new FileStream(path, FileMode.Create);
        await formFile.CopyToAsync(stream);
        return filename;
    }
}

public interface IImageService
{
    Task<string> SaveImage(IFormFile formFile);
}