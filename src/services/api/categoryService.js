import categoryData from "@/services/mockData/categories.json";
import taskData from "@/services/mockData/tasks.json";

// Simulate async delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for categories
let categories = [...categoryData];

const categoryService = {
  async getAll() {
    await delay(250);
    
    // Calculate task counts for each category
    const categoriesWithCounts = categories.map(category => {
      const taskCount = taskData.filter(task => task.categoryId === category.Id).length;
      return { ...category, taskCount };
    });
    
    return categoriesWithCounts;
  },

  async getById(id) {
    await delay(200);
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    
    // Find the highest existing Id and add 1
    const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0;
    const newCategory = {
      Id: maxId + 1,
      ...categoryData
    };
    
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(250);
    
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    categories[index] = { ...categories[index], ...categoryData };
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(200);
    
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    const deletedCategory = categories[index];
    categories = categories.filter(c => c.Id !== parseInt(id));
    return { ...deletedCategory };
  }
};

export default categoryService;