/**
 * Fake mínimo do supabase-js para testes: cada tabela recebe uma fila de respostas.
 * Registra as chamadas (insert/update) para os testes conferirem o que foi gravado.
 */
export interface Resposta {
  data?: unknown;
  error?: { message: string; code?: string } | null;
}

export function criarFakeSupabase(respostas: Record<string, Resposta[]>) {
  const chamadas: { tabela: string; op: string; payload?: unknown }[] = [];

  const client = {
    from(tabela: string) {
      let op = 'select';
      const proxima = (): Resposta =>
        (respostas[tabela] ?? []).shift() ?? { data: null, error: null };

      const builder: any = {
        select: () => builder,
        eq: () => builder,
        is: () => builder,
        insert: (payload: unknown) => {
          op = 'insert';
          chamadas.push({ tabela, op, payload });
          return builder;
        },
        update: (payload: unknown) => {
          op = 'update';
          chamadas.push({ tabela, op, payload });
          return builder;
        },
        single: () => Promise.resolve(proxima()),
        maybeSingle: () => Promise.resolve(proxima()),
        then: (res: (v: Resposta) => unknown, rej?: (e: unknown) => unknown) =>
          Promise.resolve(proxima()).then(res, rej),
      };
      return builder;
    },
  };

  return { service: { client } as any, chamadas };
}
