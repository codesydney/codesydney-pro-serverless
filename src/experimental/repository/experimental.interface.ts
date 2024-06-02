export interface IExperimentalRepository<T> {
  findAll(): Promise<T[]>
  findById(id: string): Promise<T>
  findByUniqueTag(tag: Tags): Promise<T[]>
  findByCompleted(completed: boolean): Promise<T[]>
  create(item: Partial<T>): Promise<T>
  update(id: string, item: Partial<T>): Promise<T>
  delete(id: string): Promise<T>
}

export interface Experimental {
  id: string
  tag: Tags
  completed: boolean
  label: string
}

// Doing a type mapping to Prisma Enum,
// A bit annoying as Prisma Enum type is its own thing
// And doesn't conform to TS Enum
export const Tags: { [x: string]: 'EXP' | 'FINAL' | 'PROTO' } = {
  EXP: 'EXP',
  FINAL: 'FINAL',
  PROTO: 'PROTO',
}

export type Tags = (typeof Tags)[keyof typeof Tags]
