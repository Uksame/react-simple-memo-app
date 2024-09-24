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
                NoteIds = category.Notes?.Select(x => x.Id).ToList(),
                // Notes = category.Notes?.Select(c => c.ToNoteDto()).ToList() ?? []
            };
        }

        public static Category ToCategoryFromCreate(this NewUpdateCategoryDto categoryDto)
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

        public static CategoryNotesListDto ToCategoryNotesListDto(this Category category)
        {
            return new CategoryNotesListDto
            {
                Id = category.Id,
                Notes = category.Notes?.Select(n => n.ToNoteDto()).ToList(),
            };
        }

    }
}
