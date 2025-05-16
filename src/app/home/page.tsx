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
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis ante malesuada felis viverra semper. Suspendisse sagittis dictum risus a mattis. Vestibulum placerat turpis id feugiat rhoncus. Nam placerat facilisis metus. Aliquam elementum ipsum eget augue dictum laoreet. Vestibulum finibus tortor id augue interdum lacinia. Fusce gravida venenatis placerat. Integer dapibus ante vitae sem ultrices, varius laoreet velit iaculis. Donec sed pellentesque erat. Donec convallis lobortis felis. Vestibulum ornare elementum ante, eget tempor nunc venenatis egestas. Mauris rhoncus, mi in porttitor placerat, ligula sapien vestibulum leo, sed egestas turpis est in urna. Aliquam scelerisque metus et posuere pretium."
        imageUrl="/aniversario.jpg"
      />
      <FeatureSection
        title="ALUGUE UM ESPACO PARA SEU CASAMENTO"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis ante malesuada felis viverra semper. Suspendisse sagittis dictum risus a mattis. Vestibulum placerat turpis id feugiat rhoncus. Nam placerat facilisis metus. Aliquam elementum ipsum eget augue dictum laoreet. Vestibulum finibus tortor id augue interdum lacinia. Fusce gravida venenatis placerat. Integer dapibus ante vitae sem ultrices, varius laoreet velit iaculis. Donec sed pellentesque erat. Donec convallis lobortis felis. Vestibulum ornare elementum ante, eget tempor nunc venenatis egestas. Mauris rhoncus, mi in porttitor placerat, ligula sapien vestibulum leo, sed egestas turpis est in urna. Aliquam scelerisque metus et posuere pretium. "
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