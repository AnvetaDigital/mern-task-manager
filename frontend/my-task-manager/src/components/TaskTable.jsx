import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../api/taskApi";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Chip } from "@mui/material";

function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const navigate = useNavigate();

  const fetchFilteredTasks = async () => {
    const data = await getTasks({
      title: search,
      status: statusFilter,
      priority: priorityFilter,
    });
    setTasks(data);
  };

  useEffect(() => {
    fetchFilteredTasks();
  }, [search, statusFilter, priorityFilter]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchFilteredTasks();
  };

  const handleCreate = () => {
    navigate("/create");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
  {
  field: "description",
  headerName: "Description",
  flex: 2},
    
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formatted = String(date.getDate()).padStart(2, '0') +
          '/' + String(date.getMonth() + 1).padStart(2, '0') +
          '/' + date.getFullYear();
        return <span>{formatted}</span>
      }
    },    
{
  field: "status",
  headerName: "Status",
  flex: 1,
  renderCell: (params) => (
    <Chip
      label={params.value}
      color={params.value === "Complete" ? "success" : "warning"}
      size="small"
    />
  ),
},
{
  field: "priority",
  headerName: "Priority",
  flex: 1,
  renderCell: (params) => (
    <Chip
      label={params.value}
      color={
        params.value === "High"
          ? "error"
          : params.value === "Medium"
          ? "warning"
          : "default"
      }
      size="small"
    />
  ),
},

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEdit(params.row._id)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = tasks.map((t) => ({ ...t, id: t._id }));

return (
  <Box p={2} maxWidth="1200px" mx="auto">
    {/* Title */}
    <Box sx={{ mb: 3, textAlign: "center" }}>
      <h2>Task Dashboard</h2>
    </Box>

    {/* Filters */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        label="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Incomplete">Incomplete</MenuItem>
          <MenuItem value="Complete">Complete</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priorityFilter}
          label="Priority"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
    </Box>

    {/* Task Table */}
    <Box sx={{ height: 400, mb: 4 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        rowsPerPageOptions={[10, 25, 50, 100]}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
            fontSize: "16px",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </Box>

    {/* Footer Buttons */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
        mt: 3,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
        sx={{ px: 3 }}
      >
        + Create Task
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleLogout}
        sx={{ px: 3 }}
      >
        Logout
      </Button>
    </Box>
  </Box>
);
}

export default TaskTable;
