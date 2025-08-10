import { LoginForm } from "@/components/LoginForm";
import { useLoginUser } from "../hooks/useLoginUser";
import type { LoginRequest } from "@/lib/auth";
export const LoginPage = () => {
  const { mutate: login, isPending, error } = useLoginUser();

  const handleLogin = (data: LoginRequest) => {
    console.log(data);
    const { email, password } = data;
    login(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          // TODO: handle success
        },
        onError: (error) => {
          console.log(error);
          // TODO: handle error
        },
      }
    );
  };
  return (
    <div className="px-4 py-12">
      <LoginForm onSubmit={handleLogin} isLoading={isPending} error={error} />
    </div>
  );
};
