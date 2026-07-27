import { AfterViewInit, Directive, ElementRef, OnDestroy, effect, inject } from '@angular/core';
import { LanguageService } from '../services/language';

const EN: Record<string, string> = {
  'Início': 'Home',
  'Serviços': 'Services',
  'Produtos': 'Products',
  'Sobre': 'About',
  'Contato': 'Contact',
  'WhatsApp': 'WhatsApp',
  'Engenharia de Software': 'Software Engineering',
  'Cloud, Dados & IA': 'Cloud, Data & AI',
  'Segurança & Operação': 'Security & Operations',
  'Desenvolvimento de software': 'Software Development',
  'Web, mobile e desktop': 'Web, mobile and desktop',
  'Outsourcing / Squads': 'Outsourcing / Squads',
  'Squads e alocação de especialistas': 'Squads and specialist allocation',
  'QA': 'QA',
  'Testes manuais e automatizados': 'Manual and automated testing',
  'Design UI/UX': 'UI/UX Design',
  'Interfaces e experiência digital': 'Interfaces and digital experience',
  'IoT & Automação': 'IoT & Automation',
  'Firmware, drivers e IoT': 'Firmware, drivers and IoT',
  'DevOps / SRE / Cloud': 'DevOps / SRE / Cloud',
  'CI/CD, cloud e SRE': 'CI/CD, cloud and SRE',
  'Inteligência artificial': 'Artificial Intelligence',
  'IA, machine learning e BI': 'AI, machine learning and BI',
  'FinOps & Migrações': 'FinOps & Migrations',
  'FinOps e migrações para nuvem': 'FinOps and cloud migrations',
  'Segurança de dados': 'Data Security',
  'Pentest e segurança de dados': 'Pentesting and data security',
  'NOC & SOC': 'NOC & SOC',
  'Operação e segurança 24/7': '24/7 operations and security',
  'Aplicativos, sites, sistemas web e desktop': 'Applications, websites, web systems and desktop software',
  'Criamos produtos digitais sob medida, com arquitetura escalável, experiência intuitiva e código preparado para evoluir.': 'We create tailored digital products with scalable architecture, intuitive experiences and code built to evolve.',
  'Especialistas e equipes completas para acelerar suas entregas': 'Specialists and complete teams to accelerate your deliveries',
  'Montamos o time certo para o seu desafio, com gestão próxima, métricas claras e profissionais integrados à sua operação.': 'We assemble the right team for your challenge, with close management, clear metrics and professionals integrated into your operation.',
  'Qualidade de software — QA': 'Software Quality — QA',
  'Testes manuais e automatizados para entregas confiáveis': 'Manual and automated testing for reliable deliveries',
  'Estruturamos a qualidade do produto de ponta a ponta, reduzindo falhas, retrabalho e riscos antes que cheguem ao usuário.': 'We structure product quality from end to end, reducing failures, rework and risks before they reach users.',
  'Experiências digitais simples, bonitas e eficientes': 'Simple, beautiful and efficient digital experiences',
  'Unimos pesquisa, estratégia e design para criar interfaces que facilitam tarefas, aumentam conversões e fortalecem sua marca.': 'We combine research, strategy and design to create interfaces that simplify tasks, increase conversions and strengthen your brand.',
  'Dispositivos conectados e processos mais inteligentes': 'Connected devices and smarter processes',
  'Conectamos equipamentos, sensores e plataformas para automatizar operações e gerar dados que apoiam decisões em tempo real.': 'We connect equipment, sensors and platforms to automate operations and generate data that supports real-time decisions.',
  'Infraestrutura resiliente e entregas mais rápidas': 'Resilient infrastructure and faster deliveries',
  'Automatizamos ambientes, deploys e observabilidade para sua operação ganhar velocidade, estabilidade e previsibilidade.': 'We automate environments, deployments and observability so your operation gains speed, stability and predictability.',
  'IA aplicada para automatizar, prever e decidir melhor': 'Applied AI to automate, predict and make better decisions',
  'Transformamos dados e conhecimento do negócio em soluções inteligentes com impacto mensurável na operação e na experiência do cliente.': 'We turn data and business knowledge into intelligent solutions with measurable impact on operations and customer experience.',
  'Cloud com custos controlados e migração segura': 'Cloud with controlled costs and secure migration',
  'Planejamos a jornada para a nuvem e criamos uma cultura de controle financeiro sem limitar inovação, desempenho ou crescimento.': 'We plan the cloud journey and create a culture of financial control without limiting innovation, performance or growth.',
  'Proteção contínua para sistemas, dados e usuários': 'Continuous protection for systems, data and users',
  'Identificamos riscos, fortalecemos controles e ajudamos sua empresa a operar com segurança e conformidade.': 'We identify risks, strengthen controls and help your company operate securely and in compliance.',
  'Operação e segurança monitoradas 24 horas por dia': 'Operations and security monitored 24 hours a day',
  'Monitoramos infraestrutura, aplicações e eventos de segurança para detectar falhas e ameaças antes que afetem o seu negócio.': 'We monitor infrastructure, applications and security events to detect failures and threats before they affect your business.',
  'Tecnologia que impulsiona negócios': 'Technology that drives business',
  'Soluções digitais': 'Digital solutions',
  'que conectam, evoluem e transformam.': 'that connect, evolve and transform.',
  'Estratégia, design e tecnologia trabalhando juntos para transformar ideias em produtos digitais rápidos, seguros e preparados para crescer.': 'Strategy, design and technology working together to turn ideas into fast, secure digital products ready to grow.',
  'Especialistas em cada etapa': 'Experts at every stage',
  'Entregas rápidas e transparentes': 'Fast and transparent deliveries',
  'Tecnologia sob medida': 'Tailored technology',
  'Suporte próximo e contínuo': 'Close and continuous support',
  'Falar com um especialista': 'Talk to a specialist',
  'Conheça nosso trabalho': 'Discover our work',
  'Da ideia ao produto. Nós cuidamos de tudo.': 'From idea to product. We take care of everything.',
  'Seu produto': 'Your product',
  'usuários ativos': 'active users',
  'latência p95': 'p95 latency',
  'vs. mês anterior': 'vs. previous month',
  'Olá, Rafael!': 'Hello, Rafael!',
  'Seu negócio': 'Your business',
  'RECEITA · HOJE': 'REVENUE · TODAY',
  'pedidos': 'orders',
  'Ideia': 'Idea',
  'Design': 'Design',
  'Código': 'Code',
  'Live': 'Live',
  'Conheça a Borlig': 'Meet Borlig',
  'Tecnologia que transforma desafios em oportunidades': 'Technology that turns challenges into opportunities',
  'QUEM SOMOS': 'WHO WE ARE',
  'Criamos tecnologia para empresas que querem evoluir': 'We build technology for companies that want to evolve',
  'NOSSA ESSÊNCIA': 'OUR ESSENCE',
  'Soluções que geram resultados': 'Solutions that deliver results',
  'A Borlig é uma empresa especializada em criar soluções tecnológicas que ajudam empresas a crescer, inovar e se tornar mais eficientes.': 'Borlig specializes in creating technology solutions that help companies grow, innovate and become more efficient.',
  'Desenvolvemos sistemas personalizados, aplicativos, sites e plataformas digitais, sempre focando nas necessidades de cada cliente. Além disso, oferecemos suporte completo para modernizar processos, automatizar tarefas, proteger informações e garantir que toda a estrutura tecnológica funcione com segurança e estabilidade.': 'We develop custom systems, applications, websites and digital platforms focused on each client’s needs. We also provide complete support to modernize processes, automate tasks, protect information and keep the entire technology structure secure and stable.',
  'NOSSA EQUIPE': 'OUR TEAM',
  'Nossa equipe reúne especialistas em desenvolvimento de software, inteligência artificial, computação em nuvem, segurança digital, design de interfaces e qualidade de software, permitindo entregar projetos completos, desde a ideia inicial até a implantação e o suporte contínuo.': 'Our team brings together specialists in software development, artificial intelligence, cloud computing, digital security, interface design and software quality, enabling complete projects from the initial idea to deployment and ongoing support.',
  'Também disponibilizamos profissionais e equipes dedicadas para atuar diretamente nos projetos dos nossos clientes, acelerando entregas e agregando conhecimento técnico sempre que necessário.': 'We also provide dedicated professionals and teams to work directly on our clients’ projects, accelerating deliveries and adding technical expertise whenever needed.',
  'NOSSO PROPÓSITO': 'OUR PURPOSE',
  'Crescimento de verdade': 'Real growth',
  'Na Borlig, acreditamos que a tecnologia deve ser uma ferramenta para gerar resultados reais, aumentando a produtividade, reduzindo custos e criando novas oportunidades de crescimento para empresas de todos os segmentos.': 'At Borlig, we believe technology should generate real results by increasing productivity, reducing costs and creating new growth opportunities for companies in every industry.',
  'Mais produtividade': 'More productivity',
  'Menos custos': 'Lower costs',
  'Novas oportunidades': 'New opportunities',
  'Nosso compromisso é transformar desafios em soluções inteligentes, desenvolvendo tecnologia que impulsiona negócios.': 'Our commitment is to turn challenges into intelligent solutions by developing technology that drives business.',
  'Vamos conversar': 'Let’s talk',
  'Entre em contato': 'Get in touch',
  'FALE COM A BORLIG': 'TALK TO BORLIG',
  'Conte um pouco sobre o seu projeto. Nossa equipe está pronta para transformar sua ideia em realidade.': 'Tell us about your project. Our team is ready to turn your idea into reality.',
  'São Paulo - SP': 'São Paulo, Brazil',
  'Atendimento em todo o Brasil': 'Serving clients throughout Brazil',
  'Tecnologia': 'Technology',
  'Estratégia': 'Strategy',
  'CONTE SOBRE O SEU PROJETO': 'TELL US ABOUT YOUR PROJECT',
  'Como podemos ajudar?': 'How can we help?',
  'Empresa': 'Company',
  'Nome *': 'Name *',
  'Email *': 'Email *',
  'Telefone *': 'Phone *',
  'Mensagem': 'Message',
  'Enviar mensagem': 'Send message',
  'Mensagem recebida! Em breve entraremos em contato.': 'Message received! We will contact you soon.',
  'Nome da sua empresa': 'Your company name',
  'Seu nome': 'Your name',
  '(00) 00000-0000': '+1 (000) 000-0000',
  'Fale um pouco sobre sua ideia, desafio ou projeto...': 'Tell us about your idea, challenge or project...',
  'DESTAQUES': 'HIGHLIGHTS',
  'PROCESSO': 'PROCESS',
  'Como este projeto acontece': 'How this project works',
  'Processo transparente, com marcos e aprovações a cada etapa.': 'A transparent process with milestones and approvals at every stage.',
  'Descoberta': 'Discovery',
  'Entendemos objetivos, cenário e prioridades.': 'We understand goals, context and priorities.',
  'Plano': 'Plan',
  'Definimos escopo, arquitetura e cronograma.': 'We define scope, architecture and timeline.',
  'Execução': 'Execution',
  'Construímos em ciclos curtos e mensuráveis.': 'We build in short, measurable cycles.',
  'Validação': 'Validation',
  'Testamos e aprovamos cada entrega.': 'We test and approve each delivery.',
  'Evolução': 'Evolution',
  'Acompanhamos resultados e melhorias.': 'We track results and improvements.',
  'TECNOLOGIAS': 'TECHNOLOGIES',
  'Tecnologias que utilizamos': 'Technologies we use',
  'Escolhemos a stack adequada para cada cenário e objetivo.': 'We choose the right stack for each scenario and goal.',
  'ENTREGÁVEIS': 'DELIVERABLES',
  'O que você vai receber': 'What you will receive',
  'Resultados concretos, entregáveis claros e sem surpresas.': 'Concrete results, clear deliverables and no surprises.',
  'PARA QUEM': 'WHO IT IS FOR',
  'Para quem este serviço é indicado': 'Who this service is for',
  'Soluções adaptadas ao momento e às metas da sua empresa.': 'Solutions tailored to your company’s stage and goals.',
  'Perguntas sobre este serviço': 'Questions about this service',
  'PRONTO PARA COMEÇAR?': 'READY TO START?',
  'Vamos transformar seu desafio em resultado.': 'Let’s turn your challenge into results.',
  'Começar agora': 'Get started',
  'Como o projeto começa?': 'How does the project start?',
  'Como acompanho as entregas?': 'How do I track deliveries?',
  'A Borlig oferece suporte após a entrega?': 'Does Borlig provide support after delivery?',
  'Começamos com uma etapa de descoberta para entender objetivos, contexto, riscos e prioridades antes de definir o plano de execução.': 'We start with a discovery stage to understand goals, context, risks and priorities before defining the execution plan.',
  'Você acompanha marcos, indicadores e evolução por reuniões periódicas e um fluxo transparente de gestão.': 'You track milestones, indicators and progress through regular meetings and a transparent management workflow.',
  'Sim. Podemos assumir sustentação, monitoramento e evolução contínua conforme a necessidade do projeto.': 'Yes. We can provide support, monitoring and continuous evolution according to the project’s needs.',
};

