import { ISerializable } from 'cerialize';
import { IdType } from '../models/dto/id.model';

export const IdTypeSerializer: ISerializable = {
  Serialize: (value: IdType) => Number(value),
  Deserialize: (json: number) => String(json)
};

export const DateSerializer: ISerializable = {
  Serialize: (date?: Date) => date?.toISOString().split('T')[0],
  Deserialize: (json?: string) => json ? new Date(json) : undefined
};
