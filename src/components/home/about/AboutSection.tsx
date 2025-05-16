import MapaComEndereco from '../mapa/Mapa';

interface AboutSectionProps {
  id?: string;
  bgColor?: string;
  textColor?: string;
}

export default function AboutSection({
                                       id,
                                       bgColor = 'bg-white',
                                       textColor = 'text-black'
                                     }: AboutSectionProps) {
  return (
    <section id={id} className={`${bgColor} py-12`}>
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div className={`${textColor} space-y-6`}>
          <h2 className="text-3xl md:text-4xl font-bold">About Us.</h2>
          <p className={`text-lg md:text-xl ${textColor}/80`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            aliquam dapibus semper. Proin nunc nisl, dignissim at nisl nec,
            ultrices consectetur dolor. Fusce mattis nisi ut sem vestibulum, vel
            finibus sem posuere. Nullam at arcu ligula. Proin vehicula, ipsum id
            feugiat vestibulum, ipsum urna aliquet ipsum, at scelerisque velit
            tortor vel nibh.
          </p>
        </div>
        <div className="w-full h-full">
          <MapaComEndereco />
        </div>
      </div>
    </section>
  );
}