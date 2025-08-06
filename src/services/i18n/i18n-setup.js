import { 
  setLang, 
  setWarnOnMissingKeys,
  setLocalesHost,
  setUrl,
  // setDefaultValue 
} from '@open-cells/localize';

// Idiomas disponibles en la aplicación
export const availableLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' }
];

// Idioma por defecto
export const defaultLanguage = 'en';

/**
 * Detecta el idioma del navegador
 */
function detectBrowserLanguage() {
  // Verificar si hay un idioma guardado en localStorage
  const savedLanguage = localStorage.getItem('app-language');
  if (savedLanguage && availableLanguages.find(lang => lang.code === savedLanguage)) {
    return savedLanguage;
  }

  // Detectar idioma del navegador
  const browserLang = navigator?.language || navigator?.languages?.[0] || defaultLanguage;
  const langCode = browserLang.split('-')[0]; // 'es-ES' -> 'es'
  
  // Verificar si el idioma detectado está disponible
  return availableLanguages.find(lang => lang.code === langCode)?.code || defaultLanguage;
}

/**
 * Cambia el idioma de la aplicación
 */
export function changeLanguage(languageCode) {
  if (!availableLanguages.find(lang => lang.code === languageCode)) {
    console.warn(`Language '${languageCode}' is not available`);
    return;
  }

  // Cambiar idioma usando Open Cells
  setLang(languageCode);
  
  // Guardar preferencia en localStorage
  localStorage.setItem('app-language', languageCode);
  
  // Actualizar atributo lang del documento
  document.documentElement.lang = languageCode;
}

/**
 * Obtiene el idioma actual
 */
export function getCurrentLanguage() {
  return document.documentElement.lang || detectBrowserLanguage();
}

/**
 * Inicializa la configuración de i18n
 * Debe llamarse antes de que se carguen los componentes
 */
export function initializeI18n() {
  // Configurar la ubicación de los archivos de traducciones
  // Open Cells busca por defecto en ./src/locales-app/locales.json
  setLocalesHost('./src'); // Ruta base
  setUrl('locales-app/locales.json'); // Archivo de traducciones
  
  // Configurar comportamiento para claves faltantes
  // Devuelve la clave misma si no encuentra la traducción
  // setDefaultValue((key) => key);
  
  // Habilitar warnings para claves faltantes en desarrollo
  if (import.meta.env.DEV) {
    setWarnOnMissingKeys(true);
  }
  
  // Establecer idioma inicial
  const initialLanguage = detectBrowserLanguage();
  setLang(initialLanguage);
  document.documentElement.lang = initialLanguage;
  
  console.log(`🌍 i18n initialized with language: ${initialLanguage}`);
}