@Directive({
  selector: '[appTranslatePage]',
  standalone: true,
})
export class TranslatePage implements AfterViewInit, OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly language = inject(LanguageService);
  private observer?: MutationObserver;
  private applying = false;
  private originals = new WeakMap<Node, string>();

  constructor() {
    effect(() => {
      this.language.current();
      queueMicrotask(() => this.apply());
    });
  }

  ngAfterViewInit(): void {
    this.apply();
    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(() => {
        if (!this.applying) this.apply();
      });
      this.observer.observe(this.element.nativeElement, { childList: true, subtree: true, characterData: true });
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private apply(): void {
    if (typeof document === 'undefined' || typeof NodeFilter === 'undefined') return;
    this.applying = true;
    const english = this.language.current() === 'en';
    const walker = document.createTreeWalker(this.element.nativeElement, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const current = node.textContent ?? '';
      const trimmed = current.trim();
      if (!trimmed) continue;
      if (EN[trimmed]) this.originals.set(node, trimmed);
      const original = this.originals.get(node) ?? trimmed;
      const translated = english ? EN[original] : original;
      if (translated && translated !== trimmed) node.textContent = current.replace(trimmed, translated);
    }
    const root = this.element.nativeElement as HTMLElement;
    for (const input of Array.from(root.querySelectorAll('[placeholder]')) as (HTMLInputElement | HTMLTextAreaElement)[]) {
      const current = input.placeholder;
      const original = input.dataset['ptPlaceholder'] ?? current;
      input.dataset['ptPlaceholder'] = original;
      input.placeholder = english ? EN[original] ?? original : original;
    }
    this.applying = false;
  }
}
