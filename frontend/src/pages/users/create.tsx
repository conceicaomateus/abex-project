/* eslint-disable react/no-unknown-property */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { InputForm } from '@/components/ui/input-form';
import { useToast } from '@/components/ui/use-toast';
import { createUser } from '@/services/project-manager/create';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type IUserForm = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export function CreateUser() {
  const { register, handleSubmit } = useForm<IUserForm>();
  const { toast } = useToast();

  const onSubmit = (data: IUserForm) => {
    createUser({
      email: data.email,
      name: data.name,
      password: data.password,
    });

    toast({
      title: 'User created',
      description: 'User has been created successfully',
    });
  };

  // const usernameAvailable = async (username: string) => {
  //   const response = await isUsernameAvailable(username);

  //   if (!response) {
  //     toast({
  //       title: 'Username not available',
  //       description: 'Please choose another username',
  //       variant: 'destructive',
  //     });

  //     setFocus('username');
  //   }
  // };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/users">Users</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="flex min-h-[calc(98vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 px-8 md:gap-8">
        <div className="grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
            <Link to="/" className="font-semibold text-primary">
              General
            </Link>
            <Link hidden to="/">
              Permissions
            </Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardContent className="flex flex-col gap-4 p-8">
                <InputForm {...register('name')} />
                <InputForm {...register('username')} />
                <InputForm {...register('email')} />
                <InputForm {...register('password')} />
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleSubmit(onSubmit)}>Save changes</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
