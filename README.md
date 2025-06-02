# LimaBus - Frontend 🚍🌆

Frontend del proyecto **LimaBus**, una plataforma web moderna y responsiva que permite a los ciudadanos visualizar rutas de transporte público en Lima Metropolitana, registrar nuevas rutas y acceder a información útil de manera clara e intuitiva.

![LimaBus Screenshot](./screenshot-home.png)

## 🌐 Tecnologías Utilizadas

- **React** + **TypeScript**
- **TailwindCSS** para estilos utilitarios
- **Framer Motion** para animaciones suaves
- **React Router DOM** para enrutamiento entre páginas
- **Vite** para desarrollo rápido
- **Lucide-react** para iconografía moderna

---

## ✨ Características Principales

- 🌍 **Landing page profesional** con animaciones suaves y diseño moderno
- 🚏 **Listado de rutas** con filtros por duración y distancia
- 📝 **Formulario para registrar nuevas rutas**
- 📱 **Diseño responsivo** y adaptable a dispositivos móviles
- 💡 **Sección de ayuda** visual para usuarios nuevos
- 🔁 Comunicación con el backend Laravel mediante peticiones `GET`, `PUT`, `POST` y `DELETE`

---

## 🛠️ Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/tuUsuario/LimaBus-Frontend.git
cd LimaBus-Frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

⚠️ Asegúrate de que el backend de Laravel esté corriendo en el puerto correspondiente y permita solicitudes CORS.

```
---

## 📁 Estructura de Carpetas

```bash
├── public/                  # Archivos estáticos
├── src/
│   ├── assets/              # Iconos e imágenes SVG
│   │   └── travel_mode.svg
│   ├── components/          # Componentes reutilizables
│   │   ├── FloatingButton.tsx
│   │   ├── Modal.tsx
│   │   ├── RouteForm.tsx
│   │   ├── RouteList.tsx
│   │   ├── Sidebar.tsx
│   │   └── Toast.tsx
│   ├── pages/               # Páginas principales
│   │   ├── Dashboard.tsx
│   │   ├── Help.tsx
│   │   └── Home.tsx
│   ├── services/
│   │   └── api.ts           # Archivo para peticiones al backend
│   ├── App.tsx              # Enrutamiento general
│   ├── App.css              # Estilos globales
│   ├── index.css
│   └── main.tsx             # Entry point
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts

```
---

## 👨‍💻 Autor
Desarrollado por José Giovanni Laura Silvera
Estudiante de Ciencias de la Computación
