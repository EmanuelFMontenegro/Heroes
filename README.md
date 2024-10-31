Super Heroes Manager

Descripción
Super Heroes Manager es una aplicación web creada con Angular que permite gestionar una lista de superhéroes. Los usuarios pueden ver una lista de héroes, añadir nuevos héroes, editarlos y eliminarlos. La aplicación incluye un sistema de navegación lateral (sidebar) que se adapta a dispositivos móviles(no terminado), transformándose en un menú desplegable. Para la persistencia de los datos, la aplicación utiliza json-server, que actúa como un servidor REST simulado para almacenar los datos en un archivo JSON.

Características
Listar héroes: Muestra una lista de héroes en un diseño de cuadrícula con información resumida de cada uno.
Añadir héroe: Permite al usuario añadir un nuevo héroe con atributos como nombre, descripción y afiliación de cómic.
Editar héroe: El usuario puede actualizar la información de un héroe existente.
Eliminar héroe: El usuario puede eliminar un héroe de la lista.
Interfaz adaptable: La interfaz se adapta a dispositivos móviles con una navegación lateral desplegable.
Estructura del proyecto
python
Copiar código
super-heroes-manager/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── list-heroes/      # Componente de lista de héroes
│   │   │   │   ├── add-hero/         # Componente para añadir un héroe
│   │   │   │   ├── edit-hero/        # Componente para editar un héroe
│   │   │   │   ├── shared/           # Componentes y servicios compartidos
│   │   ├── assets/
│   │   ├── environments/
│   ├── styles.scss                   # Estilos globales y mixins
├── db.json                            # Base de datos simulada para json-server
├── README.md
├── angular.json
└── package.json
Configuración e instalación
Para ejecutar este proyecto localmente, sigue los pasos que se detallan a continuación.

Prerrequisitos
Node.js (v14 o superior)
Angular CLI (versión más reciente)
Instalación
Clona este repositorio:

bash
Copiar código
git clone https://github.com/EmanuelFMontenegro/Heroes
cd super-heroes-manager
Instala las dependencias:

bash
Copiar código
npm install
Configura y ejecuta json-server:

El proyecto utiliza json-server para simular una API REST con los datos de los héroes.
En el archivo db.json se encuentran los datos iniciales.
Instala json-server globalmente si aún no lo tienes:
bash
Copiar código
npm install -g json-server
Ejecuta json-server para que escuche en el puerto 3000:
bash
Copiar código
json-server --watch db.json --port 3000
La API estará disponible en http://localhost:3000/heroes.
Inicia el servidor de desarrollo de Angular:

bash
Copiar código
ng serve
La aplicación estará disponible en http://localhost:4200.

Configuración de json-server
La base de datos simulada (db.json) contiene la estructura de los datos de héroes, cada uno con propiedades como id, superhero, description y comic. Este archivo actúa como el backend simulado y se actualiza con cada operación CRUD en la aplicación.

Estructura de db.json
json
Copiar código
{
  "heroes": [
    {
      "id": 1,
      "superhero": "Batman",
      "description": "Detective y protector de Gotham City.",
      "comic": "DC"
    },
    {
      "id": 2,
      "superhero": "Superman",
      "description": "Héroe extraterrestre con fuerza sobrehumana.",
      "comic": "DC"
    }
  ]
}
Operaciones CRUD
GET /heroes: Obtiene la lista completa de héroes.
POST /heroes: Añade un nuevo héroe.
PUT /heroes/{id}: Actualiza un héroe existente.
DELETE /heroes/{id}: Elimina un héroe.
Componentes principales
ListHeroesComponent: Muestra la lista de héroes en una cuadrícula y permite ver los detalles, editar o eliminar.
AddHeroComponent: Permite añadir un nuevo héroe, con validaciones para asegurar que se proporcionen todos los campos requeridos.
EditHeroComponent: Permite modificar la información de un héroe existente.
SidebarComponent: Navegación lateral que incluye botones para listar héroes o agregar uno nuevo; se transforma en un menú tipo hamburguesa en dispositivos móviles.
Estilos y mixins
Todos los estilos se encuentran centralizados en src/styles/shared-styles.scss, usando mixins para crear una estructura de código limpia y modular. Cada componente incluye sus propios mixins y estilos que aseguran una adaptación responsiva.

Ejemplo de mixin
scss
Copiar código
@mixin hero-card-style($width: 320px, $bg-color: #f9f9f9, $border-color: #f53636) {
  width: $width;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: $bg-color;
  border: 2px solid $border-color;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
}
Mejoras futuras
Autenticación de usuarios: Añadir roles de usuario para restringir ciertas acciones a usuarios autenticados.
Filtrado y búsqueda avanzada: Mejorar la búsqueda de héroes por atributos como nombre, cómic o habilidades.
Integración de un backend real: Sustituir json-server por una API REST real con base de datos para persistencia de datos.
Contacto y soporte
Para cualquier consulta o contribución, por favor contacta al administrador del repositorio. ¡Gracias por contribuir a este proyecto!

