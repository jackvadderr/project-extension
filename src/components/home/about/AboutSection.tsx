import MapaComEndereco from '../mapa/Mapa';

interface AboutSectionProps {
  id?: string;
  bgColor?: string;
  textColor?: string;
}

export default function AboutSection({
                                       id,
                                       bgColor = 'bg-white',
                                       textColor = 'text-black',
                                     }: AboutSectionProps) {
  return (
    <section id={id} className={`${bgColor} py-12 px-6 sm:px-10 md:px-16`}>
      <div className="w-full grid md:grid-cols-2 gap-8 items-center">
        <div className={`${textColor} space-y-6`}>
          <h2 className="text-3xl md:text-4xl font-bold">CONHEÇA A R.A EVENTOS</h2>
          <p className={`text-lg md:text-xl ${textColor}/80`}>
            Localizada no coração de Porto Velho, a <strong>R.A Eventos</strong> oferece um espaço versátil e acolhedor
            para celebrações inesquecíveis. Atuando com excelência na locação de espaços para festas e eventos sociais,
            nossa missão é transformar sonhos em realidade por meio de ambientes planejados, estrutura completa e um
            atendimento dedicado. Estamos situados na <strong>R. Nicarágua, 1226 – Nova Porto Velho</strong>, um ponto de fácil
            acesso para você e seus convidados. Aqui, cada evento é único e tratado com o carinho e profissionalismo que você merece.
          </p>
        </div>
        <div className="w-full h-full">
          <MapaComEndereco />
        </div>
      </div>
    </section>
  );
}
