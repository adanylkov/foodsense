namespace FoodSense.Domain.ValueObjects;

public record Nutrition(
    double Calories,
    double Fat,
    double Carbohydrates,
    double Protein,
    double Sodium,
    double Sugar,
    double Fiber,
    double Cholesterol,
    double SaturatedFat,
    double TransFat,
    double UnsaturatedFat,
    double Potassium);