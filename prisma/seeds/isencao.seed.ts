import { prisma } from '@/lib/prisma'

const isencao = [
  {
    id_Isencao: 1,
    CodIsencao: 'M00',
    mencaoConstarDoc: 'Regime transitório',
    normaAplicavel: '',
    description: 'Regime transitório',
    regimeGeral: false,
    regimeTransitorio: true,
    regimeNaoSujeicao: false,
    Desabilitar: false,
    id_Usuario: 1,
  },
  {
    id_Isencao: 2,
    CodIsencao: 'M02',
    mencaoConstarDoc: 'Transmissão de bens e serviço não sujeita',
    normaAplicavel: '',
    description: 'Transmissão de bens e serviço não sujeita',
    regimeGeral: false,
    regimeTransitorio: false,
    RegimeNaoSujeicao: true,
    Desabilitar: false,
    id_Usuario: 1,
  },
  {
    id_Isencao: 3,
    CodIsencao: 'M04',
    mencaoConstarDoc: 'IVA - Regime de não sujeição',
    normaAplicavel: '',
    description: 'IVA - Regime de não sujeição',
    regimeGeral: false,
    regimeTransitorio: false,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:17:34.670',
    DataModificacao: '2022-03-24 20:08:38.663',
    id_Usuario: 1,
  },
  {
    id_Isencao: 4,
    CodIsencao: 'M10',
    mencaoConstarDoc:
      'Isento nos termos da alínea a) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'A transmissão dos bens alimentares, conforme anexo I do presente código.',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:09:16.720',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:19:38.767',
    DataModificacao: '2022-03-20 23:09:16.720',
    id_Usuario: 1,
  },
  {
    id_Isencao: 5,
    CodIsencao: 'M11',
    mencaoConstarDoc:
      'Isento nos termos da alínea b) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'As transmissões de medicamentos destinados exclusivamente a fins terapêuticos e profilácticos.',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:09:25.897',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:20:06.453',
    DataModificacao: '2022-03-20 23:09:25.897',
    id_Usuario: 1,
  },
  {
    id_Isencao: 6,
    CodIsencao: 'M12',
    mencaoConstarDoc:
      'Isento nos termos da alínea c) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'As transmissões de cadeiras de rodas e veículos semelhantes, accionados manualmente ou por motor, para portadores de deficiência, aparelhos, máquinas de escrever com caracteres braille, impressoras para caracteres braille e os artefactos que se destinam a ser utilizados por invisuais ou a corrigir a audição',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:11:10.490',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:20:52.147',
    DataModificacao: '2022-03-20 23:11:10.490',
    id_Usuario: 1,
  },
  {
    id_Isencao: 7,
    CodIsencao: 'M13',
    mencaoConstarDoc:
      'Isento nos termos da alínea d) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description: 'A transmissão de livros, incluindo em formato digital',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:11:21.003',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:21:21.913',
    DataModificacao: '2022-03-20 23:11:21.003',
    id_Usuario: 1,
  },
  {
    id_Isencao: 8,
    CodIsencao: 'M14',
    mencaoConstarDoc:
      'Isento nos termos da alínea e) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'A locação de bens imóveis destinados a fins habitacionais, designadamente prédios urbanos, fracções autónomas destes ou terrenos para construção, com excepção das prestações de serviços de alojamento efectuadas no âmbito da actividade hoteleira ou de outras com funções análogas',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:11:32.273',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:21:46.230',
    DataModificacao: '2022-03-20 23:11:32.273',
    id_Usuario: 1,
  },
  {
    id_Isencao: 9,
    CodIsencao: 'M15',
    mencaoConstarDoc:
      'Isento nos termos da alínea f) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'As operações sujeitas ao imposto de SISA, ainda que dele isentas',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:11:43.830',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:22:12.593',
    DataModificacao: '2022-03-20 23:11:43.830',
    id_Usuario: 1,
  },
  {
    id_Isencao: 10,
    CodIsencao: 'M16',
    mencaoConstarDoc:
      'Isento nos termos da alínea g) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'A exploração e a prática de jogos de fortuna ou azar e de diversão social, bem como as respectivas comissões e todas as operações relacionadas, quando as mesmas estejam sujeitas a Imposto Especial sobre o Jogos, nos termos da legislação aplicável',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:15:56.140',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:22:35.030',
    DataModificacao: '2022-03-20 23:15:56.140',
    id_Usuario: 1,
  },
  {
    id_Isencao: 11,
    CodIsencao: 'M17',
    mencaoConstarDoc:
      'Isento nos termos da alínea h) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description: 'O transporte colectivo de passageiros',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:16:03.900',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:22:51.903',
    DataModificacao: '2022-03-20 23:16:03.900',
    id_Usuario: 1,
  },
  {
    id_Isencao: 12,
    CodIsencao: 'M18',
    mencaoConstarDoc:
      'Isento nos termos da alínea i) do nº1 artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'As operações de intermediação financeira, incluindo a locação financeira, exceptuando-se aquelas em que uma taxa, ou contraprestação, especifica e predeterminada é cobrada pelo serviço.',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:16:29.500',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:23:17.960',
    DataModificacao: '2022-03-20 23:16:29.500',
    id_Usuario: 1,
  },
  {
    id_Isencao: 13,
    CodIsencao: 'M19',
    mencaoConstarDoc:
      'Isento nos termos da alínea j) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'O seguro de saúde, bem como a prestação de seguros e resseguros do ramo vida;',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:16:36.590',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:23:49.743',
    DataModificacao: '2022-03-20 23:16:36.590',
    id_Usuario: 1,
  },
  {
    id_Isencao: 14,
    CodIsencao: 'M20',
    mencaoConstarDoc:
      'Isento nos termos da alínea k) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'As transmissões de produtos petrolíferos conforme anexo II do presente código.',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:16:45.040',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:24:26.793',
    DataModificacao: '2022-03-20 23:16:45.040',
    id_Usuario: 1,
  },
  {
    id_Isencao: 15,
    CodIsencao: 'M21',
    mencaoConstarDoc:
      'Isento nos termos da alínea l) do nº1 do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'As prestações de serviço que tenham por objecto o ensino, efectuadas por estabelecimentos integrados conforme definidos na Lei de Bases do Sistema de Educação e Ensino, bem como por estabelecimentos de Ensino Superior devidamente reconhecidos pelo Ministério de Tutela.',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:16:53.683',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:24:49.407',
    DataModificacao: '2022-03-20 23:16:53.683',
    id_Usuario: 1,
  },
  {
    id_Isencao: 16,
    CodIsencao: 'M22',
    mencaoConstarDoc: 'Isento nos termos da alínea m) do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'As prestações de serviço médico sanitário, efectuadas por estabelecimentos hospitalares, clinicas, dispensários e similares',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:17:04.560',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:25:09.387',
    DataModificacao: '2022-03-20 23:17:04.560',
    id_Usuario: 1,
  },
  {
    id_Isencao: 17,
    CodIsencao: 'M23',
    mencaoConstarDoc: 'Isento nos termos da alínea n) do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'O transporte de doentes ou feridos em ambulâncias ou outros veículos apropriados efectuados por organismos devidamente autorizados',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:17:11.200',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:25:25.760',
    DataModificacao: '2022-03-20 23:17:11.200',
    id_Usuario: 1,
  },
  {
    id_Isencao: 18,
    CodIsencao: 'M24',
    mencaoConstarDoc: 'Isento nos termos da alínea 0) do artigo 12.º do CIVA',
    normaAplicavel: 'Artigo 12.º do CIVA',
    description:
      'Os equipamentos médicos para o exercício da actividade dos estabelecimentos de saúde.',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:17:18.497',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:25:42.220',
    DataModificacao: '2022-03-20 23:17:18.497',
    id_Usuario: 1,
  },
  {
    id_Isencao: 19,
    CodIsencao: 'M80',
    mencaoConstarDoc: 'Isento nos termos da alinea a) do nº1 do artigo 14.º',
    normaAplicavel: 'Artigo 14.º do CIVA',
    description:
      'As importações definitivas de bens cuja transmissão no território nacional seja isenta de imposto;',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:17:25.643',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:26:03.763',
    DataModificacao: '2022-03-20 23:17:25.643',
    id_Usuario: 1,
  },
  {
    id_Isencao: 20,
    CodIsencao: 'M81',
    mencaoConstarDoc: 'Isento nos termos da alinea b) do nº1 do artigo 14.º',
    normaAplicavel: 'Artigo 14.º do CIVA',
    description:
      'As importações de ouro, moedas ou notas de banco, efectuadas pelo Banco Nacional de Angola',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:17:31.790',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:26:32.950',
    DataModificacao: '2022-03-20 23:17:31.790',
    id_Usuario: 1,
  },
  {
    id_Isencao: 21,
    CodIsencao: 'M82',
    mencaoConstarDoc: 'Isento nos termos da alinea c) do nº1 do artigo 14.º',
    normaAplicavel: 'Artigo 14.º do CIVA',
    description:
      'A importação de bens destinados a ofertas para atenuar os efeitos das calamidades naturais, tais como cheias, tempestades, secas, ciclones, sismos, terramotos e outros de idêntica natureza, desde que devidamente autorizado pelo Titular do Poder Executivo',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:17:40.440',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:26:57.377',
    DataModificacao: '2022-03-20 23:17:40.440',
    id_Usuario: 1,
  },
  {
    id_Isencao: 22,
    CodIsencao: 'M83',
    mencaoConstarDoc: 'Isento nos termos da alinea d) do nº1 do artigo 14.º',
    normaAplicavel: 'Artigo 14.º do CIVA',
    description:
      'A importação de mercadorias ou equipamentos destinadas exclusiva e directamente à execução das operações petrolíferas e mineiras nos termos da Lei que estabelece o Regime Aduaneiro do Sector Petrolífero e do Código Mineiro, respectivamente.',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:17:48.340',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:27:14.123',
    DataModificacao: '2022-03-20 23:17:48.340',
    id_Usuario: 1,
  },
  {
    id_Isencao: 23,
    CodIsencao: 'M84',
    mencaoConstarDoc: 'Isento nos termos da alínea e) do nº1 do artigo 14.º',
    normaAplicavel: 'Artigo 14.º do CIVA',
    description:
      'Importação de moeda estrangeira efectuada pelas instituições financeiras bancárias, nos termos definidos pelo Banco Nacional de Angola.',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:17:56.900',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:27:34.520',
    DataModificacao: '2022-03-20 23:17:56.900',
    id_Usuario: 1,
  },
  {
    id_Isencao: 24,
    CodIsencao: 'M85',
    mencaoConstarDoc: 'Isento nos termos da alinea a) do nº2 do artigo 14.º',
    normaAplicavel: 'Artigo 14.º do CIVA',
    description:
      'No âmbito de tratados e acordos internacionais de que a República de Angola seja parte, nos termos previstos nesses tratados e acordos;',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:18:03.733',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:27:51.123',
    DataModificacao: '2022-03-20 23:18:03.733',
    id_Usuario: 1,
  },
  {
    id_Isencao: 25,
    CodIsencao: 'M86',
    mencaoConstarDoc: 'Isento nos termos da alinea b) do nº2 do artigo 14.º',
    normaAplicavel: 'Artigo 14.º do CIVA',
    description:
      'No âmbito de relações diplomáticas e consulares, quando a isenção resulte de tratados e acordos internacionais celebrados pela República de Angola',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:18:10.717',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 21:30:43.320',
    DataModificacao: '2022-03-20 23:18:10.717',
    id_Usuario: 1,
  },
  {
    id_Isencao: 26,
    CodIsencao: 'M30',
    mencaoConstarDoc: 'Isento nos termos da alínea a) do artigo 15.º do CIVA',
    normaAplicavel: 'Artigo 15.º do CIVA',
    description:
      'As transmissões de bens expedidos ou transportados com destino ao estrangeiro pelo vendedor ou por um terceiro por conta deste',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:18:18.267',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 22:58:11.370',
    DataModificacao: '2022-03-20 23:18:18.267',
    id_Usuario: 1,
  },
  {
    id_Isencao: 27,
    CodIsencao: 'M31',
    mencaoConstarDoc: 'Isento nos termos da alínea b) do artigo 15.º do CIVA',
    normaAplicavel: 'Artigo 15.º do CIVA',
    description:
      'As transmissões de bens de abastecimento postos a bordo das embarcações que efectuem navegação marítima em alto mar e que assegurem o transporte remunerado de passageiros ou o exercício de uma actividade comercial, industrial ou de pesca;',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:18:25.377',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 22:59:02.927',
    DataModificacao: '2022-03-20 23:18:25.377',
    id_Usuario: 1,
  },
  {
    id_Isencao: 28,
    CodIsencao: 'M32',
    mencaoConstarDoc: 'Isento nos termos da alínea c) do artigo 15.º do CIVA',
    normaAplicavel: 'Artigo 15.º do CIVA',
    description:
      'As transmissões de bens de abastecimento postos a bordo das aeronaves utilizadas por companhias de navegação aérea que se dediquem principalmente ao tráfego internacional e que assegurem o transporte remunerado de passageiros, ou o exercício de uma actividade comercial ou industrial',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:18:33.020',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 22:59:26.570',
    DataModificacao: '2022-03-20 23:18:33.020',
    id_Usuario: 1,
  },
  {
    id_Isencao: 29,
    CodIsencao: 'M33',
    mencaoConstarDoc: 'Isento nos termos da alínea d) do artigo 15.º do CIVA',
    normaAplicavel: 'Artigo 15.º do CIVA',
    description:
      'As transmissões de bens de abastecimento postos a bordo das embarcações de salvamento, assistência marítima, pesca costeira e embarcações de guerra, quando deixem o país com destino a um porto ou ancoradouro situado no estrangeiro',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:18:39.980',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 22:59:51.390',
    DataModificacao: '2022-03-20 23:18:39.980',
    id_Usuario: 1,
  },
  {
    id_Isencao: 30,
    CodIsencao: 'M34',
    mencaoConstarDoc: 'Isento nos termos da alínea e) do artigo 15.º do CIVA',
    normaAplicavel: 'Artigo 15.º do CIVA',
    description:
      'As transmissões, transformações, reparações, manutenção, frete e aluguer, incluindo a locação financeira, de embarcações e aeronaves afectas às companhias de navegação aérea e marítima que se dediquem principalmente ao tráfego internacional, assim como as transmissões de bens de abastecimento postos a bordo das mesmas e as prestações de serviços efectuadas com vista à satisfação das suas necessidades directas e da respectiva carga;',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:18:47.550',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:00:09.353',
    DataModificacao: '2022-03-20 23:18:47.550',
    id_Usuario: 1,
  },
  {
    id_Isencao: 31,
    CodIsencao: 'M35',
    mencaoConstarDoc: 'Isento nos termos da alínea f) do artigo 15.º do CIVA',
    normaAplicavel: 'Artigo 15.º do CIVA',
    description:
      'As transmissões de bens efectuadas no âmbito de relações diplomáticas e consulares cuja isenção resulte de acordos e convénios internacionais celebrados por Angola;',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:19:01.167',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:00:38.273',
    DataModificacao: '2022-03-20 23:19:01.167',
    id_Usuario: 1,
  },
  {
    id_Isencao: 32,
    CodIsencao: 'M36',
    mencaoConstarDoc: 'Isento nos termos da alínea g) do artigo 15.º do CIVA',
    normaAplicavel: 'Artigo 15.º do CIVA',
    description:
      'As transmissões de bens destinados a organismos internacionais reconhecidos por Angola ou a membros dos mesmos organismos, nos limites e com as condições fixadas em acordos e convénios internacionais celebrados por Angola',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:19:13.210',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:00:55.100',
    DataModificacao: '2022-03-20 23:19:13.210',
    id_Usuario: 1,
  },
  {
    id_Isencao: 33,
    CodIsencao: 'M37',
    mencaoConstarDoc: 'Isento nos termos da alínea h) do artigo 15.º do CIVA',
    normaAplicavel: 'Artigo 15.º do CIVA',
    description:
      'As transmissões de bens efectuadas no âmbito de tratados e acordos internacionais de que a República de Angola seja parte, quando a isenção resulte desses mesmos tratados e acordos',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:19:23.683',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:01:10.160',
    DataModificacao: '2022-03-20 23:19:23.683',
    id_Usuario: 1,
  },
  {
    id_Isencao: 34,
    CodIsencao: 'M38',
    mencaoConstarDoc: 'Isento nos termos da alínea i) do artigo 15.º do CIVA',
    normaAplicavel: 'Artigo 15.º do CIVA',
    description:
      'O transporte de pessoas provenientes ou com destino ao estrangeiro.',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:19:30.820',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:01:25.007',
    DataModificacao: '2022-03-20 23:19:30.820',
    id_Usuario: 1,
  },
  {
    id_Isencao: 35,
    CodIsencao: 'M90',
    mencaoConstarDoc: 'Isento nos termos da alinea a) do nº1 do artigo 16.º',
    normaAplicavel: 'Artigo 16º do CIVA',
    description:
      'As importações de bens que, sob controlo aduaneiro e de acordo com as disposições aduaneiras especificamente aplicáveis, sejam postas nos regimes de zona franca, que sejam introduzidos em armazéns de regimes aduaneiros ou lojas francas, enquanto permanecerem sob tais regimes;',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:19:38.267',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:01:43.180',
    DataModificacao: '2022-03-20 23:19:38.267',
    id_Usuario: 1,
  },
  {
    id_Isencao: 36,
    CodIsencao: 'M91',
    mencaoConstarDoc: 'Isento nos termos da alinea b) do nº1 do artigo 16.º',
    normaAplicavel: 'Artigo 16º do CIVA',
    description:
      'As transmissões de bens que sejam expedidos ou transportados para as zonas ou depósitos mencionados na alínea anterior, bem como as prestações de serviços directamente conexas com tais transmissões;',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:19:53.967',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:02:02.383',
    DataModificacao: '2022-03-20 23:19:53.967',
    id_Usuario: 1,
  },
  {
    id_Isencao: 37,
    CodIsencao: 'M92',
    mencaoConstarDoc: 'Isento nos termos da alinea c) do nº1 do artigo 16.º',
    normaAplicavel: 'Artigo 16º do CIVA',
    description:
      'As transmissões de bens que se efectuem nos regimes a que se refere a alínea a), assim como as prestações de serviços directamente conexas com tais transmissões, enquanto os bens permanecerem naquelas situações',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:20:01.513',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:02:18.097',
    DataModificacao: '2022-03-20 23:20:01.513',
    id_Usuario: 1,
  },
  {
    id_Isencao: 38,
    CodIsencao: 'M93',
    mencaoConstarDoc: 'Isento nos termos da alinea d) do nº1 do artigo 16.º',
    normaAplicavel: 'Artigo 16º do CIVA',
    description:
      'As transmissões de bens que se encontrem nos regimes de trânsito, draubaque ou importação temporária e as prestações de serviços directamente conexas com tais operações, enquanto os mesmos forem considerados abrangidos por aqueles regimes',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:20:08.427',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:02:52.663',
    DataModificacao: '2022-03-20 23:20:08.427',
    id_Usuario: 1,
  },
  {
    id_Isencao: 39,
    CodIsencao: 'M94',
    mencaoConstarDoc: 'Isento nos termos da alinea e) do nº1 do artigo 16.º',
    normaAplicavel: 'Artigo 16º do CIVA',
    description:
      'A reimportação de bens por quem os exportou, no mesmo estado em que foram exportados, quando beneficiem de isenção de direitos aduaneiros',
    RegimeGeral: true,
    regimeTransitorio: true,
    RegimeNaoSujeicao: true,
    Desabilitar: false,

    ActualizacaoData: '2022-03-20 23:20:15.163',
    id_UsuarioActualizacao: 1,
    DataRegisto: '2020-01-02 23:03:09.023',
    DataModificacao: '2022-03-20 23:20:15.163',
    id_Usuario: 1,
  },
]
export async function seedIsencao() {
  const MapIsencao = await prisma.isencao.findMany()

  if (MapIsencao.length === 0) {
    for (const itemIsencao of isencao) {
      await prisma.isencao.create({
        data: {
          codIsencao: itemIsencao.CodIsencao,
          description: itemIsencao.description,
          mencaoConstarDoc: itemIsencao.mencaoConstarDoc,
          normaAplicavel: itemIsencao.normaAplicavel,
          regimeGeral: itemIsencao.RegimeGeral ?? false,
          regimeNaoSujeicao: itemIsencao.RegimeNaoSujeicao ?? false,
          regimeTransitorio: itemIsencao.regimeTransitorio,
          status: itemIsencao.Desabilitar,
        },
      })
      console.log('Done Isencao.')
    }
  }
}
