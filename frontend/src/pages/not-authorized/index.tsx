export function NotAuthorized() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="p-6 rounded-lg shadow-md bg-white">
        <h3 className="font-medium text-xl">Acesso negado</h3>
        <p className="text-gray-500 mt-1 text-sm">Você não tem permissão para acessar essa página.</p>
      </div>
    </main>
  );
}
