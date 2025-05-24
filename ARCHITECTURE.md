# Arquitetura do Sistema - Travel Planner

## Visão Geral da Arquitetura

```mermaid
graph TB
    subgraph "Frontend"
        A[Next.js App] --> B[React Components]
        B --> C[State Management - Zustand]
        C --> D[API Client - React Query]
    end
    
    subgraph "Backend Services"
        E[API Gateway] --> F[Auth Service]
        E --> G[User Service]
        E --> H[CSV Service]
        E --> I[AI Service]
        E --> J[Trip Service]
    end
    
    subgraph "External Services"
        K[OpenAI API]
        L[Booking APIs]
        M[Flight APIs]
    end
    
    subgraph "Data Layer"
        N[PostgreSQL - Supabase]
        O[Redis Cache]
        P[File Storage]
    end
    
    A --> E
    I --> K
    J --> L
    J --> M
    F --> N
    G --> N
    H --> N
    I --> N
    J --> N
    E --> O
```

## Estrutura de Diretórios

```
travel-planner-app/
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/             # App Router (Next.js 14)
│   │   ├── components/      # React Components
│   │   ├── hooks/           # Custom Hooks
│   │   ├── lib/             # Utilities & Config
│   │   ├── services/        # API Services
│   │   ├── store/           # Zustand Store
│   │   └── types/           # TypeScript Types
│   ├── public/              # Static Assets
│   └── package.json
│
├── backend/                 # Node.js API
│   ├── src/
│   │   ├── controllers/     # Route Controllers
│   │   ├── middleware/      # Express Middleware
│   │   ├── models/          # Database Models
│   │   ├── routes/          # API Routes
│   │   ├── services/        # Business Logic
│   │   ├── utils/           # Utilities
│   │   └── types/           # TypeScript Types
│   ├── prisma/              # Database Schema
│   └── package.json
│
├── shared/                  # Shared Types & Utils
│   ├── types/               # Common TypeScript Types
│   └── constants/           # Shared Constants
│
├── docker/                  # Docker Configuration
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   └── docker-compose.yml
│
├── docs/                    # Documentation
│   ├── api/                 # API Documentation
│   └── deployment/          # Deployment Guides
│
└── scripts/                 # Build & Deploy Scripts
    ├── setup.sh
    └── deploy.sh
```

## Fluxo de Dados

### 1. Onboarding do Usuário
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant US as User Service
    participant DB as Database
    
    U->>F: Acessa /onboarding
    F->>A: POST /auth/signup
    A->>DB: Cria usuário
    A-->>F: JWT Token
    F->>US: POST /user/preferences
    US->>DB: Salva preferências
    US-->>F: Perfil criado
    F-->>U: Redireciona para dashboard
```

### 2. Geração de Sugestões AI
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant AI as AI Service
    participant CSV as CSV Service
    participant OpenAI as OpenAI API
    participant DB as Database
    
    U->>F: Solicita sugestões
    F->>AI: POST /ai/suggestions
    AI->>CSV: Busca dados de destinos
    CSV->>DB: Query destinos
    DB-->>CSV: Dados CSV
    CSV-->>AI: Destinos disponíveis
    AI->>OpenAI: Prompt + dados
    OpenAI-->>AI: Sugestões
    AI->>DB: Salva sugestões
    AI-->>F: Retorna sugestões
    F-->>U: Exibe resultados
```

## Componentes Principais

### Frontend Components
- **Layout**: Header, Footer, Navigation
- **Onboarding**: Multi-step form
- **Search**: Filters and search interface
- **Results**: Trip cards and comparison
- **Dashboard**: User profile and history
- **Admin**: CSV upload and management

### Backend Services
- **Auth Service**: JWT authentication
- **User Service**: Profile management
- **CSV Service**: File processing
- **AI Service**: OpenAI integration
- **Trip Service**: Search and booking
- **Webhook Service**: External integrations

## Segurança

### Autenticação
- JWT tokens com refresh
- Rate limiting por IP
- Validação de input
- CORS configurado

### Dados
- Criptografia de dados sensíveis
- Sanitização de uploads CSV
- Validação de schemas
- Logs de auditoria

## Performance

### Caching Strategy
- Redis para sessões
- Cache de sugestões AI
- CDN para assets estáticos
- Database query optimization

### Monitoring
- Application metrics
- Error tracking
- Performance monitoring
- Health checks
