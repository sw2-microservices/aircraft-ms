export class Aircraft {
  id: string;

  model: string;

  registration: string;

  seatsTotal: number;

  configuration?: Record<string, any>;
  
  createdAt: Date;
}
