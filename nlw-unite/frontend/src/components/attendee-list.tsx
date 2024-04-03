import { Search, MoreHorizontal } from "lucide-react"
export function AttendeeList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm bg-transparent w-72 flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input className="bg-transparent flex-1 outline-none" type="text" placeholder="Buscar participante..." />
        </div>
      </div>

      <div className="border border-white/10 rounded-ld">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-2.5 text-sm font-semibold">
                <input type="checkbox" name="" id="" />
              </th>
              <th className="py-3 px-2.5 text-sm font-semibold text-left">Código</th>
              <th className="py-3 px-2.5 text-sm font-semibold text-left">Participante</th>
              <th className="py-3 px-2.5 text-sm font-semibold text-left">Data de inscrição</th>
              <th className="py-3 px-2.5 text-sm font-semibold text-left">Data do check-in</th>
              <th className="py-3 px-2.5 text-sm font-semibold text-left">
                <button className="bg-black/20 border border-white/20 rounded-md p-1.5">
                  <MoreHorizontal className="size-4" />
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-white/10">
              <td className="py-3 px-2.5 text-sm text-zinc-300">
                <input type="checkbox" name="" id="" />
              </td>
              <td className="py-3 px-2.5 text-sm text-zinc-300">123456</td>
              <td className="py-3 px-2.5 text-sm text-zinc-300">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">nome</span>
                  <span>email</span>
                </div>
              </td>
              <td className="py-3 px-2.5 text-sm text-zinc-300"> dias atras</td>
              <td className="py-3 px-2.5 text-sm text-zinc-300">3 atas</td>
              <td className="py-3 px-2.5 text-sm text-zinc-300">
              <button className="bg-black/20 border border-white/20 rounded-md p-1.5">
                  <MoreHorizontal className="size-4" />
                </button>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td className="py-3 px-2.5 text-sm text-zinc-300" colSpan={3}>
                Mostrando 10 de 100 participantes
              </td>
              <td className="py-3 px-2.5 text-sm text-zinc-300" colSpan={3}>
                pages 1 de 10
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}