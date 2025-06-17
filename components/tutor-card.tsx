"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, X } from "lucide-react"

// Tipo para os dados do tutor
interface Tutor {
  id: string
  name: string
  image: string
  description: string
  title?: string
  institution?: string
  subjects: string[]
  availability?: string
  isAI?: boolean
}

interface TutorCardProps {
  tutor: Tutor
}

export function TutorCard({ tutor }: TutorCardProps) {
  // Estado para controlar o modal de confirmação
  const [showExternalModal, setShowExternalModal] = useState(false)

  // Determinar a cor de fundo com base no tipo de tutor (IA ou regular)
  const bgColor = tutor.isAI ? "bg-orange-500" : "bg-amber-300"

  // Determinar o texto do botão com base no tipo de tutor
  const buttonText = tutor.isAI ? "Começar" : "Ver perfil"

  // URL externa do tutor IA
  const externalUrl = "https://chatgpt.com/g/g-68516666bb2c819197db421663e1323b-mensi-ai"

  // Função para lidar com o clique do botão
  const handleButtonClick = (e: React.MouseEvent) => {
    if (tutor.isAI) {
      e.preventDefault()
      setShowExternalModal(true)
    }
    // Para tutores regulares, o Link funcionará normalmente
  }

  // Função para confirmar redirecionamento externo
  const handleConfirmExternal = () => {
    setShowExternalModal(false)
    window.open(externalUrl, "_blank", "noopener,noreferrer")
  }

  // Função para cancelar redirecionamento
  const handleCancelExternal = () => {
    setShowExternalModal(false)
  }

  return (
    <>
      <div className={`${bgColor} rounded-lg overflow-hidden shadow-md`}>
        <div className="p-6 flex flex-col items-center">
          {/* Imagem do tutor */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-white flex items-center justify-center">
            <Image
              src={tutor.image || "/placeholder.svg"}
              alt={tutor.description}
              width={96}
              height={96}
              className="object-cover"
              tabIndex={2}
            />
          </div>

          {/* Nome do tutor */}
          <h3 className="text-xl font-bold text-gray-800 mb-1" tabIndex={2}>{tutor.name}</h3>

          {/* Título e instituição (se não for IA) */}
          <p className="text-gray-700 mb-4" tabIndex={2}>
            {tutor.title} {tutor.institution}
          </p>

          {/* Disciplinas oferecidas */}
          <div className="w-full mt-2">
            <p className="text-center font-medium mb-2" tabIndex={2}>Oferece tutoria em:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {tutor.subjects.map((subject) => (
                <span key={`${tutor.id}-${subject}`} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm" tabIndex={2}>
                  {subject}
                </span>
              ))}
            </div>

            {/* Disponibilidade (se houver) */}
            {tutor.availability && (
              <span className="block text-center bg-white text-gray-700 px-3 py-1 rounded-full text-sm mx-auto mt-2 max-w-max" tabIndex={tutor.availability ? 2 : -1}>
                {tutor.availability}
              </span>
            )}
          </div>

          {/* Botão de ação */}
          <div className="mt-6">
            {tutor.isAI ? (
              <button
                onClick={handleButtonClick}
                className="inline-flex items-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
                tabIndex={2}
              >
                {buttonText}
                <ExternalLink size={16} />
              </button>
            ) : (
              <Link
                href={`/tutors/${tutor.id}`}
                className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2"
                tabIndex={2}
              >
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmação para redirecionamento externo */}
      {showExternalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="external-modal-title"
        >
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleCancelExternal} />

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 id="external-modal-title" className="text-lg font-semibold text-gray-800">
                Redirecionamento Externo
              </h2>
              <button
                onClick={handleCancelExternal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 rounded-md"
                aria-label="Fechar modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <ExternalLink size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Você será redirecionado para fora da plataforma Mensi
                  </h3>
                  <p className="text-gray-600 text-sm">
                    O {tutor.name} é um tutor de IA externo. Ao continuar, você será direcionado para uma nova aba no
                    ChatGPT para interagir com nosso assistente especializado em educação.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 text-sm">
                  <strong>Importante:</strong> Você continuará tendo acesso à plataforma Mensi nesta aba. O tutor IA
                  abrirá em uma nova janela.
                </p>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={handleCancelExternal}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmExternal}
                  className="px-6 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-offset-2 flex items-center gap-2"
                >
                  Continuar
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
