1. explica la diferencia entre useEffect, useMemo y useCallback. ¿Cuándo
usarías cada uno para mejorar el rendimiento en móviles?


---useEffet
    Permite manejar los efectos secundarios de un componente, donde se ejecuta una vez se
    renderiza el componente. se puede usar en llamados a la Api o tambien en la Manipulacion del DOM. usaria useEffect con React Native cuando necesite cargar datos de una APi o tambien para iniciar una suscripcion a firebase o servicio. Y limpiarla al desmontar el Componente.

---useMemo
    Recuarda un valor de una funcion costosa y solo se calcula cuando sus dependencias se cambian. usaria usememo cuando tiene calculos muy grandes y complejos. por ejemplo cuando un calculo se usa dentro de componente que se renderiza mucho y cuando depende de una sola propiedad y no te todas de las recive un componete 

---UseCallback
    Memoriza una funcion ya creada para que su referencia en memoria no cambie entre renders. usaria useCallback cuando paso funciones como props a componentes hijos y esto donde no me generen renders inecesarios.


2. Explica cómo manejarías

---Cache de datos con React Query o Apollo Client
   En React Query en cada consulta identifica cada solicitud de datos con arreglos e indentificadores unicos como keys (queryKey)
   lo cual hace que cuando tengamos dos componentes y si solcitan los mismos datos React query no haria los dos llamadas a la API 
   uso cachetime para mantener los datos en memoria aunque el componente se desmonte-

   y en apollo client utilizo la normalizacion en la cache mediante el inMemorycache, como actualizacion afectan todas las consultas realacionadas


---Sincronización offline → online
  Manejaría la sincronización offline a online con persistencia local de datos, una cola de operaciones pendientes, reintentos automáticos al reconectar, resolución de conflictos bien definida y feedback claro al usuario. Herramientas como React Query o Apollo Client ya que  ofrecen soporte para cache persistente y retry, lo que facilita implementar esta estrategia 


---Prevención de doble request en pantallas navegables
   Para prevenir doble request en pantallas navegables, usaría el cache nativo de React Query o Apollo Client con políticas de fetch adecuadas, centralizaría la lógica de fetching en hooks compartidos, cancelaría requests en curso al navegar rápido y aplicaría prefetch en pantallas críticas. De esta forma se evita duplicar llamadas, se mejora el rendimiento y la experiencia del usuario

3. ¿Qué diferencia existe entre desarrollar una app con Expo versus React Native CLI?
   Expo es ideal para prototipado rápido y apps simples porque ofrece un SDK integrado y configuración mínima, mientras que React Native CLI da control total sobre el código nativo y es más adecuado para proyectos complejos que requieren librerías personalizadas o integración profunda con Android y iOS

---Cuál usarías para un proyecto productivo con cámara, deep linking y buildsautomatizadas?
   Para un proyecto productivo con cámara avanzada, deep linking robusto y builds automatizadas, usaría React Native CLI.
   La razón es que tenemos la flexibilidad total para integrar librerías nativas, configurar deep linking directamente en los proyectos Android y iOS y montar pipelines de CI y CD personalizados. Expo es excelente para prototipos o MVPs, pero en producción con estos requisitos, el CLI es más adecuado.

4. Describe cómo optimizarías el rendimiento de una app React Native en:

---Renderizado de listas 
   Para optimizar el renderizado de listas en React Native usaría FlatList con virtualización, configurando props como initialNumToRender y windowSize, memorizaría ítems con Reactmemo y useCallback, usaría keys únicas y cache de imágenes, y aplicaría paginación para evitar cargar todo en memoria. Así se mejora la fluidez y se reduce el consumo de recursos en móviles.

---Navegacion 
   Para optimizar la navegación en React Native usaría el native stack con reactnativescreens y habilitaría detachInactiveScreens y unmountOnBlur para liberar memoria, memorizaría componentes y callbacks para evitar renders innecesarios, prefetch de datos antes de navegar y animaciones con reactnativereanimated para transiciones fluidas. Así se mejora la experiencia en móviles, especialmente en dispositivos de gama baja.

---Tamaño de los bundles 
   Para optimizar el tamaño del bundle en React Native aplicaría lazy loading y code splitting, eliminaría dependencias innecesarias, activaría Hermes, usaría treeshaking y minificación, optimizaría assets y analizaría el bundle con herramientas como source-map-explorer. Así se reduce el tiempo de carga y se mejora el rendimiento en móviles.

---Imagenes y Assets
   Para optimizar imágenes y assets en React Native usaría formatos ligeros como WebP y SVG, cache nativo con reactnativefastimage, carga diferida en listas, compresión y redimensionamiento antes de incluirlos en el bundle, y servir assets grandes desde un CDN. Así se reduce el tamaño del bundle, mejora el tiempo de carga y se optimiza el rendimiento en móviles.

5. Describe (o dibuja) una arquitectura simple con:
---App móvil React Native
   Yo organizaría una arquitectura simple para una app móvil en React Native en capas.
