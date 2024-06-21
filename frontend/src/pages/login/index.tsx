/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/contexts/AuthContext';
import { login as loginService } from '@/services/auth/login';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
  const { login } = useAuthContext();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = await loginService(data.email, data.password);
    login(token);
  };

  // on enter press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[736px]" onKeyDown={handleKeyPress}>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="m@example.com" required {...register('email')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" required {...register('password')} />
            </div>
            <Button type="button" className="w-full" onClick={handleSubmit(onSubmit)}>
              Login
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <image className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}
