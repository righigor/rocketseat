import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from "lucide-react"
import logo from './assets/logo.svg'
import { useState } from "react"

function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guests, setGuests] = useState<string[]>([]);


  const handleGuestsInput = () => {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  };

  const handleGuestModal = () => {
    setIsGuestModalOpen(!isGuestModalOpen)
  };

  const handleAddGuest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;

    if (guests.includes(email)) {
      return;
    }
    setGuests([...guests, email]);
    e.currentTarget.reset();
  };

  const handleRemoveGuest = (index: number) => {
    const newGuests = guests.filter((_, i) => i !== index);
    setGuests(newGuests);
  };

  return (
    <div
      className='h-screen flex justify-center items-center bg-zinc-950 text-zinc-50 bg-pattern bg-no-repeat bg-center'
    >

      <div className="max-w-3xl w-full px-6 text-center space-y-10" >
        <div
          className="flex flex-col items-center gap-3"
        >
          <img src={ logo } alt="" />
          <p
            className='text-lg text-zinc-300'
          >Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <div
            className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape'
          >
            <div 
              className="flex items-center gap-2 flex-1"
            >
              <MapPin className='size-5 text-zinc-400' />
              <input type="text" placeholder='Para onde você vai?' className='bg-transparent placeholder-zinc-400 text-lg outline-none' disabled={isGuestsInputOpen} />
            </div>

            <div
              className="flex items-center gap-2"
            >
              <Calendar className='w-5 h-5 text-zinc-400' />
              <input type="text" placeholder='Quando?'className='bg-transparent placeholder-zinc-400 text-lg outline-none' disabled={isGuestsInputOpen}/>
            </div>

            {
              isGuestsInputOpen ? (
                <button
                  onClick={handleGuestsInput}
                  className='bg-zinc-800 text-zinc-200 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-zinc-700'
                >
                  Alterar local/data
                  <Settings2 className='size-5' />
                </button>
              ) : (
                <button
                  onClick={handleGuestsInput}
                  className='bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400'
                >Continuar
                  <ArrowRight className='size-5' />
                </button>
              )
            }
          </div>
          {isGuestsInputOpen && (
                    <div
                    className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape'
                  >
                    <button type="button" onClick={handleGuestModal}
                      className="flex items-center gap-2 flex-1 text-left"
                    >
                      <UserRoundPlus className='size-5 text-zinc-400' />
                      <span
                        className="text-zinc-400 text-lg"
                      >Quem estará na viagem?</span>
                    </button>
          
                    <button
                      className='bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400'
                    >Confirmar viagem
                      <ArrowRight className='size-5' />
                    </button>
                  </div>
          )
          }
        </div>

        <p
          className='text-sm text-zinc-500'
        >
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br/> com os nossos <a
          className='text-sm text-zinc-300' href="#">termos de uso</a> e <a className='text-sm text-zinc-300' href="#">política de privacidade</a>.
        </p>
      </div>

      {isGuestModalOpen && (
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
      
      )}

    </div>
  )
}

export default App
