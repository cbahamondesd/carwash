# LavAutos — Car Wash Management App

A full-stack web app for managing a car wash business: staff can log in, register customers and their vehicles, create and track work orders, and manage available services.

Portfolio group project developed by Claudia Bahamondes and Irene Mercadal.

---

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, React Router v6, Material UI (MUI) |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT stored in HTTP-only cookies |
| Validation | Zod |

---

## Prerequisites

- Node.js v18+
- npm
- A MongoDB Atlas account (or existing connection string)

---

## Setup

Create `server/.env` with:
```
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET=your_secret_key
```

---

## Running locally

Both must run at the same time:

```bash
# Backend (port 8000)
cd server
npx nodemon server.js

# Frontend (port 3000)
cd client
npm start
```

Production build:
```bash
cd client
npm run build
```

Run frontend tests:
```bash
cd client
npm test
```

---

## Features

- Staff authentication (register, login, logout) with JWT
- Customer management — create, edit and list customers with their vehicles
- Service catalog — define and manage car wash service types and prices
- Work orders — create orders linking a customer, staff member, and services; track status (`pendiente`, `en proceso`, `aceptada`, `cancelada`, `completada`)

---

## API routes

| Resource | Base path | Auth required |
|---|---|---|
| Auth / Funcionarios | `/register`, `/login`, `/logout`, `/profile`, `/verify`, `/funcionarios` | Some |
| Ordenes | `/api/orden/...` | No |
| Clientes | `/api/cliente/...` | No |
| Servicios | `/api/servicio/...` | No |

---

## Data models

- **Funcionario** — App users / staff (auth)
- **Cliente** — Customers, including their vehicles (patente is car plate + vehicle type)
- **Servicio** — Car wash service types with price
- **Orden** — Work orders (references cliente, funcionario, servicios; tracks total and status)
- **DetalleOrden** — Order detail (defined for future addition, not yet implemented)

---

## Test users

| Email | Password |
|---|---|
| almejitav@verdefiles.com | almejaverde |
| pepemasa@carambolas.cl | carambolas |

---
---

# LavAutos — App de administración de lavado de autos

App web full-stack para gestionar un negocio de lavado de autos: el personal puede iniciar sesión, registrar clientes y sus vehículos, crear y seguir órdenes de trabajo, y administrar los servicios disponibles.

Proyecto grupal de portafolio desarrollado por Claudia Bahamondes e Irene Mercadal.

---

## Stack tecnológico

| Capa | Tecnologías |
|---|---|
| Frontend | React 18, React Router v6, Material UI (MUI) |
| Backend | Node.js, Express |
| Base de datos | MongoDB Atlas, Mongoose |
| Autenticación | JWT en cookies HTTP-only |
| Validación | Zod |

---

## Requisitos previos

- Node.js v18+
- npm
- Cuenta en MongoDB Atlas (o una cadena de conexión existente)

---

## Configuración

Crear `server/.env` con:
```
MONGODB_URI=cadena_de_conexion_mongodb
TOKEN_SECRET=clave_secreta
```

---

## Correr localmente

Ambos deben correr al mismo tiempo:

```bash
# Backend (puerto 8000)
cd server
npx nodemon server.js

# Frontend (puerto 3000)
cd client
npm start
```

Build de producción:
```bash
cd client
npm run build
```

Correr tests del frontend:
```bash
cd client
npm test
```

---

## Funcionalidades

- Autenticación de personal (registro, login, logout) con JWT
- Gestión de clientes — crear, editar y ver todos los clientes con sus vehículos
- Catálogo de servicios — definir y administrar tipos de servicio y su valor
- Órdenes de trabajo — crear órdenes vinculando cliente, funcionario y servicios; seguimiento de estado (`pendiente`, `en proceso`, `aceptada`, `cancelada` y `completada`)

---

## Rutas de la API

| Recurso | Ruta base | Requiere auth |
|---|---|---|
| Auth / Funcionarios | `/register`, `/login`, `/logout`, `/profile`, `/verify`, `/funcionarios` | Algunas |
| Ordenes | `/api/orden/...` | No |
| Clientes | `/api/cliente/...` | No |
| Servicios | `/api/servicio/...` | No |

---

## Modelos de datos

- **Funcionario** — Usuarios de la app / personal (autenticación)
- **Cliente** — Clientes con sus vehículos (patente + tipo de vehículo)
- **Servicio** — Tipos de servicio con precio
- **Orden** — Órdenes de trabajo (referencia cliente, funcionario, servicios; total y estado)
- **DetalleOrden** — Detalle de orden (definido para implementación en la siguiente etapa, sin uso aún)

---

## Usuarios de prueba

| Email | Contraseña |
|---|---|
| almejitav@verdefiles.com | almejaverde |
| pepemasa@carambolas.cl | carambolas |
