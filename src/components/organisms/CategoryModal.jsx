import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import categoryService from "@/services/api/categoryService";

const CategoryModal = ({ isOpen, onClose, onSave }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", color: "#5B21B6", icon: "Folder" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const iconOptions = [
    "Folder", "Home", "Briefcase", "ShoppingCart", "Heart", "Star",
    "Target", "BookOpen", "Coffee", "Car", "Plane", "Camera",
    "Music", "Gamepad2", "Dumbbell", "Utensils", "Gift", "Trophy"
  ];

  const colorOptions = [
    "#5B21B6", "#EC4899", "#F59E0B", "#10B981", "#EF4444", "#3B82F6",
    "#8B5CF6", "#F97316", "#06B6D4", "#84CC16", "#F43F5E", "#6366F1"
  ];

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
      toast.error("Failed to load categories");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!newCategory.name.trim()) {
      newErrors.name = "Category name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      await categoryService.create({
        ...newCategory,
        taskCount: 0
      });
      
      setNewCategory({ name: "", color: "#5B21B6", icon: "Folder" });
      setErrors({});
      await loadCategories();
      toast.success("Category created successfully!");
    } catch (err) {
      console.error("Error creating category:", err);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await categoryService.delete(categoryId);
      await loadCategories();
      toast.success("Category deleted successfully!");
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Failed to delete category");
    }
  };

  const handleClose = () => {
    onSave();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold gradient-text">
              Manage Categories
            </h2>
            <Button onClick={handleClose} variant="ghost" size="sm">
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          {/* Add New Category Form */}
          <div className="bg-surface rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Category Name"
                  placeholder="Enter category name..."
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  error={errors.name}
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Icon
                  </label>
                  <select
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                    className="flex h-10 w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewCategory(prev => ({ ...prev, color }))}
                      className={`
                        w-8 h-8 rounded-full border-2 transition-all duration-200
                        ${newCategory.color === color 
                          ? "border-gray-900 scale-110" 
                          : "border-gray-300 hover:scale-105"
                        }
                      `}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ApperIcon name="Plus" size={16} />
                    <span>Add Category</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Existing Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Existing Categories ({categories.length})
            </h3>
            
            {categories.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="FolderOpen" size={48} className="mx-auto mb-3 text-gray-400" />
                <p>No categories yet. Create your first category above!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.Id}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: category.color }}
                      >
                        <ApperIcon name={category.icon} size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-500">
                          {category.taskCount} {category.taskCount === 1 ? "task" : "tasks"}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleDeleteCategory(category.Id)}
                      variant="ghost"
                      size="sm"
                      className="text-error hover:bg-error hover:text-white"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;