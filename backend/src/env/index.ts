import { EnvType, load } from 'ts-dotenv';

export type Env = EnvType<typeof schema>;

export const schema = {
  MONGO_DB_LINK: String,
};

export let env: Env;

export function loadEnv(test?: boolean): void {
  env = load(schema, {
    path: test ? '.env.test' : '.env',
    overrideProcessEnv: true,
  });
}
