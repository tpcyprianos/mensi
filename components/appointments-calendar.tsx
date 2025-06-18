"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { AppointmentModal } from "@/components/appointment-modal"

// Tipos para os dados de agendamento
interface Appointment {
  id: string
  tutorId: string
  tutorName: string
  date: string // formato YYYY-MM-DD
  time: string // formato HH:MM
  subject: string
  status: "scheduled" | "completed" | "canceled"
}

// Dados simulados de agendamentos (em uma aplicação real, viriam de uma API)
const mockAppointments: Appointment[] = [
  {
    id: "apt-001",
    tutorId: "giovana-mattos",
    tutorName: "Giovana",
    date: "2025-06-16",
    time: "19:00",
    subject: "Matemática",
    status: "scheduled",
  },
  {
    id: "apt-002",
    tutorId: "alberto-souza",
    tutorName: "Alberto",
    date: "2025-06-22",
    time: "10:00",
    subject: "Biologia",
    status: "scheduled",
  },
  {
    id: "apt-003",
    tutorId: "giovana-mattos",
    tutorName: "Giovana",
    date: "2025-07-05",
    time: "14:30",
    subject: "Física",
    status: "scheduled",
  },
  {
    id: "apt-004",
    tutorId: "alberto-souza",
    tutorName: "Alberto",
    date: "2025-05-15",
    time: "16:00",
    subject: "Química",
    status: "completed",
  },
  {
    id: "apt-005",
    tutorId: "giovana-mattos",
    tutorName: "Giovana",
    date: "2025-08-10",
    time: "09:00",
    subject: "Matemática",
    status: "scheduled",
  },
]

export function AppointmentsCalendar() {
  // Estado para controlar o mês e ano atual - começando com o mês atual
  const [currentDate, setCurrentDate] = useState(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Efeito para carregar os agendamentos
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1
        const monthStr = month < 10 ? `0${month}` : `${month}`

        const filtered = mockAppointments.filter((apt) => {
          const [aptYear, aptMonth] = apt.date.split("-")
          return aptYear === `${year}` && aptMonth === monthStr
        })

        setAppointments(filtered)
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error)
      }
    }

    fetchAppointments()
  }, [currentDate])

  // Função para navegar para o mês anterior
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Função para navegar para o próximo mês
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Função para abrir o modal de detalhes do agendamento
  const openAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  // Função para formatar o nome do mês e ano
  const formatMonthYear = (date: Date) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]
    return `${months[date.getMonth()]} ${date.getFullYear()}`
  }

  // Função para gerar os dias do calendário
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const firstDayOfWeek = firstDay.getDay()
    const daysInMonth = lastDay.getDate()

    const calendarDays = []

    // Adicionar células vazias para os dias antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(null)
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day)
    }

    return calendarDays
  }

  // Função para verificar se um dia tem agendamentos
  const getAppointmentForDay = (day: number) => {
    if (!day) return null

    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return appointments.find((apt) => apt.date === dateStr) || null
  }

  // Função para obter a cor do evento baseada no status
  const getEventColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-800"
      case "completed":
        return "bg-green-500"
      case "canceled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Dias da semana abreviados
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

  // Gerar os dias do calendário
  const calendarDays = generateCalendarDays()

  // Data de hoje para destacar
  const today = new Date()
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear()

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Cabeçalho do calendário com navegação */}
      <div className="bg-amber-300 p-4 flex items-center justify-between">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-amber-400 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft size={20} className="text-gray-800" />
        </button>

        <h2 className="text-lg md:text-xl font-bold text-gray-800 text-center flex-1">
          {formatMonthYear(currentDate)}
        </h2>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-amber-400 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight size={20} className="text-gray-800" />
        </button>
      </div>

      {/* Calendário */}
      <div className="p-4">
        {/* Cabeçalho com dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, index) => (
            <div key={index} className="p-2 text-center text-sm font-medium text-blue-800">
              {day}
            </div>
          ))}
        </div>

        {/* Corpo do calendário */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const appointment = day ? getAppointmentForDay(day) : null
            const isToday = isCurrentMonth && day === today.getDate()
            const isEmpty = !day

            return (
              <div
                key={index}
                className={`
                  relative min-h-[60px] p-1 border border-gray-400
                  ${isEmpty ? "bg-gray-100" : "bg-white hover:bg-gray-100"}
                `}
              >
                {day && (
                  <>
                    {/* Número do dia */}
                    <div className="text-right mb-1">
                      {isToday ? (
                        <div className="w-6 h-6 text-white rounded-full flex items-center justify-center text-xs font-medium ml-auto bg-blue-800">
                          {day}
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-gray-700">{day}</span>
                      )}
                    </div>

                    {/* Agendamento (se houver) */}
                    {appointment && (
                      <button
                        onClick={() => openAppointmentDetails(appointment)}
                        className={`
                          w-full text-left p-1 rounded text-xs text-white font-medium
                          ${getEventColor(appointment.status)}
                          hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
                        `}
                        aria-label={`Agendamento com ${appointment.tutorName} às ${appointment.time}`}
                      >
                        <div className="truncate">{appointment.tutorName}</div>
                        <div className="truncate text-xs opacity-90">{appointment.time.substring(0, 5)}</div>
                      </button>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Estado vazio (quando não há agendamentos) */}
      {appointments.length === 0 && (
        <div className="p-8 text-center border-t">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhum agendamento encontrado</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Você não possui agendamentos para {formatMonthYear(currentDate).toLowerCase()}. Que tal agendar uma tutoria?
          </p>
          <a
            href="/tutors"
            className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
          >
            Encontrar tutores
          </a>
        </div>
      )}

      {/* Legenda do calendário */}
      <div className="p-4 border-t bg-gray-50">
        <h3 className="font-medium text-gray-800 mb-2 text-sm">Legenda:</h3>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-800 rounded"></div>
            <span>Agendado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Concluído</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Cancelado</span>
          </div>
        </div>
      </div>

      {/* Modal de detalhes do agendamento */}
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} appointment={selectedAppointment} />
    </div>
  )
}
