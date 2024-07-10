import { Calendar, CircleCheck, CircleDashed, Link2, MapPin, Plus, Settings2, Tag, UserCog, X } from "lucide-react";
import { useState } from "react";

function TripDeatils() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

  const handleCreateActivityModal = () => {
    setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
  };

  return (
    <div
      className="max-w-6xl px-6 py-10 mx-auto space-y-8"
    >
      <div className="px-6 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-100">Cidade, País</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-zinc-400" />
            <span className="text-lg text-zinc-100">Data</span>
          </div>

          <div className="w-px h-6 bg-zinc-800" />

          <button
            className='bg-zinc-800 text-zinc-200 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-zinc-700'
          >
            Alterar local/data
            <Settings2 className='size-5' />
          </button>
        </div>
      </div>

      <main
        className="flex gap-16 px-4"
      >
        <div
          className="flex-1 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={handleCreateActivityModal}
              className="bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5" />
              Adicionar atividade
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-zinc-300 text-xl font-semibold">Dia 17</span>
                <span className="text-xs text-zinc-500">Sabado</span>
              </div>
              <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada</p>
            </div>

            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-zinc-300 text-xl font-semibold">Dia 17</span>
                <span className="text-xs text-zinc-500">Sabado</span>
              </div>
              
              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">Academia em grupo</span>
                  <span className="text-zinc-400 text-sm ml-auto">8:00h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-6">
          <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links Importantes</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Reserva do Airbnb</span>
                  <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-300">airbnb.com</a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0"/>
              </div>
            </div>

            <button
            className='bg-zinc-800 w-full justify-center text-zinc-200 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-zinc-700'
            >
            <Plus className='size-5' />
            Cadastrar novo link
          </button>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div>
            <div className="space-y-6">
              <h2 className="font-semibold text-xl">Convidados</h2>

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">Igor Righi</span>
                    <span className="block text-sm text-zinc-400 truncate">email@email.com</span>
                  </div>
                  <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
                </div>
              </div>

              <button
              className='bg-zinc-800 w-full justify-center text-zinc-200 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-zinc-700'
              >
              <UserCog className='size-5' />
              Gerenciar convidados
            </button>
            </div>
          </div>
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
              <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Cadastrar Atividade</h2>
                    <button
                      onClick={handleCreateActivityModal}
                    >
                      <X className="size-5 text-zinc-400"/>
                    </button>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Todos convidados podem vizualizar as atividades cadastradas.
                  </p>
                </div>

                <form
                  className="space-y-3"
                >
                  <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Tag className="size-5 text-zinc-400"/>
                    <input 
                      type="text"
                      placeholder="Qual a atividade"
                      name="title"
                      className="bg-transparent text-lg text-zinc-300 outline-none placeholder-zinc-400 flex-1"
                    />
                  </div>

                    <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                      <Calendar className="size-5 text-zinc-400"/>
                      <input 
                        type="datetime-local"
                        placeholder="Data e horário da atividade"
                        name="occours_at"
                        className="bg-transparent text-lg text-zinc-300 outline-none placeholder-zinc-400 flex-1 [color-scheme:dark]"
                      />
                    </div>

                  <button
                    type="submit" className='bg-lime-300 text-lime-950 px-5 h-11 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400 w-full justify-center'>
                    Confirmar criação de viagem
                  </button>
                </form>
              </div>
        </div>
      )}
    </div>
  );
}

export default TripDeatils;