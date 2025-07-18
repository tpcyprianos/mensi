import Image from "next/image"
import Link from "next/link"

export function RegisterHeader() {
  return (
    <header className="bg-sky-100 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-block">
          <Image
            src="/images/logo_2.png"
            alt="A imagem é um logotipo com a palavra 'MENSI' escrita em letras maiúsculas e arredondadas, de cor azul. A última letra 'I' é substituída por um lápis desenhado de forma divertida e humanizada.Esse lápis tem olhos grandes, um sorriso simpático e está usando uma borracha rosa no topo, como se fosse um chapéu. A ponta do lápis está apontada para baixo, como se estivesse escrevendo. Abaixo dele, há uma linha ondulada preta, sugerindo que ele acabou de escrever 'me ensina'"
            width={180}
            height={100}
            priority
            tabIndex={1}
          />
        </Link>
      </div>
    </header>
  )
}
