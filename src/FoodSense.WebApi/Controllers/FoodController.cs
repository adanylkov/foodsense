using FoodSense.Application;
using FoodSense.WebApi.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FoodSense.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : ControllerBase
    {
        private readonly IFoodService _foodService;

        public FoodController(IFoodService foodService)
        {
            _foodService = foodService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFoodAggregatesAsync()
        {
            var foodAggregates = await _foodService.GetFoodAggregatesAsync();
            return Ok(foodAggregates);
        }
        [HttpGet("{barcode}")]
        public async Task<IActionResult> GetFoodAggregateAsync(string barcode)
        {
            var foodAggregate = await _foodService.GetFoodAggregateAsync(barcode);
            return Ok(foodAggregate);
        }
        [HttpPost]
        public async Task<IActionResult> CreateFoodAggregateAsync([FromBody] CreateFoodAggregateRequest request)
        {
            var foodAggregate = await _foodService.CreateFoodAggregateAsync(request.Name, request.Barcode, request.Nutrition);
            return CreatedAtAction(nameof(GetFoodAggregateAsync), new { barcode = foodAggregate.Barcode }, foodAggregate);
        }
    }
}