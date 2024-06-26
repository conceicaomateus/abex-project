import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/datepicker';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuthContext } from '@/contexts/AuthContext';
import { Project } from '@/models/project';
import { DeleteProject } from '@/services/projects/delete';
import { LoadProjects } from '@/services/projects/load';
import { LoadRegisteredStudents } from '@/services/projects/load-registered-students';
import { RegisterStudent } from '@/services/projects/register-student';
import { SaveProject } from '@/services/projects/save';
import { Role } from '@/types/role';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const projectFormSchema = z.object({
  id: z.unknown().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  vacancies: z.unknown().optional(),
  startDate: z.unknown().optional(),
  endDate: z.unknown().optional(),
  schedule: z.string().optional(),
});

export function ProjectPage() {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Project>({
    resolver: zodResolver(projectFormSchema),
  });
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => await LoadProjects.execute(),
  });

  const { data: registeredStudents } = useQuery({
    queryKey: ['registered-students', watch('id')],
    queryFn: async () => await LoadRegisteredStudents.execute(Number(watch('id'))),
    enabled: watch('id') !== '' && watch('id') !== undefined,
  });

  const deleteMutation = useMutation({
    mutationKey: ['projects', 'delete'],
    mutationFn: async (id: number) => await DeleteProject.execute(id),
    onSuccess: () => {
      toast({
        title: 'Projeto deletado',
        description: 'Projeto deletado com sucesso',
      });

      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });

  const saveMutation = useMutation({
    mutationKey: ['projects', 'create'],
    mutationFn: async (data: Project) => await SaveProject.execute(data),
    onError: (error: AxiosError<{ message?: string }>) => {
      toast({
        title: 'Erro ao salvar o projeto',
        description: error.response?.data?.message ?? 'Não foi possível salvar o projeto',
        variant: 'destructive',
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Projeto salvo',
        description: 'Projeto salvo com sucesso',
      });

      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      reset({
        id: data.id,
      });
    },
  });

  const registerStudentMutation = useMutation({
    mutationKey: ['projects', 'register-student'],
    mutationFn: async (id: number) => await RegisterStudent.execute(id),
    onError: (error: AxiosError<{ message?: string }>) => {
      toast({
        title: 'Erro ao inscrever-se no projeto',
        description: error.response?.data?.message ?? 'Não foi possível inscrever-se no projeto',
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Inscrição realizada',
        description: 'Inscrição realizada com sucesso',
      });

      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });
    },
  });

  const editMode = watch('id') !== '' && watch('id') !== undefined;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {(user.role === Role.Admin || user.role === Role.User) && (
        <div className="p-6 rounded-lg shadow-md bg-white">
          <h3 className="font-medium text-xl">{editMode ? 'Editar' : 'Adicionar'} Projeto</h3>
          <p className="text-gray-500 mt-1 text-sm">
            Preencha os campos abaixo para {editMode ? 'editar' : 'adicionar'} um projeto.
          </p>

          <div className={`${editMode && 'grid lg:grid-cols-2 gap-8'}`}>
            <form className="mt-6">
              <div className="grid gap-2 w-52 mb-4">
                <Label>Código</Label>
                <Input type="number" placeholder="Código" className="bg-gray-200" readOnly {...register('id')} />
              </div>
              <div className={`grid ${!editMode && 'lg:grid-cols-2'} gap-4`}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input placeholder="Nome" {...register('name')} required />
                  {errors.name && <span className="text-red-500 font-semibold text-xs">{errors.name.message}</span>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vacancies">Quantidade de Vagas</Label>
                  <Input type="number" placeholder="Quantidade de Vagas" {...register('vacancies')} />
                  {errors.vacancies && (
                    <span className="text-red-500 font-semibold text-xs">{errors.vacancies.message}</span>
                  )}
                </div>
                <div className="grid lg:grid-cols-2 lg:gap-32 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Data de Inicio</Label>
                    <DatePicker
                      setDate={(date) => setValue('startDate', date.toISOString())}
                      date={watch('startDate') ? new Date(watch('startDate')) : undefined}
                    />
                    {errors.startDate && (
                      <span className="text-red-500 font-semibold text-xs">{errors.startDate.message}</span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">Data de fim</Label>
                    <DatePicker
                      setDate={(date) => setValue('endDate', date.toISOString())}
                      date={watch('endDate') ? new Date(watch('endDate')) : undefined}
                    />
                    {errors.endDate && (
                      <span className="text-red-500 font-semibold text-xs">{errors.endDate.message}</span>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="schedule">Link da Agenda</Label>
                  <Input placeholder="Link da Agenda" {...register('schedule')} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea placeholder="Descrição" {...register('description')} />
                </div>
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
                      id: '',
                      startDate: '',
                      description: '',
                      name: '',
                      schedule: '',
                      vacancies: 0,
                    })
                  }
                >
                  Cancelar
                </button>
              </div>
            </form>
            {editMode && (
              <div>
                <h4 className="font-medium text-lg">Estudantes</h4>
                <p className="text-gray-500 mt-1 text-sm mb-2">Lista de estudantes inscritos no projeto</p>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matricula</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Curso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registeredStudents?.map(({ registration, course, user: { email, firstName, lastName } }) => (
                      <TableRow key={registration}>
                        <TableCell className="md:table-cell">{registration}</TableCell>
                        <TableCell className="font-medium">{firstName + ' ' + lastName}</TableCell>
                        <TableCell className="font-medium">{email}</TableCell>
                        <TableCell className="font-medium">{course}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      )}
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Projetos</CardTitle>
          {(user.role === Role.Admin || user.role === Role.User) && (
            <CardDescription>Gerencie os seus projetos</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Agenda</TableHead>
                <TableHead>Quantidade de Vagas</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map(({ id, description, name, schedule, startDate, vacancies, endDate, students }) => (
                <TableRow
                  key={Number(id)}
                  onDoubleClick={() => reset({ id, description, name, schedule, startDate, endDate, vacancies })}
                >
                  <TableCell className="md:table-cell">{String(id)}</TableCell>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell className="font-medium">{description}</TableCell>
                  <TableCell className="font-medium">
                    {format(startDate, 'P') + ' até ' + format(endDate, 'P')}
                  </TableCell>
                  <TableCell className="font-medium">{schedule}</TableCell>
                  <TableCell className="font-medium">{students.length + ' / ' + vacancies}</TableCell>
                  <TableCell>
                    {user.role === Role.Student ? (
                      <Button onClick={() => registerStudentMutation.mutate(Number(id))}>Inscrever-se</Button>
                    ) : (
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
                            onClick={() => reset({ id, description, name, schedule, startDate, endDate, vacancies })}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteMutation.mutate(Number(id))}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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
