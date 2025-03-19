CREATE DATABASE case_stage;
USE case_stage;

CREATE TABLE area (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE process (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    documentation TEXT,
    tools TEXT,
    area_id BIGINT NOT NULL,
    parent_id BIGINT,
    status ENUM('Planejado', 'Em_Andamento', 'Concluido', 'Cancelado') DEFAULT 'Planejado',
    priority ENUM('Alta', 'Media', 'Baixa') DEFAULT 'Media',
    type ENUM('Sistemico', 'Manual') DEFAULT 'Manual',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (area_id) REFERENCES area(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES process(id) ON DELETE CASCADE
);

CREATE TABLE organizational_unit (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES organizational_unit(id) ON DELETE CASCADE
);

CREATE TABLE responsible (
    process_id BIGINT NOT NULL,
    organizational_unit_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (process_id, organizational_unit_id),
    FOREIGN KEY (process_id) REFERENCES process(id) ON DELETE CASCADE,
    FOREIGN KEY (organizational_unit_id) REFERENCES organizational_unit(id) ON DELETE CASCADE
);

INSERT INTO area (name) VALUES 
('Financeiro'),
('Recursos Humanos'),
('TI'),
('Marketing'),
('Operações');

INSERT INTO process (name, description, documentation, tools, area_id, parent_id, status, priority, type, start_date, end_date) VALUES
('Recrutamento e Seleção', 'Processo para atrair, selecionar e contratar novos colaboradores.', 'Procedimento interno de recrutamento atualizado.', 'Sistema RH, LinkedIn, Catho', 2, NULL, 'Planejado', 'Alta', 'Manual', '2023-01-01', NULL),
('Triagem de Currículos', 'Análise e filtragem inicial dos currículos recebidos.', 'Critérios de seleção e templates de avaliação.', 'Planilhas, Software ATS', 2, 1, 'Em_Andamento', 'Media', 'Manual', '2023-01-03', NULL),
('Entrevistas', 'Realização de entrevistas para avaliação dos candidatos.', 'Guias de entrevista e formulários de avaliação.', 'Calendário, Zoom, Teams', 2, 1, 'Concluido', 'Baixa', 'Manual', '2023-01-05', NULL),
('Teste de Competências', 'Avaliação prática das habilidades técnicas e comportamentais.', 'Procedimentos e dinâmicas de grupo.', 'Ambiente de testes, Plataformas de avaliação', 2, 1, 'Cancelado', 'Alta', 'Sistemico', '2023-01-07', NULL),
('Entrevista Técnica', 'Avaliação dos conhecimentos técnicos dos candidatos.', 'Roteiros técnicos e cases de avaliação.', 'Software de videoconferência, IDE online', 2, 3, 'Planejado', 'Media', 'Manual', '2023-01-06', NULL),
('Entrevista Comportamental', 'Análise das competências comportamentais e culturais dos candidatos.', 'Questionários e escalas de avaliação.', 'Calendário, Formulários online', 2, 3, 'Em_Andamento', 'Alta', 'Manual', '2023-01-06', NULL),
('Simulação de Grupo', 'Atividade prática para avaliar trabalho em equipe.', 'Procedimentos para simulação e critérios de avaliação.', 'Sala de reuniões, Ferramentas colaborativas', 2, 4, 'Concluido', 'Media', 'Manual', '2023-01-08', NULL),
('Teste Prático', 'Avaliação prática individual das habilidades específicas.', 'Testes padronizados e manuais de avaliação.', 'Ambiente de testes, Software de simulação', 2, 4, 'Cancelado', 'Baixa', 'Sistemico', '2023-01-09', NULL),
('Preparação para Teste Prático', 'Orientações e treinamento prévio para o teste prático.', 'Materiais de estudo e tutoriais.', 'Plataformas de EAD, Documentos online', 2, 8, 'Planejado', 'Media', 'Manual', '2023-01-10', NULL),
('Planejamento Estratégico', 'Definição de estratégias e metas de longo prazo para a empresa.', 'Planos estratégicos e análises de mercado.', 'Microsoft Office, Software de planejamento', 4, NULL, 'Em_Andamento', 'Alta', 'Manual', '2023-02-01', '2023-12-31'),
('Análise SWOT', 'Identificação de forças, fraquezas, oportunidades e ameaças.', 'Relatórios e pesquisas de mercado.', 'Planilhas, Software de análise', 4, 10, 'Concluido', 'Media', 'Manual', '2023-02-05', NULL),
('Definição de Metas', 'Estabelecimento de metas mensuráveis e alcançáveis para os departamentos.', 'Documentos de metas e KPIs.', 'ERP, Ferramentas de BI', 4, 10, 'Cancelado', 'Baixa', 'Manual', '2023-02-06', NULL),
('Workshop de Estratégia', 'Sessões de brainstorming para alinhar estratégias e identificar oportunidades.', 'Atas de reuniões e apresentações.', 'Sala de reuniões, Microsoft Teams', 4, 11, 'Planejado', 'Alta', 'Manual', '2023-02-07', NULL),
('Análise de Concorrência', 'Estudo dos concorrentes e análise de posicionamento de mercado.', 'Relatórios setoriais e benchmark.', 'Ferramentas de análise, Internet', 4, 11, 'Em_Andamento', 'Media', 'Sistemico', '2023-02-08', NULL),
('Monitoramento de KPIs', 'Acompanhamento dos indicadores de desempenho e metas estabelecidas.', 'Dashboards e relatórios periódicos.', 'Power BI, Software de BI', 4, 12, 'Concluido', 'Baixa', 'Manual', '2023-02-09', NULL),
('Avaliação de Performance', 'Análise do desempenho dos departamentos com base em KPIs.', 'Relatórios de avaliação e reuniões de feedback.', 'ERP, Planilhas', 4, 15, 'Cancelado', 'Alta', 'Manual', '2023-02-10', NULL),
('Revisão Orçamentária', 'Revisão e ajuste do orçamento anual da empresa.', 'Planilhas financeiras e pareceres.', 'Software Financeiro, Excel', 1, NULL, 'Planejado', 'Media', 'Manual', '2023-03-01', NULL),
('Aprovação do Orçamento', 'Validação e aprovação do orçamento pelo conselho.', 'Ata de reunião e documentos oficiais.', 'ERP, Software de gestão', 1, 17, 'Em_Andamento', 'Alta', 'Manual', '2023-03-05', NULL),
('Ajustes Financeiros', 'Realização de ajustes periódicos no orçamento conforme necessidade.', 'Relatórios financeiros e análises de desempenho.', 'Software Financeiro, Planilhas', 1, 17, 'Concluido', 'Media', 'Manual', '2023-03-06', NULL),
('Reavaliação Semestral', 'Avaliação semestral do desempenho financeiro e orçamento.', 'Relatórios semestrais e reuniões de avaliação.', 'ERP, Power BI', 1, 18, 'Cancelado', 'Baixa', 'Sistemico', '2023-03-10', NULL),
('Gestão de TI', 'Gerenciamento da infraestrutura e suporte de tecnologia.', 'Políticas e procedimentos de TI.', 'Sistema de monitoramento, Help Desk', 3, NULL, 'Planejado', 'Alta', 'Sistemico', '2023-01-15', NULL),
('Manutenção de Servidores', 'Manutenção preventiva e corretiva dos servidores e equipamentos.', 'Planos de manutenção e logs de serviço.', 'Ferramentas de diagnóstico, Software de manutenção', 3, 21, 'Em_Andamento', 'Media', 'Sistemico', '2023-01-20', NULL),
('Segurança da Informação', 'Implementação de medidas para proteção de dados e sistemas.', 'Políticas de segurança e auditorias internas.', 'Firewalls, Sistemas de detecção', 3, 21, 'Concluido', 'Baixa', 'Sistemico', '2023-01-22', NULL),
('Backup e Recuperação', 'Procedimentos para backup e recuperação de dados críticos.', 'Planos de contingência e testes regulares.', 'Soluções de backup, Software de recuperação', 3, 21, 'Cancelado', 'Alta', 'Sistemico', '2023-01-25', NULL),
('Monitoramento de Rede', 'Acompanhamento contínuo da rede para identificar anomalias.', 'Relatórios e alertas de segurança.', 'Sistemas de monitoramento, Software de análise', 3, 23, 'Planejado', 'Media', 'Sistemico', '2023-01-28', NULL),
('Teste de Vulnerabilidade', 'Avaliação periódica da rede para identificar vulnerabilidades.', 'Relatórios de teste e recomendações.', 'Ferramentas de pentest, Software de varredura', 3, 25, 'Concluido', 'Alta', 'Sistemico', '2023-01-30', NULL),
('Campanha de Marketing Digital', 'Planejamento e execução de campanhas digitais.', 'Planos de campanha e métricas de desempenho.', 'Google Ads, Facebook Ads, SEO tools', 4, NULL, 'Cancelado', 'Baixa', 'Manual', '2023-04-01', NULL),
('Criação de Conteudo', 'Desenvolvimento de conteúdo para blogs e redes sociais.', 'Diretrizes editoriais e calendários.', 'CMS, Ferramentas de design', 4, 27, 'Planejado', 'Media', 'Manual', '2023-04-03', NULL),
('Gestao de Redes Sociais', 'Gerenciamento das plataformas de midias sociais.', 'Planos de postagens e relatorios de engajamento.', 'Hootsuite, Ferramentas de analise', 4, 27, 'Em_Andamento', 'Alta', 'Manual', '2023-04-04', NULL),
('Analise de Metricas', 'Monitoramento dos resultados das campanhas digitais.', 'Dashboards e relatorios analiticos.', 'Google Analytics, Power BI', 4, 27, 'Concluido', 'Media', 'Sistemico', '2023-04-05', NULL),
('Publicidade Online', 'Gestao de anuncios pagos em plataformas digitais.', 'Relatorios de performance e otimizacao.', 'Google Ads, Facebook Ads', 4, 29, 'Cancelado', 'Baixa', 'Manual', '2023-04-06', NULL),
('Otimizacao SEO', 'Melhoria do posicionamento organico do site.', 'Relatorios de SEO e estrategias de conteudo.', 'Ferramentas de SEO, Google Search Console', 4, 30, 'Planejado', 'Alta', 'Sistemico', '2023-04-07', NULL),
('Gestao Logistica', 'Coordenacao da cadeia de suprimentos e distribuicao.', 'Procedimentos logisticos e roteiros de entrega.', 'Sistemas ERP, Software de logistica', 5, NULL, 'Em_Andamento', 'Media', 'Sistemico', '2023-02-10', NULL),
('Controle de Estoque', 'Monitoramento e controle do inventario de produtos.', 'Planilhas de inventario e procedimentos de auditoria.', 'Sistema ERP, Software de estoque', 5, 33, 'Concluido', 'Baixa', 'Sistemico', '2023-02-12', NULL),
('Distribuicao e Transporte', 'Gerenciamento das rotas e logistica de entrega.', 'Mapas de rotas e cronogramas de entrega.', 'Software de roteirizacao, GPS', 5, 33, 'Cancelado', 'Alta', 'Manual', '2023-02-13', NULL),
('Roteirizacao de Entregas', 'Planejamento das rotas para otimizacao de entregas.', 'Procedimentos e softwares de roteirizacao.', 'Sistemas de roteirizacao, Mapas digitais', 5, 35, 'Planejado', 'Media', 'Sistemico', '2023-02-14', NULL),
('Auditoria Interna', 'Verificacao e avaliacao dos processos internos da empresa.', 'Relatorios de auditoria e planos de acao.', 'Software de auditoria, Planilhas', 1, NULL, 'Em_Andamento', 'Alta', 'Manual', '2023-03-15', NULL),
('Revisao de Compliance', 'Verificacao do cumprimento das normas e regulamentos internos.', 'Checklists de compliance e auditorias periodicas.', 'Sistemas de monitoramento, Documentos normativos', 1, 37, 'Concluido', 'Media', 'Manual', '2023-03-16', NULL),
('Feedback e Melhoria Continua', 'Coleta de feedback para aprimorar processos internos.', 'Pesquisas de satisfacao e relatorios de melhoria.', 'Formularios online, Reunioes', 1, 37, 'Cancelado', 'Baixa', 'Sistemico', '2023-03-17', NULL),
('Plano de Acao Corretiva', 'Desenvolvimento de acoes para corrigir nao conformidades identificadas.', 'Relatorios de auditoria e planos de acao detalhados.', 'Planilhas, Software de gestao', 1, 38, 'Planejado', 'Alta', 'Manual', '2023-03-18', NULL),
('Monitoramento Pos-Auditoria', 'Acompanhamento das acoes corretivas implementadas.', 'Relatorios de acompanhamento e indicadores de desempenho.', 'Sistema de gestao, Dashboards', 1, 40, 'Em_Andamento', 'Media', 'Manual', '2023-03-20', NULL);

INSERT INTO organizational_unit (name, parent_id) VALUES 
('Departamento de TI', NULL),
('Departamento de RH', NULL),
('Departamento Financeiro', NULL),
('Departamento de Marketing', NULL),
('Departamento de Operações', NULL);

INSERT INTO organizational_unit (name, parent_id) VALUES 
('Suporte Técnico', 1),  
('Infraestrutura', 1),  
('Recrutamento', 2),  
('Treinamento', 2),  
('Contabilidade', 3), 
('Tesouraria', 3),  
('Publicidade', 4),  
('Pesquisa de Mercado', 4),  
('Logística', 5), 
('Produção', 5);

INSERT INTO responsible (process_id, organizational_unit_id) VALUES
(1,8),
(2,8),
(3,2),
(4,2),
(5,8),
(6,2),
(7,2),
(8,2),
(9,8),
(10,4),
(11,13),
(12,4),
(13,4),
(14,13),
(15,4),
(16,4),
(27,12),
(28,12),
(29,12),
(30,13),
(31,12),
(32,12),
(17,3),
(18,3),
(19,3),
(20,3),
(37,3),
(38,3),
(39,3),
(40,3),
(41,3),
(21,1),
(22,7),
(23,1),
(24,6),
(25,7),
(26,1),
(33,14),
(34,14),
(35,5),
(36,14);
