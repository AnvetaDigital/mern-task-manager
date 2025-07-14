const TASK_URL = "https://mern-task-manager-g0zn.onrender.com"

function getAuthHeader() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createTask(taskData) {
  try {
    let response = await fetch(`${TASK_URL}/createTask`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return await response.json();
  } catch (error) {
    console.log(`Error while creating the task: ${error}`);
    throw error;
  }
}

export async function getTasks({
  status = "",
  priority = "",
  title = "",
} = {}) {
  try {
    const queryParams = new URLSearchParams();

    if (status) queryParams.append("status", status);
    if (priority) queryParams.append("priority", priority);
    if (title) queryParams.append("title", title);
    let response = await fetch(
      `${TASK_URL}/getTask?${queryParams.toString()}`,
      {
        method: "GET",
        headers: getAuthHeader(),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.log(`Error while getting the tasks: ${error}`);
    throw error;
  }
}

export async function getTaskById(id) {
  try {
    const res = await fetch(`${TASK_URL}/getTask/${id}`, {
      method: "GET",
      headers: getAuthHeader(),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch task");
    }

    return await res.json();
  } catch (error) {
    console.log(`Error while updating the tasks: ${error}`);
    throw error;
  }
}

export async function updateTasks(id, data) {
  try {
    const response = await fetch(`${TASK_URL}/updateTask/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return await response.json();
  } catch (err) {
    console.log(`Error while updating the tasks: ${error}`);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${TASK_URL}/deleteTask/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    return await response.json();
  } catch (error) {
    console.log(`Error while deleting the task: ${error}`);
    throw error;
  }
}
