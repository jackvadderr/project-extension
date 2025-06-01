import EmblaCarousel from '@/components/home/carousel/EmblaCarousel';
import FeatureSection from '@/components/home/feature/FeatureSection';
import ContactSection from '@/components/home/footer/ContactSection';
import AboutSection from '@/components/home/about/AboutSection';

const Page = async () => {
  return (
    <>
      <section className="relative pt-4 h-screen overflow-hidden">
        <EmblaCarousel />
      </section>
      <FeatureSection
        id="feature-1"
        title="ALUGUE UM ESPACO PARA SEU ANIVERSARIO"
        description="No nosso espaço exclusivo, cada detalhe foi pensado para criar a celebração dos seus sonhos. Com ambientes sofisticados e acolhedores, climatização perfeita e total liberdade para personalizar a decoração de acordo com o tema do seu evento, garantimos uma experiência única para você e seus convidados. Seja um aniversário encantado, uma festa infantil cheia de magia ou uma comemoração elegante para adultos, aqui, sua festa ganha vida de maneira extraordinária!"
        imageUrl="/aniversario.jpg"
      />
      <FeatureSection
        title="ALUGUE UM ESPACO PARA SEU CASAMENTO"
        description="Celebre seu amor em um ambiente encantador, onde a elegância e a sofisticação se encontram para criar memórias eternas. Nosso espaço exclusivo foi projetado para transformar sua cerimônia em uma experiência mágica, com decoração personalizada que reflete a essência do casal, ambientes climatizados e uma atmosfera acolhedora para receber seus convidados com conforto e estilo. Deixe que cada detalhe – da iluminação suave ao layout perfeito – eleve sua celebração a um novo patamar. Aqui, seu casamento ganha vida em um cenário deslumbrante, cuidadosamente preparado para tornar esse dia tão especial quanto a sua história."
        imageUrl="/casamento.jpg"
        bgColor="bg-gray-200"
        reverse
      />
      <AboutSection
        id="about"
        bgColor="bg-gray-0"
        textColor="text-black"
      />
      <ContactSection
        id="contact"
      />
    </>
  );
};

export default Page;