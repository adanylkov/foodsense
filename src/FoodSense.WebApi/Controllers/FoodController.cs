using FoodSense.Application;
using FoodSense.Domain.Entities;
using FoodSense.Domain.ValueObjects;
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
            var existingFoodAggregate = await _foodService.GetFoodAggregateAsync(request.Barcode);
            if (existingFoodAggregate != null)
            {
                return BadRequest($"Food aggregate with barcode {request.Barcode} already exists.");
            }
            var foodAggregate = await _foodService.CreateFoodAggregateAsync(request.Name, request.Barcode, request.Nutrition);
            return Ok(foodAggregate);
            // return CreatedAtAction(nameof(GetFoodAggregateAsync), new { barcode = foodAggregate.Barcode }, foodAggregate);
        }
        [HttpDelete("{barcode}")]
        public async Task<IActionResult> DeleteFoodAggregateAsync(string barcode)
        {
            var foodAggregate = await _foodService.GetFoodAggregateAsync(barcode);
            if (foodAggregate == null)
            {
                return NotFound($"Food aggregate with barcode {barcode} not found.");
            }
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
            await _foodService.UpdateFoodAggregateAsync(barcode, request.Name, request.Nutrition);
            return Ok();
        }
        [HttpPost("{barcode}/items")]
        public async Task<IActionResult> AddFoodItemAsync(string barcode, [FromBody] AddFoodItemRequest request)
        {
            var foodAggregate = await _foodService.GetFoodAggregateAsync(barcode);
            if (foodAggregate == null)
            {
                return NotFound($"Food aggregate with barcode {barcode} not found.");
            }
            await _foodService.AddFoodItemAsync(barcode, request.ExpirationFromOpened, request.ExpirationDate);
            return Ok();
        }
    }
}