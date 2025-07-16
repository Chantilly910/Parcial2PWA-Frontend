# 🚀 Frontend Parcial 2 PWA

Interfaz web desarrollada con **React** para gestionar usuarios y posts como parte del segundo parcial de PWA. Cuenta con una estética visual inspirada en **Frutiger Aero** (gradientes, bordes brillantes, efectos retro-futuristas tipo Windows Vista) ✨🧊.

---

## ✅ Requisitos

- Node.js 18 o superior
- Tener el backend corriendo en `http://localhost:4000`
- Navegador moderno
- Repositorio del backend:
- https://github.com/Chantilly910/Parcial-PWA-Backend


---

## 📦 Instalación

Instalá las dependencias del proyecto:

```bash
npm install
▶️ Ejecución
Iniciá la aplicación en modo desarrollo con:

bash
npm run dev
Abrí el navegador en: http://localhost:5173

🔐 Lógica de sesión con localStorage
Guardar usuario después del registro:
js
localStorage.setItem("user", JSON.stringify(response.data.data));
Recuperar datos en componentes:
js
const savedUser = localStorage.getItem("user");
const user = savedUser ? JSON.parse(savedUser) : null;
const userId = user?._id || "Not registered";
📋 Funcionalidades principales
🧍‍♂️ Registro de usuario y persistencia en localStorage

📝 Crear, ver, editar y dar like a posts

👥 Listado de usuarios con activación/desactivación

🧭 Navbar dinámica con botones contextuales

🎨 Estilo Aero visual con CSS moderno

🧠 Componentes de clase (React.Component), sin hooks

🔄 Navegación con React Router DOM

🧰 Paquetes utilizados
Instalación recomendada:

bash
npm install axios joi @hookform/resolvers react-hook-form react-router-dom
Paquete	Descripción
axios	Cliente HTTP para consumir la API REST
joi	Validación de formularios
@hookform/resolvers	Integración entre Joi y React Hook Form
react-hook-form	Manejo eficiente de formularios
react-router-dom	Sistema de rutas y navegación en React
🧱 Estructura del proyecto
src/
├── components/      ← Navbar, Register, Posts, PostForm, etc.
├── styles/          ← aero.css con efectos visuales Aero
├── App.jsx          ← Define todas las rutas internas
└── main.jsx         ← Entrada principal (incluye BrowserRouter)
