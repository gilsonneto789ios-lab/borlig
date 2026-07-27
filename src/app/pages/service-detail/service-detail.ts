import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SiteHeader } from '../../components/site-header/site-header';

interface ServiceContent {
  title: string;
  subtitle: string;
  description: string;
  highlights: { title: string; text: string; icon: string }[];
  technologies: string[];
  deliverables: string[];
  audiences: { title: string; text: string; icon: string }[];
  faqs: { question: string; answer: string }[];
}

const BASE_FAQS = [
  { question: 'Como o projeto começa?', answer: 'Começamos com uma etapa de descoberta para entender objetivos, contexto, riscos e prioridades antes de definir o plano de execução.' },
  { question: 'Como acompanho as entregas?', answer: 'Você acompanha marcos, indicadores e evolução por reuniões periódicas e um fluxo transparente de gestão.' },
  { question: 'A Borlig oferece suporte após a entrega?', answer: 'Sim. Podemos assumir sustentação, monitoramento e evolução contínua conforme a necessidade do projeto.' },
];

const SERVICES: Record<string, ServiceContent> = {
  'desenvolvimento-de-software': {
    title: 'Desenvolvimento de software',
    subtitle: 'Aplicativos, sites, sistemas web e desktop',
    description: 'Criamos produtos digitais sob medida, com arquitetura escalável, experiência intuitiva e código preparado para evoluir.',
    highlights: [
      { title: 'Aplicativos', text: 'Soluções mobile nativas, híbridas e PWA com alta performance.', icon: 'pi-mobile' },
      { title: 'Sistemas web', text: 'Plataformas seguras, rápidas e integradas ao seu negócio.', icon: 'pi-globe' },
      { title: 'Sistemas desktop', text: 'Aplicações robustas para operações e cenários específicos.', icon: 'pi-desktop' },
    ],
    technologies: ['Angular', 'React', 'Node.js', 'Java', 'Python', '.NET', 'Flutter', 'AWS', 'Google Cloud', 'Docker'],
    deliverables: ['Arquitetura escalável e documentada', 'Frontend responsivo', 'APIs e integrações', 'Testes automatizados', 'Pipeline CI/CD', 'Documentação técnica'],
    audiences: [
      { title: 'Startups em crescimento', text: 'Produtos rápidos sem comprometer a evolução futura.', icon: 'pi-chart-line' },
      { title: 'Empresas em modernização', text: 'Substituição de sistemas legados com segurança.', icon: 'pi-building' },
      { title: 'Novos produtos digitais', text: 'Da validação da ideia à operação contínua.', icon: 'pi-lightbulb' },
    ],
    faqs: BASE_FAQS,
  },
  'outsourcing-squads': {
    title: 'Outsourcing / Squads',
    subtitle: 'Especialistas e equipes completas para acelerar suas entregas',
    description: 'Montamos o time certo para o seu desafio, com gestão próxima, métricas claras e profissionais integrados à sua operação.',
    highlights: [
      { title: 'Profissionais especializados', text: 'Desenvolvedores, QA, DevOps, designers e lideranças.', icon: 'pi-users' },
      { title: 'Times ágeis', text: 'Squads preparados para gerar valor desde os primeiros ciclos.', icon: 'pi-bolt' },
      { title: 'Gestão transparente', text: 'Acompanhamento de performance, capacidade e resultados.', icon: 'pi-chart-bar' },
    ],
    technologies: ['Scrum', 'Kanban', 'Jira', 'GitHub', 'GitLab', 'Azure DevOps', 'SonarQube', 'Figma'],
    deliverables: ['Squad multidisciplinar', 'Tech Lead e gestão', 'Onboarding estruturado', 'Métricas semanais', 'Substituição garantida', 'Ramp up e ramp down'],
    audiences: [
      { title: 'Times sobrecarregados', text: 'Mais capacidade para reduzir filas e acelerar roadmaps.', icon: 'pi-clock' },
      { title: 'Projetos estratégicos', text: 'Conhecimento técnico específico quando necessário.', icon: 'pi-star' },
      { title: 'Empresas em expansão', text: 'Escala rápida sem aumentar a complexidade interna.', icon: 'pi-chart-line' },
    ],
    faqs: BASE_FAQS,
  },
  'qa': {
    title: 'Qualidade de software — QA',
    subtitle: 'Testes manuais e automatizados para entregas confiáveis',
    description: 'Estruturamos a qualidade do produto de ponta a ponta, reduzindo falhas, retrabalho e riscos antes que cheguem ao usuário.',
    highlights: [
      { title: 'Automação de testes', text: 'Cobertura contínua para fluxos críticos e regressão.', icon: 'pi-cog' },
      { title: 'Qualidade funcional', text: 'Validação criteriosa da experiência e das regras do negócio.', icon: 'pi-check-circle' },
      { title: 'Performance', text: 'Testes de carga, estabilidade e capacidade do ambiente.', icon: 'pi-gauge' },
    ],
    technologies: ['Cypress', 'Playwright', 'Selenium', 'Postman', 'JMeter', 'k6', 'SonarQube', 'Appium'],
    deliverables: ['Plano de testes', 'Cenários automatizados', 'Relatórios de qualidade', 'Testes de API', 'Testes de performance', 'Pipeline de qualidade'],
    audiences: [
      { title: 'Produtos em evolução', text: 'Evite regressões a cada nova funcionalidade.', icon: 'pi-refresh' },
      { title: 'Operações críticas', text: 'Mais previsibilidade em sistemas essenciais.', icon: 'pi-shield' },
      { title: 'Times sem QA', text: 'Implantação de processos e cultura de qualidade.', icon: 'pi-users' },
    ],
    faqs: BASE_FAQS,
  },
  'design-ui-ux': {
    title: 'Design UI/UX',
    subtitle: 'Experiências digitais simples, bonitas e eficientes',
    description: 'Unimos pesquisa, estratégia e design para criar interfaces que facilitam tarefas, aumentam conversões e fortalecem sua marca.',
    highlights: [
      { title: 'Pesquisa com usuários', text: 'Decisões baseadas em necessidades e comportamentos reais.', icon: 'pi-search' },
      { title: 'Prototipação', text: 'Validação rápida de fluxos antes do desenvolvimento.', icon: 'pi-pencil' },
      { title: 'Design system', text: 'Consistência visual e escala para todo o produto.', icon: 'pi-palette' },
    ],
    technologies: ['Figma', 'FigJam', 'Maze', 'Hotjar', 'Storybook', 'Design Tokens', 'Acessibilidade'],
    deliverables: ['Pesquisa e diagnóstico', 'Jornadas do usuário', 'Wireframes', 'Protótipo navegável', 'Design system', 'Teste de usabilidade'],
    audiences: [
      { title: 'Produtos novos', text: 'Comece com uma experiência validada.', icon: 'pi-lightbulb' },
      { title: 'Baixa conversão', text: 'Identifique e remova barreiras da jornada.', icon: 'pi-chart-line' },
      { title: 'Produtos complexos', text: 'Transforme processos difíceis em fluxos claros.', icon: 'pi-sitemap' },
    ],
    faqs: BASE_FAQS,
  },
  'iot-automacao': {
    title: 'IoT & Automação',
    subtitle: 'Dispositivos conectados e processos mais inteligentes',
    description: 'Conectamos equipamentos, sensores e plataformas para automatizar operações e gerar dados que apoiam decisões em tempo real.',
    highlights: [
      { title: 'Dispositivos conectados', text: 'Integração segura entre hardware, firmware e nuvem.', icon: 'pi-wifi' },
      { title: 'Automação', text: 'Menos tarefas manuais, erros e tempo operacional.', icon: 'pi-cog' },
      { title: 'Dados em tempo real', text: 'Dashboards e alertas para agir no momento certo.', icon: 'pi-chart-bar' },
    ],
    technologies: ['MQTT', 'Arduino', 'ESP32', 'Raspberry Pi', 'AWS IoT', 'Azure IoT', 'Node-RED', 'Grafana'],
    deliverables: ['Prova de conceito', 'Firmware', 'Gateway de integração', 'Plataforma de gestão', 'Dashboards', 'Monitoramento remoto'],
    audiences: [
      { title: 'Indústrias', text: 'Monitoramento de ativos e eficiência produtiva.', icon: 'pi-building' },
      { title: 'Logística', text: 'Rastreabilidade e visibilidade operacional.', icon: 'pi-truck' },
      { title: 'Operações de campo', text: 'Dados confiáveis mesmo em ambientes distribuídos.', icon: 'pi-map-marker' },
    ],
    faqs: BASE_FAQS,
  },
  'devops-sre-cloud': {
    title: 'DevOps / SRE / Cloud',
    subtitle: 'Infraestrutura resiliente e entregas mais rápidas',
    description: 'Automatizamos ambientes, deploys e observabilidade para sua operação ganhar velocidade, estabilidade e previsibilidade.',
    highlights: [
      { title: 'Cloud moderna', text: 'Arquiteturas seguras, escaláveis e disponíveis.', icon: 'pi-cloud' },
      { title: 'CI/CD', text: 'Entregas automatizadas com controles de qualidade.', icon: 'pi-sync' },
      { title: 'Observabilidade', text: 'Métricas, logs e alertas para antecipar incidentes.', icon: 'pi-eye' },
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Grafana'],
    deliverables: ['Arquitetura cloud', 'Infraestrutura como código', 'Pipelines CI/CD', 'Observabilidade', 'Plano de continuidade', 'Runbooks operacionais'],
    audiences: [
      { title: 'Ambientes instáveis', text: 'Reduza incidentes e tempo de recuperação.', icon: 'pi-exclamation-triangle' },
      { title: 'Times com deploy manual', text: 'Automatize entregas com segurança.', icon: 'pi-send' },
      { title: 'Produtos em escala', text: 'Cresça com performance e controle.', icon: 'pi-chart-line' },
    ],
    faqs: BASE_FAQS,
  },
  'inteligencia-artificial': {
    title: 'Inteligência artificial',
    subtitle: 'IA aplicada para automatizar, prever e decidir melhor',
    description: 'Transformamos dados e conhecimento do negócio em soluções inteligentes com impacto mensurável na operação e na experiência do cliente.',
    highlights: [
      { title: 'IA generativa', text: 'Assistentes e automações conectados ao seu contexto.', icon: 'pi-sparkles' },
      { title: 'Machine learning', text: 'Modelos preditivos para decisões mais precisas.', icon: 'pi-chart-line' },
      { title: 'Dados & BI', text: 'Informação organizada e acessível para toda a empresa.', icon: 'pi-database' },
    ],
    technologies: ['OpenAI', 'Python', 'LangChain', 'TensorFlow', 'PyTorch', 'Power BI', 'BigQuery', 'Vector DB'],
    deliverables: ['Diagnóstico de oportunidades', 'Prova de conceito', 'Modelo de IA', 'Integrações', 'Dashboard de resultados', 'Monitoramento do modelo'],
    audiences: [
      { title: 'Atendimento', text: 'Respostas rápidas e personalizadas em escala.', icon: 'pi-comments' },
      { title: 'Operações', text: 'Automação de tarefas e análise de documentos.', icon: 'pi-cog' },
      { title: 'Gestão', text: 'Previsões e insights para decisões melhores.', icon: 'pi-chart-bar' },
    ],
    faqs: BASE_FAQS,
  },
  'finops-migracoes': {
    title: 'FinOps & Migrações',
    subtitle: 'Cloud com custos controlados e migração segura',
    description: 'Planejamos a jornada para a nuvem e criamos uma cultura de controle financeiro sem limitar inovação, desempenho ou crescimento.',
    highlights: [
      { title: 'Migração segura', text: 'Planejamento por ondas com risco controlado.', icon: 'pi-cloud-upload' },
      { title: 'Otimização de custos', text: 'Visibilidade e redução contínua de desperdícios.', icon: 'pi-dollar' },
      { title: 'Governança', text: 'Políticas, indicadores e responsabilidades claras.', icon: 'pi-verified' },
    ],
    technologies: ['AWS Cost Explorer', 'Azure Cost Management', 'Google Cloud Billing', 'Terraform', 'Kubernetes', 'Grafana'],
    deliverables: ['Assessment cloud', 'Plano de migração', 'Landing zone', 'Dashboard de custos', 'Políticas FinOps', 'Roadmap de otimização'],
    audiences: [
      { title: 'Cloud cara', text: 'Identifique desperdícios e oportunidades.', icon: 'pi-dollar' },
      { title: 'Migração planejada', text: 'Mude de ambiente sem interromper o negócio.', icon: 'pi-cloud-upload' },
      { title: 'Ambiente sem governança', text: 'Crie controle sem perder agilidade.', icon: 'pi-shield' },
    ],
    faqs: BASE_FAQS,
  },
  'seguranca-de-dados': {
    title: 'Segurança de dados',
    subtitle: 'Proteção contínua para sistemas, dados e usuários',
    description: 'Identificamos riscos, fortalecemos controles e ajudamos sua empresa a operar com segurança e conformidade.',
    highlights: [
      { title: 'Pentest', text: 'Simulação de ataques para encontrar vulnerabilidades.', icon: 'pi-search' },
      { title: 'Proteção de dados', text: 'Controles alinhados à LGPD e ao risco do negócio.', icon: 'pi-lock' },
      { title: 'Segurança por design', text: 'Proteção incorporada desde a arquitetura.', icon: 'pi-shield' },
    ],
    technologies: ['OWASP', 'Burp Suite', 'Nessus', 'Wazuh', 'SIEM', 'IAM', 'Zero Trust', 'LGPD'],
    deliverables: ['Análise de riscos', 'Pentest', 'Relatório executivo', 'Plano de correção', 'Políticas de segurança', 'Treinamento do time'],
    audiences: [
      { title: 'Dados sensíveis', text: 'Proteja informações críticas e pessoais.', icon: 'pi-database' },
      { title: 'Auditorias', text: 'Prepare processos e evidências de conformidade.', icon: 'pi-file-check' },
      { title: 'Produtos digitais', text: 'Reduza vulnerabilidades antes da produção.', icon: 'pi-code' },
    ],
    faqs: BASE_FAQS,
  },
  'noc-soc': {
    title: 'NOC & SOC',
    subtitle: 'Operação e segurança monitoradas 24 horas por dia',
    description: 'Monitoramos infraestrutura, aplicações e eventos de segurança para detectar falhas e ameaças antes que afetem o seu negócio.',
    highlights: [
      { title: 'Monitoramento 24/7', text: 'Visibilidade contínua de toda a operação.', icon: 'pi-eye' },
      { title: 'Resposta a incidentes', text: 'Ação coordenada para reduzir impacto e indisponibilidade.', icon: 'pi-bolt' },
      { title: 'Gestão por indicadores', text: 'SLA, disponibilidade e segurança em dashboards.', icon: 'pi-chart-bar' },
    ],
    technologies: ['Zabbix', 'Grafana', 'Prometheus', 'Wazuh', 'Elastic', 'SIEM', 'PagerDuty', 'ServiceNow'],
    deliverables: ['Central de monitoramento', 'Alertas e escalonamento', 'Gestão de incidentes', 'Dashboards executivos', 'Relatórios mensais', 'Runbooks'],
    audiences: [
      { title: 'Operação ininterrupta', text: 'Disponibilidade para negócios que não podem parar.', icon: 'pi-clock' },
      { title: 'Infraestrutura complexa', text: 'Visão central de ambientes híbridos.', icon: 'pi-sitemap' },
      { title: 'Risco de ataques', text: 'Detecção e resposta rápida a ameaças.', icon: 'pi-shield' },
    ],
    faqs: BASE_FAQS,
  },
};

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [SiteHeader, RouterLink],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
})
export class ServiceDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  service = SERVICES['desenvolvimento-de-software'];
  faqAberta: number | null = null;

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.service = SERVICES[params.get('slug') ?? ''] ?? SERVICES['desenvolvimento-de-software'];
        this.faqAberta = null;
        if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
      });
  }

  alternarFaq(index: number): void {
    this.faqAberta = this.faqAberta === index ? null : index;
  }
}
