import { Calendar, CircleCheck, CircleDashed, Link2, MapPin, Plus, Settings2, Tag, UserCog, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type TripType = {
  id: string
  destination: string;
  starts_at: string;
  ends_at: string;
  isConfirmed: boolean;
}

type ParticipantType = {
  id: string;
  name?: string;
  email: string;
  is_confirmed: boolean;
}

type ActivityType = {
  date: string
  activities: {
    title: string
    occurs_at: string
    id: string
  }[]
}

function TripDeatils() {
  const { tripId } = useParams();
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const [trip, setTrip] = useState<TripType | undefined>();
  const [participants, setParticipants] = useState<ParticipantType[]>([]);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const handleCreateActivityModal = () => {
    setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
  };

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => {setTrip(response.data.trip)});
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants));
    api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities));
  }, [tripId]);

  const displayDate = trip ? `${format(trip.starts_at, "d' de 'LLL")} até ${format(trip.ends_at, "d' de 'LLL")}` : null

  async function createActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Activity created!");
    const data = new FormData(e.currentTarget);
    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();
    console.log(title, occurs_at);
    await api.post(`/trips/${tripId}/activities`, { title, occurs_at });
    
    window.document.location.reload();
  }

  return (
    <div
      className="max-w-6xl px-6 py-10 mx-auto space-y-8"
    >
      <div className="px-6 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-100">{trip?.destination}</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-zinc-400" />
            <span className="text-lg text-zinc-100">
              {displayDate}
            </span>
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
            {activities.map(activity => {
              return (
              <div key={activity.date} className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                  <span className="text-zinc-300 text-xl font-semibold">
                    {format(new Date(activity.date), "d")}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {format(new Date(activity.date), "EEEE", { locale: ptBR })}
                  </span>
                </div>
                <p className="text-zinc-500 text-sm">
                  {activity.activities.length > 0 ? (
                    <div>
                      {activity.activities.map(act => (
                        <div key={act.id} className="space-y-2.5">
                          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                            <CircleCheck className="text-lime-300 size-5"/>
                            <span className="text-zinc-100">{act.title}</span>
                            <span className="text-zinc-400 text-sm ml-auto">
                              {format(new Date(act.occurs_at), "HH:mm")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "Nenhuma atividade cadastrada."
                  )}
                </p>
              </div>
              )
            })}
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
                {participants.map(participant => (
                  <div key={participant.id} className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">
                      {participant.name 
                        ? participant.name
                        : `Convidado ${participants.indexOf(participant)}`
                      }
                    </span>
                    <span className="block text-sm text-zinc-400 truncate">{participant.email}</span>
                  </div>
                  {participant.is_confirmed ? (
                    <CircleCheck className="text-lime-300 size-5 shrink-0"/>
                  ) : (
                    <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
                  )}
                </div>
                ))}
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
                  onSubmit={createActivity}
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
                        name="occurs_at"
                        className="bg-transparent text-lg text-zinc-300 outline-none placeholder-zinc-400 flex-1 [color-scheme:dark]"
                      />
                    </div>

                  <button
                    type="submit" className='bg-lime-300 text-lime-950 px-5 h-11 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400 w-full justify-center'>
                    Confirmar criação de atividade
                  </button>
                </form>
              </div>
        </div>
      )}
    </div>
  );
}

export default TripDeatils;