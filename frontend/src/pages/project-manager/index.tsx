import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { useAuthContext } from '@/contexts/AuthContext';
import { ProjectManager } from '@/models/project-manager';
import { DeleteProjectManager } from '@/services/project-manager/delete';
import { LoadProjectManagers } from '@/services/project-manager/load';
import { SaveProjectManager } from '@/services/project-manager/save';
import { Role } from '@/types/role';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NotAuthorized } from '../not-authorized';

const projectManagerFormSchema = z.object({
  id: z.unknown().optional(),
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória').optional(),
  phone: z.string().min(1, 'Telefone é obrigatório'),
});

export function ProjectManagerPage() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProjectManager>({
    resolver: zodResolver(projectManagerFormSchema),
  });
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['project-managers'],
    queryFn: async () => await LoadProjectManagers.execute(),
  });

  const deleteMutation = useMutation({
    mutationKey: ['project-managers', 'delete'],
    mutationFn: async (id: number) => await DeleteProjectManager.execute(id),
    onSuccess: () => {
      toast({
        title: 'Gerente de Projeto deletado',
        description: 'Gerente de Projeto deletado com sucesso',
      });

      queryClient.invalidateQueries({
        queryKey: ['project-managers'],
      });
    },
  });

  const saveMutation = useMutation({
    mutationKey: ['project-managers', 'create'],
    mutationFn: async (data: ProjectManager) => await SaveProjectManager.execute(data),
    onError: (error: AxiosError<{ message?: string }>) => {
      toast({
        title: 'Erro ao salvar gerente de projeto',
        description: error.response?.data?.message ?? 'Não foi possível salvar o gerente de projeto',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Gerente de projeto salvo',
        description: 'Gerente de projeto salvo com sucesso',
      });

      queryClient.invalidateQueries({
        queryKey: ['project-managers'],
      });

      reset({
        id: data.id,
      });
    },
  });

  const editMode = watch('id') !== '' && watch('id') !== undefined;

  if (user.role !== Role.Admin) return <NotAuthorized />;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="p-6 rounded-lg shadow-md bg-white">
        <h3 className="font-medium text-xl">{editMode ? 'Editar' : 'Adicionar'} Gerente de Projeto</h3>
        <p className="text-gray-500 mt-1 text-sm">
          Preencha os campos abaixo para {editMode ? 'editar' : 'adicionar'} um gerente de projeto.
        </p>

        <form className="mt-6">
          <div className="grid gap-2 w-52 mb-4">
            <Label>Código</Label>
            <Input type="number" placeholder="Código" className="bg-gray-200" readOnly {...register('id')} />
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input placeholder="John" {...register('firstName')} required />
              {errors.firstName && (
                <span className="text-red-500 font-semibold text-xs">{errors.firstName.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="surname">Sobrenome</Label>
              <Input placeholder="Doe" {...register('lastName')} />
              {errors.lastName && <span className="text-red-500 font-semibold text-xs">{errors.lastName.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="m@example.com" {...register('email')} />
              {errors.email && <span className="text-red-500 font-semibold text-xs">{errors.email.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input placeholder="99999-9999" {...register('phone')} />
              {errors.phone && <span className="text-red-500 font-semibold text-xs">{errors.phone.message}</span>}
            </div>
            {!editMode && (
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input type="password" placeholder="Senha" {...register('password')} />
                {errors.password && (
                  <span className="text-red-500 font-semibold text-xs">{errors.password.message}</span>
                )}
              </div>
            )}
          </div>

          <div className="space-x-4 mt-8">
            <button
              type="button"
              className="py-2 px-4 bg-slate-800 text-white rounded hover:bg-slate-900 active:bg-slate-900 disabled:opacity-50"
              onClick={handleSubmit(async (data) => await saveMutation.mutateAsync(data))}
            >
              Salvar
            </button>

            <button
              type="button"
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
              onClick={() =>
                reset({
                  email: '',
                  id: '',
                  firstName: '',
                  lastName: '',
                  password: '',
                  phone: '',
                })
              }
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Gerentes de Projeto</CardTitle>
          <CardDescription>Gerencie os seus gerentes de projeto</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map(({ id, user: { email, firstName, lastName }, phone }) => (
                <TableRow key={id} onDoubleClick={() => reset({ email, id, firstName, lastName, phone })}>
                  <TableCell className="md:table-cell">{id}</TableCell>
                  <TableCell className="font-medium">{firstName + ' ' + lastName}</TableCell>
                  <TableCell className="font-medium">{email}</TableCell>
                  <TableCell className="font-medium">{phone}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => reset({ email, id, firstName, lastName, phone })}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteMutation.mutate(id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
