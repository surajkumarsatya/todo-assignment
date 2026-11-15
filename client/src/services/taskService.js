const API_URL = "https://todo-assignment-bii1.onrender.com/api/tasks";

const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

export const getTasks = async (search = "") => {
  const query = search
    ? `?search=${encodeURIComponent(search)}`
    : "";

  return apiRequest(`${API_URL}${query}`);
};

export const createTask = async (taskData) => {
  return apiRequest(API_URL, {
    method: "POST",
    body: JSON.stringify(taskData),
  });
};

export const updateTask = async (id, taskData) => {
  return apiRequest(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
};

export const updateTaskStatus = async (id, status) => {
  return apiRequest(`${API_URL}/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

export const deleteTask = async (id) => {
  return apiRequest(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
