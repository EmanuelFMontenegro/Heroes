export interface Hero {
  id: number; // Asegúrate de que el ID sea un número
  superhero: string; // Nombre del héroe
  description: string; // Descripción del héroe
  comic?: string; // Comic asociado
  image?: string; // Imagen del héroe (opcional)
}
