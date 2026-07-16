"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight, X, Compass } from "lucide-react"

// Interface interna para mapear a estrutura flexível de dados
interface PlanItem {
  title: string;
  image: string;
}

// Interface para as áreas de lazer/comuns interativas
interface AmenityItem {
  category: string; // Ex: "Piscina", "Academia", "Salão de Festas", "Rooftop"
  title: string;
  description: string;
  image: string;
}

// AJUSTADO: Adicionado 'amenities' opcional para comportar empreendimentos multi-torres que dividem o lazer por torre
interface TowerItem {
  name: string;
  plans: PlanItem[];
  amenities?: AmenityItem[]; 
}

interface PropertyItem {
  id: number;
  name: string;
  neighborhood: string;
  address: string;
  bedrooms: string;
  area: string;
  price: string;
  image: string;
  video: string;
  plans?: PlanItem[];         // Para empreendimentos de torre única
  towers?: TowerItem[];       // Para empreendimentos multi-torres
  amenities?: AmenityItem[];   // Áreas comuns gerais do empreendimento
}

const properties: PropertyItem[] = [
  {
    id: 1,
    name: "Altus - Tarjab",
    neighborhood: "Ipiranga",
    address: "Rua Visconde de Guaratiba, nº 105",
    bedrooms: "2 a 3",
    area: "72 a 93 m²",
    price: "R$ 859.000 - R$ 1.367.000",
    image: "/images/altus.png",
    video: "https://www.youtube.com/embed/XpTWGPeNIX4",
    plans: [
      { title: "Planta Tipo - 2 Dormitórios + 1 Suíte (72.83m²)", image: "/images/plantas/altus/72.83.png" },
      { title: "Planta Tipo - 2 Dormitórios + 1 Suíte (73.61m²)", image: "/images/plantas/altus/73.61.png" },
      { title: "Planta Tipo - 2 Dormitórios + 1 Suíte (74.41m²)", image: "/images/plantas/altus/74.41.png" },
      { title: "Planta Tipo - 3 Dormitórios + 1 Suíte (93.73m²)", image: "/images/plantas/altus/93.73.png" },
      { title: "Planta Tipo - 2 Suítes (93.73m²) c/ Living Ampliado", image: "/images/plantas/altus/93.73livingAmpli.png" }
    ],
    amenities: [
      {
        category: "Fachada",
        title: "Fachada Contemporânea",
        description: "Arquitetura moderna com acabamento sofisticado, integrada harmoniosamente à paisagem urbana do Ipiranga.",
        image: "/images/lazer/altus/fachada.png"
      },
      {
        category: "Hall",
        title: "Hall de Entrada",
        description: "Um espaço imponente e acolhedor, projetado para receber seus convidados com elegância e requinte.",
        image: "/images/lazer/altus/hall.png"
      },
      {
        category: "Piscina",
        title: "Piscina Climatizada",
        description: "Um mergulho refrescante ou momentos de relaxamento em um deck integrado com projeto paisagístico refinado.",
        image: "/images/lazer/altus/piscina.png"
      },
      {
        category: "Academia",
        title: "Academia de Alta Performance",
        description: "Espaço fitness completo e equipado com aparelhos modernos para manter sua rotina de saúde e bem-estar em dia.",
        image: "/images/lazer/altus/academia.png"
      },
      {
        category: "Gourmet",
        title: "Espaço Gourmet",
        description: "Ambiente sofisticado e ideal para preparar jantares especiais e compartilhar momentos inesquecíveis.",
        image: "/images/lazer/altus/espacoGourmet.png"
      },
      {
        category: "Churrasqueira",
        title: "Churrasqueira & Terraço",
        description: "Área externa agradável dedicada a momentos descontraídos de confraternização com amigos e família.",
        image: "/images/lazer/altus/churrasqueira.png"
      },
      {
        category: "Salão de Festas",
        title: "Salão de Festas Elegante",
        description: "Estrutura premium totalmente decorada e planejada para celebrar grandes conquistas e datas especiais.",
        image: "/images/lazer/altus/salaofestas.png"
      },
      {
        category: "Lounge",
        title: "Lounge de Convivência",
        description: "Um refúgio confortável e moderno para relaxar, ler um bom livro ou conversar com vizinhos.",
        image: "/images/lazer/altus/lounge.png"
      },
      {
        category: "Fireplace",
        title: "Praça da Lareira (Fireplace)",
        description: "Espaço externo charmoso e acolhedor para desfrutar de noites agradáveis sob o céu aberto com muito calor.",
        image: "/images/lazer/altus/firePlace.png"
      },
      {
        category: "Jogos",
        title: "Sala de Jogos",
        description: "Diversão e entretenimento garantidos em um ambiente jovem, dinâmico e interativo.",
        image: "/images/lazer/altus/salaJogos.png"
      },
      {
        category: "Brinquedoteca",
        title: "Brinquedoteca Lúdica",
        description: "Área planejada especialmente para o desenvolvimento, segurança e criatividade das crianças.",
        image: "/images/lazer/altus/brinquedoteca.png"
      },
      {
        category: "Quadra",
        title: "Quadra Recreativa",
        description: "O espaço ideal para a prática de esportes e atividades físicas sem precisar sair de casa.",
        image: "/images/lazer/altus/quadra.png"
      },
      {
        category: "Pet Place",
        title: "Pet Place",
        description: "Área reservada e segura ao ar livre para o seu pet jogar, correr e se exercitar.",
        image: "/images/lazer/altus/petPlace.png"
      },
      {
        category: "Bem-estar",
        title: "Sala de Massagem",
        description: "Um ambiente relaxante, silencioso e planejado para renovar as energias e aliviar o estresse do cotidiano.",
        image: "/images/lazer/altus/salaMassagem.png"
      },
      {
        category: "Bicicletário",
        title: "Bicicletário Organizado",
        description: "Vagas seguras para armazenar sua bike com praticidade, incentivando a mobilidade urbana sustentável.",
        image: "/images/lazer/altus/salaBicicletario.png"
      },
      {
        category: "Facilidades",
        title: "Minimercado Autônomo",
        description: "Conveniência e praticidade 24 horas por dia para compras rápidas e de emergência dentro do condomínio.",
        image: "/images/lazer/altus/minimercado.png"
      }
    ]
  },
 {
  "id": 2,
  "name": "Isla - Tarjab",
  "neighborhood": "Morumbi",
  "address": "Rua Samia Haddad, nº 94",
  "bedrooms": "1 a 2",
  "area": "33 a 51 m²",
  "price": "R$ 300.000 - R$ 572.000",
  "image": "/images/isla.png",
  "video": "https://www.youtube.com/embed/k4GM36T941o",
  "plans": [
    { "title": "Planta Tipo - 1 Dormitório (33.68m²)", "image": "/images/plantas/isla/33.68.png" },
    { "title": "Planta Tipo - 2 Dormitórios (41m²)", "image": "/images/plantas/isla/41.png" },
    { "title": "Planta Tipo - 2 Dormitórios (44.06m²)", "image": "/images/plantas/isla/44.png" },
    { "title": "Planta Tipo - 2 Dormitórios (49m²)", "image": "/images/plantas/isla/49.png" },
    { "title": "Planta Tipo - 2 Dormitórios (51m²)", "image": "/images/plantas/isla/51.png" }
  ],
  "amenities": [
    {
      "category": "Academia",
      "title": "Fitness Completo",
      "description": "Equipamentos modernos para manter a sua rotina de treinos em dia sem precisar sair de casa.",
      "image": "/images/lazer/isla/academia.png"
    },
    {
      "category": "Churrasqueira",
      "title": "Espaço Grill & Gourmet",
      "description": "O lugar perfeito para reunir amigos e família ao redor de um bom churrasco nos finais de semana.",
      "image": "/images/lazer/isla/churrasqueira.png"
    },
    {
      "category": "Coworking",
      "title": "Coworking Integrado",
      "description": "Infraestrutura silenciosa, tomadas USB e wi-fi de alta velocidade para o seu home office render mais.",
      "image": "/images/lazer/isla/coWorking.png"
    },
    {
      "category": "Studio Video Maker",
      "title": "Studio Creator",
      "description": "Espaço acústico e idealizado para a gravação de vídeos, podcasts e geração de conteúdo digital.",
      "image": "/images/lazer/isla/estudioVideoMaker.png"
    },
    {
      "category": "Rooftop",
      "title": "Lounge Rooftop com Vista",
      "description": "Aprecie o pôr do sol do Morumbi em um espaço planejado para relaxar e contemplar a cidade.",
      "image": "/images/lazer/isla/rooftop.png"
    },
    {
      "category": "Lareira Rooftop",
      "title": "Lareira sob as Estrelas",
      "description": "Aproveite as noites mais frias em um ambiente acolhedor, charmoso e integrado ao rooftop.",
      "image": "/images/lazer/isla/lareiraRooftop.png"
    },
    {
      "category": "Pet Place",
      "title": "Pet Place",
      "description": "Um espaço reservado ao ar livre para o seu pet brincar e se exercitar com total segurança.",
      "image": "/images/lazer/isla/petPlace.png"
    },
    {
      "category": "Piscina",
      "title": "Piscina com Deck",
      "description": "Refresque-se nos dias quentes e aproveite momentos de lazer e descanso à beira d'água.",
      "image": "/images/lazer/isla/piscina.png"
    },
    {
      "category": "Salão de Festas",
      "title": "Salão de Festas",
      "description": "Ambiente sofisticado e completo para receber os seus amigos e celebrar momentos especiais.",
      "image": "/images/lazer/isla/salaoFestas.png"
    },
    {
      "category": "Playground",
      "title": "Playground lúdico",
      "description": "Área segura e divertida projetada para estimular o lazer e a imaginação das crianças ao ar livre.",
      "image": "/images/lazer/isla/playground.png"
    },
    {
      "category": "Redario",
      "title": "Redário Zen",
      "description": "Espaço de descompressão ideal para deitar na rede, ler um livro e relaxar ao som da natureza.",
      "image": "/images/lazer/isla/redario.png"
    },
    {
      "category": "Salão de Jogos",
      "title": "Arena de Jogos",
      "description": "Espaço moderno de entretenimento e diversão, ideal para descontrair entre amigos nas horas vagas.",
      "image": "/images/lazer/isla/salaoJogos.png"
    }
  ]
},
  {
    id: 3,
    name: "Riserva - Tarjab",
    neighborhood: "Vila Clementino",
    address: "Av. Dr. Altino Arantes, nº 222",
    bedrooms: "1 a 4",
    area: "31 a 172 m²",
    price: "R$ 543.000 - R$ 3.438.000",
    image: "/images/riserva.png",
    video: "https://www.youtube.com/embed/EaycLCVoD4M",
    towers: [
      {
        name: "Bosque",
        plans: [
          { title: "Planta Tipo - 3 Suítes (150m²)", image: "/images/plantas/riserva/bosque/150.png" },
          { title: "Planta Tipo - 3 Suítes (151m²)", image: "/images/plantas/riserva/bosque/151.png" },
          { title: "Planta Tipo - 3 Suítes (156m²)", image: "/images/plantas/riserva/bosque/156.png" },
          { title: "Planta Tipo - 3 Suítes (157m²)", image: "/images/plantas/riserva/bosque/157.png" },
          { title: "Planta Tipo - 4 Dormitórios c/ 2 Suítes (172m²)", image: "/images/plantas/riserva/bosque/172.png" },
          { title: "Planta Tipo - 3 Suítes c/ 1 Home Office (172m²)", image: "/images/plantas/riserva/bosque/172h.png" }
        ],
        amenities: [
          {
            category: "Academia",
            title: "Academia Equipada",
            description: "Espaço fitness completo com aparelhos modernos para sua rotina de treinos na Vila Clementino.",
            image: "/images/lazer/riserva/bosque/academia.png"
          },
          {
            category: "Bicicletário",
            title: "Bicicletário Organizado",
            description: "Vagas seguras para armazenar sua bike com total praticidade e segurança.",
            image: "/images/lazer/riserva/bosque/bicicletario.png"
          },
          {
            category: "Brinquedoteca",
            title: "Brinquedoteca Lúdica",
            description: "Um ambiente colorido e seguro feito para a diversão e desenvolvimento das crianças.",
            image: "/images/lazer/riserva/bosque/brinquedoteca.png"
          },
          {
            category: "Gourmet",
            title: "Espaço Gourmet",
            description: "Ambiente sofisticado e acolhedor para preparar jantares e celebrar com convidados.",
            image: "/images/lazer/riserva/bosque/espacoGourmet.png"
          },
          {
            category: "Lounge",
            title: "Lounge Coworking",
            description: "Estações confortáveis para o seu home office com total foco, infraestrutura e tranquilidade.",
            image: "/images/lazer/riserva/bosque/lounge_coWorking.png"
          },
          {
            category: "Lounge",
            title: "Lounge Externo",
            description: "Um refúgio agradável ao ar livre para relaxar e desfrutar de ótimos momentos de descanso.",
            image: "/images/lazer/riserva/bosque/loungeExterno.png"
          },
          {
            category: "Pet Place",
            title: "Pet Place com Pet Shower",
            description: "Estrutura completa para a diversão e os cuidados com o banho do seu pet em um só lugar.",
            image: "/images/lazer/riserva/bosque/petPlaceComPetShower.png"
          },
          {
            category: "Piscina",
            title: "Piscina Adulto e Infantil",
            description: "Um deck refinado e integrado ao paisagismo para refrescar os seus dias.",
            image: "/images/lazer/riserva/bosque/piscina.png"
          },
          {
            category: "Playground",
            title: "Playground ao Ar Livre",
            description: "Espaço externo com brinquedos seguros para a recreação das crianças.",
            image: "/images/lazer/riserva/bosque/playground.png"
          },
          {
            category: "Rooftop",
            title: "Rooftop Exclusivo",
            description: "Um terraço imponente com uma bela vista da região para relaxar no topo da torre Bosque.",
            image: "/images/lazer/riserva/bosque/rooftop.png"
          },
          {
            category: "Bem-estar",
            title: "Sala de Massagem",
            description: "Espaço silencioso e idealizado para renovar as suas energias e aliviar o estresse diário.",
            image: "/images/lazer/riserva/bosque/salaMassagem.png"
          },
          {
            category: "Salão de Festas",
            title: "Salão de Festas Elegante",
            description: "Infraestrutura de alto padrão e decorada para receber seus convidados em datas especiais.",
            image: "/images/lazer/riserva/bosque/salaofestas.png"
          }
        ]
      },
      {
        name: "Horizonte",
        plans: [
          { title: "Planta Tipo - 1 Dormitório (31m²)", image: "/images/plantas/riserva/horizonte/31.png" },
          { title: "Planta Tipo - 1 Dormitório (31m²)", image: "/images/plantas/riserva/horizonte/31-2.png" },
          { title: "Planta Tipo - 1 Dormitório (32m²)", image: "/images/plantas/riserva/horizonte/32.png" },
          { title: "Planta Tipo - 1 Dormitório (32m²)", image: "/images/plantas/riserva/horizonte/32-2.png" },
          { title: "Planta Tipo - 1 Dormitório (32m²)", image: "/images/plantas/riserva/horizonte/32-3.png" }
        ],
        amenities: [
          {
            category: "Academia",
            title: "Academia Moderna",
            description: "Espaço fitness dinâmico e otimizado para manter o foco nos seus exercícios diários.",
            image: "/images/lazer/riserva/horizonte/academia.png"
          },
          {
            category: "Coworking",
            title: "Espaço Coworking",
            description: "Ambiente reservado e equipado para trabalhar ou estudar com comodidade e silêncio.",
            image: "/images/lazer/riserva/horizonte/coWorking.png"
          },
          {
            category: "Facilidades",
            title: "Lavanderia Compartilhada",
            description: "Praticidade para cuidar da lavagem das suas roupas com equipamentos modernos no próprio condomínio.",
            image: "/images/lazer/riserva/horizonte/lavanderia.png"
          },
          {
            category: "Pet Place",
            title: "Pet Place do Horizonte",
            description: "Espaço ao ar livre e seguro para o seu animal de estimação correr e brincar.",
            image: "/images/lazer/riserva/horizonte/petPlace.png"
          },
          {
            category: "Convivência",
            title: "Praça de Convivência",
            description: "Lindo projeto paisagístico para relaxar e desfrutar de bons momentos ao ar livre.",
            image: "/images/lazer/riserva/horizonte/praca.png"
          },
          {
            category: "Lounge",
            title: "Rooftop Lounge",
            description: "Um espaço elevado e moderno para contemplar o pôr do sol e a vista do horizonte da Vila Clementino.",
            image: "/images/lazer/riserva/horizonte/roofTopLounge.png"
          },
          {
            category: "Salão de Festas",
            title: "Salão de Festas Integrado",
            description: "Espaço acolhedor e otimizado para celebrar conquistas com seus amigos próximos.",
            image: "/images/lazer/riserva/horizonte/salaofestas.png"
          },
          {
            category: "Lounge",
            title: "Terraço Lounge",
            description: "Área de estar externa, charmosa e decorada para socializar sob o céu aberto.",
            image: "/images/lazer/riserva/horizonte/terracoLounge.png"
          }
        ]
      }
    ]
  },

  {
    id: 4,
    name: "Vila Ares - Tarjab",
    neighborhood: "Saúde",
    address: "Rua dos Alcatrazes, nº 37",
    bedrooms: "1 a 3",
    area: "46 a 91 m²",
    price: "R$ 747.000 - R$ 1.380.000",
    image: "/images/vila-ares.png",
    video: "https://www.youtube.com/embed/14syZFP7nxQ",
    towers: [
      {
        name: "Aura",
        plans: [
          { title: "Planta Tipo - 60m²", image: "/images/plantas/vilaares/aura/60.png" },
          { title: "Planta Tipo - 60m² c/ Sala Ampliada", image: "/images/plantas/vilaares/aura/60ampli.png" },
          { title: "Planta Tipo - 62m²", image: "/images/plantas/vilaares/aura/62.png" },
          { title: "Planta Tipo - 63m²", image: "/images/plantas/vilaares/aura/63.png" },
          { title: "Planta Tipo - 64m²", image:"/images/plantas/vilaares/aura/64.png" },
          { title: "Planta Tipo - 76m²", image: "/images/plantas/vilaares/aura/76.png" },
          { title: "Planta Garden - 76m²", image:"/images/plantas/vilaares/aura/76garden.png" },
          { title: "Planta Garden - 76m² + Sala Ampliada", image: "/images/plantas/vilaares/aura/76gardenAmpli.png" },
          { title: "Planta Tipo - 77m²", image: "/images/plantas/vilaares/aura/77.png" },
          { title: "Planta Tipo - 90m²", image: "/images/plantas/vilaares/aura/90.png" },
          { title: "Planta Tipo - 90m² c/ Sala Ampliada", image: "/images/plantas/vilaares/aura/90ampli.png" }
        ]
      },
      {
        name: "Sereno",
        plans: [
          { title: "Planta Tipo - 62m²", image: "/images/plantas/vilaares/sereno/62.png" },
          { title: "Planta Tipo - 62m² c/ Sala Ampliada", image: "/images/plantas/vilaares/sereno/62ampli.png" },
          { title: "Planta Tipo - 74m²", image: "/images/plantas/vilaares/sereno/74.png" },
          { title: "Planta Tipo - 74m² c/ Sala Ampliada", image: "/images/plantas/vilaares/sereno/74ampli.png" },
          { title: "Planta Tipo - 90m²", image: "/images/plantas/vilaares/sereno/90.png" },
          { title: "Planta Tipo - 91m²", image: "/images/plantas/vilaares/sereno/91.png" }
        ]
      }
      // FUTURO: quando a Torre Ritmo for lançada, adicionar aqui um novo item de torre, por exemplo:
      // {
      //   name: "Ritmo",
      //   plans: [
      //     { title: "Planta Tipo - XXm²", image: "/images/plantas/vilaares/ritmo/XX.png" },
      //   ],
      //   amenities: [
      //     { category: "Categoria", title: "Título", description: "Descrição.", image: "/images/lazer/vilaares/ritmo/nomeDoArquivo.png" },
      //   ]
      // }
      // IMPORTANTE: quando isso acontecer, o lazer deixa de ser compartilhado (o campo "amenities" abaixo, no nível do
      // empreendimento, precisa ser removido ou movido para dentro de cada torre — Aura, Sereno e Ritmo — seguindo o
      // mesmo padrão já usado no Riserva e no Eucalys, para que as abas de torre apareçam corretamente no modal de lazer.
    ],
    amenities: [
      {
        category: "Academia",
        title: "Academia Equipada",
        description: "Espaço fitness completo com aparelhos modernos para manter sua rotina de treinos em dia na Saúde.",
        image: "/images/lazer/vilaares/academia.png"
      },
      {
        category: "Salão de Festas",
        title: "Apoio do Salão de Festas",
        description: "Estrutura de apoio completa para receber seus convidados com praticidade em grandes celebrações.",
        image: "/images/lazer/vilaares/apoioSalaoFestas.png"
      },
      {
        category: "Brinquedoteca",
        title: "Brinquedoteca Lúdica",
        description: "Área planejada especialmente para o desenvolvimento, segurança e criatividade das crianças.",
        image: "/images/lazer/vilaares/brinquedoteca.png"
      },
      {
        category: "Coworking",
        title: "Espaço Coworking",
        description: "Estações de trabalho modernas e confortáveis para o seu home office com total foco e tranquilidade.",
        image: "/images/lazer/vilaares/coWorking.png"
      },
      {
        category: "Delivery",
        title: "Espaço Delivery",
        description: "Espaço dedicado e seguro para receber e armazenar suas encomendas e compras com total praticidade.",
        image: "/images/lazer/vilaares/espacoDelivery.png"
      },
      {
        category: "Gourmet",
        title: "Espaço Gourmet & Churrasqueira",
        description: "Ambiente sofisticado e equipado para preparar jantares especiais e churrascos com amigos e família.",
        image: "/images/lazer/vilaares/espacoGourmetChurrasqueira.png"
      },
      {
        category: "Hall",
        title: "Hall de Entrada",
        description: "Um espaço imponente e acolhedor, projetado para receber seus convidados com elegância e requinte.",
        image: "/images/lazer/vilaares/hall.png"
      },
      {
        category: "Hall",
        title: "Hall de Entrada - Torre 2",
        description: "Recepção elegante e exclusiva para os moradores da segunda torre do empreendimento.",
        image: "/images/lazer/vilaares/hall_Torre2.png"
      },
      {
        category: "Lounge",
        title: "Lounge de Convivência",
        description: "Um refúgio confortável e moderno para relaxar, ler um bom livro ou conversar com vizinhos.",
        image: "/images/lazer/vilaares/lounge.png"
      },
      {
        category: "Pet Place",
        title: "Pet Place",
        description: "Área reservada e segura ao ar livre para o seu pet jogar, correr e se exercitar.",
        image: "/images/lazer/vilaares/petPlace.png"
      },
      {
        category: "Pet Place",
        title: "Pet Place - Torre 2",
        description: "Segundo espaço dedicado ao lazer e bem-estar do seu pet, próximo à segunda torre.",
        image: "/images/lazer/vilaares/Petplace2.png"
      },
      {
        category: "Piscina",
        title: "Piscina Climatizada",
        description: "Um mergulho refrescante ou momentos de relaxamento em um deck integrado com projeto paisagístico refinado.",
        image: "/images/lazer/vilaares/piscina.png"
      },
      {
        category: "Playground",
        title: "Playground Infantil",
        description: "Área externa repleta de brinquedos para as crianças se divertirem ao ar livre com segurança.",
        image: "/images/lazer/vilaares/playground.png"
      },
      {
        category: "Quadra",
        title: "Quadra Poliesportiva",
        description: "O espaço ideal para a prática de esportes e atividades físicas sem precisar sair de casa.",
        image: "/images/lazer/vilaares/quadra.png"
      },
      {
        category: "Bem-estar",
        title: "Sala de Massagem",
        description: "Um ambiente relaxante, silencioso e planejado para renovar as energias e aliviar o estresse do cotidiano.",
        image: "/images/lazer/vilaares/salaMassagem.png"
      },
      {
        category: "Salão de Festas",
        title: "Salão de Festas Elegante",
        description: "Estrutura premium totalmente decorada e planejada para celebrar grandes conquistas e datas especiais.",
        image: "/images/lazer/vilaares/salaoFestas.png"
      },
      {
        category: "Salão de Festas",
        title: "Salão de Festas - Torre 2",
        description: "Segundo salão de festas, exclusivo para os moradores da segunda torre celebrarem com conforto.",
        image: "/images/lazer/vilaares/salaoFestas_Torre2.png"
      },
      {
        category: "Jogos",
        title: "Salão de Jogos",
        description: "Diversão e entretenimento garantidos em um ambiente jovem, dinâmico e interativo.",
        image: "/images/lazer/vilaares/salaoJogos.png"
      }
    ]
  },
  {
    id: 5,
    name: "Viccino - Tarjab",
    neighborhood: "Mirandópolis",
    address: "Av. Senador Casemiro da Rocha, nº 683",
    bedrooms: "1 a 3",
    area: "35 a 128 m²",
    price: "R$ 523.000 - R$ 2.262.000",
    image: "/images/viccino.png",
    video: "https://www.youtube.com/embed/PH1IqA3H2t8",
    towers: [
      {
        name: "1",
        plans: [
          { title: "Planta Tipo - 3 Suítes (128m²)", image: "/images/plantas/viccino/torre1/128.png" },
          { title: "Planta Tipo - 3 Dormitórios c/ 1 Suíte (90m²)", image: "/images/plantas/viccino/torre1/90.png" }
        ]
      },
      {
        name: "2",
        plans: [
          { title: "Planta Tipo - 2 Dormitórios c/ 1 Suíte (60m²)", image: "/images/plantas/viccino/torre2/60.png" },
          { title: "Planta Tipo - 1 Dormitório (35m²)", image: "/images/plantas/viccino/torre2/35.png" }
        ]
      },
    ],
    amenities: [
      {
        category: "Academia",
        title: "Academia Completa",
        description: "Espaço fitness equipado com aparelhos modernos para manter sua rotina de treinos em dia em Mirandópolis.",
        image: "/images/lazer/viccino/academia.png"
      },
      {
        category: "Bicicletário",
        title: "Bicicletário Organizado",
        description: "Vagas seguras para armazenar sua bike com praticidade, incentivando a mobilidade sustentável.",
        image: "/images/lazer/viccino/bicicletario.png"
      },
      {
        category: "Brinquedoteca",
        title: "Brinquedoteca Lúdica",
        description: "Área planejada especialmente para o desenvolvimento, segurança e criatividade das crianças.",
        image: "/images/lazer/viccino/brinquedoteca.png"
      },
      {
        category: "Churrasqueira",
        title: "Espaço Churrasqueira",
        description: "Ambiente agradável e bem equipado para momentos de confraternização com amigos e familiares.",
        image: "/images/lazer/viccino/churrasqueira.png"
      },
      {
        category: "Fitness Externo",
        title: "Área Fitness Externa",
        description: "Espaço ao ar livre planejado para exercícios funcionais, alongamentos e treinos dinâmicos.",
        image: "/images/lazer/viccino/fitnessExterno.png"
      },
      {
        category: "Piscina",
        title: "Piscina Revigorante",
        description: "Um deck integrado ao paisagismo, perfeito para relaxar e refrescar nos dias quentes.",
        image: "/images/lazer/viccino/piscina.png"
      },
      {
        category: "Playground",
        title: "Playground Infantil",
        description: "Área externa repleta de brinquedos para as crianças se divertirem ao ar livre com segurança.",
        image: "/images/lazer/viccino/playground.png"
      },
      {
        category: "Praça",
        title: "Praça de Convivência",
        description: "Projeto paisagístico pensado para relaxar e desfrutar de bons momentos ao ar livre.",
        image: "/images/lazer/viccino/praca.png"
      },
      {
        category: "Quadra",
        title: "Quadra Poliesportiva",
        description: "O espaço ideal para a prática de esportes e atividades físicas sem precisar sair de casa.",
        image: "/images/lazer/viccino/quadra.png"
      },
      {
        category: "Bem-estar",
        title: "Sala de Massagem",
        description: "Um ambiente relaxante e silencioso, planejado para renovar as energias e aliviar o estresse do cotidiano.",
        image: "/images/lazer/viccino/saladeMassagem.png"
      },
      {
        category: "Salão de Festas",
        title: "Salão de Festas",
        description: "Estrutura completa e decorada, ideal para celebrar grandes conquistas e datas especiais.",
        image: "/images/lazer/viccino/salaoFestas.png"
      },
      {
        category: "Festas Gourmet",
        title: "Salão de Festas Gourmet",
        description: "Segundo espaço de eventos, com infraestrutura gourmet para jantares e celebrações à parte.",
        image: "/images/lazer/viccino/salaoFestas2.png"
      },
      {
        category: "Jogos",
        title: "Sala de Jogos",
        description: "Diversão e entretenimento garantidos em um ambiente jovem, dinâmico e interativo.",
        image: "/images/lazer/viccino/salaoJogos.png"
      }
    ]
  },

  {
    id: 6,
    name: "Criare - Tarjab",
    neighborhood: "Saúde",
    address: "Rua Guarujá, nº 94",
    bedrooms: "1 a 3",
    area: "33 a 74 m²",
    price: "R$ 502.000 - R$ 1.322.000",
    image: "/images/criare.png",
    video: "https://www.youtube.com/embed/zROUdpJXD0o",
    plans: [
      { title: "Planta Tipo - 1 Dormitório (33.56m²)", image: "/images/plantas/criare/33.56.png" },
      { title: "Planta Tipo - 2 Dormitórios c/ 1 Suíte (57.65m²)", image: "/images/plantas/criare/57.65.png" },
      { title: "Planta Tipo - 3 Dormitórios c/ 1 Suíte (74.63m²)", image: "/images/plantas/criare/74.63.png" },
      { title: "Planta Tipo - 2 Dormitório c/ 1 Suíte (74.63m²) Living Ampliado", image: "/images/plantas/criare/74.63livingAmpli.png" } 
    ],
    amenities: [
      {
        category: "Academia",
        title: "Academia Equipada",
        description: "Espaço fitness completo com aparelhos modernos para manter sua rotina de treinos em dia sem sair de casa.",
        image: "/images/lazer/criare/academia.png"
      },
      {
        category: "Churrasqueira",
        title: "Área de Churrasqueira",
        description: "Espaço ideal para confraternizações e momentos agradáveis de churrasco com amigos e familiares.",
        image: "/images/lazer/criare/areaDeChurrasqueira.png"
      },
      {
        category: "Área Delivery",
        title: "Área Delivery",
        description: "Espaço dedicado e seguro para receber e armazenar suas encomendas e compras com total praticidade.",
        image: "/images/lazer/criare/areaDelivery.png"
      },
      {
        category: "Academia",
        title: "Área Fitness Externa",
        description: "Espaço ao ar livre planejado para exercícios funcionais, alongamentos e treinos dinâmicos.",
        image: "/images/lazer/criare/areaFitnessExterna.png"
      },
      {
        category: "Brinquedoteca",
        title: "Brinquedoteca Lúdica",
        description: "Um ambiente colorido e seguro feito para o desenvolvimento, diversão e imaginação das crianças.",
        image: "/images/lazer/criare/brinquedoteca.png"
      },
      {
        category: "Coworking",
        title: "Espaço Coworking",
        description: "Estações de trabalho modernas e confortáveis para o seu home office com total foco e tranquilidade.",
        image: "/images/lazer/criare/espacoCoWorking.png"
      },
      {
        category: "Lavanderia",
        title: "Lavanderia Coletiva",
        description: "Praticidade para cuidar das suas roupas em um espaço moderno e equipado, otimizando o seu tempo.",
        image: "/images/lazer/criare/lavanderia.png"
      },
      {
        category: "MiniMercado",
        title: "Minimercado Autônomo",
        description: "Conveniência e facilidade 24 horas por dia para suas compras rápidas e essenciais dentro do condomínio.",
        image: "/images/lazer/criare/miniMercado.png"
      },
      {
        category: "Pet Place",
        title: "Pet Place com Pet Shower",
        description: "O cuidado com seu melhor amigo completo, unindo diversão e um espaço dedicado para o banho pós-brincadeira.",
        image: "/images/lazer/criare/petPlaceComPetShower.png"
      },
      {
        category: "Piscina",
        title: "Piscina Refrescante",
        description: "Um deck agradável com piscina para relaxar nos dias quentes e desfrutar de ótimos momentos de lazer.",
        image: "/images/lazer/criare/piscina.png"
      },
      {
        category: "Playground",
        title: "Playground Infantil",
        description: "Área externa repleta de brinquedos para as crianças se divertirem ao ar livre com segurança.",
        image: "/images/lazer/criare/playground.png"
      },
      {
        category: "Sala de Jogos",
        title: "Sala de Jogos",
        description: "Entretenimento garantido em um espaço dinâmico com opções de jogos e interação para jovens e adultos.",
        image: "/images/lazer/criare/salaJogos.png"
      },
      {
        category: "Salão de Festas",
        title: "Salão de Festas",
        description: "Ambiente sofisticado e bem decorado, perfeito para celebrar suas grandes conquistas e receber convidados na Saúde.",
        image: "/images/lazer/criare/salaofestas.png"
      },
      {
        category: "Estúdio de vídeo maker",
        title: "Studio Maker",
        description: "Espaço criativo e equipado para gravação de conteúdos digitais, vídeos ou pequenos projetos manuais.",
        image: "/images/lazer/criare/studioMaker.png"
      }
    ]
  },

  {
    id: 7,
    name: "Eucalys - Tarjab",
    neighborhood: "Moema",
    address: "Av. dos Carinás, nº 333",
    bedrooms: "1 a 3",
    area: "33 a 74 m²",
    price: "R$ 606.000 - R$ 3.210.000",
    image: "/images/eucalys.png",
    video: "https://www.youtube.com/embed/zROUdpJXD0o",
    towers: [
      {
        name: "Lírio",
        plans: [
          { title: "Planta Tipo - 2 Suítes (84m²) - 2º Pavimento", image: "/images/plantas/eucalys/lirio/84 m2 - 2 suites - 2 pavimento.png" },
          { title: "Planta Tipo - 2 Suítes (84m²)", image: "/images/plantas/eucalys/lirio/84 m2 - 2 suites.png" },
          { title: "Planta Tipo - 2 Suítes (86m²) - Terraço", image: "/images/plantas/eucalys/lirio/86 m2 - 2 suites terraco.png" },
          { title: "Planta Tipo - 2 Suítes (86m²)", image: "/images/plantas/eucalys/lirio/86 m2 - 2 suites.png" },
          { title: "Planta Tipo - Suíte Sr. e Sra. C/ Sala Ampliada (86m²)", image: "/images/plantas/eucalys/lirio/86 m2 - sala ampliada suite banho sr. e sra..png" },
          { title: "Planta Tipo - 2 Suítes (90m²) - Terraço - Opção 1", image: "/images/plantas/eucalys/lirio/90 m2 - 2 suites terraco.png" },
          { title: "Planta Tipo - 2 Suítes (90m²) - Terraço - Opção 2", image: "/images/plantas/eucalys/lirio/90 m2 - 2 suites terraco suite.png" },
          { title: "Planta Tipo - 2 Suítes (112m²) Garden", image: "/images/plantas/eucalys/lirio/112 m2 - 2 suites garden.png" },
          { title: "Planta Tipo - 3 Suítes (136m²) - Opção 1", image: "/images/plantas/eucalys/lirio/136 m2 - 3 suites op 1.png" },
          { title: "Planta Tipo - 2 Suítes (136m²) Sala de TV - Opção 2", image: "/images/plantas/eucalys/lirio/136 m2 - 2 suites sala tv.png" },
          { title: "Planta Tipo - 3 Suítes (136m²)", image: "/images/plantas/eucalys/lirio/136 m2 - 3 suites.png" },
          { title: "Planta Tipo - Suíte Sr. e Sra. C/ Office (136m²)", image: "/images/plantas/eucalys/lirio/136 m2 - banho sr. sra. office.png" }
        ],
        amenities: [
          {
            category: "Academia",
            title: "Academia de Alta Performance",
            description: "Espaço fitness completo e equipado com aparelhos modernos para manter sua rotina de treinos em dia.",
            image: "/images/lazer/eucalys/lirio/academia.png"
          },
          {
            category: "Coworking",
            title: "Coworking Integrado",
            description: "Infraestrutura silenciosa e conectada, pensada para o seu home office render mais em Moema.",
            image: "/images/lazer/eucalys/lirio/coWorking.png"
          },
          {
            category: "Espaço de Beleza",
            title: "Espaço de Beleza",
            description: "Ambiente reservado e sofisticado para cuidados de beleza e bem-estar sem sair de casa.",
            image: "/images/lazer/eucalys/lirio/espacoDeBeleza.png"
          },
          {
            category: "Gourmet",
            title: "Espaço Gourmet",
            description: "Ambiente sofisticado e ideal para preparar jantares especiais e compartilhar momentos inesquecíveis.",
            image: "/images/lazer/eucalys/lirio/espacoGourmet.png"
          },
          {
            category: "Lobby",
            title: "Lobby de Entrada",
            description: "Um espaço imponente e acolhedor, projetado para receber seus convidados com elegância e requinte.",
            image: "/images/lazer/eucalys/lirio/lobby.png"
          },
          {
            category: "Lounge",
            title: "Lounge de Convivência",
            description: "Um refúgio confortável e moderno para relaxar, ler um bom livro ou conversar com vizinhos.",
            image: "/images/lazer/eucalys/lirio/lounge.png"
          },
          {
            category: "Piscina",
            title: "Piscina Climatizada",
            description: "Um mergulho refrescante ou momentos de relaxamento em um deck integrado com projeto paisagístico refinado.",
            image: "/images/lazer/eucalys/lirio/piscina.png"
          },
          {
            category: "Playground",
            title: "Playground Kids",
            description: "Espaço externo com brinquedos seguros para a recreação das crianças ao ar livre.",
            image: "/images/lazer/eucalys/lirio/playground.png"
          },
          {
            category: "Praça",
            title: "Praça de Convivência",
            description: "Lindo projeto paisagístico para relaxar e desfrutar de bons momentos ao ar livre.",
            image: "/images/lazer/eucalys/lirio/praca.png"
          },
          {
            category: "Bem-estar",
            title: "Sala de Massagem",
            description: "Um ambiente relaxante, silencioso e planejado para renovar as energias e aliviar o estresse do cotidiano.",
            image: "/images/lazer/eucalys/lirio/salaDeMassagem.png"
          },
          {
            category: "Salão de Festas",
            title: "Salão de Festas Elegante",
            description: "Estrutura premium totalmente decorada e planejada para celebrar grandes conquistas e datas especiais.",
            image: "/images/lazer/eucalys/lirio/salaoFestas.png"
          },
          {
            category: "Sauna",
            title: "Sauna",
            description: "Um ambiente relaxante para renovar as energias após o treino ou aliviar o estresse do dia a dia.",
            image: "/images/lazer/eucalys/lirio/Sauna.png"
          },
          {
            category: "Churrasqueira",
            title: "Terraço com Churrasqueira",
            description: "Área externa agradável dedicada a momentos descontraídos de confraternização com amigos e família.",
            image: "/images/lazer/eucalys/lirio/terracoComChurrasqueira.png"
          }
        ]
      },
      {
        name: "Eucalipto",
        plans: [
          { title: "Planta Tipo - 1 Dormitório (32m²) - 1", image: "/images/plantas/eucalys/eucalipto/32 m2 - 1 dormitorio.png" },
          { title: "Planta Tipo - 1 Dormitório (32m²) - 2", image: "/images/plantas/eucalys/eucalipto/32 m2 - 1 dormitorio 2.png" },
          { title: "Planta Tipo - 1 Dormitório (32m²) - 3", image: "/images/plantas/eucalys/eucalipto/32 m2 - 1 dormitorio 3.png" },
          { title: "Planta Tipo - 1 Dormitório (33m²)", image: "/images/plantas/eucalys/eucalipto/33 m2 - 1 dormitorio.png" },
          { title: "Planta Tipo - 1 Dormitório (54m²) c/ Garden", image: "/images/plantas/eucalys/eucalipto/54 m2 - 1 dormitorio garden.png" },
          { title: "Planta Tipo - 1 Dormitório (57m²) c/ Garden - 1", image: "/images/plantas/eucalys/eucalipto/57 m2 - 1 dormitorio garden.png" },
          { title: "Planta Tipo - 1 Dormitório (57m²) c/ Garden - 2", image: "/images/plantas/eucalys/eucalipto/57 m2 - 1 dormitorio garden 2.png" },
          { title: "Planta Tipo - 1 Dormitório (91m²) c/ Garden", image: "/images/plantas/eucalys/eucalipto/91 m2 - 1 dormitorio garden.png" }
        ],
        amenities: [
          {
            category: "Academia",
            title: "Academia Equipada",
            description: "Espaço fitness completo com aparelhos modernos para manter sua rotina de treinos em dia.",
            image: "/images/lazer/eucalys/eucalipto/academia.png"
          },
          {
            category: "Coworking",
            title: "Espaço Coworking",
            description: "Estações de trabalho confortáveis para o seu home office com total foco e tranquilidade.",
            image: "/images/lazer/eucalys/eucalipto/coWorking.png"
          },
          {
            category: "Lavanderia",
            title: "Lavanderia Compartilhada",
            description: "Praticidade para cuidar da lavagem das suas roupas com equipamentos modernos no próprio condomínio.",
            image: "/images/lazer/eucalys/eucalipto/lavandeira.png"
          }
        ]
      },
    ]
  },
  {
    id: 8,
    name: "Signatur - Tarjab",
    neighborhood: "Saúde",
    address: "Rua Ibituruna, nº 298",
    bedrooms: "2 e 3",
    area: "74 a 109 m²",
    price: "R$ 968.000 - R$ 1.600.000",
    image: "/images/signatur.png",
    video: "https://www.youtube.com/embed/zROUdpJXD0o",
    plans: [
      { title: "Planta Tipo - 2 Suítes (74.82m²)", image: "/images/plantas/signatur/74m2 2 dorms(2suites).png" },
      { title: "Planta Tipo - 2 Dormitórios c/ 1 Suíte (77.24m²)", image: "/images/plantas/signatur/77m2 2 dorms(1 suite).png" },
      { title: "Planta Tipo - 2 Dormitórios c/ 1 Suíte (78.82m²)", image: "/images/plantas/signatur/78m2 2 dorms(1 suite).png" },
      { title: "Planta Tipo - 3 Dormitório c/ 1 Suíte (109.44m²)", image: "/images/plantas/signatur/109m2 3dorm(1 suite).png" } 
    ],
    amenities: [
      {
        category: "Academia",
        title: "Academia Equipada",
        description: "Espaço fitness completo com aparelhos modernos para manter sua rotina de treinos em dia na Saúde.",
        image: "/images/lazer/signatur/academia.png"
      },
      {
        category: "Bicicletário",
        title: "Bicicletário Organizado",
        description: "Vagas seguras para armazenar sua bike com praticidade, incentivando a mobilidade urbana sustentável.",
        image: "/images/lazer/signatur/bicicletario.png"
      },
      {
        category: "Brinquedoteca",
        title: "Brinquedoteca Lúdica",
        description: "Área planejada especialmente para o desenvolvimento, segurança e criatividade das crianças.",
        image: "/images/lazer/signatur/brinquedoteca.png"
      },
      {
        category: "Delivery",
        title: "Espaço Delivery",
        description: "Espaço dedicado e seguro para receber e armazenar suas encomendas e compras com total praticidade.",
        image: "/images/lazer/signatur/espacoDelivery.png"
      },
      {
        category: "Gourmet",
        title: "Espaço Gourmet",
        description: "Ambiente sofisticado e ideal para preparar jantares especiais e compartilhar momentos inesquecíveis.",
        image: "/images/lazer/signatur/espacoGourmet.png"
      },
      {
        category: "Estúdio",
        title: "Estúdio de Vídeo Maker",
        description: "Espaço criativo e equipado para gravação de conteúdos digitais, vídeos ou pequenos projetos manuais.",
        image: "/images/lazer/signatur/EstudioVideoMaker.png"
      },
      {
        category: "Hall",
        title: "Hall de Entrada",
        description: "Um espaço imponente e acolhedor, projetado para receber seus convidados com elegância e requinte.",
        image: "/images/lazer/signatur/hall.png"
      },
      {
        category: "Coworking",
        title: "Livraria & Coworking",
        description: "Ambiente reservado e aconchegante, com acervo de livros e infraestrutura para o seu home office.",
        image: "/images/lazer/signatur/livrariaCoWorking.png"
      },
      {
        category: "Piscina",
        title: "Piscina Climatizada",
        description: "Um mergulho refrescante ou momentos de relaxamento em um deck integrado com projeto paisagístico refinado.",
        image: "/images/lazer/signatur/piscina.png"
      },
      {
        category: "Jogos",
        title: "Salão de Jogos",
        description: "Diversão e entretenimento garantidos em um ambiente jovem, dinâmico e interativo.",
        image: "/images/lazer/signatur/salaoJogos.png"
      },
      {
        category: "Wine Bar",
        title: "Wine Bar",
        description: "Espaço sofisticado para degustar e compartilhar bons vinhos com amigos e familiares.",
        image: "/images/lazer/signatur/wineBar.png"
      }
    ]
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function PropertiesSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedPropertyPlans, setSelectedPropertyPlans] = useState<PropertyItem | null>(null)
  const [activePlanIndex, setActivePlanIndex] = useState(0)
  const [activeTowerIndex, setActiveTowerIndex] = useState(0)

  const [selectedPropertyAmenities, setSelectedPropertyAmenities] = useState<PropertyItem | null>(null)
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0)
  // NOVO: controla qual torre está ativa dentro do modal de lazer (independente da torre das plantas)
  const [activeAmenityTowerIndex, setActiveAmenityTowerIndex] = useState(0)

  // NOVO: verifica se o empreendimento tem lazer, seja no nível geral ou dentro de alguma torre
  const hasAmenities = (property: PropertyItem): boolean => {
    if (property.amenities && property.amenities.length > 0) return true;
    if (property.towers && property.towers.length > 0) {
      return property.towers.some((tower) => tower.amenities && tower.amenities.length > 0);
    }
    return false;
  }

  const getCurrentPlans = (): PlanItem[] => {
    if (!selectedPropertyPlans) return [];
    if (selectedPropertyPlans.towers && selectedPropertyPlans.towers.length > 0) {
      return selectedPropertyPlans.towers[activeTowerIndex]?.plans || [];
    }
    return selectedPropertyPlans.plans || [];
  }

  // NOVO: retorna a lista de amenities certa — da torre ativa quando o empreendimento tem torres com lazer próprio,
  // ou a lista geral do empreendimento caso contrário
  const getCurrentAmenities = (): AmenityItem[] => {
    if (!selectedPropertyAmenities) return [];
    // Lazer compartilhado no nível do empreendimento tem prioridade (ex: Viccino, onde as duas torres dividem a mesma área comum)
    if (selectedPropertyAmenities.amenities && selectedPropertyAmenities.amenities.length > 0) {
      return selectedPropertyAmenities.amenities;
    }
    // Caso contrário, cada torre tem seu próprio lazer (ex: Riserva)
    if (selectedPropertyAmenities.towers && selectedPropertyAmenities.towers.length > 0) {
      return selectedPropertyAmenities.towers[activeAmenityTowerIndex]?.amenities || [];
    }
    return [];
  }

  // Mostra abas de torre no modal de lazer só quando NÃO há lazer compartilhado no nível do empreendimento
  const showAmenityTowerTabs = (property: PropertyItem | null): boolean => {
    if (!property) return false;
    if (property.amenities && property.amenities.length > 0) return false;
    return !!(property.towers && property.towers.length > 0 && property.towers.some((t) => t.amenities && t.amenities.length > 0));
  }

  const nextPlan = () => {
    const currentPlans = getCurrentPlans();
    if (currentPlans.length <= 1) return;
    setActivePlanIndex((prev) => (prev === currentPlans.length - 1 ? 0 : prev + 1));
  }

  const prevPlan = () => {
    const currentPlans = getCurrentPlans();
    if (currentPlans.length <= 1) return;
    setActivePlanIndex((prev) => (prev === 0 ? currentPlans.length - 1 : prev - 1));
  }

  const currentPlans = getCurrentPlans();
  const currentAmenities = getCurrentAmenities();

  return (
    <section id="imoveis" className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold-outline font-medium mb-4 tracking-wider uppercase text-sm">
            Imóveis em Destaque
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Oportunidades exclusivas para você
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Confira alguns dos apartamentos disponíveis nas melhores localizações de São Paulo.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* IMAGE */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                    <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full relative z-10 shadow-sm">
                      {property.neighborhood}
                    </span>
                    {hasAmenities(property) && (
                      <span className="bg-primary text-primary-foreground text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full relative z-10 flex items-center gap-1 shadow-sm">
                        <Compass className="w-3 h-3 animate-spin-slow" />
                        Tour Lazer
                      </span>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 pb-0">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-2 relative z-10">
                    {property.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 relative z-10">
                    {property.address}
                  </p>

                  {/* BLOCO METRAGENS + BOTÃO DA PLANTA */}
                  <div className="flex items-center justify-between flex-wrap gap-2 text-sm text-muted-foreground mb-5 pb-3 border-b border-muted relative z-10">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">🛏️</span>
                        <span>{property.bedrooms} qtos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">📐</span>
                        <span>{property.area}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setActivePlanIndex(0);
                        setActiveTowerIndex(0);
                        setSelectedPropertyPlans(property);
                      }}
                      className="text-xs bg-accent/15 hover:bg-accent text-accent hover:text-accent-foreground font-bold px-3 py-1.5 rounded-md transition-colors relative z-10 cursor-pointer"
                    >
                      Ver Plantas
                    </button>
                  </div>

                  {/* NOVO CTA DO LAZER INTERATIVO DESTACADO (Azul & Laranja Premium) */}
                  {hasAmenities(property) && (
                    <button
                      onClick={() => {
                        setActiveAmenityIndex(0);
                        setActiveAmenityTowerIndex(0);
                        setSelectedPropertyAmenities(property);
                      }}
                      className="w-full flex items-center justify-between text-xs bg-gradient-to-r from-blue-900 via-[#102a45] to-[#1a3a5f] text-white border border-blue-700/40 p-3 rounded-xl transition-all duration-300 mb-5 relative z-10 cursor-pointer group/amenity shadow-md hover:shadow-lg hover:border-orange-500/50"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <Compass className="w-4 h-4 text-orange-400 group-hover/amenity:rotate-45 transition-transform duration-500" />
                        <span className="font-medium tracking-wide text-blue-100 group-hover/amenity:text-white transition-colors">
                          Áreas de Lazer Interativas
                        </span>
                      </span>
                      <span className="font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-lg group-hover/amenity:bg-orange-500 group-hover/amenity:text-white group-hover/amenity:border-transparent transition-all duration-300 shadow-sm">
                        Explorar
                      </span>
                    </button>
                  )}

                  <div className="mb-5 relative z-10">
                    <span className="text-gold-outline font-bold text-lg">
                      {property.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTOES DE AÇÃO */}
              <div className="p-6 pt-0 mt-auto relative z-10">
                <button
                  onClick={() => setSelectedVideo(property.video)}
                  className="mb-3 w-full inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
                >
                  Ver vídeo do imóvel
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>

                <Link
                  href={`https://wa.me/5511988649386?text=Olá! Tenho interesse no imóvel ${property.name} em ${property.neighborhood}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
                >
                  Tenho Interesse
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white text-black text-2xl font-bold flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                ×
              </button>
              <iframe
                src={selectedVideo}
                title="Vídeo do imóvel"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL COMPACTO DE PLANTAS */}
      <AnimatePresence>
        {selectedPropertyPlans && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative bg-background text-foreground w-full max-w-lg max-h-[92vh] rounded-2xl p-5 shadow-2xl my-auto flex flex-col overflow-hidden"
            >
              <button
                onClick={() => setSelectedPropertyPlans(null)}
                className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-muted/80 text-foreground flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto pr-1 custom-scrollbar flex-1 flex flex-col">
                <div className="mb-3 pr-8 flex-shrink-0">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-accent">Plantas Disponíveis</span>
                  <h3 className="text-xl font-serif font-bold text-primary leading-tight">{selectedPropertyPlans.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedPropertyPlans.address}</p>
                </div>

                {selectedPropertyPlans.towers && selectedPropertyPlans.towers.length > 0 && (
                  <div className="flex bg-muted/50 p-1 rounded-xl mb-4 gap-1 flex-shrink-0 border border-muted/30">
                    {selectedPropertyPlans.towers.map((tower, idx) => (
                      <button
                        key={tower.name}
                        onClick={() => {
                          setActiveTowerIndex(idx);
                          setActivePlanIndex(0);
                        }}
                        className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          activeTowerIndex === idx
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Torre {tower.name} ({tower.plans.length} opções)
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-muted group mb-4 flex-shrink-0">
                  <AnimatePresence mode="wait">
                    {currentPlans.length > 0 && (
                      <motion.div
                        key={`${activeTowerIndex}-${activePlanIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full p-2 flex items-center justify-center"
                      >
                        <Image 
                          src={currentPlans[activePlanIndex]?.image}
                          alt={currentPlans[activePlanIndex]?.title}
                          fill
                          className="object-contain p-2"
                          priority
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {currentPlans.length > 1 && (
                    <>
                      <button 
                        onClick={prevPlan}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={nextPlan}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-xs text-[10px] text-white px-2.5 py-1 rounded-full font-medium">
                    {activePlanIndex + 1} de {currentPlans.length}
                  </div>
                </div>

                <div className="text-center px-2 flex-shrink-0 min-h-[40px] flex items-center justify-center mb-5">
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {currentPlans[activePlanIndex]?.title}
                  </p>
                </div>
              </div>

              {/* BOTÃO DO WHATSAPP DO MODAL DE PLANTAS - AJUSTADO PARA O AZUL MARINHO PREMIUM DO SITE */}
              <div className="pt-3 border-t border-muted mt-auto flex-shrink-0">
                <Link
                  href={`https://wa.me/5511988649386?text=Olá! Tenho interesse no imóvel ${selectedPropertyPlans.name} e gostaria de receber mais informações sobre a planta: ${currentPlans[activePlanIndex]?.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-950 via-[#102a45] to-[#1a3a5f] text-blue-100 hover:text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-900 hover:to-[#224b7a] transition-all duration-300 shadow-md border border-blue-700/30"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.66.986 3.294 1.503 5.34 1.505 5.517 0 10.005-4.48 10.008-10 0-2.675-1.04-5.19-2.929-7.08-1.888-1.89-4.398-2.93-7.073-2.93-5.524 0-10.014 4.482-10.017 10.003-.001 2.096.551 4.14 1.597 5.895l-.995 3.633 3.73-.977zm11.31-7.222c-.313-.156-1.854-.915-2.131-1.015-.278-.1-.482-.15-.683.15-.2.3-.777.98-.952 1.18-.176.2-.351.224-.664.068-1.066-.534-1.875-.98-2.624-2.266-.197-.34.197-.315.562-1.04.063-.13.031-.24-.015-.34-.047-.1-.482-1.16-.66-1.59-.173-.418-.347-.36-.482-.36-.124-.002-.267-.002-.411-.002-.144 0-.38.054-.578.273-.198.22-1.758 1.717-1.758 4.187 0 2.47 1.8 4.85 2.05 5.19.248.34 3.537 5.393 8.571 7.56 1.197.515 2.13.82 2.856 1.05 1.2.38 2.294.325 3.158.196.964-.143 2.131-.87 2.431-1.714.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.643-.4z"/>
                  </svg>
                  Conversar no WhatsApp
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE ÁREAS DE LAZER (AMENITIES) — agora com suporte a lazer por torre */}
      <AnimatePresence>
        {selectedPropertyAmenities && currentAmenities.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative bg-background text-foreground w-full max-w-2xl max-h-[92vh] rounded-2xl p-5 shadow-2xl my-auto flex flex-col overflow-hidden"
            >
              <button
                onClick={() => setSelectedPropertyAmenities(null)}
                className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-muted/80 text-foreground flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto pr-1 custom-scrollbar flex-1 flex flex-col">
                <div className="mb-3 pr-8 flex-shrink-0">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-orange-500">Áreas Comuns Interativas</span>
                  <h3 className="text-xl font-serif font-bold text-primary leading-tight">{selectedPropertyAmenities.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedPropertyAmenities.address}</p>
                </div>

                {/* NOVO: abas de torre no modal de lazer, iguais ao padrão do modal de plantas — só aparecem quando o lazer é separado por torre */}
                {showAmenityTowerTabs(selectedPropertyAmenities) && (
                  <div className="flex bg-muted/50 p-1 rounded-xl mb-4 gap-1 flex-shrink-0 border border-muted/30">
                    {(selectedPropertyAmenities.towers || []).map((tower, idx) => (
                      <button
                        key={tower.name}
                        onClick={() => {
                          setActiveAmenityTowerIndex(idx);
                          setActiveAmenityIndex(0);
                        }}
                        className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          activeAmenityTowerIndex === idx
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Torre {tower.name} ({(tower.amenities || []).length} espaços)
                      </button>
                    ))}
                  </div>
                )}

                {/* Carrossel de Categorias do Lazer */}
                <div className="flex gap-2 overflow-x-auto pb-2.5 mb-4 custom-scrollbar flex-shrink-0">
                  {currentAmenities.map((amenity, idx) => (
                    <button
                      key={`${amenity.category}-${idx}`}
                      onClick={() => setActiveAmenityIndex(idx)}
                      className={`text-xs px-3.5 py-2 font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer border ${
                        activeAmenityIndex === idx
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-muted/30 text-muted-foreground hover:text-foreground border-muted/50"
                      }`}
                    >
                      {amenity.category}
                    </button>
                  ))}
                </div>

                {/* Imagem do Lazer Ativo */}
                <div className="relative aspect-[16/10] bg-muted rounded-xl overflow-hidden border border-muted mb-4 flex-shrink-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeAmenityTowerIndex}-${activeAmenityIndex}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image 
                        src={currentAmenities[activeAmenityIndex]?.image}
                        alt={currentAmenities[activeAmenityIndex]?.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Descritivo da Área de Lazer Ativa */}
                <div className="mb-6 flex-shrink-0">
                  <h4 className="text-lg font-bold text-foreground mb-1.5">
                    {currentAmenities[activeAmenityIndex]?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentAmenities[activeAmenityIndex]?.description}
                  </p>
                </div>
              </div>

              {/* BOTÃO DO WHATSAPP DO MODAL DE LAZER - AJUSTADO PARA O AZUL MARINHO PREMIUM DO SITE */}
              <div className="pt-3 border-t border-muted mt-auto flex-shrink-0">
                <Link
                  href={`https://wa.me/5511988649386?text=Olá! Estou vendo o tour de lazer do ${selectedPropertyAmenities.name} e amei o espaço: ${currentAmenities[activeAmenityIndex]?.title}. Gostaria de mais informações.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-950 via-[#102a45] to-[#1a3a5f] text-blue-100 hover:text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-900 hover:to-[#224b7a] transition-all duration-300 shadow-md border border-blue-700/30"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.66.986 3.294 1.503 5.34 1.505 5.517 0 10.005-4.48 10.008-10 0-2.675-1.04-5.19-2.929-7.08-1.888-1.89-4.398-2.93-7.073-2.93-5.524 0-10.014 4.482-10.017 10.003-.001 2.096.551 4.14 1.597 5.895l-.995 3.633 3.73-.977zm11.31-7.222c-.313-.156-1.854-.915-2.131-1.015-.278-.1-.482-.15-.683.15-.2.3-.777.98-.952 1.18-.176.2-.351.224-.664.068-1.066-.534-1.875-.98-2.624-2.266-.197-.34.197-.315.562-1.04.063-.13.031-.24-.015-.34-.047-.1-.482-1.16-.66-1.59-.173-.418-.347-.36-.482-.36-.124-.002-.267-.002-.411-.002-.144 0-.38.054-.578.273-.198.22-1.758 1.717-1.758 4.187 0 2.47 1.8 4.85 2.05 5.19.248.34 3.537 5.393 8.571 7.56 1.197.515 2.13.82 2.856 1.05 1.2.38 2.294.325 3.158.196.964-.143 2.131-.87 2.431-1.714.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.643-.4z"/>
                  </svg>
                  Saber Mais!
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}