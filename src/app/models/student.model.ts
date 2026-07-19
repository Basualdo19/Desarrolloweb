export type StudentStatus = 'activo' | 'inactivo';

export interface Student {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  fechaNacimiento: string;
  carrera: string;
  anio: number;
  promedio: number;
  estado: StudentStatus;
}
