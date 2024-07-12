import { AtSign, Plus, X } from "lucide-react";

type InviteGuestModalProps = {
  guests: string[];
  handleGuestModal: () => void;
  handleAddGuest: (e: React.FormEvent<HTMLFormElement>) => void;
  handleRemoveGuest: (index: number) => void;
};

function InviteGuestModal({ guests, handleGuestModal, handleAddGuest, handleRemoveGuest }: InviteGuestModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <button
                  onClick={handleGuestModal}
                >
                  <X className="size-5 text-zinc-400"/>
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados irão receber um e-mail de confirmação para participar da viagem.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {guests.map((guest, index) => (
                <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2" key={index}>
                  <span className="text-zinc-300">{guest}</span>
                  <button
                    onClick={() => handleRemoveGuest(index)}
                  >
                    <X className="size-4 text-zinc-400"/>
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form
              onSubmit={handleAddGuest} 
              className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <AtSign className="size-5 text-zinc-400"/>
              <input type="email" placeholder="Digite o email do convidado" className="bg-transparent text-lg text-zinc-300 outline-none placeholder-zinc-400 flex-1" name="email" />
              <button type="submit" className='bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400'>
                Convidar
                <Plus className="size-5 text-zinc-900"/>
              </button>
            </form>
          </div>
        </div>
  )
}

export default InviteGuestModal;
