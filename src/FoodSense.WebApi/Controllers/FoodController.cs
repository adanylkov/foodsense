using FoodSense.Application;
using FoodSense.WebApi.DTOs;
using FoodSense.WebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace FoodSense.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly IFoodService _foodService;
        private readonly IImageService _imageService;

        public FoodController(IFoodService foodService, IImageService imageService)
        {
            _foodService = foodService;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFoodAggregatesAsync([FromQuery] bool inStorage = false)
        {
            var foodAggregates = inStorage ?
                    await _foodService.GetInStorageFoodAggregateAsync()
                    : await _foodService.GetFoodAggregatesAsync();
            return Ok(foodAggregates);
        }
        [HttpGet("{barcode}")]
        public async Task<IActionResult> GetFoodAggregateAsync(string barcode)
        {
            var foodAggregate = await _foodService.GetFoodAggregateAsync(barcode);
            return Ok(foodAggregate);
        }
        [HttpPost]
        public async Task<IActionResult> CreateFoodAggregateAsync([FromForm] CreateFoodAggregateRequest request)
        {
            var existingFoodAggregate = await _foodService.GetFoodAggregateAsync(request.Barcode);
            if (existingFoodAggregate != null)
            {
                return BadRequest($"Food aggregate with barcode {request.Barcode} already exists.");
            }
            try
            {
                var filename = await _imageService.SaveImage(request.Image);
                var foodAggregate = await _foodService.CreateFoodAggregateAsync(request.Name, request.Barcode, request.Nutrition, filename);
                return Ok(foodAggregate);
            }
            catch (NotSupportedException)
            {
                return BadRequest("File type not supported.");
            }
            catch (ArgumentNullException)
            {
                return BadRequest("Form file cannot be null.");
            }
        }
        [HttpDelete("{barcode}")]
        public async Task<IActionResult> DeleteFoodAggregateAsync(string barcode)
        {
            var foodAggregate = await _foodService.GetFoodAggregateAsync(barcode);
            if (foodAggregate == null)
            {
                return NotFound($"Food aggregate with barcode {barcode} not found.");
            }
            await _imageService.DeleteImage(foodAggregate.Image);
            await _foodService.DeleteFoodAggregateAsync(barcode);
            return Ok();
        }
        [HttpPut("{barcode}")]
        public async Task<IActionResult> UpdateFoodAggregateAsync(string barcode, [FromBody] UpdateFoodAggregateRequest request)
        {
            var foodAggregate = await _foodService.GetFoodAggregateAsync(barcode);
            if (foodAggregate == null)
            {
                return NotFound($"Food aggregate with barcode {barcode} not found.");
            }
            try
            {
                var filename = await _imageService.SaveImage(request.Image);
                await _foodService.UpdateFoodAggregateAsync(barcode, request.Name, request.Nutrition, filename);
                return Ok(foodAggregate);
            }
            catch (NotSupportedException)
            {
                return BadRequest("File type not supported.");
            }
            catch (ArgumentNullException)
            {
                return BadRequest("Form file cannot be null.");
            }
        }
        [HttpPost("{barcode}/items")]
        public async Task<IActionResult> AddFoodItemAsync(string barcode, [FromBody] AddFoodItemRequest request)
        {
            var foodAggregate = await _foodService.GetFoodAggregateAsync(barcode);
            if (foodAggregate == null)
            {
                return NotFound($"Food aggregate with barcode {barcode} not found.");
            }
            var timespan = TimeSpan.FromHours(request.ExpirationFromOpened);
            await _foodService.AddFoodItemAsync(barcode, timespan, request.ExpirationDate);
            return Ok();
        }
    }
}