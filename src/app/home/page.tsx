// app/page.tsx (ou a rota onde estava antes o <ContactSection />)
import EmblaCarousel from "@/components/home/carousel/EmblaCarousel";
import FeatureSection from "@/components/home/feature/FeatureSection";
import AboutSection from "@/components/home/about/AboutSection";
import ContactSectionWrapper from '@/app/home/ContactSectionWrapper';
import { createContactMessageAction } from '@/actions/contactMessage/create-contact-message-action';

export default async function Page() {
  return (
    <>
      <section className="relative pt-4 h-screen overflow-hidden">
        <EmblaCarousel />
      </section>

      <FeatureSection
        id="feature-1"
        title="ALUGUE UM ESPAÇO PARA SEU ANIVERSÁRIO"
        description="Celebre seu aniversário em um espaço projetado para tornar esse momento verdadeiramente inesquecível. Com ambientes climatizados, sofisticados e acolhedores, a R.A Eventos oferece liberdade total para personalizar cada detalhe da decoração conforme o tema da sua festa. Seja uma comemoração infantil repleta de magia ou um evento elegante para adultos, garantimos conforto, praticidade e uma experiência única para você e seus convidados."
        imageUrl="/aniversario.jpg"
        bgColor="bg-gray-100"
      />

      <FeatureSection
        title="ALUGUE UM ESPAÇO PARA SEU CASAMENTO"
        description="Transforme o dia mais importante da sua vida em uma celebração dos sonhos. Na R.A Eventos, oferecemos um ambiente encantador e sofisticado, pensado para refletir a essência do casal. Com decoração personalizada, clima acolhedor e estrutura ideal para receber seus convidados com conforto e elegância, nosso espaço proporciona o cenário perfeito para eternizar esse momento. Cada detalhe — da iluminação à ambientação — é planejado com carinho para tornar sua cerimônia memorável."
        imageUrl="/casamento.jpg"
        bgColor="bg-gray-100"
        reverse
      />

      <AboutSection
        id="about"
        bgColor="bg-gray-100"
        textColor="text-black"
      />

      <ContactSectionWrapper
        id="contact"
        createContactAction={createContactMessageAction}
      />
    </>
  );
}
