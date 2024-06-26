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
import { Student } from '@/models/student';
import { DeleteStudent } from '@/services/students/delete';
import { LoadStudent } from '@/services/students/load';
import { SaveStudent } from '@/services/students/save';
import { Role } from '@/types/role';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NotAuthorized } from '../not-authorized';

const studentFormSchema = z.object({
  id: z.unknown().optional(),
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória').optional(),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  cpf: z.string().min(1, 'Cpf é obrigatório'),
  course: z.string().min(1, 'Curso é obrigatório'),
});

export function StudentPage() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Student>({
    resolver: zodResolver(studentFormSchema),
  });
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: async () => await LoadStudent.execute(),
  });

  const deleteMutation = useMutation({
    mutationKey: ['students', 'delete'],
    mutationFn: async (id: number) => await DeleteStudent.execute(id),
    onSuccess: () => {
      toast({
        title: 'Estudante deletado',
        description: 'Estudante deletado com sucesso',
      });

      queryClient.invalidateQueries({
        queryKey: ['students'],
      });
    },
  });

  const saveMutation = useMutation({
    mutationKey: ['students', 'create'],
    mutationFn: async (data: Student) => await SaveStudent.execute(data),
    onError: (error: AxiosError<{ message?: string }>) => {
      toast({
        title: 'Erro ao salvar estudante',
        description: error.response?.data?.message ?? 'Não foi possível salvar o estudante',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Estudante salvo',
        description: 'Estudante salvo com sucesso',
      });

      queryClient.invalidateQueries({
        queryKey: ['students'],
      });

      reset({
        id: data.id,
        registration: data.registration,
      });
    },
  });

  const editMode = watch('id') !== '' && watch('id') !== undefined;

  if (user.role !== Role.Admin) return <NotAuthorized />;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="p-6 rounded-lg shadow-md bg-white">
        <h3 className="font-medium text-xl">{editMode ? 'Editar' : 'Adicionar'} Estudante</h3>
        <p className="text-gray-500 mt-1 text-sm">
          Preencha os campos abaixo para {editMode ? 'editar' : 'adicionar'} um estudante.
        </p>

        <form className="mt-6">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Código</Label>
              <Input type="number" placeholder="Código" className="bg-gray-200" readOnly {...register('id')} />
            </div>
            <div className="grid gap-2">
              <Label>Matricula</Label>
              <Input placeholder="Matricula" className="bg-gray-200" readOnly {...register('registration')} />
            </div>
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
              <Label htmlFor="cpf">Cpf</Label>
              <Input placeholder="111.111.111-00" {...register('cpf')} />
              {errors.cpf && <span className="text-red-500 font-semibold text-xs">{errors.cpf.message}</span>}
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
            <div className="grid gap-2">
              <Label htmlFor="course">Curso</Label>
              <Input placeholder="Curso" {...register('course')} />
              {errors.course && <span className="text-red-500 font-semibold text-xs">{errors.course.message}</span>}
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
                  course: '',
                  cpf: '',
                  registration: '',
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
          <CardTitle>Estudantes</CardTitle>
          <CardDescription>Gerencie os seus estudantes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Matricula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cpf</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map(({ id, user: { email, firstName, lastName }, course, cpf, phone, registration }) => (
                <TableRow
                  key={id}
                  onDoubleClick={() => reset({ email, id, firstName, lastName, course, cpf, phone, registration })}
                >
                  <TableCell className="md:table-cell">{id}</TableCell>
                  <TableCell className="md:table-cell">{registration}</TableCell>
                  <TableCell className="font-medium">{firstName + ' ' + lastName}</TableCell>
                  <TableCell className="font-medium">{email}</TableCell>
                  <TableCell className="font-medium">{cpf}</TableCell>
                  <TableCell className="font-medium">{phone}</TableCell>
                  <TableCell className="font-medium">{course}</TableCell>
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
                        <DropdownMenuItem
                          onClick={() => reset({ email, id, firstName, lastName, course, cpf, phone, registration })}
                        >
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
