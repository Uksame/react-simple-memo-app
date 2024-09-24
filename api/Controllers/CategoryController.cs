using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using api.Dtos;
using api.Models;
using api.Mappers;




namespace api.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categories = await _categoryRepository.GetAllAsync();

            return Ok(categories);
        }


        [HttpGet("{id}")]

        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = await _categoryRepository.GetByIdAsync(id);

            return category != null ? Ok(category) : NotFound();
        }


        [HttpPost("{id}")]
        public async Task<IActionResult> GetWithNotesById([FromRoute] int id, [FromBody] PasswordDto passwordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = await _categoryRepository.GetCategoryNotesByIdAsync(id, passwordDto.PassCode);

            return category != null ? Ok(category) : NotFound();
        }


        [HttpPost]
        public async Task<IActionResult> Add([FromBody] NewUpdateCategoryDto categoryDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var newCategory = await _categoryRepository.CreateAsync(categoryDto.ToCategoryFromCreate());

            return newCategory != null ? Ok(newCategory) : StatusCode(500, "An error has occurred while adding this note ");

        }

        [HttpPut("{id}")]

        public async Task<IActionResult> Update([FromRoute] int id, NewUpdateCategoryDto categoryDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var UpdatedCategory = await _categoryRepository.UpdateAsync(id, categoryDto);

            return UpdatedCategory != null ? Ok(UpdatedCategory) : NotFound();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var deletedCategory = await _categoryRepository.DeleteAsync(id);

            return deletedCategory != null ? Ok(deletedCategory) : NotFound();
        }

    }
}