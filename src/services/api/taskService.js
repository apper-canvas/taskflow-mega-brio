import { toast } from "react-toastify";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

const taskService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "category_id_c" } }
        ]
      };
      
      const response = await apperClient.fetchRecords("task_c", params);
      
      if (!response.success) {
        console.error("Error fetching tasks:", response.message);
        toast.error(response.message);
        return [];
      }
      
      // Map database fields to UI field names for compatibility
      const tasks = response.data.map(task => ({
        Id: task.Id,
        title: task.title_c || "",
        description: task.description_c || "",
        categoryId: task.category_id_c?.Id || task.category_id_c || null,
        priority: task.priority_c || "medium",
        dueDate: task.due_date_c || null,
        completed: task.completed_c || false,
        completedAt: task.completed_at_c || null,
        createdAt: task.created_at_c || task.CreatedOn || null
      }));
      
      return tasks;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error fetching tasks:", error.message);
        toast.error("Failed to load tasks");
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
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "completed_at_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "category_id_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById("task_c", parseInt(id), params);
      
      if (!response.success) {
        console.error("Error fetching task:", response.message);
        toast.error(response.message);
        return null;
      }
      
      const task = response.data;
      return {
        Id: task.Id,
        title: task.title_c || "",
        description: task.description_c || "",
        categoryId: task.category_id_c?.Id || task.category_id_c || null,
        priority: task.priority_c || "medium", 
        dueDate: task.due_date_c || null,
        completed: task.completed_c || false,
        completedAt: task.completed_at_c || null,
        createdAt: task.created_at_c || task.CreatedOn || null
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching task:", error?.response?.data?.message);
      } else {
        console.error("Error fetching task:", error.message);
      }
      return null;
    }
  },

  async create(taskData) {
    try {
      const apperClient = getApperClient();
      
      // Map UI fields to database fields and include only Updateable fields
      const dbTaskData = {
        title_c: taskData.title,
        description_c: taskData.description || "",
        category_id_c: taskData.categoryId ? parseInt(taskData.categoryId) : null,
        priority_c: taskData.priority || "medium",
        due_date_c: taskData.dueDate || null,
        completed_c: taskData.completed || false,
        completed_at_c: taskData.completedAt || null,
        created_at_c: taskData.createdAt || new Date().toISOString()
      };
      
      const params = {
        records: [dbTaskData]
      };
      
      const response = await apperClient.createRecord("task_c", params);
      
      if (!response.success) {
        console.error("Error creating task:", response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} task records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          const createdTask = successfulRecords[0].data;
          return {
            Id: createdTask.Id,
            title: createdTask.title_c || "",
            description: createdTask.description_c || "",
            categoryId: createdTask.category_id_c?.Id || createdTask.category_id_c || null,
            priority: createdTask.priority_c || "medium",
            dueDate: createdTask.due_date_c || null,
            completed: createdTask.completed_c || false,
            completedAt: createdTask.completed_at_c || null,
            createdAt: createdTask.created_at_c || createdTask.CreatedOn || null
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error creating task:", error.message);
        toast.error("Failed to create task");
      }
      return null;
    }
  },

  async update(id, taskData) {
    try {
      const apperClient = getApperClient();
      
      // Map UI fields to database fields and include only Updateable fields
      const dbTaskData = {
        Id: parseInt(id),
        title_c: taskData.title,
        description_c: taskData.description || "",
        category_id_c: taskData.categoryId ? parseInt(taskData.categoryId) : null,
        priority_c: taskData.priority || "medium",
        due_date_c: taskData.dueDate || null,
        completed_c: taskData.completed !== undefined ? taskData.completed : false,
        completed_at_c: taskData.completedAt || null,
        created_at_c: taskData.createdAt
      };
      
      const params = {
        records: [dbTaskData]
      };
      
      const response = await apperClient.updateRecord("task_c", params);
      
      if (!response.success) {
        console.error("Error updating task:", response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} task records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          const updatedTask = successfulRecords[0].data;
          return {
            Id: updatedTask.Id,
            title: updatedTask.title_c || "",
            description: updatedTask.description_c || "",
            categoryId: updatedTask.category_id_c?.Id || updatedTask.category_id_c || null,
            priority: updatedTask.priority_c || "medium",
            dueDate: updatedTask.due_date_c || null,
            completed: updatedTask.completed_c || false,
            completedAt: updatedTask.completed_at_c || null,
            createdAt: updatedTask.created_at_c || updatedTask.CreatedOn || null
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error updating task:", error.message);
        toast.error("Failed to update task");
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
      
      const response = await apperClient.deleteRecord("task_c", params);
      
      if (!response.success) {
        console.error("Error deleting task:", response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} task records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error deleting task:", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      } else {
        console.error("Error deleting task:", error.message);
        toast.error("Failed to delete task");
      }
      return false;
    }
  }
};

export default taskService;