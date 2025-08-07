import { toast } from "react-toastify";

// Simulate async delay
// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const categoryService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color_c" } },
          { field: { Name: "icon_c" } },
          { field: { Name: "task_count_c" } }
        ]
      };
      
      const response = await apperClient.fetchRecords("category_c", params);
      
      if (!response.success) {
        console.error("Error fetching categories:", response.message);
        toast.error(response.message);
        return [];
      }
      
      // Map database fields to UI field names for compatibility
      const categories = response.data.map(category => ({
        Id: category.Id,
        name: category.Name || "",
        color: category.color_c || "#5B21B6",
        icon: category.icon_c || "Folder",
        taskCount: category.task_count_c || 0
      }));
      
      return categories;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error fetching categories:", error.message);
        toast.error("Failed to load categories");
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "color_c" } },
          { field: { Name: "icon_c" } },
          { field: { Name: "task_count_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById("category_c", parseInt(id), params);
      
      if (!response.success) {
        console.error("Error fetching category:", response.message);
        toast.error(response.message);
        return null;
      }
      
      const category = response.data;
      return {
        Id: category.Id,
        name: category.Name || "",
        color: category.color_c || "#5B21B6",
        icon: category.icon_c || "Folder",
        taskCount: category.task_count_c || 0
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching category:", error?.response?.data?.message);
      } else {
        console.error("Error fetching category:", error.message);
      }
      return null;
    }
  },

  async create(categoryData) {
    try {
      const apperClient = getApperClient();
      
      // Map UI fields to database fields and include only Updateable fields
      const dbCategoryData = {
        Name: categoryData.name,
        color_c: categoryData.color || "#5B21B6",
        icon_c: categoryData.icon || "Folder",
        task_count_c: categoryData.taskCount || 0
      };
      
      const params = {
        records: [dbCategoryData]
      };
      
      const response = await apperClient.createRecord("category_c", params);
      
      if (!response.success) {
        console.error("Error creating category:", response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} category records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          const createdCategory = successfulRecords[0].data;
          return {
            Id: createdCategory.Id,
            name: createdCategory.Name || "",
            color: createdCategory.color_c || "#5B21B6",
            icon: createdCategory.icon_c || "Folder",
            taskCount: createdCategory.task_count_c || 0
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error creating category:", error.message);
        toast.error("Failed to create category");
      }
      return null;
    }
  },

  async update(id, categoryData) {
    try {
      const apperClient = getApperClient();
      
      // Map UI fields to database fields and include only Updateable fields
      const dbCategoryData = {
        Id: parseInt(id),
        Name: categoryData.name,
        color_c: categoryData.color || "#5B21B6",
        icon_c: categoryData.icon || "Folder",
        task_count_c: categoryData.taskCount || 0
      };
      
      const params = {
        records: [dbCategoryData]
      };
      
      const response = await apperClient.updateRecord("category_c", params);
      
      if (!response.success) {
        console.error("Error updating category:", response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} category records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          const updatedCategory = successfulRecords[0].data;
          return {
            Id: updatedCategory.Id,
            name: updatedCategory.Name || "",
            color: updatedCategory.color_c || "#5B21B6",
            icon: updatedCategory.icon_c || "Folder",
            taskCount: updatedCategory.task_count_c || 0
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error updating category:", error.message);
        toast.error("Failed to update category");
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord("category_c", params);
      
      if (!response.success) {
        console.error("Error deleting category:", response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} category records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error deleting category:", error.message);
        toast.error("Failed to delete category");
      }
      return false;
    }
  }
};

export default categoryService;