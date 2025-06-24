import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect, FormCheckbox } from "../../shared/components/forms";
import { updateUserSchema } from "./schemas/user.schema";
import { ROUTES } from "../../shared/constants";
import { USER_ROLES } from "../../shared/constants/roles.constants";
import UsersService from "./services/UsersService";

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetchLoading, setFetchLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState("");
  
  const methods = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: USER_ROLES.USER,
      changePassword: false,
      password: "",
    },
  });
  
  const { handleSubmit, setError, watch, reset, formState: { isSubmitting } } = methods;
  const changePassword = watch("changePassword");
  
  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchUser = async () => {
    try {
      const data = await UsersService.getUser(id);
      reset({
        name: data.user.name,
        email: data.user.email,
        role: data.user.role || USER_ROLES.USER,
        changePassword: false,
        password: "",
      });
    } catch {
      setFetchError("Failed to load user");
    } finally {
      setFetchLoading(false);
    }
  };
  
  const handleCancel = useCallback(() => {
    navigate(ROUTES.USERS);
  }, [navigate]);
  
  const onSubmit = async (data) => {
    try {
      const updateData = {
        name: data.name,
        email: data.email,
        role: data.role,
      };
      
      if (data.changePassword && data.password) {
        updateData.password = data.password;
      }
      
      await UsersService.updateUser(id, updateData);
      navigate(ROUTES.USERS);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || err.message || "Failed to update user",
      });
    }
  };

  const roleOptions = [
    { value: USER_ROLES.USER, label: "User" },
    { value: USER_ROLES.ADMIN, label: "Admin" },
  ];

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading user...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="text-red-600">{fetchError}</div>
        <Button onClick={handleCancel} size="sm">
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit User</h1>
        <Link to={ROUTES.USERS} className="text-sm text-gray-600 hover:text-gray-800">
          ← Back to users
        </Link>
      </div>

      <div className="card">
        {methods.formState.errors.root && (
          <div className="error-message mb-6 animate-fade-in">
            {methods.formState.errors.root.message}
          </div>
        )}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              name="name"
              label="Full Name"
              placeholder="John Doe"
              autoComplete="name"
            />

            <FormInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="john@example.com"
              autoComplete="email"
            />

            <FormSelect
              name="role"
              label="Role"
              options={roleOptions}
            />

            <div className="border-t pt-5">
              <FormCheckbox
                name="changePassword"
                label="Change password"
              />

              {changePassword && (
                <div className="mt-4 animate-fade-in">
                  <FormInput
                    name="password"
                    type="password"
                    label="New Password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    showPasswordToggle
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 6 characters
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="loading-spinner"></span>
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UserEditPage;