En la capa de presentación, yo implementaría las pantallas con componentes de React Native y gestionaría la navegación con React Navigation, usando un stack y tabs según la necesidad. En la capa de estado, yo manejaría el estado global con Redux o Zustand, y el estado local con hooks como useState y useReducer. Para la capa de datos, yo integraría React Query o Apollo Client para el manejo de cache y sincronización con el backend, y usaría AsyncStorage o SQLite para persistencia offline.
Finalmente, yo incluiría una capa de integración, donde conectaría servicios externos como notificaciones push, autenticación y pipelines de CI/CD para automatizar builds y despliegues. De esta forma, yo mantengo la arquitectura modular, fácil de mantener y optimizada para móviles.

---API REST o GraphQL
o organizaría una arquitectura simple para una app móvil en React Native que consuma datos desde una API REST o GraphQL en capas bien definidas. En la capa de presentación, yo implementaría las pantallas con componentes de React Native y gestionaría la navegación con React Navigation. En la capa de estado, yo manejaría el estado global con Redux, Zustand o Context API, y el estado local con hooks. Para la capa de datos, yo integraría React Query si uso REST, o Apollo Client si uso GraphQL, de manera que yo pueda manejar cache, sincronización offline y revalidación automática. Yo encapsularía las llamadas en un servicio para separar la lógica de red de la UI. En la capa de persistencia, yo usaría AsyncStorage o SQLite para guardar datos críticos offline. Finalmente yo incluiría una capa de integración, donde conectaría servicios externos como autenticación, notificaciones push y pipelines de CI/CD para automatizar builds y despliegues. De esta forma, yo mantengo la arquitectura modular, fácil de mantener y optimizada para móviles.

---Cache local + sincronización
manejaría el cache local y la sincronización en una app móvil con una estrategia offlinefirst.
Primero, yo configuraría un sistema de persistencia local usando AsyncStorage, SQLite o Realm, para que los datos críticos (ej. sesión, configuraciones, listas recientes) estén disponibles incluso sin conexión. Luego, yo integraría una librería como React Query para REST o Apollo Client para GraphQL, que me permite cachear las respuestas de la API y revalidarlas automáticamente.
Cuando el dispositivo está offline, yo serviría los datos directamente desde el cache local y encolaría las mutaciones. Al detectar reconexión, yo procesaría esa cola de mutaciones en orden, enviando los cambios al servidor y actualizando el cache.
Además, yo configuraría políticas de retry automático y mostraría feedback al usuario. De esta forma, yo garantizo que la app sea usable sin internet y que los datos se mantengan consistentes al volver online.

---lujo de autenticación (JWT, OAuth o Firebase Auth)
En un proyecto productivo yo manejaría la autenticación evaluando las necesidades específicas.
Si necesito un sistema ligero y controlado por mi backend, yo implementaría JWT. Yo generaría el token en el servidor tras validar credenciales y lo almacenaría de forma segura en el cliente. Luego, yo enviaría ese token en cada request para validar la sesión. Si la aplicación requiere integración con terceros, yo usaría OAuth 2.0, porque me permite delegar la autenticación a proveedores externos y manejar scopes de autorización. Yo configuraría el flujo de autorización y recibiría un access token para consumir APIs seguras. Finalmente, si busco una solución rápida y gestionada en la nube, yo integraría Firebase Auth, que ya ofrece SDKs listos para email y password, social login y manejo de tokens. Yo aprovecharía su integración con otros servicios de Firebase como Firestore y FCM.En todos los casos, yo reforzaría la seguridad almacenando tokens en un storage seguro, renovando sesiones con refresh tokens y protegiendo las rutas críticas en el backend. De esta forma, yo garantizo una autenticación confiable y escalable

6. Explica cómo estructurarías la arquitectura interna de tu app (carpetas,componentes, servicios, hooks, estados).

Yo estructuraría la arquitectura interna de mi aplicación en React Native siguiendo una organización modular por capas y responsabilidades.
En la raíz del proyecto, yo tendría carpetas principales como:

-- src/components/  Aquí yo colocaría componentes reutilizables y presentacionales, como botones, inputs, headers, que no dependen de lógica de negocio.

-- src/screens/ Aquí yo organizaría las pantallas de la app, cada una con su propio subdirectorio para mantener su UI y lógica específica

-- src/services/ Aquí yo encapsularía la lógica de comunicación con APIs REST o GraphQL, definiendo funciones como getUser(), updateProfile()

-- src/hooks/ Aquí yo implementaría hooks personalizados (useAuth, useFetch, useDebounce) para reutilizar lógica de estado y side-effects

-- src/assets/ Aquí yo guardaría imágenes, íconos y fuentes optimizadas.

-- src/utils/ Aquí yo pondría funciones utilitarias (formatos de fecha, validaciones, helpers).

-- src/navigation/ Aquí yo definiría la configuración de React Navigation, separando stacks, tabs y deep linking.

7. Explica cómo implementarías un flujo básico de CI/CD para React Native usando EAS Build o Fastlane (solo conceptual)
 configuraría un pipeline donde cada push en la rama principal dispare pruebas, build automatizado con EAS o Fastlane, firma de binarios y distribución a testers o tiendas. Así aseguro entregas rápidas, seguras y consistentes




