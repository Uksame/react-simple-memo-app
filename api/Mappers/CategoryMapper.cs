using api.Dtos;
using api.Models;

namespace api.Mappers
{
    public static class CategoryMapper
    {


        public static CategoryDto ToCategoryDto(this Category category)
        {
            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                AccessType = category.AccessType,
                // Notes = category.Notes?.Select(c => c.ToNoteDto()).ToList() ?? []
            };
        }

        public static Category ToCategoryFromCreate(this NewCategoryDto categoryDto)
        {
            return new Category
            {
                Name = categoryDto.Name,
                AccessType = categoryDto.AccessType,
                PassCode = categoryDto.PassCode,
            };
        }

        public static CategoryNoteDto ToCategoryNoteDto(this Category categoryDto)
        {
            return new CategoryNoteDto
            {
                Id = categoryDto.Id,
                Name = categoryDto.Name,
                AccessType = categoryDto.AccessType,
            };
        }

    }
}
