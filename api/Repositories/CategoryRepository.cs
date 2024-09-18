using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {

        private readonly MemoDbContext _context;

        public CategoryRepository(MemoDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryDto>> GetAllAsync()
        {
            var categories = await _context.Categories.Include(n => n.Notes).Select(c => c.ToCategoryDto()).ToListAsync();

            List<CategoryDto> categoriesDto = categories;

            return categoriesDto;
        }

        public async Task<CategoryDto?> GetByIdAsync(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            return category?.ToCategoryDto();

        }

        public async Task<CategoryDto?> CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category.ToCategoryDto();
        }


        public async Task<CategoryDto?> UpdateAsync(int id, UpdateCategoryDto categoryDto)
        {
            var oldCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (oldCategory == null)
                return null;



            oldCategory.PassCode = categoryDto.PassCode;
            oldCategory.AccessType = categoryDto.AccessType;
            oldCategory.Name = categoryDto.Name;


            _context.SaveChanges();

            return oldCategory.ToCategoryDto();
        }

        public async Task<CategoryDto?> DeleteAsync(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (category == null)
                return null;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return category.ToCategoryDto();

        }


    }
}