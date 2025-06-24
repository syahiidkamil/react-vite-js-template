import React, { useCallback } from "react";
import { useNavigate, Link } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect } from "../../shared/components/forms";
import { createUserSchema } from "../../shared/schemas";
import { ROUTES, API_ENDPOINTS, USER_ROLES } from "../../shared/constants";

const UserCreatePage = () => {
  const navigate = useNavigate();
  
  const methods = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: USER_ROLES.USER,
    },
  });
  
  const { handleSubmit, setError, formState: { isSubmitting } } = methods;
  
  const onSubmit = async (data) => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      navigate(ROUTES.USERS);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err.message,
      });
    }
  };
  
  const handleCancel = useCallback(() => {
    navigate(ROUTES.USERS);
  }, [navigate]);

  const roleOptions = [
    { value: USER_ROLES.USER, label: "User" },
    { value: USER_ROLES.ADMIN, label: "Admin" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New User</h1>
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

            <FormInput
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="new-password"
              showPasswordToggle
            />

            <FormSelect
              name="role"
              label="Role"
              options={roleOptions}
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="loading-spinner"></span>
                    Creating...
                  </span>
                ) : (
                  "Create User"
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

export default UserCreatePage;