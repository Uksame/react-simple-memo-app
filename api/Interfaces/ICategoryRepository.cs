using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<CategoryDto>> GetAllAsync();
        Task<CategoryDto?> GetByIdAsync(int id);

        Task<CategoryNotesListDto?> GetCategoryNotesByIdAsync(int id, string PassCode = "");

        Task<CategoryDto?> CreateAsync(Category category);
        Task<CategoryDto?> UpdateAsync(int id, NewUpdateCategoryDto categoryDto);
        Task<CategoryDto?> DeleteAsync(int id);

        /*  Task<Category?> GetBySymbolAsync(string symbol); */

    }
}