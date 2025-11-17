import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.NullTypes.DbNull;
  if (v === 'JsonNull') return Prisma.NullTypes.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.string(), z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.any() }),
    z.record(z.string(), z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TripEventScalarFieldEnumSchema = z.enum(['id','streamId','payload','version','createdAt']);

export const TripSummaryScalarFieldEnumSchema = z.enum(['tripId','passengerId','driverId','status','origin','destination','price','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);

export const TripStatusSchema = z.enum(['SEARCHING_FOR_DRIVER','DRIVER_ASSIGNED','IN_PROGRESS','PAYMENT_PENDING','ARCHIVED']);

export type TripStatusType = `${z.infer<typeof TripStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TRIP EVENT SCHEMA
/////////////////////////////////////////

export const TripEventSchema = z.object({
  id: z.bigint(),
  streamId: z.string(),
  payload: JsonValueSchema,
  version: z.number().int(),
  createdAt: z.coerce.date(),
})

export type TripEvent = z.infer<typeof TripEventSchema>

/////////////////////////////////////////
// TRIP SUMMARY SCHEMA
/////////////////////////////////////////

export const TripSummarySchema = z.object({
  status: TripStatusSchema,
  tripId: z.uuid(),
  passengerId: z.string().nullable(),
  driverId: z.string().nullable(),
  origin: JsonValueSchema.nullable(),
  destination: JsonValueSchema.nullable(),
  price: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TripSummary = z.infer<typeof TripSummarySchema>
