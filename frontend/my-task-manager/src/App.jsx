import './index.css';
import AddTask from "./components/AddTask";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import TaskTable from "./components/TaskTable";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditTask from "./components/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<TaskTable />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/create" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
