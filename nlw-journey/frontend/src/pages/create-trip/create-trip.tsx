import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2 } from "lucide-react"
import logo from "../../assets/logo.svg"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import InviteGuestModal from "./invite-guest-modal";
import ConfirmTripModal from "./confirm-trip-modal";

function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripOpen, setIsConfirmTripOpen] = useState(false);

  const [guests, setGuests] = useState<string[]>([]);

  const handleConfirmTrip = () => {
    setIsConfirmTripOpen(!isConfirmTripOpen)
  }

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

  const createTrip = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/trips/1");
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
              className="flex items-center gap-2 w-13"
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
                  className='bg-zinc-800 text-zinc-200 px-5 py-1 rounded-lg font-medium flex items-center gap-1 hover:bg-zinc-700'
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
                      {guests.length > 0 ? (
                        <span className="text-lg flex-1 text-zinc-300">{guests.length} convidado(s)</span>
                      ) : (
                        <span className="text-lg flex-1 text-zinc-400">Adicionar convidados</span>
                      )}
                    </button>
          
                    <button
                      onClick={handleConfirmTrip}
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
        <InviteGuestModal 
          guests={guests} 
          handleAddGuest={handleAddGuest} 
          handleGuestModal={handleGuestModal} 
          handleRemoveGuest={handleRemoveGuest} 
        />
      )}

      {isConfirmTripOpen && (
        <ConfirmTripModal
          handleConfirmTrip={handleConfirmTrip}
          createTrip={createTrip}
        />
      )}

    </div>
  )
}

export default CreateTripPage;
