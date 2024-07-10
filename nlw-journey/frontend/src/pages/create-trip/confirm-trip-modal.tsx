import { User, X } from "lucide-react";
import { FormEvent } from "react";

type ConfirmTripModalProps = {
  handleConfirmTrip: () => void;
  createTrip: (e: FormEvent<HTMLFormElement>) => void;
};

function ConfirmTripModal({ handleConfirmTrip, createTrip}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
                  <button
                    onClick={handleConfirmTrip}
                  >
                    <X className="size-5 text-zinc-400"/>
                  </button>
                </div>
                <p className="text-sm text-zinc-400">
                  Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Cidade, país</span> nas datas de <span className="font-semibold text-zinc-100">dd/mm/yyyy</span>, preencha seus dados abaixo.
                </p>
              </div>

              <form
                onSubmit={createTrip}
                className="space-y-3"
              >
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <User className="size-5 text-zinc-400"/>
                  <input 
                    type="text"
                    placeholder="Seu nome completo"
                    name="name"
                    className="bg-transparent text-lg text-zinc-300 outline-none placeholder-zinc-400 flex-1"
                  />
                </div>

                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <User className="size-5 text-zinc-400"/>
                  <input 
                    type="email"
                    placeholder="Seu email pessoal"
                    name="email"
                    className="bg-transparent text-lg text-zinc-300 outline-none placeholder-zinc-400 flex-1"
                  />
                </div>

                <button
                  type="submit" className='bg-lime-300 text-lime-950 px-5 h-11 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400 w-full justify-center'>
                  Confirmar criação de viagem
                </button>
              </form>
            </div>
        </div>
  );
}

export default ConfirmTripModal;