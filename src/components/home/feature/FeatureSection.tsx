import Image from 'next/image'

interface FeatureSectionProps {
  title: string
  description: string
  imageUrl: string
  reverse?: boolean
  bgColor?: string
  id?: string
}

export default function FeatureSection({
                                         title,
                                         description,
                                         imageUrl,
                                         reverse = false,
                                         bgColor = 'bg-gray-50',
                                         id,
                                       }: FeatureSectionProps) {
  return (
    <section id={id} className={`${bgColor} py-28`}>
      <div className={`w-full px-6 sm:px-10 md:px-16 flex flex-col md:flex-row items-center ${reverse ? 'md:flex-row-reverse' : ''} gap-12`}>

        {/* Texto */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Imagem */}
        <div className="md:w-1/2">
          <div className="group w-full h-[400px] md:h-[500px] relative rounded overflow-hidden shadow">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
