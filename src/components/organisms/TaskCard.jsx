import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import { format } from "date-fns";

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const isDueToday = task.dueDate && format(new Date(task.dueDate), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

  const getBorderColor = () => {
    if (task.completed) return "border-success";
    if (isOverdue) return "border-error";
    if (isDueToday) return "border-warning";
    return "border-primary";
  };

  return (
    <div 
      data-task-id={task.Id}
      className={`
        bg-white rounded-lg border-l-4 ${getBorderColor()} p-4 shadow-sm hover:shadow-md 
        transition-all duration-200 transform hover:scale-[1.01]
        ${task.completed ? "opacity-75" : ""}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.Id)}
            className="mt-0.5 cursor-pointer"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-medium text-gray-900 mb-1 leading-tight
              ${task.completed ? "line-through text-gray-500" : ""}
            `}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`
                text-sm text-gray-600 mb-2 leading-relaxed
                ${task.completed ? "line-through" : ""}
              `}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              {task.dueDate && (
                <div className={`
                  flex items-center space-x-1
                  ${isOverdue ? "text-error font-medium" : ""}
                  ${isDueToday ? "text-warning font-medium" : ""}
                `}>
                  <ApperIcon name="Calendar" size={12} />
                  <span>
                    {format(new Date(task.dueDate), "MMM d, yyyy")}
                    {isOverdue && " (Overdue)"}
                    {isDueToday && " (Today)"}
                  </span>
                </div>
              )}
              
              {task.completedAt && (
                <div className="flex items-center space-x-1 text-success">
                  <ApperIcon name="CheckCircle" size={12} />
                  <span>Completed {format(new Date(task.completedAt), "MMM d")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <PriorityBadge priority={task.priority} />
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={() => onEdit(task)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary hover:text-white"
            >
              <ApperIcon name="Edit" size={14} />
            </Button>
            
            <Button
              onClick={() => onDelete(task.Id)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-error hover:text-white"
            >
              <ApperIcon name="Trash2" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;