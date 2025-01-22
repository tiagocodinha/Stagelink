import React from 'react';
import { Menu, X, ArrowRight, Target, Users, Lightbulb, Calendar, ChevronRight, Instagram, Linkedin, Facebook, ChevronLeft } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
      alt: "Corporate meeting"
    },
    {
      url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80",
      alt: "Marketing presentation"
    },
    {
      url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80",
      alt: "Team collaboration"
    },
    {
      url: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80",
      alt: "Strategy planning"
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      alt: "Corporate event"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const services = [
    {
      icon: <Target className="w-12 h-12 mb-4" />,
      title: "Marketing Digital",
      description: "Estratégias personalizadas para aumentar sua presença online e gerar resultados."
    },
    {
      icon: <Calendar className="w-12 h-12 mb-4" />,
      title: "Eventos Corporativos",
      description: "Organização completa de eventos que fortalecem sua marca e engajam seu público."
    },
    {
      icon: <Lightbulb className="w-12 h-12 mb-4" />,
      title: "Consultoria Estratégica",
      description: "Análise e planejamento para impulsionar seu negócio ao próximo nível."
    },
    {
      icon: <Users className="w-12 h-12 mb-4" />,
      title: "Gestão de Redes Sociais",
      description: "Criação de conteúdo relevante e gestão completa das suas redes sociais."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold">LOGO</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-900 hover:text-gray-600">Início</a>
              <a href="#servicos" className="text-gray-900 hover:text-gray-600">Serviços</a>
              <a href="#sobre" className="text-gray-900 hover:text-gray-600">Sobre</a>
              <a href="#contato" className="text-gray-900 hover:text-gray-600">Contato</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#inicio" className="block px-3 py-2 text-gray-900">Início</a>
              <a href="#servicos" className="block px-3 py-2 text-gray-900">Serviços</a>
              <a href="#sobre" className="block px-3 py-2 text-gray-900">Sobre</a>
              <a href="#contato" className="block px-3 py-2 text-gray-900">Contato</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Transformamos ideias em resultados digitais</h1>
              <p className="text-xl mb-8">Marketing digital e eventos corporativos que impulsionam seu negócio ao próximo nível.</p>
              <button className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center group">
                Fale Conosco
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                alt="Team meeting"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Nossos Serviços</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                {service.icon}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 flex items-center text-black font-semibold group">
                  Saiba mais
                  <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80"
                alt="Our office"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Sobre Nós</h2>
              <p className="text-lg mb-6">
                Somos uma agência de marketing digital e eventos corporativos com mais de 10 anos de experiência no mercado.
                Nossa missão é transformar negócios através de estratégias digitais inovadoras e eventos memoráveis.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <ChevronRight className="mr-2" />
                  Mais de 500 projetos entregues
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2" />
                  Equipe especializada e certificada
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2" />
                  Metodologia própria e comprovada
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Entre em Contato</h2>
              <p className="text-lg mb-8">
                Estamos prontos para ajudar seu negócio a alcançar novos patamares.
                Entre em contato e vamos conversar sobre suas necessidades.
              </p>
              <div className="space-y-4">
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Email:</span>
                  contato@empresa.com
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Telefone:</span>
                  +351 123 456 789
                </p>
                <p className="flex items-center">
                  <span className="font-semibold mr-2">Endereço:</span>
                  Rua Example, 123 - Lisboa
                </p>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <textarea
                  placeholder="Mensagem"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                ></textarea>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Nossos Projetos</h2>
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-xl aspect-video">
              <img
                src={carouselImages[currentSlide].url}
                alt={carouselImages[currentSlide].alt}
                className="w-full h-full object-cover transition-transform duration-500"
              />
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LOGO</h3>
              <p className="text-gray-400">
                Transformando negócios através do marketing digital e eventos corporativos.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#inicio" className="text-gray-400 hover:text-white">Início</a></li>
                <li><a href="#servicos" className="text-gray-400 hover:text-white">Serviços</a></li>
                <li><a href="#sobre" className="text-gray-400 hover:text-white">Sobre</a></li>
                <li><a href="#contato" className="text-gray-400 hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Marketing Digital</li>
                <li className="text-gray-400">Eventos Corporativos</li>
                <li className="text-gray-400">Consultoria Estratégica</li>
                <li className="text-gray-400">Gestão de Redes Sociais</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;