import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../shared/hooks/useAuth";
import { ROUTES } from "../../shared/constants";
import usersService from "./services/users.service";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const data = await usersService.getUser(id);
      setUser(data.user);
    } catch (err) {
      setError("Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setDeleteLoading(true);
    
    try {
      await usersService.deleteUser(id);
      
      navigate(ROUTES.USERS);
    } catch (err) {
      alert("Failed to delete user");
      setDeleteLoading(false);
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading user...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600">{error || "User not found"}</div>
        <Button onClick={() => navigate(ROUTES.USERS)} className="mt-4" size="sm">
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Details</h1>
        <Link to={ROUTES.USERS} className="text-sm text-gray-600 hover:text-gray-800">
          ← Back to users
        </Link>
      </div>

      <div className="card">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="mt-1 text-lg text-gray-900">{user.name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Role</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${
              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {user.role || 'user'}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">User ID</h3>
            <p className="mt-1 text-sm text-gray-600 font-mono">{user.id}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Created</h3>
            <p className="mt-1 text-sm text-gray-600">
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
          <Button asChild>
            <Link to={ROUTES.getUserEdit(user.id)}>
              Edit User
            </Link>
          </Button>
          {user.id !== currentUser.id && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={deleteLoading}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {deleteLoading ? "Deleting..." : "Delete User"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;