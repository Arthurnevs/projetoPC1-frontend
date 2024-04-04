import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavBar";
import UserList from "@/pages/admin/user-list";
import QrCodeValidation from "@/pages/admin/qrcode-validation";

const AdminPrivateRoutes = () => {
  return (
    <BrowserRouter>
      <AdminNavbar>
        <Routes>
          <Route path="/" element={<QrCodeValidation />} />
          <Route path="/user-list" element={<UserList/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminNavbar>
    </BrowserRouter>
  );
};

export default AdminPrivateRoutes;
